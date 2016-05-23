import $ from 'jQuery';
import {Helper} from './Helper.js';
import {Events} from './Events.js';
import {Publisher} from './Publisher.js';
import {StateHandler} from './StateHandler.js';
import {Rectangle} from './Rectangle.js';
import {View} from './View.js';
import {Marker} from './Marker.js';
import {DataEnrichment} from './DataEnrichment.js';
import {ToolTip} from './ToolTip.js';
import {MarkerClusterer} from './MarkerClusterer.js';

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
        return this.$container.position().left - this.$container.offset().left;
    }

    /**
     * Returns top offset of container
     * @return {number} - top offset of container
     */
    get top() {
        return this.$container.position().top - this.$container.offset().top;
    }

    /**
     * Returns width of container
     * @return {number} - width of container
     */
    get width() {
        return this.$container.innerWidth();
    }

    /**
     * Returns height of container
     * @return {number} - height of container
     */
    get height() {
        return this.$container.innerHeight();
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
    constructor({container = null, tilesData = {}, settings = {}}) {
        if (!container) throw Error("You must define a container to initialize a TileMap");
        this.$container = container;

        this.imgData = tilesData[Events.TileMap.IMG_DATA_NAME];
        this.markerData = tilesData[Events.TileMap.MARKER_DATA_NAME];
        this.settings = settings;

        this.stateHandler = new StateHandler([
            {value: 0, description: "start"},
            {value: 1, description: "view-initialized"},
            {value: 2, description: "marker-initialized"},
            {value: 3, description: "tooltip-initialized"}
        ]);

        this.templates = DataEnrichment.tooltip(this.settings.tooltip.templates);

        this.levels = [];
        this.clusterHandlingTimeout = null;

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
                description: i,
                instance: this.createViewFromData(settings.bounds, settings.center, element, settings.zoom)
            };
            this.levels.push(currentLevel);
        });

        this.levelHandler = new StateHandler(this.levels);
        this.levelHandler.changeTo(this.settings.level);
        this.view.init();

        this.eventManager = new Publisher();

        this.drawIsNeeded = false;

        this.appendMarkerContainerToDom();

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
        if (this.levelHandler.current.description !== this.settings.level) {
            this.levelHandler.changeTo(this.settings.level);

        }
        this.view.reset();
        this.redraw();
        this.clusterHandler();
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
            $container: this.$container,
            context: this.canvasContext,
            limitToBounds: this.settings.limitToBounds
        });
    }

    /**
     * reposition marker container
     * @return {View} instance of View for chaining
     */
    repositionMarkerContainer() {
        if (this.$markerContainer) {
            const newSize = this.view.currentView.getDistortedRect(this.view.distortionFactor);
            this.$markerContainer.css({
               "width": `${newSize.width}px`,
               "height": `${newSize.height}px`,
               "left": `${newSize.left + this.view.offsetToCenter}px`,
               "top": `${newSize.top}px`
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

    /**
     * initializes all markers
     * @param  {Object} markerData - data of all markers
     * @return {TileMap} instance of TileMap for chaining
     */
    initializeMarkers() {
        if (this.markerData) {
            let markers = [];
            this.markerData = this.enrichMarkerData(this.markerData);
            Helper.forEach(this.markerData, (currentData) => {
                markers.push(new Marker(currentData, this));
            });
            markers = markers.sort((a, b) => ((b.latlng.lat - a.latlng.lat !== 0) ? b.latlng.lat - a.latlng.lat : b.latlng.lng - a.latlng.lng));
            Helper.forEach(markers, (marker, i) => {
                marker.$icon.css("z-index", i);
            });

            if (markers.length !== 0) this.createTooltipContainer();

            this.markerClusterer = new MarkerClusterer({
                markers: markers,
                $container: this.$markerContainer
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
        this.$markerContainer = $("<div class='marker-container' />");
        this.$container.append(this.$markerContainer);
        return this;
    }

    /**
     * creates an instance of ToolTip
     * @return {TileMap} instance of TileMap for chaining
     */
    createTooltipContainer() {
        this.tooltip = new ToolTip({
            container: $(this.$container.parent()),
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

        this.eventManager.subscribe(Events.View.THUMB_LOADED, () => {
            this.redraw();
            if (this.stateHandler.current.value < 2) this.initializeMarkers();
        });

        this.eventManager.subscribe(Events.TileMap.ZOOM_TO_BOUNDS, (bounds) => {
            const zoomIncrease = Math.min(this.view.viewport.width / bounds.width, this.view.viewport.height / bounds.height);
            this.zoom(zoomIncrease, bounds.center);
        });

        this.eventManager.subscribe(Events.TileMap.NEXT_LEVEL, () => {
            const lastLevel = this.levelHandler.current.description,
                  lastCenter = this.view.currentView.center;

            this.changelevel(1);

            if (lastLevel !== this.levelHandler.current.description) {
                this.setViewToOldView(lastCenter, 0.000000000000001, this.view.minZoom);
            }
        });

        this.eventManager.subscribe(Events.TileMap.PREVIOUS_LEVEL, () => {
            const lastLevel = this.levelHandler.current.description,
                  lastCenter = this.view.currentView.center;

            this.changelevel(-1);

            if (lastLevel !== this.levelHandler.current.description) {
                this.setViewToOldView(lastCenter, -0.000000000000001, this.view.maxZoom);
            }
        });

        return this;
    }

    setViewToOldView(center, zoomDiff, zoom) {
        this.view.zoomFactor = zoom;
        this.view.zoom(zoomDiff, this.view.viewport.center);
        this.view.currentView.setCenter(center);
        this.drawIsNeeded = true;
    }

    changelevel(direction) {
        if (direction < 0) {
            this.levelHandler.previous();
        } else {
            this.levelHandler.next();
        }
        if (!this.view.isInitialized) {
            this.view.init();
        }
    }

    /**
     * initializes the canvas, adds to DOM
     * @return {TileMap} instance of TileMap for chaining
     */
    initializeCanvas() {
        this.$canvas = $("<canvas class='mjs-canvas' />");
        this.canvas = this.$canvas[0];
        this.$container.append(this.$canvas);
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
     * move by delta momentum
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
        this.canvasContext.canvas.width = this.width;
        this.canvasContext.canvas.height = this.height;
        return this;
    }

    /**
     * Handles resizing of view
     * @return {TileMap} instance of TileMap for chaining
     */
    resizeView() {
        const oldViewport = this.view.viewport.clone;
        this.view.viewport.size(this.left, this.top, this.width, this.height);
        const delta = this.view.viewport.center.substract(oldViewport.center);
        this.view.currentView.translate(delta.x, delta.y);
        return this;
    }

    /**
     * main draw call
     */
    mainLoop() {
        if (this.drawIsNeeded) {
            this.canvasContext.clearRect(0, 0, this.width, this.height);
            this.view.checkBoundaries();
            this.view.draw();
            this.repositionMarkerContainer();
            this.drawIsNeeded = false;
        }
        window.requestAnimFrame(() => this.mainLoop());
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
