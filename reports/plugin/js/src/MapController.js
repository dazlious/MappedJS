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

var $ = require('jquery');
var Tile = require("./Tile.js").Tile;
var Publisher = require("./Publisher.js").Publisher;

var PUBLISHER = new Publisher();

var MapController = exports.MapController = function() {

    /**
     * Constructor
     * @param  {Object} container - jQuery-object holding the container
     */

    function MapController(_ref) {
        var container = _ref.container;
        var _ref$tilesData = _ref.tilesData;
        var tilesData = _ref$tilesData === undefined ? {} : _ref$tilesData;

        _classCallCheck(this, MapController);

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


    _createClass(MapController, [{
        key: "initialize",
        value: function initialize() {

            PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));

            this.$canvas = $("<canvas class='mjs-canvas' />");
            this.canvas = this.$canvas[0];
            this.$container.append(this.$canvas);
            this.canvasContext = this.canvas.getContext("2d");
            this.resize();
        }
    }, {
        key: "initializeTiles",
        value: function initializeTiles() {
            this.tiles = [];
            for (var tile in this.data.images) {
                var currentTileData = this.data.images[tile];
                var _tile = new Tile(currentTileData);
                this.tiles.push(_tile);
            }
        }
    }, {
        key: "onTilesLoaded",
        value: function onTilesLoaded(tile) {
            this.canvasContext.drawImage(tile.img, tile.x, tile.y, tile.width, tile.height);
            tile.state.next();
        }

        /**
         * Handles resizing of map
         */

    }, {
        key: "resize",
        value: function resize() {
            this.canvasWidth = this.$container.innerWidth();
            this.canvasHeight = this.$container.innerHeight();

            this.canvasContext.canvas.width = this.canvasWidth;
            this.canvasContext.canvas.height = this.canvasHeight;

            this.draw();
        }

        /**
         * Handles the redraw of the map
         */

    }, {
        key: "draw",
        value: function draw() {}
    }]);

    return MapController;
}();
