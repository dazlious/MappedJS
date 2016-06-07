(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Helper.js', './Events.js', './Point.js', './LatLng.js', './Bounds.js', './Rectangle.js', './Tile.js', './Drawable.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Helper.js'), require('./Events.js'), require('./Point.js'), require('./LatLng.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./Tile.js'), require('./Drawable.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Helper, global.Events, global.Point, global.LatLng, global.Bounds, global.Rectangle, global.Tile, global.Drawable);
        global.View = mod.exports;
    }
})(this, function(exports, _Helper, _Events, _Point, _LatLng, _Bounds, _Rectangle, _Tile, _Drawable2) {
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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var View = exports.View = function(_Drawable) {
        _inherits(View, _Drawable);

        _createClass(View, [{
            key: 'currentView',
            get: function get() {
                return this.view;
            }

            /**
             * get all visible tiles
             * @return {array} all tiles that are currently visible
             */

        }, {
            key: 'visibleTiles',
            get: function get() {
                var _this2 = this;

                return this.tiles.filter(function(t) {
                    var newTile = t.clone.scale(_this2.zoomFactor).getDistortedRect(_this2.distortionFactor).translate(_this2.currentView.x * _this2.distortionFactor + _this2.offsetToCenter, _this2.currentView.y);
                    return _this2.viewport.intersects(newTile);
                });
            }

            /**
             * @constructor
             * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
             * @param  {Rectangle} currentView = new Rectangle() - current representation of map
             * @param  {Bounds} bounds = new Bounds() - current bounds of map
             * @param  {LatLng} center = new LatLng() - current center of map
             * @param  {LatLng} initialCenter = new LatLng() - initial center of view
             * @param  {Object} data = {} - tile data of current map
             * @param  {Object} context = null - canvas context for drawing
             * @param  {number} maxZoom = 1.5 - maximal zoom of view
             * @param  {number} currentZoom = 1 - initial zoom of view
             * @param  {number} minZoom = 0.8 - minimal zoom of view
             * @param  {number} limitToBounds - where to limit panning
             * @return {View} instance of View for chaining
             */

        }]);

        function View(_ref) {
            var _ret;

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
            var _ref$context = _ref.context;
            var context = _ref$context === undefined ? null : _ref$context;
            var _ref$maxZoom = _ref.maxZoom;
            var maxZoom = _ref$maxZoom === undefined ? 1.5 : _ref$maxZoom;
            var _ref$currentZoom = _ref.currentZoom;
            var currentZoom = _ref$currentZoom === undefined ? 1 : _ref$currentZoom;
            var _ref$minZoom = _ref.minZoom;
            var minZoom = _ref$minZoom === undefined ? 0.8 : _ref$minZoom;
            var _ref$centerSmallMap = _ref.centerSmallMap;
            var centerSmallMap = _ref$centerSmallMap === undefined ? false : _ref$centerSmallMap;
            var limitToBounds = _ref.limitToBounds;
            var id = _ref.id;

            _classCallCheck(this, View);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(View).call(this, {
                id: id
            }));

            _this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                center: center,
                view: currentView,
                bounds: bounds,
                zoomFactor: currentZoom
            });

            _this.maxZoom = maxZoom;
            _this.minZoom = minZoom;
            _this.limitToBounds = limitToBounds || bounds;
            _this.isInitialized = false;
            _this.centerSmallMap = centerSmallMap;

            var newCenter = _this.viewport.center.substract(_this.info.convertLatLngToPoint(center));
            _this.currentView.position(newCenter.x + _this.offsetToCenter, newCenter.y);

            _this.originalMapView = currentView.clone;

            _this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                view: _this.currentView
            });

            _this.tiles = [];
            _this.data = data;
            _this.context = context;

            _this.initial = {
                position: initialCenter,
                zoom: currentZoom
            };

            return _ret = _this.zoom(0, _this.viewport.center).loadThumb(), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(View, [{
            key: 'init',
            value: function init() {
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    view: this.originalMapView.clone
                });
                this.currentView.translate(0 - this.offsetToCenter, 0);
                this.initializeTiles();
                this.isInitialized = true;
                return this;
            }

            /**
             * resets current View to its initial position
             */

        }, {
            key: 'reset',
            value: function reset() {
                this.setLatLngToPosition(this.initial.position, this.viewport.center);
                var delta = this.initial.zoom - this.zoomFactor;
                this.zoom(delta, this.viewport.center);
            }
        }, {
            key: 'getDistortedView',
            value: function getDistortedView() {
                var nw = this.info.convertLatLngToPoint(this.limitToBounds.nw),
                    se = this.info.convertLatLngToPoint(this.limitToBounds.se),
                    limit = new _Rectangle.Rectangle(nw.x + this.currentView.x, nw.y + this.currentView.y, se.x - nw.x, se.y - nw.y);
                return limit.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
            }
        }, {
            key: 'checkBoundaries',
            value: function checkBoundaries() {
                var offset = new _Point.Point();
                var equalizedMap = this.getDistortedView();
                if (!equalizedMap.containsRect(this.viewport)) {

                    var distanceLeft = equalizedMap.left - this.viewport.left,
                        distanceRight = equalizedMap.right - this.viewport.right,
                        distanceTop = equalizedMap.top - this.viewport.top,
                        distanceBottom = equalizedMap.bottom - this.viewport.bottom;

                    offset.x = this.checkX(distanceLeft, distanceRight, equalizedMap.width, this.viewport.width);
                    offset.y = this.checkX(distanceTop, distanceBottom, equalizedMap.height, this.viewport.height);
                }
                offset.multiply(1 / this.distortionFactor, 1);
                this.currentView.translate(offset.x, offset.y);
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    view: this.currentView
                });

                if (this.viewportIsSmallerThanView(equalizedMap)) {
                    var diffInHeight = 1 - equalizedMap.height / this.viewport.height;
                    var diffInWidth = 1 - equalizedMap.width / this.viewport.width;
                    var diff = _Helper.Helper.clamp(Math.max(diffInHeight, diffInWidth), 0, Number.MAX_VALUE);
                    this.zoom(diff, this.viewport.center, true);
                    return false;
                }
            }
        }, {
            key: 'viewportIsSmallerThanView',
            value: function viewportIsSmallerThanView(view) {
                return this.viewport.width > view.width || this.viewport.height > view.height;
            }
        }, {
            key: 'checkX',
            value: function checkX(left, right, mapWidth, viewWidth) {
                var x = 0;
                if (mapWidth >= viewWidth) {
                    if (left > 0) {
                        x -= left;
                    } else if (right < 0) {
                        x -= right;
                    }
                } else {
                    if (!this.centerSmallMap) {
                        if (left < 0 && right < 0) {
                            x -= left;
                        } else if (right > 0 && left > 0) {
                            x -= right;
                        }
                    } else {
                        this.currentView.setCenterX(this.viewport.center.x);
                        this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                            view: this.currentView
                        });
                    }
                }
                return x;
            }
        }, {
            key: 'checkY',
            value: function checkY(top, bottom, mapHeight, viewHeight) {
                var y = 0;
                if (mapHeight >= viewHeight) {
                    if (top > 0) {
                        y -= top;
                    } else if (bottom < 0) {
                        y -= bottom;
                    }
                } else {
                    if (!this.centerSmallMap) {
                        if (top < 0 && bottom < 0) {
                            y -= top;
                        } else if (bottom > 0 && top > 0) {
                            y -= bottom;
                        }
                    } else {
                        this.currentView.setCenterX(this.viewport.center.x);
                        this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                            view: this.currentView
                        });
                    }
                }
                return y;
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
                    _this3.eventManager.publish(_Events.Events.View.THUMB_LOADED);
                });
                return this;
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
                    diff = currentPosition.substract(this.info.convertLatLngToPoint(latlng));

                this.currentView.translate(0, diff.y);
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    view: this.currentView
                });
                this.calculateNewCenter();
                this.currentView.translate(diff.x + this.getDeltaXToCenter(position), 0);
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    view: this.currentView
                });
                return this;
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
                var automatic = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

                var equalizedMap = this.getDistortedView();
                var viewportIsSmaller = this.viewportIsSmallerThanView(equalizedMap);

                if (factor < 0 && viewportIsSmaller || factor < 0 && this.wasSmallerLastTime) {
                    this.wasSmallerLastTime = true;
                    return false;
                } else if (!automatic) {
                    this.wasSmallerLastTime = false;
                }

                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    zoomFactor: _Helper.Helper.clamp(this.zoomFactor + factor, this.minZoom, this.maxZoom)
                });

                var mapPosition = this.currentView.topLeft.substract(pos).multiply(-1);
                mapPosition.x += this.getDeltaXToCenter(pos);
                var latlngPosition = this.info.convertPointToLatLng(mapPosition).multiply(-1);

                var newSize = this.originalMapView.clone.scale(this.zoomFactor);
                this.currentView.setSize(newSize.width, newSize.height);
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    view: this.currentView
                });

                this.setLatLngToPosition(latlngPosition, pos);
                this.changeZoomLevelIfNecessary(factor, viewportIsSmaller);

                return this;
            }
        }, {
            key: 'changeZoomLevelIfNecessary',
            value: function changeZoomLevelIfNecessary(factor, viewportIsSmaller) {
                if (this.zoomFactor >= this.maxZoom && factor > 0) {
                    this.eventManager.publish(_Events.Events.TileMap.NEXT_LEVEL);
                } else if (this.zoomFactor <= this.minZoom && factor < 0 && !viewportIsSmaller) {
                    this.eventManager.publish(_Events.Events.TileMap.PREVIOUS_LEVEL);
                }
            }

            /**
             * update center position of view
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'calculateNewCenter',
            value: function calculateNewCenter() {
                var newCenter = this.info.convertPointToLatLng(this.viewport.center.substract(this.currentView.topLeft));
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    center: newCenter
                });
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
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    view: this.currentView
                });
                this.calculateNewCenter();
                this.currentView.translate(pos.x * (1 / this.distortionFactor), 0);
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    view: this.currentView
                });
                return this;
            }

            /**
             * Handles draw of visible elements
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'draw',
            value: function draw() {
                return this.drawThumbnail().drawVisibleTiles();
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
                if (this.thumb) {
                    var rect = this.currentView.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
                    this.context.drawImage(this.thumb, 0, 0, this.thumb.width, this.thumb.height, rect.x, rect.y, rect.width, rect.height);
                }
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
                    _this4.tiles.push(new _Tile.Tile(currentTileData, _this4.context, _this4.id));
                });
                return this;
            }
        }]);

        return View;
    }(_Drawable2.Drawable);
});
