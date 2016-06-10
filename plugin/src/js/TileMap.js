import {Helper} from './Helper.js';
import {Events} from './Events.js';
import {Point} from './Point.js';
import {Publisher} from './Publisher.js';
import {StateHandler} from './StateHandler.js';
import {Rectangle} from './Rectangle.js';
import {View} from './View.js';
import {Marker} from './Marker.js';
import {DataEnrichment} from './DataEnrichment.js';
import {ToolTip} from './ToolTip.js';
import {Label} from './Label.js';
import {MarkerClusterer} from './MarkerClusterer.js';
import {MapInformation} from './MapInformation.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file Represents a map with its different levels of zooms and markers
 * @copyright Michael Duve 2016
 */
export class TileMap {

    /**
     * Returns left offset of container
     * @return {number} - left offset of container
     */
    get left() {
        return 0;
    }

    /**
     * Returns top offset of container
     * @return {number} - top offset of container
     */
    get top() {
        return 0;
    }

    /**
     * Returns width of container
     * @return {number} - width of container
     */
    get width() {
        return this.container.getBoundingClientRect().width;
    }

    /**
     * Returns height of container
     * @return {number} - height of container
     */
    get height() {
        return this.container.getBoundingClientRect().height;
    }

    get viewport() {
        return new Rectangle(this.left, this.top, this.width, this.height);
    }

    get pixelPerLatLng() {
        this.levelHandler.current.instance.pixelPerLatLng();
    }

    /**
     * gets data of current zoom level
     * @return {Object} data for current level as json
     */
    get currentLevelData() {
        return this.levelHandler.current.value;
    }

    get view() {
        return this.levelHandler.current.instance;
    }

    /**
     * @constructor
     * @param  {Object} container = null - jQuery-object holding the container
     * @param  {Object} tilesData={} - json object representing data of TileMap
     * @param  {Object} settings={} - json object representing settings of TileMap
     * @return {TileMap} instance of TileMap for chaining
     */
    constructor({container = null, tilesData = {}, settings = {}, id}) {
        if (!container) throw Error("You must define a container to initialize a TileMap");
        this.container = container;

        this.id = id;

        this.info = new MapInformation(this.id);
        this.eventManager = new Publisher(this.id);

        this.eventManager.publish(Events.MapInformation.UPDATE, {
            viewport: this.viewport
        });

        this.imgData = tilesData[Events.TileMap.IMG_DATA_NAME];
        this.markerData = tilesData[Events.TileMap.MARKER_DATA_NAME];
        this.labelData = tilesData[Events.TileMap.LABEL_DATA_NAME];

        this.settings = settings;

        this.stateHandler = new StateHandler([
            {value: 0, description: "start"},
            {value: 1, description: "view-initialized"},
            {value: 2, description: "marker-initialized"},
            {value: 3, description: "tooltip-initialized"}
        ]);

        this.templates = (this.settings.tooltip) ? this.settings.tooltip.templates : {};
        this.templates = DataEnrichment.tooltip(this.templates);

        this.levels = [];
        this.clusterHandlingTimeout = null;

        this.lastFrameMillisecs = Date.now();
        this.deltaTiming = 1.0;
        this.bestDeltaTiming = 1000.0 / 60.0;

        this.velocity = new Point();
        this.drawIsNeeded = false;

        this.initial = {
            bounds: settings.bounds,
            center: settings.center,
            level: settings.level,
            zoom: settings.zoom
        };

        this.initializeCanvas();

        Helper.forEach(this.imgData, (element, i) => {
            const currentLevel = {
                value: element,
                level: i,
                instance: this.createViewFromData(settings.bounds, settings.center, element, settings.zoom)
            };
            this.levels.push(currentLevel);
        });

        this.levelHandler = new StateHandler(this.levels);
        this.levelHandler.changeTo(this.settings.level);

        this.view.init();

        this.appendMarkerContainerToDom();
        this.initializeLabels();

        this.bindEvents();
        this.stateHandler.next();
        this.resizeCanvas();

        window.requestAnimFrame(this.mainLoop.bind(this));

        return this;
    }

    /**
     * resets view to initial state
     */
    reset() {
        if (this.levelHandler.current.level !== this.settings.level) this.levelHandler.changeTo(this.settings.level);
        this.view.reset();
        this.redraw();
        this.clusterHandler();
    }

    initializeLabels() {
        this.labelData = this.enrichLabelData(this.labelData);
        this.labels = [];
        Helper.forEach(this.labelData, (label) => {
            const currentLabel = new Label({
                context: this.canvasContext,
                id: this.id,
                settings: label
            });
            this.labels.push(currentLabel);
        });
    }

