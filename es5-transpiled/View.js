(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './Point.js', './LatLng.js', './Bounds.js', './Rectangle.js', './Tile.js', './Marker.js', './Helper.js', './DataEnrichment.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./Point.js'), require('./LatLng.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./Tile.js'), require('./Marker.js'), require('./Helper.js'), require('./DataEnrichment.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.Point, global.LatLng, global.Bounds, global.Rectangle, global.Tile, global.Marker, global.Helper, global.DataEnrichment);
        global.View = mod.exports;
    }
})(this, function(exports, _jquery, _Point, _LatLng, _Bounds, _Rectangle, _Tile, _Marker, _Helper, _DataEnrichment) {
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

    var View = exports.View = function() {
        _createClass(View, [{
            key: 'distortionFactor',


            /**
             * Returns current distortionFactor
             * @return {number} returns current distortionFactor of latitude
             */
            get: function get() {
                return this.getDistortionFactorForLatitude(this.center);
            }

            /**
             * Returns the current distorted viewport
             */

        }, {
            key: 'offsetToCenter',
            get: function get() {
                return (this.viewport.width - this.viewport.width * this.distortionFactor) / 2;
            }
        }, {
            key: 'currentView',
            get: function get() {
                return this.mapView;
            }

            /**
             * get all visible tiles
             * @return {array} all tiles that are currently visible
             */

        }, {
            key: 'visibleTiles',
            get: function get() {
                return this.tiles.filter(function(t) {
                    var newTile = t.clone.scale(this.zoomFactor, this.zoomFactor).getDistortedRect(this.distortionFactor).translate(this.currentView.x * this.distortionFactor + this.offsetToCenter, this.currentView.y);
                    return this.viewport.intersects(newTile);
                }, this);
            }
        }, {
            key: 'pixelPerLatLng',
            get: function get() {
                return new _Point.Point(this.currentView.width / this.bounds.width, this.currentView.height / this.bounds.height);
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
            var _ref$maxZoom = _ref.maxZoom;
            var maxZoom = _ref$maxZoom === undefined ? 1.5 : _ref$maxZoom;
            var _ref$minZoom = _ref.minZoom;
            var minZoom = _ref$minZoom === undefined ? 0.8 : _ref$minZoom;

            _classCallCheck(this, View);

            this.mapView = mapView;
            this.originalMapView = mapView.clone;
            this.viewport = viewport;
            this.bounds = bounds;
            this.center = center;
            this.zoomFactor = 1;
            this.maxZoom = maxZoom;
            this.minZoom = minZoom;
            this.origin = new _Point.Point(0, 0);

            var newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
            this.currentView.position(newCenter.x, newCenter.y);

            this.tiles = [];
            this.data = data;
            this.context = context;
            this.markers = [];

            this.drawIsNeeded = true;

            this.initializeTiles().loadThumb().initializeMarkers(markerData, $container);

            return this;
        }

        _createClass(View, [{
            key: 'mainLoop',
            value: function mainLoop() {
                if (this.drawIsNeeded) {
                    this.drawIsNeeded = false;
                    this.context.clearRect(0, 0, this.viewport.width, this.viewport.height);
                    this.draw();
                }
                window.requestAnimFrame(this.mainLoop.bind(this));
            }

            /**
             * loads thumbnail of view
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'loadThumb',
            value: function loadThumb() {
                _Helper.Helper.loadImage(this.data.thumb, function(img) {
                    this.thumb = img;
                    window.requestAnimFrame(this.mainLoop.bind(this));
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
                return new _LatLng.LatLng(this.bounds.nw.lat - point.y, point.x + this.bounds.nw.lng).multiply(-1);
            }
        }, {
            key: 'setLatLngToPosition',
            value: function setLatLngToPosition(latlng, position) {
                var currentPosition = this.currentView.topLeft.substract(position).multiply(-1),
                    diff = currentPosition.substract(this.convertLatLngToPoint(latlng));

                this.currentView.translate(0, diff.y);
                this.calculateNewCenter();
                this.currentView.translate(diff.x + this.getDeltaXToCenter(position), 0);
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
            key: 'getDeltaXToCenter',
            value: function getDeltaXToCenter(pos) {
                var diffToCenter = pos.clone.substract(this.viewport.center);
                var distanceToCenter = diffToCenter.x / this.viewport.center.x;
                var delta = distanceToCenter * this.offsetToCenter;
                return delta / this.distortionFactor;
            }
        }, {
            key: 'zoom',
            value: function zoom(scale, pos) {
                this.zoomFactor = Math.max(Math.min(this.zoomFactor + scale, this.maxZoom), this.minZoom);
                var mapPosition = this.currentView.topLeft.substract(pos).multiply(-1);
                mapPosition.x += this.getDeltaXToCenter(pos);
                var latlngPosition = this.convertPointToLatLng(mapPosition).multiply(-1);

                var newSize = this.originalMapView.clone.scale(this.zoomFactor);
                this.currentView.setSize(newSize.width, newSize.height);

                this.setLatLngToPosition(latlngPosition, pos);
            }
        }, {
            key: 'getDistortionFactorForLatitude',
            value: function getDistortionFactorForLatitude(latlng) {
                return Math.cos(_Helper.Helper.toRadians(latlng.lat));
            }
        }, {
            key: 'calculateNewCenter',
            value: function calculateNewCenter() {
                var newCenter = this.viewport.center.substract(this.currentView.topLeft);
                this.center = this.convertPointToLatLng(newCenter);
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
                var equalizedMap = this.currentView.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter + pos.x, pos.y);
                if (!equalizedMap.containsRect(this.viewport)) {
                    if (equalizedMap.width >= this.viewport.width) {
                        if (equalizedMap.left - this.viewport.left > 0) {
                            pos.x -= equalizedMap.left - this.viewport.left;
                        }
                        if (equalizedMap.right - this.viewport.right < 0) {
                            pos.x -= equalizedMap.right - this.viewport.right;
                        }
                    } else {
                        this.currentView.setCenterX(this.viewport.center.x);
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
                        this.currentView.setCenterY(this.viewport.center.y);
                        pos.y = 0;
                    }
                }

                this.currentView.translate(pos.x, pos.y);

                this.calculateNewCenter();

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
                this.drawVisibleTiles();
                this.repositionMarkers();
                return this;
            }
        }, {
            key: 'drawVisibleTiles',
            value: function drawVisibleTiles() {
                _Helper.Helper.forEach(this.visibleTiles, function(tile) {
                    tile.draw();
                }.bind(this));
            }
        }, {
            key: 'drawThumbnail',
            value: function drawThumbnail() {
                var rect = this.currentView.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
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
                    var currentTile = new _Tile.Tile(currentTileData, this);
                    this.tiles.push(currentTile);
                }.bind(this));
                return this;
            }
        }, {
            key: 'appendMarkerContainerToDom',
            value: function appendMarkerContainerToDom($container) {
                this.$markerContainer = (0, _jquery2.default)("<div class='marker-container' />");
                $container.append(this.$markerContainer);
            }
        }, {
            key: 'enrichMarkerData',
            value: function enrichMarkerData(markerData, $container) {
                _DataEnrichment.DataEnrichment.marker(markerData, function(enrichedMarkerData) {
                    this.appendMarkerContainerToDom($container);
                    markerData = enrichedMarkerData;
                }.bind(this));
                return markerData;
            }
        }, {
            key: 'initializeMarkers',
            value: function initializeMarkers(markerData, $container) {
                if (markerData) {
                    markerData = this.enrichMarkerData(markerData, $container);
                    _Helper.Helper.forEach(markerData, function(currentData) {
                        var m = new _Marker.Marker(currentData, this);
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

    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }();
});
