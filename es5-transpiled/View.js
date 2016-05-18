(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Helper.js', './Events.js', './Point.js', './LatLng.js', './Bounds.js', './Rectangle.js', './Tile.js', './Publisher.js', './MarkerClusterer.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Helper.js'), require('./Events.js'), require('./Point.js'), require('./LatLng.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./Tile.js'), require('./Publisher.js'), require('./MarkerClusterer.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Helper, global.Events, global.Point, global.LatLng, global.Bounds, global.Rectangle, global.Tile, global.Publisher, global.MarkerClusterer);
        global.View = mod.exports;
    }
})(this, function(exports, _Helper, _Events, _Point, _LatLng, _Bounds, _Rectangle, _Tile, _Publisher, _MarkerClusterer) {
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

            /**
             * get all visible tiles
             * @return {array} all tiles that are currently visible
             */

        }, {
            key: 'visibleTiles',
            get: function get() {
                var _this = this;

                return this.tiles.filter(function(t) {
                    var newTile = t.clone.scale(_this.zoomFactor, _this.zoomFactor).getDistortedRect(_this.distortionFactor).translate(_this.currentView.x * _this.distortionFactor + _this.offsetToCenter, _this.currentView.y);
                    return _this.viewport.intersects(newTile);
                });
            }

            /**
             * how many pixels per lat and lng
             * @return {Point} pixels per lat/lng
             */

        }, {
            key: 'pixelPerLatLng',
            get: function get() {
                return new _Point.Point(this.currentView.width / this.bounds.width, this.currentView.height / this.bounds.height);
            }

            /**
             * @constructor
             * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
             * @param  {Rectangle} currentView = new Rectangle() - current representation of map
             * @param  {Bounds} bounds = new Bounds() - current bounds of map
             * @param  {LatLng} center = new LatLng() - current center of map
             * @param  {LatLng} initialCenter = new LatLng() - initial center of view
             * @param  {Object} data = {} - tile data of current map
             * @param  {Object} $container = null - parent container for markers
             * @param  {Object} context = null - canvas context for drawing
             * @param  {number} maxZoom = 1.5 - maximal zoom of view
             * @param  {number} currentZoom = 1 - initial zoom of view
             * @param  {number} minZoom = 0.8 - minimal zoom of view
             * @param  {object} $container = null - jQuery-selector of container class
             * @param  {number} limitToBounds - where to limit panning
             * @return {View} instance of View for chaining
             */

        }]);

        function View(_ref) {
            var _ref$viewport = _ref.viewport;
            var viewport = _ref$viewport === undefined ? new _Rectangle.Rectangle() : _ref$viewport;
            var _ref$currentView = _ref.currentView;
            var currentView = _ref$currentView === undefined ? new _Rectangle.Rectangle() : _ref$currentView;
            var _ref$bounds = _ref.bounds;
            var bounds = _ref$bounds === undefined ? new _Bounds.Bounds() : _ref$bounds;
            var _ref$center = _ref.center;
            var center = _ref$center === undefined ? new _LatLng.LatLng() : _ref$center;
            var _ref$initialCenter = _ref.initialCenter;
            var initialCenter = _ref$initialCenter === undefined ? new _LatLng.LatLng() : _ref$initialCenter;
            var _ref$data = _ref.data;
            var data = _ref$data === undefined ? {} : _ref$data;
            var _ref$$container = _ref.$container;
            var $container = _ref$$container === undefined ? null : _ref$$container;
            var _ref$context = _ref.context;
            var context = _ref$context === undefined ? null : _ref$context;
            var _ref$maxZoom = _ref.maxZoom;
            var maxZoom = _ref$maxZoom === undefined ? 1.5 : _ref$maxZoom;
            var _ref$currentZoom = _ref.currentZoom;
            var currentZoom = _ref$currentZoom === undefined ? 1 : _ref$currentZoom;
            var _ref$minZoom = _ref.minZoom;
            var minZoom = _ref$minZoom === undefined ? 0.8 : _ref$minZoom;
            var _ref$$markerContainer = _ref.$markerContainer;
            var $markerContainer = _ref$$markerContainer === undefined ? null : _ref$$markerContainer;
            var limitToBounds = _ref.limitToBounds;

            _classCallCheck(this, View);

            this.$markerContainer = $markerContainer;
            this.currentView = currentView;
            this.originalMapView = currentView.clone;
            this.viewport = viewport;
            this.bounds = bounds;
            this.center = center;
            this.zoomFactor = currentZoom;
            this.maxZoom = maxZoom;
            this.minZoom = minZoom;
            this.origin = new _Point.Point();
            this.eventManager = new _Publisher.Publisher();
            this.limitToBounds = limitToBounds || bounds;

            var newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
            this.currentView.position(newCenter.x, newCenter.y);

            this.tiles = [];
            this.data = data;
            this.context = context;

            this.initial = {
                position: initialCenter,
                zoom: this.zoomFactor
            };

            this.drawIsNeeded = true;

            this.initializeTiles().loadThumb();

            this.zoom(0, this.viewport.center);

            return this;
        }

        /**
         * resets current View to its initial position
         */


        _createClass(View, [{
            key: 'reset',
            value: function reset() {
                this.setLatLngToPosition(this.initial.position, this.viewport.center);
                var delta = this.initial.zoom - this.zoomFactor;
                this.zoom(delta, this.viewport.center);
            }

            /**
             * main draw call
             */

        }, {
            key: 'mainLoop',
            value: function mainLoop() {
                var _this2 = this;

                if (this.drawIsNeeded) {
                    this.context.clearRect(0, 0, this.viewport.width, this.viewport.height);
                    this.checkBoundaries();
                    this.draw();
                    this.drawIsNeeded = false;
                }
                window.requestAnimFrame(function() {
                    return _this2.mainLoop();
                });
            }
        }, {
            key: 'checkBoundaries',
            value: function checkBoundaries() {
                var nw = this.convertLatLngToPoint(this.limitToBounds.nw),
                    se = this.convertLatLngToPoint(this.limitToBounds.se),
                    limit = new _Rectangle.Rectangle(nw.x + this.currentView.x, nw.y + this.currentView.y, se.x - nw.x, se.y - nw.y);

                var offset = new _Point.Point();
                var equalizedMap = limit.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
                if (!equalizedMap.containsRect(this.viewport)) {
                    if (equalizedMap.width >= this.viewport.width) {
                        if (equalizedMap.left - this.viewport.left > 0) {
                            offset.x -= equalizedMap.left - this.viewport.left;
                        }
                        if (equalizedMap.right - this.viewport.right < 0) {
                            offset.x -= equalizedMap.right - this.viewport.right;
                        }
                    } else {
                        this.currentView.setCenterX(this.viewport.center.x);
                        offset.x = 0;
                    }

                    if (equalizedMap.height >= this.viewport.height) {
                        if (equalizedMap.top - this.viewport.top > 0) {
                            offset.y -= equalizedMap.top - this.viewport.top;
                        }
                        if (equalizedMap.bottom - this.viewport.bottom < 0) {
                            offset.y -= equalizedMap.bottom - this.viewport.bottom;
                        }
                    } else {
                        this.currentView.setCenterY(this.viewport.center.y);
                        offset.y = 0;
                    }
                }
                offset.multiply(1 / this.distortionFactor, 1);
                this.currentView.translate(offset.x, offset.y);
            }

            /**
             * loads thumbnail of view
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'loadThumb',
            value: function loadThumb() {
                var _this3 = this;

                _Helper.Helper.loadImage(this.data.thumb, function(img) {
                    _this3.thumb = img;
                    window.requestAnimFrame(_this3.mainLoop.bind(_this3));
                });
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

            /**
             * set specified lat/lng to position x/y
             * @param {LatLng} latlng - specified latlng to be set Point to
             * @param {Point} position - specified position to set LatLng to
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'setLatLngToPosition',
            value: function setLatLngToPosition(latlng, position) {
                var currentPosition = this.currentView.topLeft.substract(position).multiply(-1),
                    diff = currentPosition.substract(this.convertLatLngToPoint(latlng));

                this.currentView.translate(0, diff.y);
                this.calculateNewCenter();
                this.currentView.translate(diff.x + this.getDeltaXToCenter(position), 0);
                return this;
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

            /**
             * receive relative Position to center of viewport
             * @param  {Point} pos - specified position
             * @return {number} delta of point to center of viewport
             */

        }, {
            key: 'getDeltaXToCenter',
            value: function getDeltaXToCenter(pos) {
                var diffToCenter = pos.clone.substract(this.viewport.center),
                    distanceToCenter = diffToCenter.x / this.viewport.center.x,
                    delta = distanceToCenter * this.offsetToCenter;
                return delta / this.distortionFactor;
            }

            /**
             * zooming handler
             * @param  {number} factor - increase/decrease factor
             * @param  {Point} pos - Position to zoom to
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'zoom',
            value: function zoom(factor, pos) {
                this.zoomFactor = Math.max(Math.min(this.zoomFactor + factor, this.maxZoom), this.minZoom);

                var mapPosition = this.currentView.topLeft.substract(pos).multiply(-1);
                mapPosition.x += this.getDeltaXToCenter(pos);
                var latlngPosition = this.convertPointToLatLng(mapPosition).multiply(-1);

                var newSize = this.originalMapView.clone.scale(this.zoomFactor);
                this.currentView.setSize(newSize.width, newSize.height);

                this.setLatLngToPosition(latlngPosition, pos);
                this.moveView(new _Point.Point());

                if (this.zoomFactor >= this.maxZoom) {
                    this.eventManager.publish(_Events.Events.TileMap.NEXT_LEVEL, [this.center, this.bounds]);
                } else if (this.zoomFactor <= this.minZoom) {
                    this.eventManager.publish(_Events.Events.TileMap.PREVIOUS_LEVEL, [this.center, this.bounds]);
                }
                this.drawIsNeeded = true;
                return this;
            }

            /**
             * get distortion factor for specified latitude
             * @param  {LatLng} latlng - lat/lng position
             * @return {number} distortion factor
             */

        }, {
            key: 'getDistortionFactorForLatitude',
            value: function getDistortionFactorForLatitude(latlng) {
                return Math.cos(_Helper.Helper.toRadians(latlng.lat));
            }

            /**
             * update center position of view
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'calculateNewCenter',
            value: function calculateNewCenter() {
                var newCenter = this.viewport.center.substract(this.currentView.topLeft);
                this.center = this.convertPointToLatLng(newCenter);
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
                this.currentView.translate(0, pos.y);
                this.calculateNewCenter();
                this.currentView.translate(pos.x * (1 / this.distortionFactor), 0);
                return this;
            }

            /**
             * Handles draw of visible elements
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'draw',
            value: function draw() {
                return this.drawThumbnail().drawVisibleTiles().repositionMarkerContainer();
            }

            /**
             * draws all visible tiles
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'drawVisibleTiles',
            value: function drawVisibleTiles() {
                _Helper.Helper.forEach(this.visibleTiles, function(tile) {
                    return tile.draw();
                });
                return this;
            }

            /**
             * draws the thumbnail
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'drawThumbnail',
            value: function drawThumbnail() {
                var rect = this.currentView.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
                this.context.drawImage(this.thumb, 0, 0, this.thumb.width, this.thumb.height, rect.x, rect.y, rect.width, rect.height);
                return this;
            }

            /**
             * initializes tiles
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'initializeTiles',
            value: function initializeTiles() {
                var _this4 = this;

                var currentLevel = this.data.tiles;
                _Helper.Helper.forEach(currentLevel, function(currentTileData) {
                    _this4.tiles.push(new _Tile.Tile(currentTileData, _this4));
                });
                return this;
            }

            /**
             * reposition marker container
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'repositionMarkerContainer',
            value: function repositionMarkerContainer() {
                if (this.$markerContainer) {
                    var newSize = this.currentView.getDistortedRect(this.distortionFactor);
                    this.$markerContainer.css({
                        "width": newSize.width + 'px',
                        "height": newSize.height + 'px',
                        "left": newSize.left + this.offsetToCenter + 'px',
                        "top": newSize.top + 'px'
                    });
                }
                return this;
            }
        }]);

        return View;
    }();

    /**
     * request animation frame browser polyfill
     * @return {Function} supported requestAnimationFrame-function
     */
    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }();
});
