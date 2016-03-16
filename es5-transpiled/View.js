(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './LatLng.js', './Bounds.js', './Rectangle.js', './Tile.js', './Publisher.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./LatLng.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./Tile.js'), require('./Publisher.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.LatLng, global.Bounds, global.Rectangle, global.Tile, global.Publisher);
        global.View = mod.exports;
    }
})(this, function(exports, _LatLng, _Bounds, _Rectangle, _Tile, _Publisher) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.View = undefined;

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

    var View = exports.View = function() {
        _createClass(View, [{
            key: 'distortion',


            /**
             * Returns current distortion
             * @return {number} returns current distortion of latitude
             */
            get: function get() {
                return Math.cos(this.center.lat);
            }

            /**
             * Returns the offset of the center
             */

        }, {
            key: 'offset',
            get: function get() {
                var center = this.center.toPoint(this.bounds, this.mapView);
                return this.viewport.center.substract(center);
            }

            /**
             * Returns the offset of the map
             * @param {number} distortion - the current latitude distortion
             * @return {number} calculated offset
             */

        }, {
            key: 'mapOffset',
            get: function get() {
                return this.offset.x + (this.mapView.width - this.mapView.width * this.distortion) / 2;
            }

            /**
             * get all visible tiles
             * @return {array} all tiles that are currently visible
             */

        }, {
            key: 'visibleTiles',
            get: function get() {
                return this.tiles.filter(function(t, i, a) {
                    var newTile = t.getDistortedRect(this.distortion).translate(this.mapOffset, this.offset.y);
                    return this.viewport.intersects(newTile);
                }, this);
            }

            /**
             * Constructor
             * @param  {Object} settings - the settings Object
             * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
             * @param  {Rectangle} mapView = new Rectangle() - current representation of map
             * @param  {Bounds} bounds = new Bounds() - current bounds of map
             * @param  {LatLng} center = new LatLng() - current center of map
             * @param  {Object} data = {} - data of current map
             * @return {View} Instance of View
             */

        }]);

        function View(_ref) {
            var _ref$viewport = _ref.viewport;
            var viewport = _ref$viewport === undefined ? new _Rectangle.Rectangle() : _ref$viewport;
            var _ref$mapView = _ref.mapView;
            var mapView = _ref$mapView === undefined ? new _Rectangle.Rectangle() : _ref$mapView;
            var _ref$bounds = _ref.bounds;
            var bounds = _ref$bounds === undefined ? new _Bounds.Bounds() : _ref$bounds;
            var _ref$center = _ref.center;
            var center = _ref$center === undefined ? new _LatLng.LatLng() : _ref$center;
            var _ref$data = _ref.data;
            var data = _ref$data === undefined ? {} : _ref$data;
            var drawCb = _ref.drawCb;

            _classCallCheck(this, View);

            this.mapView = mapView;
            this.viewport = viewport;
            this.bounds = bounds;
            this.center = center;
            this.tiles = [];
            this.data = data;
            this.draw = drawCb;
            this.bindEvents().initializeTiles();

            return this;
        }

        /**
         * handles on load of a tile
         * @param  {Tile} tile a tile of the TileMap
         * @return {TileMap} instance of TileMap
         */


        _createClass(View, [{
            key: 'onTilesLoaded',
            value: function onTilesLoaded(tile) {
                this.drawTile(tile);
                tile.state.next();
                return this;
            }

            /**
             * Handles draw of TileMap
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'drawVisibleTiles',
            value: function drawVisibleTiles() {
                for (var tile in this.visibleTiles) {
                    this.drawTile(this.visibleTiles[tile]);
                }
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
                    if (this.draw && typeof this.draw === "function") {
                        this.draw(tile.img, tile.x * this.distortion + this.mapOffset, tile.y + this.offset.y, tile.width * this.distortion, tile.height);
                    } else {
                        console.error("Draw method is not defined or not a function");
                    }
                } else if (tile.state.current.value === 0) {
                    tile.initialize();
                }
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
                var currentLevel = this.data.tiles;
                for (var tile in currentLevel) {
                    var currentTileData = currentLevel[tile];
                    var _tile = new _Tile.Tile(currentTileData);
                    this.tiles.push(_tile);
                }
                return this;
            }
        }]);

        return View;
    }();
});
