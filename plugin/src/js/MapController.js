var $ = require('jquery'),
    Tile = require("./Tile.js").Tile,
    Rectangle = require("./Rectangle.js").Rectangle,
    Publisher = require("./Publisher.js").Publisher;

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

export class MapController {

    /** Constructor
     * @param  {Object} container - jQuery-object holding the container
     * @param  {Object} tilesData={} - json object representing data of map
     * @param  {Object} settings={} - json object representing settings of map
     * @return {MapController} instance of MapController
     */
    constructor({container, tilesData={}, settings={}}) {
        if (!container) {
            throw Error("You must define a container to initialize a map");
        }

        this.$container = container;
        this.data = tilesData;
        this.settings = settings;

        this.initialize().initializeTiles();

        return this;
    }

    /**
     * initializes the MapController
     * @return {MapController} instance of MapController
     */
    initialize() {
        this.center = this.initialCenter;
        this.distortion = this.calculateDistortion(this.settings.center.lat);
        this.bounds = new Rectangle(this.settings.bounds.top, this.settings.bounds.left, this.settings.bounds.width, this.settings.bounds.height);

        this.bindEvents().initializeCanvas();

        return this;
    }

    calculateDistortion(latitude) {
        return (Math.cos(latitude));
    }

    /**
     * initializes the canvas, adds to DOM
     * @return {MapController} instance of MapController
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
     * @return {MapController} instance of MapController
     */
    bindEvents() {
        PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));
        return this;
    }

    /**
     * initializes tiles
     * @return {MapController} instance of MapController
     */
    initializeTiles() {
        this.tiles = [];
        for (let tile in this.data.images) {
            let currentTileData = this.data.images[tile];
            let _tile = new Tile(currentTileData);
            this.tiles.push(_tile);
        }
        return this;
    }

    /**
     * handles on load of a tile
     * @param  {Tile} tile a tile of the map
     * @return {MapController} instance of MapController
     */
    onTilesLoaded(tile) {
        this.drawTile(tile);
        tile.state.next();
        return this;
    }

    /**
     * draws tiles on canvas
     * @param  {Tile} tile a tile of the map
     * @return {MapController} instance of MapController
     */
    drawTile(tile) {
        this.canvasContext.drawImage(tile.img, tile.x*this.distortion, tile.y, tile.width*this.distortion, tile.height);
        return this;
    }

    /**
     * Handles resizing of map
     * @return {MapController} instance of MapController
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
     * Handles draw of map
     * @return {MapController} instance of MapController
     */
    draw() {
        for(var tile in this.tiles) {
            var currentTile = this.tiles[tile];
            this.drawTile(currentTile);
        }
        return this;
    }
}
