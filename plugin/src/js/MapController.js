var $ = require('jquery');
var Tile = require("./Tile.js").Tile;
var Publisher = require("./Publisher.js").Publisher;

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

export class MapController {

    /** Constructor
     * @param  {Object} container - jQuery-object holding the container
     * @param  {Object} tilesData={} - json object representing data of map
     * @return {MapController} instance of MapController
     */
    constructor({container, tilesData={}}) {
        if (!container) {
            throw Error("You must define a container to initialize a map");
        }

        this.$container = container;
        this.data = tilesData;

        this.initialize();
        this.initializeTiles();

        return this;
    }

    /**
     * initializes the MapController
     * @return {MapController} instance of MapController
     */
    initialize() {
        PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));
        this.$canvas = $("<canvas class='mjs-canvas' />");
        this.canvas = this.$canvas[0];
        this.$container.append(this.$canvas);
        this.canvasContext = this.canvas.getContext("2d");
        this.resize();
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
        this.canvasContext.drawImage(tile.img, tile.x, tile.y, tile.width, tile.height);
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
