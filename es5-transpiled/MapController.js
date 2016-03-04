"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var $ = require('jquery'),
    Tile = require("./Tile.js").Tile,
    Rectangle = require("./Rectangle.js").Rectangle,
    Publisher = require("./Publisher.js").Publisher;

/**
 * Singleton instance of Publisher
 */
var PUBLISHER = new Publisher();

var MapController = exports.MapController = function() {

    /** Constructor
     * @param  {Object} container - jQuery-object holding the container
     * @param  {Object} tilesData={} - json object representing data of map
     * @param  {Object} settings={} - json object representing settings of map
     * @return {MapController} instance of MapController
     */

    function MapController(_ref) {
        var container = _ref.container;
        var _ref$tilesData = _ref.tilesData;
        var tilesData = _ref$tilesData === undefined ? {} : _ref$tilesData;
        var _ref$settings = _ref.settings;
        var settings = _ref$settings === undefined ? {} : _ref$settings;

        _classCallCheck(this, MapController);

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


    _createClass(MapController, [{
        key: "initialize",
        value: function initialize() {
            this.center = this.initialCenter;
            this.distortion = this.calculateDistortion(this.settings.center.lat);
            this.bounds = new Rectangle(this.settings.bounds.top, this.settings.bounds.left, this.settings.bounds.width, this.settings.bounds.height);

            this.bindEvents().initializeCanvas();

            return this;
        }
    }, {
        key: "calculateDistortion",
        value: function calculateDistortion(latitude) {
            return Math.cos(latitude);
        }

        /**
         * initializes the canvas, adds to DOM
         * @return {MapController} instance of MapController
         */

    }, {
        key: "initializeCanvas",
        value: function initializeCanvas() {
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

    }, {
        key: "bindEvents",
        value: function bindEvents() {
            PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));
            return this;
        }

        /**
         * initializes tiles
         * @return {MapController} instance of MapController
         */

    }, {
        key: "initializeTiles",
        value: function initializeTiles() {
            this.tiles = [];
            for (var tile in this.data.images) {
                var currentTileData = this.data.images[tile];
                var _tile = new Tile(currentTileData);
                this.tiles.push(_tile);
            }
            return this;
        }

        /**
         * handles on load of a tile
         * @param  {Tile} tile a tile of the map
         * @return {MapController} instance of MapController
         */

    }, {
        key: "onTilesLoaded",
        value: function onTilesLoaded(tile) {
            this.drawTile(tile);
            tile.state.next();
            return this;
        }

        /**
         * draws tiles on canvas
         * @param  {Tile} tile a tile of the map
         * @return {MapController} instance of MapController
         */

    }, {
        key: "drawTile",
        value: function drawTile(tile) {
            this.canvasContext.drawImage(tile.img, tile.x * this.distortion, tile.y, tile.width * this.distortion, tile.height);
            return this;
        }

        /**
         * Handles resizing of map
         * @return {MapController} instance of MapController
         */

    }, {
        key: "resize",
        value: function resize() {
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

    }, {
        key: "draw",
        value: function draw() {
            for (var tile in this.tiles) {
                var currentTile = this.tiles[tile];
                this.drawTile(currentTile);
            }
            return this;
        }
    }]);

    return MapController;
}();