    /**
     * creates a View from specified parameters
     * @param  {Bounds} bounds - specified boundaries
     * @param  {LatLng} center - specified center
     * @param  {object} data - specified data
     * @param  {number} zoom - initial zoom level
     * @return {View} created View
     */
    createViewFromData(bounds, center, data, zoom) {
        return new View({
            viewport: new Rectangle(this.left, this.top, this.width, this.height),
            currentView: new Rectangle(0, 0, data.dimensions.width, data.dimensions.height),
            bounds: bounds,
            center: center,
            initialCenter: this.initial.center,
            data: data,
            maxZoom: (data.zoom) ? data.zoom.max : 1,
            currentZoom: zoom,
            minZoom: (data.zoom) ? data.zoom.min : 1,
            context: this.canvasContext,
            id: this.id,
            centerSmallMap: this.settings.centerSmallMap,
            limitToBounds: this.settings.limitToBounds
        });
    }

    /**
     * reposition marker container
     * @return {View} instance of View for chaining
     */
    repositionMarkerContainer() {
        if (this.markerContainer) {
            const newSize = this.view.currentView.getDistortedRect(this.view.distortionFactor);
            Helper.css(this.markerContainer, {
               "width": `${newSize.width}px`,
               "height": `${newSize.height}px`,
               "transform": `translate3d(${newSize.left + this.view.offsetToCenter}px, ${newSize.top}px, 0px)`
            });
        }
        return this;
    }

    /**
     * enrich marker data
     * @param  {Object} markerData - data of markers
     * @return {Object} enriched marker data
     */
    enrichMarkerData(markerData) {
        return DataEnrichment.marker(markerData);
    }

    enrichLabelData(labelData) {
        return DataEnrichment.label(labelData);
    }

    /**
     * initializes all markers
     * @param  {Object} markerData - data of all markers
     * @return {TileMap} instance of TileMap for chaining
     */
    initializeMarkers() {
        if (this.markerData && this.markerData.length) {
            let markers = [];
            this.markerData = this.enrichMarkerData(this.markerData);
            Helper.forEach(this.markerData, (currentData) => {
                markers.push(new Marker({
                    data: currentData,
                    container: this.markerContainer,
                    id: this.id
                }));
            });
            markers = markers.sort((a, b) => ((b.latlng.lat - a.latlng.lat !== 0) ? b.latlng.lat - a.latlng.lat : b.latlng.lng - a.latlng.lng));
            Helper.forEach(markers, (marker, i) => {
                marker.icon.style.zIndex = i;
            });

            this.markerClusterer = new MarkerClusterer({
                markers: markers,
                id: this.id,
                container: this.markerContainer
            });
        }
        this.stateHandler.next();
        return this;
    }

    /**
     * append marker container to DOM
´     * @return {TileMap} instance of TileMap for chaining
     */
    appendMarkerContainerToDom() {
        if (this.markerData && this.markerData.length) {
            this.markerContainer = document.createElement("div");
            this.markerContainer.classList.add("marker-container");
            this.container.appendChild(this.markerContainer);
        }
        return this;
    }

    /**
     * creates an instance of ToolTip
     * @return {TileMap} instance of TileMap for chaining
     */
    createTooltipContainer() {
        this.tooltip = new ToolTip({
            container: this.container.parentNode,
            id: this.id,
            templates: this.templates
        });
        this.stateHandler.next();
        return this;
    }

    /**
     * bind all events
     * @return {TileMap} instance of TileMap for chaining
     */
    bindEvents() {

        this.eventManager.subscribe(Events.TileMap.RESIZE, () => { this.resize(); });

        this.eventManager.subscribe(Events.TileMap.DRAW, () => { this.redraw(); });

        this.eventManager.subscribe(Events.View.THUMB_LOADED, () => {
            this.redraw();
            if (this.stateHandler.current.value < 2) {
                this.initializeMarkers();
                if (this.markerData && this.markerData.length) this.createTooltipContainer();
            }
        });

        this.eventManager.subscribe(Events.TileMap.ZOOM_TO_BOUNDS, (bounds) => {
            let zoomIncrease = Math.min(this.view.viewport.width / bounds.width, this.view.viewport.height / bounds.height);
            while (zoomIncrease > 0) {
                const possibleZoomOnLevel = this.view.maxZoom - this.view.zoomFactor;
                zoomIncrease -= possibleZoomOnLevel;
                if (this.levelHandler.hasNext()) {
                    this.changelevel(1);
                } else {
                    this.zoom(possibleZoomOnLevel, bounds.center);
                    zoomIncrease = 0;
                }
            }
        });

        this.eventManager.subscribe(Events.TileMap.NEXT_LEVEL, () => { this.changelevel(1); });
        this.eventManager.subscribe(Events.TileMap.PREVIOUS_LEVEL, () => { this.changelevel(-1); });

        return this;
    }

