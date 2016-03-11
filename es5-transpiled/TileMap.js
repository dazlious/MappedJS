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
        _createClass(TileMap, [{
            key: 'left',


            /**
             * Returns left offset of container
             * @return {number} - left offset of container
             */
            get: function get() {
                return this.$container.offset().left;
            }

            /**
             * Returns top offset of container
             * @return {number} - top offset of container
             */

        }, {
            key: 'top',
            get: function get() {
                return this.$container.offset().top;
            }

            /**
             * Returns width of container
             * @return {number} - width of container
             */

        }, {
            key: 'width',
            get: function get() {
                return this.$container.innerWidth();
            }

            /**
             * Returns height of container
             * @return {number} - height of container
             */

        }, {
            key: 'height',
            get: function get() {
                return this.$container.innerHeight();
            }

            /**
             * get all visible tiles
             * @return {array} all tiles that are currently visible
             */

        }, {
            key: 'visibleTiles',
            get: function get() {
                return this.tiles.filter(function(v, i, a) {
                    return this.view.intersects(v.getDistortedRect(this.distortion));
                }, this);
            }

            /**
             * Returns current distortion
             * @return {number} returns current distortion of latitude
             */

        }, {
            key: 'distortion',
            get: function get() {
                return Math.cos(this.settings.center.lat);
            }

            /** Constructor
             * @param  {Object} container - jQuery-object holding the container
             * @param  {Object} tilesData={} - json object representing data of TileMap
             * @param  {Object} settings={} - json object representing settings of TileMap
             * @return {TileMap} instance of TileMap
             */

        }]);

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

            this.tiles = [];
            this.initialize().initializeTiles().draw();

            return this;
        }

        /**
         * initializes the TileMap
         * @return {TileMap} instance of TileMap
         */


        _createClass(TileMap, [{
            key: 'initialize',
            value: function initialize() {
                this.view = new _Rectangle.Rectangle({
                    x: this.$container.offset().left,
                    y: this.$container.offset().top,
                    width: this.$container.width(),
                    height: this.$container.height() //,
                        //bounds: new Rectangle(this.settings.bounds.top, this.settings.bounds.left, this.settings.bounds.width, this.settings.bounds.height)
                });
                this.bindEvents().initializeCanvas();

                return this;
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

        }, {
            key: 'resize',
            value: function resize() {
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

        }, {
            key: 'resizeView',
            value: function resizeView() {
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

        }, {
            key: 'draw',
            value: function draw() {
                console.log(this.tiles.length, this.visibleTiles.length);
                for (var tile in this.visibleTiles) {
                    var currentTile = this.visibleTiles[tile];
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
