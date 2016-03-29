(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './LatLng.js', './Point.js', './Bounds.js', './Rectangle.js', './Tile.js', './Publisher.js', './Helper.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./LatLng.js'), require('./Point.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./Tile.js'), require('./Publisher.js'), require('./Helper.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.LatLng, global.Point, global.Bounds, global.Rectangle, global.Tile, global.Publisher, global.Helper);
        global.View = mod.exports;
    }
})(this, function(exports, _LatLng, _Point, _Bounds, _Rectangle, _Tile, _Publisher, _Helper) {
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
            key: 'equalizationFactor',


            /**
             * Returns current equalizationFactor
             * @return {number} returns current equalizationFactor of latitude
             */
            get: function get() {
                return Math.cos(_Helper.Helper.toRadians(this.center.lat));
            }

            /**
             * Returns the current equalized viewport
             */

        }, {
            key: 'viewportOffset',
            get: function get() {
                return (this.viewport.width - this.viewport.width * this.equalizationFactor) / 2;
            }

            /**
             * get all visible tiles
             * @return {array} all tiles that are currently visible
             */

        }, {
            key: 'visibleTiles',
            get: function get() {
                return this.tiles.filter(function(t, i, a) {
                    var newTile = t.getDistortedRect(this.equalizationFactor).translate(this.mapView.x * this.equalizationFactor + this.viewportOffset, this.mapView.y);
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
            var _ref$context = _ref.context;
            var context = _ref$context === undefined ? null : _ref$context;

            _classCallCheck(this, View);

            this.mapView = mapView;
            this.viewport = viewport;
            this.bounds = bounds;
            this.center = center;
            var newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
            this.mapView.position(newCenter.x, newCenter.y);
            this.tiles = [];
            this.data = data;
            this.context = context;
            this.bindEvents().initializeTiles().loadThumb();
            return this;
        }

        _createClass(View, [{
            key: 'loadThumb',
            value: function loadThumb() {
                _Helper.Helper.loadImage(this.data.thumb, function(img) {
                    this.thumbScale = img.width / this.mapView.width;
                    //img.width = this.mapView.width;
                    //img.height = this.mapView.height;
                    this.thumb = img;
                    this.drawVisibleTiles();
                }.bind(this));
                return this;
            }
        }, {
            key: 'convertPointToLatLng',
            value: function convertPointToLatLng(point) {
                var factorX = this.mapView.width / this.bounds.range.lng,
                    factorY = this.mapView.height / this.bounds.range.lat;
                return new _LatLng.LatLng(point.y / factorY, point.x / factorX).substract(this.bounds.nw);
            }
        }, {
            key: 'convertLatLngToPoint',
            value: function convertLatLngToPoint(latlng) {
                var relativePosition = this.bounds.nw.clone.substract(latlng),
                    factorX = this.mapView.width / this.bounds.width,
                    factorY = this.mapView.height / this.bounds.height;
                return new _Point.Point(Math.abs(relativePosition.lng * factorX), Math.abs(relativePosition.lat * factorY));
            }

            /**
             * handles on load of a tile
             * @param  {Tile} tile a tile of the TileMap
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'tileHandling',
            value: function tileHandling(tile) {
                this.drawTile(tile);
                return this;
            }
        }, {
            key: 'moveView',
            value: function moveView(pos) {
                var equalizedMap = this.mapView.getDistortedRect(this.equalizationFactor).translate(this.viewportOffset + pos.x, pos.y);
                if (!equalizedMap.containsRect(this.viewport)) {
                    if (equalizedMap.left - this.viewport.left > 0) {
                        pos.x -= equalizedMap.left - this.viewport.left;
                    }
                    if (equalizedMap.right - this.viewport.right < 0) {
                        pos.x -= equalizedMap.right - this.viewport.right;
                    }
                    if (equalizedMap.top - this.viewport.top > 0) {
                        pos.y -= equalizedMap.top - this.viewport.top;
                    }
                    if (equalizedMap.bottom - this.viewport.bottom < 0) {
                        pos.y -= equalizedMap.bottom - this.viewport.bottom;
                    }
                }
                this.mapView.translate(pos.x, pos.y);

                var newCenter = this.mapView.topLeft.substract(this.viewport.center).multiply(-1);
                this.center = this.convertPointToLatLng(newCenter).multiply(-1);

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
                var distortedTile = tile.clone.translate(this.mapView.x, this.mapView.y).scaleX(this.equalizationFactor).translate(this.viewportOffset, 0);
                if (tile.state.current.value >= 2) {
                    this.draw(tile.img, distortedTile.x, distortedTile.y, distortedTile.width, distortedTile.height);
                    tile.state.next();
                } else if (tile.state.current.value === 1) {
                    var thumbTile = tile.clone.scale(this.thumbScale);
                    this.drawPartial(this.thumb, thumbTile.x, thumbTile.y, thumbTile.width, thumbTile.height, distortedTile.x, distortedTile.y, distortedTile.width, distortedTile.height);
                    console.log("TADA");
                } else if (tile.state.current.value === 0) {
                    tile.initialize();
                }
                return this;
            }
        }, {
            key: 'draw',
            value: function draw(img, x, y, w, h) {
                this.context.drawImage(img, x, y, w, h);
            }
        }, {
            key: 'drawPartial',
            value: function drawPartial(img, ox, oy, ow, oh, x, y, w, h) {
                this.context.drawImage(img, ox, oy, ow, oh, x, y, w, h);
            }
        }, {
            key: 'drawThumb',
            value: function drawThumb(img, x, y, w, h) {
                this.context.drawImage(img, x, y, w, h);
            }

            /**
             * Handles all events for class
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                PUBLISHER.subscribe("tile-loaded", this.tileHandling.bind(this));
                PUBLISHER.subscribe("tile-initialized", this.tileHandling.bind(this));
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
