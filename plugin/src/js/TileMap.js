import $ from 'jQuery';
import {View} from './View.js';
import {LatLng} from './LatLng.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Publisher} from './Publisher.js';
import {StateHandler} from './StateHandler.js';
import {Helper} from './Helper.js';
import {Marker} from './Marker.js';
import {DataEnrichment} from './DataEnrichment.js';

export class TileMap {

    /**
     * Returns left offset of container
     * @return {number} - left offset of container
     */
    get left() {
        return this.$container.offset().left;
    }

    /**
     * Returns top offset of container
     * @return {number} - top offset of container
     */
    get top() {
        return this.$container.offset().top;
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


    /** Constructor
     * @param  {Object} container - jQuery-object holding the container
     * @param  {Object} tilesData={} - json object representing data of TileMap
     * @param  {Object} settings={} - json object representing settings of TileMap
     * @param  {Boolean} debug=false - Option for enabling debug-mode
     * @return {TileMap} instance of TileMap
     */
    constructor({container, tilesData = {}, settings = {}, debug = false}) {
        if (!container) {
            throw Error("You must define a container to initialize a TileMap");
        }

        this.$container = container;
        this.imgData = tilesData[TileMap.IMG_DATA_NAME];
        this.markerData = tilesData[TileMap.MARKER_DATA_NAME];
        this.settings = settings;
        this.levels = [];

        this.markers = [];

        Helper.forEach(this.imgData, function(element, i) {
            const currentLevel = {
                value: element,
                description: i
            };
            this.levels.push(currentLevel);
        }.bind(this));

        this.levelHandler = new StateHandler(this.levels);
        this.levelHandler.changeTo(this.settings.level);
        this.eventManager = new Publisher();
        this.debug = debug;
        this.initial = {
            bounds: settings.bounds,
            center: settings.center,
            level: settings.level,
            zoom: settings.zoom
        };

        this.appendMarkerContainerToDom(container);

        this.initialize(settings.bounds, settings.center, this.currentLevelData);

        return this;
    }

    /**
     * initializes the TileMap
     * @return {TileMap} instance of TileMap
     */
    initialize(bounds, center, data) {
        this.initializeCanvas();
        this.bindEvents();
        this.createViewFromData(bounds, center, data, this.settings.zoom);
        this.initializeMarkers(this.markerData);
        this.resizeCanvas();
        return this;
    }

    reset() {
        if (this.levelHandler.hasPrevious()) {
            this.levelHandler.changeTo(0);
            this.createViewFromData(this.initial.bounds, this.initial.center, this.currentLevelData, this.initial.zoom);
        } else {
            this.view.reset();
        }
    }

    createViewFromData(bounds, center, data, zoom) {
        this.view = new View({
            viewport: new Rectangle(this.left, this.top, this.width, this.height),
            mapView: new Rectangle(0, 0, data.dimensions.width, data.dimensions.height),
            bounds: bounds,
            center: center,
            initialCenter: this.initial.center,
            data: data,
            maxZoom: (data.zoom) ? data.zoom.max : 1,
            currentZoom: zoom,
            minZoom: (data.zoom) ? data.zoom.min : 1,
            markerData: this.markerData,
            $container: this.$container,
            $markerContainer: this.$markerContainer,
            context: this.canvasContext,
            debug: this.debug,
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
     * @return {View} instance of View for chaining
     */
    initializeMarkers(markerData) {
        if (markerData) {
            markerData = this.enrichMarkerData(markerData);
            Helper.forEach(markerData, function(currentData) {
                const m = new Marker(currentData, this.view);
                this.markers.push(m);
            }.bind(this));
        }
        return this;
    }

    /**
     * append marker container to DOM
     * @param  {Object} $container - jQuery-selector
     * @return {View} instance of View for chaining
     */
    appendMarkerContainerToDom($container) {
        this.$markerContainer = $("<div class='marker-container' />");
        $container.append(this.$markerContainer);
        return this;
    }

    bindEvents() {

        this.eventManager.subscribe("next-level", function(argument_array) {
            const center = argument_array[0],
                  bounds = argument_array[1];
            const lastLevel = this.levelHandler.current.description;
            this.levelHandler.next();
            if (lastLevel !== this.levelHandler.current.description) {
                this.createViewFromData(bounds, center.multiply(-1), this.currentLevelData, this.currentLevelData.zoom.min + 0.0000001);
            }
        }.bind(this));

        this.eventManager.subscribe("previous-level", function(argument_array) {
            const center = argument_array[0],
                  bounds = argument_array[1];
            const lastLevel = this.levelHandler.current.description;
            this.levelHandler.previous();
            if (lastLevel !== this.levelHandler.current.description) {
                this.createViewFromData(bounds, center.multiply(-1), this.currentLevelData, this.currentLevelData.zoom.max - 0.0000001);
            }
        }.bind(this));

    }

    /**
     * initializes the canvas, adds to DOM
     * @return {TileMap} instance of TileMap
     */
    initializeCanvas() {
        this.$canvas = $("<canvas class='mjs-canvas' />");
        this.canvas = this.$canvas[0];
        this.$container.append(this.$canvas);
        this.canvasContext = this.canvas.getContext("2d");
        return this;
    }

    /**
     * clears canvas
     * @return {TileMap} instance of TileMap for chaining
     */
    clearCanvas() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    /**
     * complete clear and draw of all visible tiles
     * @return {TileMap} instance of TileMap for chaining
     */
    redraw() {
        this.clearCanvas();
        this.view.drawIsNeeded = true;
        return this;
    }

    /**
     * Handles resizing of TileMap
     * @return {TileMap} instance of TileMap for chaining
     */
    resize() {
        this.resizeCanvas();
        this.resizeView();
        this.redraw();
        return this;
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
        const difference = this.view.viewport.center.substract(oldViewport.center);
        this.view.mapView.translate(difference.x, difference.y);
        return this;
    }

}

/**
 * name of image data in data.json
 * @type {String}
 */
TileMap.IMG_DATA_NAME = "img_data";

/**
 * name of marker data in data.json
 * @type {String}
 */
TileMap.MARKER_DATA_NAME = "marker";