    setViewToOldView(center, zoom) {
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            zoomFactor: zoom
        });
        this.view.zoom(0, this.view.viewport.center);
        this.view.currentView.setCenter(center);
        this.drawIsNeeded = true;
    }

    changelevel(direction) {
        const lastLevel = this.levelHandler.current.level,
              lastCenter = this.view.currentView.center;
        let extrema;
        if (direction < 0) {
            this.levelHandler.previous();
            extrema = this.view.maxZoom;
        } else {
            this.levelHandler.next();
            extrema = this.view.minZoom;
        }
        if (!this.view.isInitialized) {
            this.view.init();
        }
        if (lastLevel !== this.levelHandler.current.level) {
            this.setViewToOldView(lastCenter, extrema);
        }
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            level: this.levelHandler.current.level
        });

    }

    /**
     * initializes the canvas, adds to DOM
     * @return {TileMap} instance of TileMap for chaining
     */
    initializeCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("mjs-canvas");
        this.container.appendChild(this.canvas);
        this.canvasContext = this.canvas.getContext("2d");
        return this;
    }

    /**
     * complete clear and draw of all visible tiles
     * @return {TileMap} instance of TileMap for chaining
     */
    redraw() {
        this.drawIsNeeded = true;
        return this;
    }

    /**
     * Handles resizing of TileMap
     * @return {TileMap} instance of TileMap for chaining
     */
    resize() {
        return this.resizeCanvas()
                   .resizeView()
                   .redraw();
    }

    /**
     * move view by delta
     * @param  {Point} delta - delta of x/y
     * @return {MappedJS} instance of MappedJS for chaining
     */
    moveView(delta) {
        this.view.moveView(delta);
        this.redraw();
        return this;
    }

    /**
     * handles zoom by factor and position
     * @param  {number} factor - difference in zoom scale
     * @param  {Point} position - position to zoom to
     * @return {MappedJS} instance of MappedJS for chaining
     */
    zoom(factor, position) {
        if (factor !== 0) {
            this.view.zoom(factor, position);
            this.clusterHandler();
            this.redraw();
        }
        return this;
    }

    clusterHandler() {
        if (this.clusterHandlingTimeout) {
            this.clusterHandlingTimeout = clearTimeout(this.clusterHandlingTimeout);
        }
        this.clusterHandlingTimeout = setTimeout(() => {
            if (this.levelHandler.hasNext()) {
                this.eventManager.publish(Events.MarkerClusterer.CLUSTERIZE);
            } else {
                this.eventManager.publish(Events.MarkerClusterer.UNCLUSTERIZE);
            }
        }, 150);
    }

    /**
     * resizes the canvas sizes
     * @return {TileMap} instance of TileMap for chaining
     */
    resizeCanvas() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        return this;
    }

    /**
     * Handles resizing of view
     * @return {TileMap} instance of TileMap for chaining
     */
    resizeView() {
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            viewport: this.viewport
        });
        return this;
    }

    /**
     * main draw call
     */
    mainLoop() {
        const currentMillisecs = Date.now();
        const deltaMillisecs = currentMillisecs - this.lastFrameMillisecs;
        this.lastFrameMillisecs = currentMillisecs;
        this.deltaTiming = Helper.clamp(deltaMillisecs / this.bestDeltaTiming, 1, 4);

        if (this.velocity.length >= 0.2) this.moveView(this.velocity.multiply(0.9).clone.multiply(this.deltaTiming));

        if (this.drawIsNeeded) {
            this.canvasContext.clearRect(0, 0, this.width, this.height);
            this.view.checkBoundaries();
            this.view.draw();
            this.drawLabels();
            this.repositionMarkerContainer();
            this.drawIsNeeded = false;
        }

        window.requestAnimFrame(() => this.mainLoop());
    }

    drawLabels() {
        Helper.forEach(this.labels, (label) => label.draw());
        return this;
    }
}

/**
 * request animation frame browser polyfill
 * @return {Function} supported requestAnimationFrame-function
 */
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function( callback ){
             window.setTimeout(callback, 1000 / 60);
         };
})();
