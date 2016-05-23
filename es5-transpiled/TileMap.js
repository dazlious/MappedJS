(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Helper.js', './Events.js', './Publisher.js', './StateHandler.js', './Rectangle.js', './View.js', './Marker.js', './DataEnrichment.js', './ToolTip.js', './MarkerClusterer.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Helper.js'), require('./Events.js'), require('./Publisher.js'), require('./StateHandler.js'), require('./Rectangle.js'), require('./View.js'), require('./Marker.js'), require('./DataEnrichment.js'), require('./ToolTip.js'), require('./MarkerClusterer.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Helper, global.Events, global.Publisher, global.StateHandler, global.Rectangle, global.View, global.Marker, global.DataEnrichment, global.ToolTip, global.MarkerClusterer);
        global.TileMap = mod.exports;
    }
})(this, function(exports, _jQuery, _Helper, _Events, _Publisher, _StateHandler, _Rectangle, _View, _Marker, _DataEnrichment, _ToolTip, _MarkerClusterer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TileMap = undefined;

    var _jQuery2 = _interopRequireDefault(_jQuery);

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

    var TileMap = exports.TileMap = function() {
        _createClass(TileMap, [{
            key: 'left',


            /**
             * Returns left offset of container
             * @return {number} - left offset of container
             */
            get: function get() {
                return this.$container.position().left - this.$container.offset().left;
            }

            /**
             * Returns top offset of container
             * @return {number} - top offset of container
             */

        }, {
            key: 'top',
            get: function get() {
                return this.$container.position().top - this.$container.offset().top;
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
             * gets data of current zoom level
             * @return {Object} data for current level as json
             */

        }, {
            key: 'currentLevelData',
            get: function get() {
                return this.levelHandler.current.value;
            }
        }, {
            key: 'view',
            get: function get() {
                return this.levelHandler.current.instance;
            }

            /**
             * @constructor
             * @param  {Object} container = null - jQuery-object holding the container
             * @param  {Object} tilesData={} - json object representing data of TileMap
             * @param  {Object} settings={} - json object representing settings of TileMap
             * @return {TileMap} instance of TileMap for chaining
             */

        }]);

        function TileMap(_ref) {
            var _this = this;

            var _ref$container = _ref.container;
            var container = _ref$container === undefined ? null : _ref$container;
            var _ref$tilesData = _ref.tilesData;
            var tilesData = _ref$tilesData === undefined ? {} : _ref$tilesData;
            var _ref$settings = _ref.settings;
            var settings = _ref$settings === undefined ? {} : _ref$settings;

            _classCallCheck(this, TileMap);

            if (!container) throw Error("You must define a container to initialize a TileMap");
            this.$container = container;

            this.imgData = tilesData[_Events.Events.TileMap.IMG_DATA_NAME];
            this.markerData = tilesData[_Events.Events.TileMap.MARKER_DATA_NAME];
            this.settings = settings;

            this.stateHandler = new _StateHandler.StateHandler([{
                value: 0,
                description: "start"
            }, {
                value: 1,
                description: "view-initialized"
            }, {
                value: 2,
                description: "marker-initialized"
            }, {
                value: 3,
                description: "tooltip-initialized"
            }]);

            this.templates = _DataEnrichment.DataEnrichment.tooltip(this.settings.tooltip.templates);

            this.levels = [];
            this.clusterHandlingTimeout = null;

            this.initial = {
                bounds: settings.bounds,
                center: settings.center,
                level: settings.level,
                zoom: settings.zoom
            };

            this.initializeCanvas();

            _Helper.Helper.forEach(this.imgData, function(element, i) {
                var currentLevel = {
                    value: element,
                    description: i,
                    instance: _this.createViewFromData(settings.bounds, settings.center, element, settings.zoom)
                };
                _this.levels.push(currentLevel);
            });

            this.levelHandler = new _StateHandler.StateHandler(this.levels);
            this.levelHandler.changeTo(this.settings.level);
            this.view.init();

            this.eventManager = new _Publisher.Publisher();

            this.drawIsNeeded = false;

            this.appendMarkerContainerToDom();

            this.bindEvents();
            this.stateHandler.next();
            this.resizeCanvas();

            window.requestAnimFrame(this.mainLoop.bind(this));

            return this;
        }

        /**
         * resets view to initial state
         */


        _createClass(TileMap, [{
            key: 'reset',
            value: function reset() {
                if (this.levelHandler.current.description !== this.settings.level) {
                    this.levelHandler.changeTo(this.settings.level);
                }
                this.view.reset();
                this.redraw();
                this.clusterHandler();
            }

            /**
             * creates a View from specified parameters
             * @param  {Bounds} bounds - specified boundaries
             * @param  {LatLng} center - specified center
             * @param  {object} data - specified data
             * @param  {number} zoom - initial zoom level
             * @return {View} created View
             */

        }, {
            key: 'createViewFromData',
            value: function createViewFromData(bounds, center, data, zoom) {
                return new _View.View({
                    viewport: new _Rectangle.Rectangle(this.left, this.top, this.width, this.height),
                    currentView: new _Rectangle.Rectangle(0, 0, data.dimensions.width, data.dimensions.height),
                    bounds: bounds,
                    center: center,
                    initialCenter: this.initial.center,
                    data: data,
                    maxZoom: data.zoom ? data.zoom.max : 1,
                    currentZoom: zoom,
                    minZoom: data.zoom ? data.zoom.min : 1,
                    $container: this.$container,
                    context: this.canvasContext,
                    limitToBounds: this.settings.limitToBounds
                });
            }

            /**
             * reposition marker container
             * @return {View} instance of View for chaining
             */

        }, {
            key: 'repositionMarkerContainer',
            value: function repositionMarkerContainer() {
                if (this.$markerContainer) {
                    var newSize = this.view.currentView.getDistortedRect(this.view.distortionFactor);
                    this.$markerContainer.css({
                        "width": newSize.width + 'px',
                        "height": newSize.height + 'px',
                        "left": newSize.left + this.view.offsetToCenter + 'px',
                        "top": newSize.top + 'px'
                    });
                }
                return this;
            }

            /**
             * enrich marker data
             * @param  {Object} markerData - data of markers
             * @return {Object} enriched marker data
             */

        }, {
            key: 'enrichMarkerData',
            value: function enrichMarkerData(markerData) {
                return _DataEnrichment.DataEnrichment.marker(markerData);
            }

            /**
             * initializes all markers
             * @param  {Object} markerData - data of all markers
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'initializeMarkers',
            value: function initializeMarkers() {
                var _this2 = this;

                if (this.markerData) {
                    (function() {
                        var markers = [];
                        _this2.markerData = _this2.enrichMarkerData(_this2.markerData);
                        _Helper.Helper.forEach(_this2.markerData, function(currentData) {
                            markers.push(new _Marker.Marker(currentData, _this2));
                        });
                        markers = markers.sort(function(a, b) {
                            return b.latlng.lat - a.latlng.lat !== 0 ? b.latlng.lat - a.latlng.lat : b.latlng.lng - a.latlng.lng;
                        });
                        _Helper.Helper.forEach(markers, function(marker, i) {
                            marker.$icon.css("z-index", i);
                        });

                        if (markers.length !== 0) _this2.createTooltipContainer();

                        _this2.markerClusterer = new _MarkerClusterer.MarkerClusterer({
                            markers: markers,
                            $container: _this2.$markerContainer
                        });
                    })();
                }
                this.stateHandler.next();
                return this;
            }

            /**
             * append marker container to DOM
            ´     * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'appendMarkerContainerToDom',
            value: function appendMarkerContainerToDom() {
                this.$markerContainer = (0, _jQuery2.default)("<div class='marker-container' />");
                this.$container.append(this.$markerContainer);
                return this;
            }

            /**
             * creates an instance of ToolTip
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'createTooltipContainer',
            value: function createTooltipContainer() {
                this.tooltip = new _ToolTip.ToolTip({
                    container: (0, _jQuery2.default)(this.$container.parent()),
                    templates: this.templates
                });
                this.stateHandler.next();
                return this;
            }

            /**
             * bind all events
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                var _this3 = this;

                this.eventManager.subscribe(_Events.Events.TileMap.RESIZE, function() {
                    _this3.resize();
                });

                this.eventManager.subscribe(_Events.Events.View.THUMB_LOADED, function() {
                    _this3.redraw();
                    if (_this3.stateHandler.current.value < 2) _this3.initializeMarkers();
                });

                this.eventManager.subscribe(_Events.Events.TileMap.ZOOM_TO_BOUNDS, function(bounds) {
                    var zoomIncrease = Math.min(_this3.view.viewport.width / bounds.width, _this3.view.viewport.height / bounds.height);
                    _this3.zoom(zoomIncrease, bounds.center);
                });

                this.eventManager.subscribe(_Events.Events.TileMap.NEXT_LEVEL, function() {
                    var lastLevel = _this3.levelHandler.current.description,
                        lastCenter = _this3.view.currentView.center;

                    _this3.changelevel(1);

                    if (lastLevel !== _this3.levelHandler.current.description) {
                        _this3.setViewToOldView(lastCenter, 0.000000000000001, _this3.view.minZoom);
                    }
                });

                this.eventManager.subscribe(_Events.Events.TileMap.PREVIOUS_LEVEL, function() {
                    var lastLevel = _this3.levelHandler.current.description,
                        lastCenter = _this3.view.currentView.center;

                    _this3.changelevel(-1);

                    if (lastLevel !== _this3.levelHandler.current.description) {
                        _this3.setViewToOldView(lastCenter, -0.000000000000001, _this3.view.maxZoom);
                    }
                });

                return this;
            }
        }, {
            key: 'setViewToOldView',
            value: function setViewToOldView(center, zoomDiff, zoom) {
                this.view.zoomFactor = zoom;
                this.view.zoom(zoomDiff, this.view.viewport.center);
                this.view.currentView.setCenter(center);
                this.drawIsNeeded = true;
            }
        }, {
            key: 'changelevel',
            value: function changelevel(direction) {
                if (direction < 0) {
                    this.levelHandler.previous();
                } else {
                    this.levelHandler.next();
                }
                if (!this.view.isInitialized) {
                    this.view.init();
                }
            }

            /**
             * initializes the canvas, adds to DOM
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'initializeCanvas',
            value: function initializeCanvas() {
                this.$canvas = (0, _jQuery2.default)("<canvas class='mjs-canvas' />");
                this.canvas = this.$canvas[0];
                this.$container.append(this.$canvas);
                this.canvasContext = this.canvas.getContext("2d");
                return this;
            }

            /**
             * complete clear and draw of all visible tiles
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'redraw',
            value: function redraw() {
                this.drawIsNeeded = true;
                return this;
            }

            /**
             * Handles resizing of TileMap
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'resize',
            value: function resize() {
                return this.resizeCanvas().resizeView().redraw();
            }

            /**
             * move by delta momentum
             * @param  {Point} delta - delta of x/y
             * @return {MappedJS} instance of MappedJS for chaining
             */

        }, {
            key: 'moveView',
            value: function moveView(delta) {
                this.view.moveView(delta);
                this.redraw();
                return this;
            }

            /**
             * handles zoom by factor and position
             * @param  {number} factor - difference in zoom scale
             * @param  {Point} position - position to zoom to
             * @return {MappedJS} instance of MappedJS for chaining
             */

        }, {
            key: 'zoom',
            value: function zoom(factor, position) {
                if (factor !== 0) {
                    this.view.zoom(factor, position);
                    this.clusterHandler();
                    this.redraw();
                }
                return this;
            }
        }, {
            key: 'clusterHandler',
            value: function clusterHandler() {
                var _this4 = this;

                if (this.clusterHandlingTimeout) {
                    this.clusterHandlingTimeout = clearTimeout(this.clusterHandlingTimeout);
                }
                this.clusterHandlingTimeout = setTimeout(function() {
                    if (_this4.levelHandler.hasNext()) {
                        _this4.eventManager.publish(_Events.Events.MarkerClusterer.CLUSTERIZE);
                    } else {
                        _this4.eventManager.publish(_Events.Events.MarkerClusterer.UNCLUSTERIZE);
                    }
                }, 150);
            }

            /**
             * resizes the canvas sizes
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'resizeCanvas',
            value: function resizeCanvas() {
                this.canvasContext.canvas.width = this.width;
                this.canvasContext.canvas.height = this.height;
                return this;
            }

            /**
             * Handles resizing of view
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'resizeView',
            value: function resizeView() {
                var oldViewport = this.view.viewport.clone;
                this.view.viewport.size(this.left, this.top, this.width, this.height);
                var delta = this.view.viewport.center.substract(oldViewport.center);
                this.view.currentView.translate(delta.x, delta.y);
                return this;
            }

            /**
             * main draw call
             */

        }, {
            key: 'mainLoop',
            value: function mainLoop() {
                var _this5 = this;

                if (this.drawIsNeeded) {
                    this.canvasContext.clearRect(0, 0, this.width, this.height);
                    this.view.checkBoundaries();
                    this.view.draw();
                    this.repositionMarkerContainer();
                    this.drawIsNeeded = false;
                }
                window.requestAnimFrame(function() {
                    return _this5.mainLoop();
                });
            }
        }]);

        return TileMap;
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
