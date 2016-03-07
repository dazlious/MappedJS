import {Tile} from './Tile.js';
import $ from 'jquery';
import {Rectangle} from './Rectangle.js';
import {Publisher} from './Publisher.js';

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

export class TileMap {

    /** Constructor
     * @param  {Object} container - jQuery-object holding the container
     * @param  {Object} tilesData={} - json object representing data of TileMap
     * @param  {Object} settings={} - json object representing settings of TileMap
     * @return {TileMap} instance of TileMap
     */
    constructor({container, tilesData={}, settings={}}) {
        if (!container) {
            throw Error("You must define a container to initialize a TileMap");
        }

        this.$container = container;
        this.imgData = tilesData[TileMap.IMG_DATA_NAME];
        this.settings = settings;

        this.initialize().initializeTiles();

        return this;
    }

    /**
     * initializes the TileMap
     * @return {TileMap} instance of TileMap
     */
    initialize() {
        this.center = this.initialCenter;
        this.distortion = this.calculateDistortion(this.settings.center.lat);
        this.bounds = new Rectangle(this.settings.bounds.top, this.settings.bounds.left, this.settings.bounds.width, this.settings.bounds.height);

        this.bindEvents().initializeCanvas();

        return this;
    }

    /**
     * calculates current distortion of centered latitude
     * @param  {number} latitude - latitude where map is centered currently
     * @return {float} - size of distortion, map should be applied to
     */
    calculateDistortion(latitude) {
        return (Math.cos(latitude));
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
        this.resize();
        return this;
    }

    /**
     * Handles all events for class
     * @return {TileMap} instance of TileMap
     */
    bindEvents() {
        PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));
        return this;
    }

    /**
     * initializes tiles
     * @return {TileMap} instance of TileMap
     */
    initializeTiles() {
        this.tiles = [];
        let currentLevel = this.getCurrentLevelData().tiles;
        for (let tile in currentLevel) {
            let currentTileData = currentLevel[tile];
            let _tile = new Tile(currentTileData);
            this.tiles.push(_tile);
        }
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
     * handles on load of a tile
     * @param  {Tile} tile a tile of the TileMap
     * @return {TileMap} instance of TileMap
     */
    onTilesLoaded(tile) {
        this.drawTile(tile);
        tile.state.next();
        return this;
    }

    /**
     * draws tiles on canvas
     * @param  {Tile} tile a tile of the TileMap
     * @return {TileMap} instance of TileMap
     */
    drawTile(tile) {
        this.canvasContext.drawImage(tile.img, tile.x*this.distortion, tile.y, tile.width*this.distortion, tile.height);
        return this;
    }

    /**
     * Handles resizing of TileMap
     * @return {TileMap} instance of TileMap
     */
    resize() {
        this.canvasWidth = this.$container.innerWidth();
        this.canvasHeight = this.$container.innerHeight();

        this.canvasContext.canvas.width = this.canvasWidth;
        this.canvasContext.canvas.height = this.canvasHeight;

        this.draw();

        return this;
    }

    /**
     * Handles draw of TileMap
     * @return {TileMap} instance of TileMap
     */
    draw() {
        for(var tile in this.tiles) {
            var currentTile = this.tiles[tile];
            this.drawTile(currentTile);
        }
        return this;
    }
}

/**
 * name of imagedata in data.json
 * @type {String}
 */
TileMap.IMG_DATA_NAME = "img_data";
