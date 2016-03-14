import {Tile} from './Tile.js';
import $ from 'jquery';
import {Rectangle} from './Rectangle.js';
import {Publisher} from './Publisher.js';

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

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
     * get all visible tiles
     * @return {array} all tiles that are currently visible
     */
    get visibleTiles() {
        return this.tiles.filter(function(v, i, a) {
            return this.view.intersects(v.getDistortedRect(this.distortion));
        }, this);
    }

    /**
     * Returns current distortion
     * @return {number} returns current distortion of latitude
     */
    get distortion() {
        return (Math.cos(this.settings.center.lat));
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
        this.settings = settings;

        this.tiles = [];
        this.initialize().initializeTiles().draw();

        return this;
    }

    /**
     * initializes the TileMap
     * @return {TileMap} instance of TileMap
     */
    initialize() {
        this.view = new Rectangle({
            x: this.$container.offset().left,
            y: this.$container.offset().top,
            width: this.$container.width(),
            height: this.$container.height()//,
            //bounds: new Rectangle(this.settings.bounds.top, this.settings.bounds.left, this.settings.bounds.width, this.settings.bounds.height)
        });
        this.bindEvents().initializeCanvas();

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
        if (tile.state.current.value >= 2) {
            this.canvasContext.drawImage(tile.img, tile.x * this.distortion, tile.y, tile.width * this.distortion, tile.height);
        } else if (tile.state.current.value === 0) {
            tile.initialize();
        }
        return this;
    }

    /**
     * Handles resizing of TileMap
     * @return {TileMap} instance of TileMap
     */
    resize() {
        this.canvasContext.canvas.width = this.width;
        this.canvasContext.canvas.height = this.height;
        this.draw();
        this.resizeView();
        return this;
    }

    /**
     * Handles resizing of view
     * @return {TileMap} instance of TileMap
     */
    resizeView() {
        this.view.x = this.left;
        this.view.y = this.top;
        this.view.width = this.width;
        this.view.height = this.height;
        return this;
    }

    /**
     * Handles draw of TileMap
     * @return {TileMap} instance of TileMap
     */
    draw() {
        for (var tile in this.visibleTiles) {
            var currentTile = this.visibleTiles[tile];
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