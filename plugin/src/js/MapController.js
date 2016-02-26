var $ = require('jquery');
var Tile = require("./Tile.js").Tile;

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
        this.$canvas = $("<canvas class='mjs-canvas' />");
        this.canvas = this.$canvas[0];

        this.$container.append(this.$canvas);

        this.canvasContext = this.canvas.getContext("2d");
        this.resize();
    }

    initializeTiles() {
        for (let zoomLevel in this.data.images) {
            let tilesInZoomLevel = this.data.images[zoomLevel];
            for (let tile in tilesInZoomLevel) {
                let currentTilePath = tilesInZoomLevel[tile];

                let _tile = new Tile({
                    path: currentTilePath
                });

            }
        }
    }

    /**
     * Handles resizing of map
     */
    resize() {
        this.canvasWidth = this.$container.innerWidth();
        this.canvasHeight = this.$container.innerHeight();

        this.canvasContext.canvas.width = this.canvasWidth;
        this.canvasContext.canvas.height = this.canvasHeight;

        this.redraw();
    }

    /**
     * Handles the redraw of the map
     */
    redraw() {

    }
}
