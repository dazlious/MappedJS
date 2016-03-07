(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Tile.js', 'jquery', './Rectangle.js', './Publisher.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Tile.js'), require('jquery'), require('./Rectangle.js'), require('./Publisher.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Tile, global.jquery, global.Rectangle, global.Publisher);
        global.TileMap = mod.exports;
    }
})(this, function(exports, _Tile, _jquery, _Rectangle, _Publisher) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TileMap = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

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

    /**
     * Singleton instance of Publisher
     */
    var PUBLISHER = new _Publisher.Publisher();

    var TileMap = exports.TileMap = function() {

        /** Constructor
         * @param  {Object} container - jQuery-object holding the container
         * @param  {Object} tilesData={} - json object representing data of TileMap
         * @param  {Object} settings={} - json object representing settings of TileMap
         * @return {TileMap} instance of TileMap
         */

        function TileMap(_ref) {
            var container = _ref.container;
            var _ref$tilesData = _ref.tilesData;
            var tilesData = _ref$tilesData === undefined ? {} : _ref$tilesData;
            var _ref$settings = _ref.settings;
            var settings = _ref$settings === undefined ? {} : _ref$settings;

            _classCallCheck(this, TileMap);

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


        _createClass(TileMap, [{
            key: 'initialize',
            value: function initialize() {
                this.center = this.initialCenter;
                this.distortion = this.calculateDistortion(this.settings.center.lat);
                this.bounds = new _Rectangle.Rectangle(this.settings.bounds.top, this.settings.bounds.left, this.settings.bounds.width, this.settings.bounds.height);

                this.bindEvents().initializeCanvas();

                return this;
            }

            /**
             * calculates current distortion of centered latitude
             * @param  {number} latitude - latitude where map is centered currently
             * @return {float} - size of distortion, map should be applied to
             */

        }, {
            key: 'calculateDistortion',
            value: function calculateDistortion(latitude) {
                return Math.cos(latitude);
            }

            /**
             * initializes the canvas, adds to DOM
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'initializeCanvas',
            value: function initializeCanvas() {
                this.$canvas = (0, _jquery2.default)("<canvas class='mjs-canvas' />");
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

        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));
                return this;
            }

            /**
             * initializes tiles
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'initializeTiles',
            value: function initializeTiles() {
                this.tiles = [];
                var currentLevel = this.getCurrentLevelData().tiles;
                for (var tile in currentLevel) {
                    var currentTileData = currentLevel[tile];
                    var _tile = new _Tile.Tile(currentTileData);
                    this.tiles.push(_tile);
                }
                return this;
            }

            /**
             * gets data of current zoom level
             * @return {Object} data for current level as json
             */

        }, {
            key: 'getCurrentLevelData',
            value: function getCurrentLevelData() {
                return this.imgData["level-" + this.settings.level];
            }

            /**
             * handles on load of a tile
             * @param  {Tile} tile a tile of the TileMap
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'onTilesLoaded',
            value: function onTilesLoaded(tile) {
                this.drawTile(tile);
                tile.state.next();
                return this;
            }

            /**
             * draws tiles on canvas
             * @param  {Tile} tile a tile of the TileMap
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'drawTile',
            value: function drawTile(tile) {
                this.canvasContext.drawImage(tile.img, tile.x * this.distortion, tile.y, tile.width * this.distortion, tile.height);
                return this;
            }

            /**
             * Handles resizing of TileMap
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'resize',
            value: function resize() {
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

        }, {
            key: 'draw',
            value: function draw() {
                for (var tile in this.tiles) {
                    var currentTile = this.tiles[tile];
                    this.drawTile(currentTile);
                }
                return this;
            }
        }]);

        return TileMap;
    }();

    /**
     * name of imagedata in data.json
     * @type {String}
     */
    TileMap.IMG_DATA_NAME = "img_data";
});
