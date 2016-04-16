(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './LatLng.js', './Point.js', './Bounds.js', './Rectangle.js', './Tile.js', './Publisher.js', './Helper.js', './Marker.js', './DataEnrichment.js', 'jquery'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./LatLng.js'), require('./Point.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./Tile.js'), require('./Publisher.js'), require('./Helper.js'), require('./Marker.js'), require('./DataEnrichment.js'), require('jquery'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.LatLng, global.Point, global.Bounds, global.Rectangle, global.Tile, global.Publisher, global.Helper, global.Marker, global.DataEnrichment, global.jquery);
        global.View = mod.exports;
    }
})(this, function(exports, _LatLng, _Point, _Bounds, _Rectangle, _Tile, _Publisher, _Helper, _Marker, _DataEnrichment, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.View = undefined;

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

    var View = exports.View = function() {
        _createClass(View, [{
            key: 'distortionFactor',


            /**
             * Returns current distortionFactor
             * @return {number} returns current distortionFactor of latitude
             */
            get: function get() {
                return Math.cos(_Helper.Helper.toRadians(this.center.lat));
            }
        }, {
            key: 'getDistortionCalculation',
            get: function get() {
                return function() {
                    return Math.cos(_Helper.Helper.toRadians(this.center.lat));
                }.bind(this);
            }

            /**
             * Returns the current equalized viewport
             */

        }, {
            key: 'viewportOffset',
            get: function get() {
                return (this.viewport.width - this.viewport.width * this.distortionFactor) / 2;
            }
        }, {
            key: 'viewportOffsetCalculation',
            get: function get() {
                return function() {
                    return (this.viewport.width - this.viewport.width * this.distortionFactor) / 2;
                }.bind(this);
            }
        }, {
            key: 'viewOffsetCalculation',
            get: function get() {
                return function() {
                    return new _Point.Point(this.mapView.x, this.mapView.y);
                }.bind(this);
            }
        }, {
            key: 'calculateLatLngToPoint',
            get: function get() {
                return this.convertLatLngToPoint.bind(this);
            }
        }, {
            key: 'calculatePointToLatLng',
            get: function get() {
                return this.convertPointToLatLng.bind(this);
            }

            /**
             * get all visible tiles
             * @return {array} all tiles that are currently visible
             */

        }, {
            key: 'visibleTiles',
            get: function get() {
                return this.tiles.filter(function(t) {
                    var newTile = t.getDistortedRect(this.distortionFactor).translate(this.mapView.x * this.distortionFactor + this.viewportOffset, this.mapView.y);
                    return this.viewport.intersects(newTile);
                }, this);
            }
        }, {
            key: 'pixelPerLatLng',
            get: function get() {
                return new _Point.Point(this.mapView.width / this.bounds.width, this.mapView.height / this.bounds.height);
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
            var markerData = _ref$markerData === undefined ? null : _ref$markerData;
            var _ref$$container = _ref.$container;
            var $container = _ref$$container === undefined ? null : _ref$$container;
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
            this.markers = [];

            this.bindEvents().initializeTiles().loadThumb().initializeMarkers(markerData, $container);

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
                point.divide(this.pixelPerLatLng.x, this.pixelPerLatLng.y);
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
                relativePosition.multiply(this.pixelPerLatLng.y, this.pixelPerLatLng.x);
                return new _Point.Point(relativePosition.lng, relativePosition.lat).abs;
            }
        }, {
            key: 'drawHandler',
            value: function drawHandler(o) {
                o.handleDraw(this.mapView.x, this.mapView.y, this.distortionFactor, this.viewportOffset);
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
                pos.divide(this.distortionFactor, 1);
                var equalizedMap = this.mapView.getDistortedRect(this.distortionFactor).translate(this.viewportOffset + pos.x, pos.y);
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
                this.drawThumbnail();

                _Helper.Helper.forEach(this.visibleTiles, function(tile) {
                    this.drawHandler(tile);
                }.bind(this));

                this.repositionMarkers();

                return this;
            }
        }, {
            key: 'drawThumbnail',
            value: function drawThumbnail() {
                var rect = this.mapView.getDistortedRect(this.distortionFactor).translate(this.viewportOffset, 0);
                this.context.drawImage(this.thumb, 0, 0, this.thumb.width, this.thumb.height, rect.x, rect.y, rect.width, rect.height);
            }

            /**
             * initializes tiles
             * @return {View} instance of View
             */

        }, {
            key: 'initializeTiles',
            value: function initializeTiles() {
                var currentLevel = this.data.tiles;
                _Helper.Helper.forEach(currentLevel, function(currentTileData) {
                    currentTileData["context"] = this.context;
                    var currentTile = new _Tile.Tile(currentTileData);
                    this.tiles.push(currentTile);
                }.bind(this));
                return this;
            }
        }, {
            key: 'enrichMarkerData',
            value: function enrichMarkerData(markerData, latlngToPoint) {
                // TODO
                _DataEnrichment.DataEnrichment.marker(markerData, latlngToPoint, function(data) {
                    console.log(data);
                });
            }
        }, {
            key: 'appendMarkerContainerToDom',
            value: function appendMarkerContainerToDom($container) {
                this.$markerContainer = (0, _jquery2.default)("<div class='marker-container' />");
                $container.append(this.$markerContainer);
            }
        }, {
            key: 'initializeMarkers',
            value: function initializeMarkers(markerData, $container) {
                if (markerData) {

                    this.enrichMarkerData(markerData, function(enrichedMarkerData) {
                        this.appendMarkerContainerToDom($container);
                        markerData = enrichedMarkerData;
                    }.bind(this));

                    _Helper.Helper.forEach(markerData, function(currentData) {
                        var m = new _Marker.Marker(currentData, this.$markerContainer, this.getDistortionCalculation, this.viewOffsetCalculation, this.viewportOffsetCalculation, this.calculateLatLngToPoint);
                        this.markers.push(m);
                    }.bind(this));
                }
                return this;
            }
        }, {
            key: 'repositionMarkers',
            value: function repositionMarkers() {
                _Helper.Helper.forEach(this.markers, function(marker) {
                    marker.moveMarker();
                }.bind(this));
            }
        }]);

        return View;
    }();
});
