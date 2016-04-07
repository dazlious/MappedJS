(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './LatLng.js', './Point.js', './Bounds.js', './Rectangle.js', './Tile.js', './Publisher.js', './Helper.js', './Marker.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./LatLng.js'), require('./Point.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./Tile.js'), require('./Publisher.js'), require('./Helper.js'), require('./Marker.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.LatLng, global.Point, global.Bounds, global.Rectangle, global.Tile, global.Publisher, global.Helper, global.Marker);
        global.View = mod.exports;
    }
})(this, function(exports, _LatLng, _Point, _Bounds, _Rectangle, _Tile, _Publisher, _Helper, _Marker) {
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
            var _ref$markerData = _ref.markerData;
            var markerData = _ref$markerData === undefined ? [] : _ref$markerData;
            var _ref$context = _ref.context;
            var context = _ref$context === undefined ? null : _ref$context;

            _classCallCheck(this, View);

            this.mapView = mapView;
            this.viewport = viewport;
            this.bounds = bounds;
            this.center = center;

            this.CONVERSION_RATIO = new _Point.Point(this.mapView.width / this.bounds.width, this.mapView.height / this.bounds.height);

            var newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
            this.mapView.position(newCenter.x, newCenter.y);

            this.tiles = [];
            this.markers = [];
            this.data = data;
            this.context = context;

            this.bindEvents().initializeTiles().loadThumb().initializeMarkers(markerData);

            return this;
        }

        /**
         * loads thumbnail of view
         * @return {View} instance of View for chaining
         */


        _createClass(View, [{
            key: 'loadThumb',
            value: function loadThumb() {
                _Helper.Helper.loadImage(this.data.thumb, function(img) {
                    this.thumbScale = img.width / this.mapView.width;
                    this.thumb = img;
                    this.draw();
                }.bind(this));
                return this;
            }

            /**
             * converts a Point to LatLng in view
             * @param  {Point} point - specified point to be converted
             * @return {LatLng} presentation of point in lat-lng system
             */

        }, {
            key: 'convertPointToLatLng',
            value: function convertPointToLatLng(point) {
                point.divide(this.CONVERSION_RATIO.x, this.CONVERSION_RATIO.y);
                return new _LatLng.LatLng(point.y, point.x).substract(this.bounds.nw);
            }

            /**
             * converts a LatLng to Point in view
             * @param  {LatLng} latlng - specified latlng to be converted
             * @return {Point} presentation of point in pixel system
             */

        }, {
            key: 'convertLatLngToPoint',
            value: function convertLatLngToPoint(latlng) {
                var relativePosition = this.bounds.nw.clone.substract(latlng);
                relativePosition.multiply(this.CONVERSION_RATIO.y, this.CONVERSION_RATIO.x);
                return new _Point.Point(relativePosition.lng, relativePosition.lat).abs;
            }
        }, {
            key: 'drawHandler',
            value: function drawHandler(o) {
                o.handleDraw(this.mapView.x, this.mapView.y, this.equalizationFactor, this.viewportOffset, this.thumb, this.thumbScale);
                this.drawMarkers();
                return this;
            }

            /**
             * moves the view's current position by pos
             * @param  {Point} pos - specified additional offset
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'moveView',
            value: function moveView(pos) {
                pos.divide(this.equalizationFactor, 1);
                var equalizedMap = this.mapView.getDistortedRect(this.equalizationFactor).translate(this.viewportOffset + pos.x, pos.y);
                if (!equalizedMap.containsRect(this.viewport)) {
                    if (equalizedMap.width >= this.viewport.width) {
                        if (equalizedMap.left - this.viewport.left > 0) {
                            pos.x -= equalizedMap.left - this.viewport.left;
                        }
                        if (equalizedMap.right - this.viewport.right < 0) {
                            pos.x -= equalizedMap.right - this.viewport.right;
                        }
                    } else {
                        this.mapView.setCenterX(this.viewport.center.x);
                        pos.x = 0;
                    }

                    if (equalizedMap.height >= this.viewport.height) {
                        if (equalizedMap.top - this.viewport.top > 0) {
                            pos.y -= equalizedMap.top - this.viewport.top;
                        }
                        if (equalizedMap.bottom - this.viewport.bottom < 0) {
                            pos.y -= equalizedMap.bottom - this.viewport.bottom;
                        }
                    } else {
                        this.mapView.setCenterY(this.viewport.center.y);
                        pos.y = 0;
                    }
                }

                this.mapView.translate(pos.x, pos.y);

                var newCenter = this.mapView.topLeft.substract(this.viewport.center).multiply(-1);
                this.center = this.convertPointToLatLng(newCenter).multiply(-1);

                return this;
            }

            /**
             * Handles all events for class
             * @return {View} instance of View
             */

        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                PUBLISHER.subscribe("tile-loaded", this.drawHandler.bind(this));
                PUBLISHER.subscribe("tile-initialized", this.drawHandler.bind(this));
                return this;
            }

            /**
             * Handles draw of visible elements
             * @return {View} instance of View
             */

        }, {
            key: 'draw',
            value: function draw() {
                var currentlyVisibleTiles = this.visibleTiles;
                for (var i in currentlyVisibleTiles) {
                    this.drawHandler(currentlyVisibleTiles[i]);
                }
                this.drawMarkers();
                return this;
            }
        }, {
            key: 'drawMarkers',
            value: function drawMarkers() {
                for (var i in this.markers) {
                    var m = this.markers[i];
                    m.draw(this.mapView.x, this.mapView.y, this.equalizationFactor, this.viewportOffset, this.context);
                }
                return this;
            }

            /**
             * initializes tiles
             * @return {View} instance of View
             */

        }, {
            key: 'initializeTiles',
            value: function initializeTiles() {
                var currentLevel = this.data.tiles;
                for (var tile in currentLevel) {
                    var currentTileData = currentLevel[tile];
                    currentTileData["context"] = this.context;
                    var currentTile = new _Tile.Tile(currentTileData);
                    this.tiles.push(currentTile);
                }
                return this;
            }
        }, {
            key: 'initializeMarkers',
            value: function initializeMarkers(markerData) {
                if (markerData) {
                    for (var i in markerData) {
                        var currentData = markerData[i],
                            offset = currentData.offset ? new _Point.Point(currentData.offset[0], currentData.offset[1]) : new _Point.Point(0, 0),
                            markerPixelPos = this.convertLatLngToPoint(new _LatLng.LatLng(currentData.position[0], currentData.position[1])),
                            m = new _Marker.Marker(markerPixelPos, currentData.img, offset);
                        this.markers.push(m);
                    }
                }
                return this;
            }
        }]);

        return View;
    }();
});
