import $ from 'jquery';
import {LatLng} from './LatLng.js';
import {Point} from './Point.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Marker} from './Marker.js';
import {View} from './View.js';

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

    /** Constructor
     * @param  {Object} container - jQuery-object holding the container
     * @param  {Object} tilesData={} - json object representing data of TileMap
     * @param  {Object} settings={} - json object representing settings of TileMap
     * @return {TileMap} instance of TileMap
     */
    constructor({container, tilesData = {}, settings = {}}) {
        if (!container) {
            throw Error("You must define a container to initialize a TileMap");
        }

        this.$container = container;
        this.imgData = tilesData[TileMap.IMG_DATA_NAME];
        this.markerData = tilesData[TileMap.MARKER_DATA_NAME];
        this.settings = settings;

        this.initialize(settings.bounds, settings.center, this.getCurrentLevelData().dimensions);

        return this;
    }

    /**
     * initializes the TileMap
     * @return {TileMap} instance of TileMap
     */
    initialize(bounds, center, mapDimensions) {
        this.initializeCanvas();
        this.view = new View({
            viewport: new Rectangle(this.left, this.top, this.width, this.height),
            mapView: new Rectangle(0, 0, mapDimensions.width, mapDimensions.height),
            bounds: new Bounds(new LatLng(bounds.northWest[0], bounds.northWest[1]), new LatLng(bounds.southEast[0], bounds.southEast[1])),
            center: new LatLng(center.lat, center.lng),
            data: this.getCurrentLevelData(),
            markerData: this.markerData,
            $container: this.$container,
            context: this.canvasContext
        });
        this.resizeCanvas();
        return this;
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
     * gets data of current zoom level
     * @return {Object} data for current level as json
     */
    getCurrentLevelData() {
        return this.imgData["level-" + this.settings.level];
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
        this.view.draw();
        return this;
    }

    /**
     * Handles resizing of TileMap
     * @return {TileMap} instance of TileMap for chaining
     */
    resize() {
        this.resizeCanvas();
        this.resizeView();
        this.view.draw();
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
