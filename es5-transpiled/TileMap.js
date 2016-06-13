(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Helper.js', './Events.js', './Point.js', './Publisher.js', './StateHandler.js', './Rectangle.js', './View.js', './Marker.js', './DataEnrichment.js', './ToolTip.js', './Label.js', './MarkerClusterer.js', './MapInformation.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Helper.js'), require('./Events.js'), require('./Point.js'), require('./Publisher.js'), require('./StateHandler.js'), require('./Rectangle.js'), require('./View.js'), require('./Marker.js'), require('./DataEnrichment.js'), require('./ToolTip.js'), require('./Label.js'), require('./MarkerClusterer.js'), require('./MapInformation.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Helper, global.Events, global.Point, global.Publisher, global.StateHandler, global.Rectangle, global.View, global.Marker, global.DataEnrichment, global.ToolTip, global.Label, global.MarkerClusterer, global.MapInformation);
        global.TileMap = mod.exports;
    }
})(this, function(exports, _Helper, _Events, _Point, _Publisher, _StateHandler, _Rectangle, _View, _Marker, _DataEnrichment, _ToolTip, _Label, _MarkerClusterer, _MapInformation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TileMap = undefined;

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
                return 0;
            }

            /**
             * Returns top offset of container
             * @return {number} - top offset of container
             */

        }, {
            key: 'top',
            get: function get() {
                return 0;
            }

            /**
             * Returns width of container
             * @return {number} - width of container
             */

        }, {
            key: 'width',
            get: function get() {
                return this.container.getBoundingClientRect().width;
            }

            /**
             * Returns height of container
             * @return {number} - height of container
             */

        }, {
            key: 'height',
            get: function get() {
                return this.container.getBoundingClientRect().height;
            }
        }, {
            key: 'viewport',
            get: function get() {
                return new _Rectangle.Rectangle(this.left, this.top, this.width, this.height);
            }
        }, {
            key: 'pixelPerLatLng',
            get: function get() {
                this.levelHandler.current.instance.pixelPerLatLng();
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
            var id = _ref.id;

            _classCallCheck(this, TileMap);

            if (!container) throw Error("You must define a container to initialize a TileMap");
            this.container = container;

            this.id = id;

            this.info = new _MapInformation.MapInformation(this.id);
            this.eventManager = new _Publisher.Publisher(this.id);

            this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                viewport: this.viewport
            });

            this.imgData = tilesData[_Events.Events.TileMap.IMG_DATA_NAME];
            this.markerData = tilesData[_Events.Events.TileMap.MARKER_DATA_NAME];
            this.labelData = tilesData[_Events.Events.TileMap.LABEL_DATA_NAME];

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

            this.templates = this.settings.tooltip ? this.settings.tooltip.templates : {};
            this.templates = _DataEnrichment.DataEnrichment.tooltip(this.templates);

            this.levels = [];
            this.clusterHandlingTimeout = null;

            this.lastFrameMillisecs = Date.now();
            this.deltaTiming = 1.0;
            this.bestDeltaTiming = 1000.0 / 60.0;

            this.velocity = new _Point.Point();
            this.drawIsNeeded = false;

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
                    level: i,
                    instance: _this.createViewFromData(settings.bounds, settings.center, element, settings.zoom)
                };
                _this.levels.push(currentLevel);
            });

            this.levelHandler = new _StateHandler.StateHandler(this.levels);
            this.levelHandler.changeTo(this.settings.level);

            this.view.init();

            this.appendMarkerContainerToDom();
            this.initializeLabels();

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
                if (this.levelHandler.current.level !== this.settings.level) this.levelHandler.changeTo(this.settings.level);
                this.view.reset();
                this.redraw();
                this.clusterHandler();
            }
        }, {
            key: 'initializeLabels',
            value: function initializeLabels() {
                var _this2 = this;

                this.labelData = this.enrichLabelData(this.labelData);
                this.labels = [];
                _Helper.Helper.forEach(this.labelData, function(label) {
                    var currentLabel = new _Label.Label({
                        context: _this2.canvasContext,
                        id: _this2.id,
                        settings: label
                    });
                    _this2.labels.push(currentLabel);
                });
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
                    context: this.canvasContext,
                    id: this.id,
                    centerSmallMap: this.settings.centerSmallMap,
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
                if (this.markerContainer) {
                    var newSize = this.view.view.getDistortedRect(this.view.distortionFactor);
                    var left = (newSize.left + this.view.offsetToCenter).toFixed(4);
                    var top = newSize.top.toFixed(4);
                    _Helper.Helper.css(this.markerContainer, {
                        "width": newSize.width + 'px',
                        "height": newSize.height + 'px',
                        "transform": 'translate3d(' + left + 'px, ' + top + 'px, 0px)'
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
        }, {
            key: 'enrichLabelData',
            value: function enrichLabelData(labelData) {
                return _DataEnrichment.DataEnrichment.label(labelData);
            }

            /**
             * initializes all markers
             * @param  {Object} markerData - data of all markers
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'initializeMarkers',
            value: function initializeMarkers() {
                var _this3 = this;

                if (this.markerData && this.markerData.length) {
                    (function() {
                        var markers = [];
                        _this3.markerData = _this3.enrichMarkerData(_this3.markerData);
                        _Helper.Helper.forEach(_this3.markerData, function(currentData) {
                            markers.push(new _Marker.Marker({
                                data: currentData,
                                container: _this3.markerContainer,
                                id: _this3.id
                            }));
                        });
                        markers = markers.sort(function(a, b) {
                            return b.latlng.lat - a.latlng.lat !== 0 ? b.latlng.lat - a.latlng.lat : b.latlng.lng - a.latlng.lng;
                        });
                        _Helper.Helper.forEach(markers, function(marker, i) {
                            marker.icon.style.zIndex = i;
                        });

                        _this3.markerClusterer = new _MarkerClusterer.MarkerClusterer({
                            markers: markers,
                            id: _this3.id,
                            container: _this3.markerContainer
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
                if (this.markerData && this.markerData.length) {
                    this.markerContainer = document.createElement("div");
                    this.markerContainer.classList.add("marker-container");
                    this.container.appendChild(this.markerContainer);
                }
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
                    container: this.container.parentNode,
                    id: this.id,
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
                var _this4 = this;

                this.eventManager.subscribe(_Events.Events.TileMap.RESIZE, function() {
                    _this4.resize();
                });

                this.eventManager.subscribe(_Events.Events.TileMap.DRAW, function() {
                    _this4.redraw();
                });

                this.eventManager.subscribe(_Events.Events.View.THUMB_LOADED, function() {
                    _this4.redraw();
                    if (_this4.stateHandler.current.value < 2) {
                        _this4.initializeMarkers();
                        if (_this4.markerData && _this4.markerData.length) _this4.createTooltipContainer();
                    }
                });

                this.eventManager.subscribe(_Events.Events.TileMap.ZOOM_TO_BOUNDS, function(data) {
                    var zoomIncrease = Math.min(_this4.view.viewport.width / data.boundingBox.width, _this4.view.viewport.height / data.boundingBox.height);
                    while (zoomIncrease > 0) {
                        var possibleZoomOnLevel = _this4.view.maxZoom - _this4.view.zoomFactor;
                        zoomIncrease -= possibleZoomOnLevel;
                        if (_this4.levelHandler.hasNext()) {
                            _this4.changelevel(1);
                        } else {
                            _this4.zoom(possibleZoomOnLevel, _this4.view.viewport.center);
                            zoomIncrease = 0;
                        }
                    }
                    _this4.view.setLatLngToPosition(data.center, _this4.view.viewport.center);
                });

                this.eventManager.subscribe(_Events.Events.TileMap.NEXT_LEVEL, function() {
                    _this4.changelevel(1);
                });
                this.eventManager.subscribe(_Events.Events.TileMap.PREVIOUS_LEVEL, function() {
                    _this4.changelevel(-1);
                });

                return this;
            }
        }, {
            key: 'setViewToOldView',
            value: function setViewToOldView(center, zoom) {
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    zoomFactor: zoom
                });
                this.view.zoom(0, this.view.viewport.center);
                this.view.view.setCenter(center);
                this.drawIsNeeded = true;
            }
        }, {
            key: 'changelevel',
            value: function changelevel(direction) {
                var lastLevel = this.levelHandler.current.level,
                    lastCenter = this.view.view.center;
                var extrema = void 0;
                if (direction < 0) {
                    this.levelHandler.previous();
                    extrema = this.view.maxZoom;
                } else {
                    this.levelHandler.next();
                    extrema = this.view.minZoom;
                }
                if (!this.view.isInitialized) {
                    this.view.init();
                }
                if (lastLevel !== this.levelHandler.current.level) {
                    this.setViewToOldView(lastCenter, extrema);
                }
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    level: this.levelHandler.current.level
                });
            }

            /**
             * initializes the canvas, adds to DOM
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'initializeCanvas',
            value: function initializeCanvas() {
                this.canvas = document.createElement("canvas");
                this.canvas.classList.add("mjs-canvas");
                this.container.appendChild(this.canvas);
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
             * move view by delta
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
                var _this5 = this;

                if (this.clusterHandlingTimeout) {
                    this.clusterHandlingTimeout = clearTimeout(this.clusterHandlingTimeout);
                }
                this.clusterHandlingTimeout = setTimeout(function() {
                    if (_this5.levelHandler.hasNext()) {
                        _this5.eventManager.publish(_Events.Events.MarkerClusterer.CLUSTERIZE);
                    } else {
                        _this5.eventManager.publish(_Events.Events.MarkerClusterer.UNCLUSTERIZE);
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
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                return this;
            }

            /**
             * Handles resizing of view
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'resizeView',
            value: function resizeView() {
                this.eventManager.publish(_Events.Events.MapInformation.UPDATE, {
                    viewport: this.viewport
                });
                return this;
            }

            /**
             * main draw call
             */

        }, {
            key: 'mainLoop',
            value: function mainLoop() {
                var _this6 = this;

                var currentMillisecs = Date.now();
                var deltaMillisecs = currentMillisecs - this.lastFrameMillisecs;
                this.lastFrameMillisecs = currentMillisecs;
                this.deltaTiming = _Helper.Helper.clamp(deltaMillisecs / this.bestDeltaTiming, 1, 4);

                if (this.velocity.length >= 0.2) this.moveView(this.velocity.multiply(0.9).clone.multiply(this.deltaTiming));

                if (this.drawIsNeeded) {
                    this.canvasContext.clearRect(0, 0, this.width, this.height);
                    this.view.checkBoundaries();
                    this.view.draw();
                    this.drawLabels();
                    this.repositionMarkerContainer();
                    this.drawIsNeeded = false;
                }

                window.requestAnimFrame(function() {
                    return _this6.mainLoop();
                });
            }
        }, {
            key: 'drawLabels',
            value: function drawLabels() {
                _Helper.Helper.forEach(this.labels, function(label) {
                    return label.draw();
                });
                return this;
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
