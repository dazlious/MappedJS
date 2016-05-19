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

        this.levels = [];
        this.clusterHandlingTimeout = null;

        Helper.forEach(this.imgData, (element, i) => {
            const currentLevel = {
                value: element,
                description: i
            };
            this.levels.push(currentLevel);
        });

        this.levelHandler = new StateHandler(this.levels);
        this.levelHandler.changeTo(this.settings.level);
        this.eventManager = new Publisher();

        this.initial = {
            bounds: settings.bounds,
            center: settings.center,
            level: settings.level,
            zoom: settings.zoom
        };

        return this.appendMarkerContainerToDom().initialize(settings.bounds, settings.center, this.currentLevelData);
    }

    /**
     * initializes the TileMap
     * @param {Bounds} bounds - specified boundaries
     * @param {LatLng} center - specified center
     * @param {object} data - specified data
     * @return {TileMap} instance of TileMap for chaining
     */
    initialize(bounds, center, data) {
        this.initializeCanvas()
            .bindEvents();
        this.view = this.createViewFromData(bounds, center, data, this.settings.zoom);
        this.initializeMarkers(this.markerData);
        return this.resizeCanvas();
    }

    /**
     * resets view to initial state
     */
    reset() {
        if (this.levelHandler.hasPrevious()) {
            this.levelHandler.changeTo(0);
            this.view = this.createViewFromData(this.initial.bounds, this.initial.center, this.currentLevelData, this.initial.zoom);
        } else this.view.reset();
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
            $markerContainer: this.$markerContainer,
            context: this.canvasContext,
            limitToBounds: this.settings.limitToBounds
        });
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
    initializeMarkers(markerData) {
        if (markerData) {
            let markers = [];
            markerData = this.enrichMarkerData(markerData);
            Helper.forEach(markerData, (currentData) => {
                markers.push(new Marker(currentData, this.view));
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
            templates: {
                image: "../../hbs/image.hbs"
            }
        });
        return this;
    }

    /**
     * bind all events
     * @return {TileMap} instance of TileMap for chaining
     */
    bindEvents() {

        this.eventManager.subscribe(Events.TileMap.RESIZE, () => { this.resize(); });

        this.eventManager.subscribe(Events.TileMap.ZOOM_TO_BOUNDS, (bounds) => {
            const zoomIncrease = Math.min(this.view.viewport.width / bounds.width, this.view.viewport.height / bounds.height);
            this.zoom(zoomIncrease, bounds.center);
        });

        this.eventManager.subscribe(Events.TileMap.NEXT_LEVEL, (argument_array) => {
            const center = argument_array[0],
                  bounds = argument_array[1],
                  lastLevel = this.levelHandler.current.description;

            this.levelHandler.next();

            if (lastLevel !== this.levelHandler.current.description) {
                this.view = this.createViewFromData(bounds, center.multiply(-1), this.currentLevelData, this.currentLevelData.zoom.min + 0.0000001);
            }
        });

        this.eventManager.subscribe(Events.TileMap.PREVIOUS_LEVEL, (argument_array) => {
            const center = argument_array[0],
                  bounds = argument_array[1],
                  lastLevel = this.levelHandler.current.description;

            this.levelHandler.previous();

            if (lastLevel !== this.levelHandler.current.description) {
                this.view = this.createViewFromData(bounds, center.multiply(-1), this.currentLevelData, this.currentLevelData.zoom.max - 0.0000001);
            }
        });

        return this;
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
        this.view.drawIsNeeded = true;
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
        this.view.drawIsNeeded = true;
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
            this.view.drawIsNeeded = true;
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
        }, 300);
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

}
