var $ = require('jquery');
var Tile = require("./Tile.js").Tile;
var Publisher = require("./Publisher.js").Publisher;

const PUBLISHER = new Publisher();

export class MapController {

    /**
     * Constructor
     * @param  {Object} container - jQuery-object holding the container
     */
    constructor({container, tilesData={}}) {
        if (!container) {
            throw Error("You must define a container to initialize a map");
        }

        this.$container = container;
        this.data = tilesData;

        this.initialize();
        this.initializeTiles();
    }

    /**
     * initializes the MapController
     */
    initialize() {

        PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));

        this.$canvas = $("<canvas class='mjs-canvas' />");
        this.canvas = this.$canvas[0];
        this.$container.append(this.$canvas);
        this.canvasContext = this.canvas.getContext("2d");
        this.resize();
    }

    initializeTiles() {
        this.tiles = [];
        for (let tile in this.data.images) {
            let currentTileData = this.data.images[tile];
            let _tile = new Tile(currentTileData);
            this.tiles.push(_tile);
        }
    }

    onTilesLoaded(tile) {
        this.canvasContext.drawImage(tile.img, tile.x, tile.y, tile.width, tile.height);
    }

    /**
     * Handles resizing of map
     */
    resize() {
        this.canvasWidth = this.$container.innerWidth();
        this.canvasHeight = this.$container.innerHeight();

        this.canvasContext.canvas.width = this.canvasWidth;
        this.canvasContext.canvas.height = this.canvasHeight;

        this.draw();
    }

    /**
     * Handles the redraw of the map
     */
    draw() {

    }
}
