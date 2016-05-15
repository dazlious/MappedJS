(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Helper.js', './Events.js', './Publisher.js', './StateHandler.js', './Rectangle.js', './View.js', './Marker.js', './DataEnrichment.js', './ToolTip.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Helper.js'), require('./Events.js'), require('./Publisher.js'), require('./StateHandler.js'), require('./Rectangle.js'), require('./View.js'), require('./Marker.js'), require('./DataEnrichment.js'), require('./ToolTip.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Helper, global.Events, global.Publisher, global.StateHandler, global.Rectangle, global.View, global.Marker, global.DataEnrichment, global.ToolTip);
        global.TileMap = mod.exports;
    }
})(this, function(exports, _jQuery, _Helper, _Events, _Publisher, _StateHandler, _Rectangle, _View, _Marker, _DataEnrichment, _ToolTip) {
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

            this.levels = [];
            this.markers = [];

            _Helper.Helper.forEach(this.imgData, function(element, i) {
                var currentLevel = {
                    value: element,
                    description: i
                };
                _this.levels.push(currentLevel);
            });

            this.levelHandler = new _StateHandler.StateHandler(this.levels);
            this.levelHandler.changeTo(this.settings.level);
            this.eventManager = new _Publisher.Publisher();

            this.initial = {
                bounds: settings.bounds,
                center: settings.center,
                level: settings.level,
                zoom: settings.zoom
            };

            return this.appendMarkerContainerToDom().initialize(settings.bounds, settings.center, this.currentLevelData);
        }

        /**
         * initializes the TileMap
         * @param {Bounds} bounds - specified boundaries
         * @param {LatLng} center - specified center
         * @param {object} data - specified data
         * @return {TileMap} instance of TileMap for chaining
         */


        _createClass(TileMap, [{
            key: 'initialize',
            value: function initialize(bounds, center, data) {
                this.initializeCanvas().bindEvents();

                this.view = this.createViewFromData(bounds, center, data, this.settings.zoom);
                this.initializeMarkers(this.markerData);

                if (this.markers.length !== 0) this.createTooltipContainer();

                return this.resizeCanvas();
            }

            /**
             * resets view to initial state
             */

        }, {
            key: 'reset',
            value: function reset() {
                if (this.levelHandler.hasPrevious()) {
                    this.levelHandler.changeTo(0);
                    this.view = this.createViewFromData(this.initial.bounds, this.initial.center, this.currentLevelData, this.initial.zoom);
                } else this.view.reset();
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
                    markerData: this.markerData,
                    $container: this.$container,
                    $markerContainer: this.$markerContainer,
                    context: this.canvasContext,
                    limitToBounds: this.settings.limitToBounds
                });
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
            value: function initializeMarkers(markerData) {
                var _this2 = this;

                if (markerData) {
                    markerData = this.enrichMarkerData(markerData);
                    _Helper.Helper.forEach(markerData, function(currentData) {
                        _this2.markers.push(new _Marker.Marker(currentData, _this2.view));
                    });
                }
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
                    templates: {
                        image: "../../src/hbs/image.hbs"
                    }
                });
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

                this.eventManager.subscribe("resize", function() {
                    _this3.resize();
                });

                this.eventManager.subscribe("next-level", function(argument_array) {
                    var center = argument_array[0],
                        bounds = argument_array[1],
                        lastLevel = _this3.levelHandler.current.description;

                    _this3.levelHandler.next();

                    if (lastLevel !== _this3.levelHandler.current.description) {
                        _this3.view = _this3.createViewFromData(bounds, center.multiply(-1), _this3.currentLevelData, _this3.currentLevelData.zoom.min + 0.0000001);
                    }
                });

                this.eventManager.subscribe("previous-level", function(argument_array) {
                    var center = argument_array[0],
                        bounds = argument_array[1],
                        lastLevel = _this3.levelHandler.current.description;

                    _this3.levelHandler.previous();

                    if (lastLevel !== _this3.levelHandler.current.description) {
                        _this3.view = _this3.createViewFromData(bounds, center.multiply(-1), _this3.currentLevelData, _this3.currentLevelData.zoom.max - 0.0000001);
                    }
                });

                return this;
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
                this.view.drawIsNeeded = true;
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
        }]);

        return TileMap;
    }();
});
