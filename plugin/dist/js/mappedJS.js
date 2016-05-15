(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("Handlebars"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "Handlebars"], factory);
	else if(typeof exports === 'object')
		exports["de"] = factory(require("jQuery"), require("Handlebars"));
	else
		root["de"] = factory(root["jQuery"], root["Handlebars"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MappedJS = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _TileMap = __webpack_require__(2);

	var _DataEnrichment = __webpack_require__(14);

	var _Helper = __webpack_require__(3);

	var _Interact = __webpack_require__(17);

	var _Point = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MappedJS = exports.MappedJS = function () {

	    /**
	     * Constructor
	     * @param  {string|Object} container=".mjs" - Container, either string, jQuery-object or dom-object
	     * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
	     * @param  {Object} mapSettings={} - settings for map, must be json
	     * @param  {Object} events={loaded: "mjs-loaded"} - List of events
	     * @return {MappedJS} instance of MappedJS for chaining
	     */

	    function MappedJS(_ref) {
	        var _this = this;

	        var _ref$container = _ref.container;
	        var container = _ref$container === undefined ? ".mjs" : _ref$container;
	        var _ref$mapData = _ref.mapData;
	        var mapData = _ref$mapData === undefined ? {} : _ref$mapData;
	        var _ref$markerData = _ref.markerData;
	        var markerData = _ref$markerData === undefined ? {} : _ref$markerData;
	        var _ref$mapSettings = _ref.mapSettings;
	        var mapSettings = _ref$mapSettings === undefined ? {} : _ref$mapSettings;
	        var _ref$events = _ref.events;
	        var events = _ref$events === undefined ? { loaded: "mjs-loaded" } : _ref$events;

	        _classCallCheck(this, MappedJS);

	        this.initializeSettings(container, events, mapSettings);

	        this.initializeData(mapData, function (loadedMapData) {
	            _this.mapData = loadedMapData;
	            _this.initializeData(markerData, function (loadedMarkerData) {
	                _this.mapData = Object.assign(_this.mapData, loadedMarkerData);
	                _this.initializeMap();
	                _this.addControls();
	                _this.bindEvents();
	                _this.loadingFinished();
	            });
	        });

	        this.momentum = null;
	        this.keyTicks = 0;

	        return this;
	    }

	    _createClass(MappedJS, [{
	        key: 'addControls',
	        value: function addControls() {
	            if (this.mapSettings.controls) {
	                this.$controls = (0, _jQuery2.default)('<div class="control-container ' + this.mapSettings.controls.theme + ' ' + this.mapSettings.controls.position + '" />');
	                this.$zoomIn = (0, _jQuery2.default)("<div class='control zoom-in' />");
	                this.$zoomOut = (0, _jQuery2.default)("<div class='control zoom-out' />");
	                this.$home = (0, _jQuery2.default)("<div class='control home' />");
	                this.$controls.append(this.$home).append(this.$zoomIn).append(this.$zoomOut);
	                this.$content.append(this.$controls);
	            }
	        }

	        /**
	         * initializes the settings and handles errors
	         * @param  {string|Object} container - Container, either string, jQuery-object or dom-object
	         * @param  {object} events - List of events
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'initializeSettings',
	        value: function initializeSettings(container, events, settings) {
	            this.$container = typeof container === "string" ? (0, _jQuery2.default)(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : (0, _jQuery2.default)(container);
	            if (!(this.$container instanceof jQuery)) throw new Error("Container " + container + " not found");

	            this.$container.addClass("mappedJS");
	            this.$content = (0, _jQuery2.default)("<div class='map-content' />");
	            this.$container.append(this.$content);

	            this.mapSettings = _DataEnrichment.DataEnrichment.mapSettings(settings);
	            this.events = events;

	            return this;
	        }

	        /**
	         * initializes the data, asynchronous
	         * @param  {Object} mapData - data of map tiles, can be json or path to file
	         * @param  {Function} cb - called, when data is received
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'initializeData',
	        value: function initializeData(mapData, cb) {
	            if (typeof mapData === "string") {
	                _Helper.Helper.requestJSON(mapData, function (data) {
	                    cb(data);
	                });
	            } else {
	                cb((typeof mapData === 'undefined' ? 'undefined' : _typeof(mapData)) === "object" ? mapData : null);
	            }
	            return this;
	        }

	        /**
	         * initializes Map module
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'initializeMap',
	        value: function initializeMap() {
	            this.tileMap = new _TileMap.TileMap({
	                container: this.$content,
	                tilesData: this.mapData,
	                settings: this.mapSettings
	            });
	            return this;
	        }

	        /**
	         * get absolute position of a point
	         * @param  {Point} point - specified relative position
	         * @return {Point} absolute position to viewport
	         */

	    }, {
	        key: 'getAbsolutePosition',
	        value: function getAbsolutePosition(point) {
	            return point.clone.multiply(this.tileMap.view.viewport.width, this.tileMap.view.viewport.height);
	        }
	    }, {
	        key: 'initializeInteractForMap',
	        value: function initializeInteractForMap() {
	            var _this2 = this;

	            this.tooltipState = false;
	            this.interact = new _Interact.Interact({
	                container: this.$content,
	                autoFireHold: 300,
	                overwriteViewportSettings: true,
	                callbacks: {
	                    pan: function pan(data) {
	                        if ((0, _jQuery2.default)(data.target).hasClass("control")) {
	                            return false;
	                        }
	                        var change = data.last.position.clone.substract(data.position.move);
	                        _this2.moveView(_this2.getAbsolutePosition(change).multiply(-1, -1));
	                    },
	                    wheel: function wheel(data) {
	                        var factor = data.delta / 4;
	                        _this2.zoom(factor, _this2.getAbsolutePosition(data.position.start));
	                    },
	                    pinch: function pinch(data) {
	                        _this2.zoom(data.difference * 3, _this2.getAbsolutePosition(data.position.move));
	                    },
	                    doubletap: function doubletap(data) {
	                        if (!(0, _jQuery2.default)(data.target).hasClass("marker-container")) {
	                            return false;
	                        }
	                        _this2.zoom(0.2, _this2.getAbsolutePosition(data.position.start));
	                    },
	                    flick: function flick(data) {
	                        var direction = new _Point.Point(data.directions[0], data.directions[1]),
	                            velocity = direction.clone.divide(data.speed).multiply(20);
	                        _this2.momentumAccerlation(velocity);
	                    }
	                }
	            });
	        }

	        /**
	         * binds all events to handlers
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {

	            this.initializeInteractForMap();

	            (0, _jQuery2.default)(window).on("resize orientationchange", this.resizeHandler.bind(this));

	            (0, _jQuery2.default)(document).on("keydown", this.keyPress.bind(this));
	            (0, _jQuery2.default)(document).on("keyup", this.keyRelease.bind(this));

	            var gesture = _Helper.Helper.isTouch() ? "touchstart" : "mousedown";

	            this.$zoomIn.on(gesture, this.zoomInToCenter.bind(this));
	            this.$zoomOut.on(gesture, this.zoomOutToCenter.bind(this));
	            this.$home.on(gesture, this.resetToInitialState.bind(this));

	            return this;
	        }
	    }, {
	        key: 'resetToInitialState',
	        value: function resetToInitialState() {
	            this.tileMap.reset();
	        }
	    }, {
	        key: 'zoomInToCenter',
	        value: function zoomInToCenter() {
	            this.zoom(0.1, this.tileMap.view.viewport.center);
	        }
	    }, {
	        key: 'zoomOutToCenter',
	        value: function zoomOutToCenter() {
	            this.zoom(-0.1, this.tileMap.view.viewport.center);
	        }
	    }, {
	        key: 'keyPress',
	        value: function keyPress(e) {
	            switch (e.keyCode) {
	                case 38:
	                    // up
	                    this.handleMovementByKeys(new _Point.Point(0, 1));
	                    break;
	                case 37:
	                    // left
	                    this.handleMovementByKeys(new _Point.Point(1, 0));
	                    break;
	                case 39:
	                    // right
	                    this.handleMovementByKeys(new _Point.Point(-1, 0));
	                    break;
	                case 40:
	                    // down
	                    this.handleMovementByKeys(new _Point.Point(0, -1));
	                    break;
	                case 187: // plus
	                case 107:
	                    // plus numpad
	                    this.zoomInToCenter();
	                    break;
	                case 189: // minus
	                case 109:
	                    // minus numpad
	                    this.zoomOutToCenter();
	                    break;
	                case 72:
	                    // home
	                    this.resetToInitialState();
	                    break;
	                default:
	                    break;
	            }
	            this.tileMap.view.drawIsNeeded = true;
	        }
	    }, {
	        key: 'handleMovementByKeys',
	        value: function handleMovementByKeys(direction) {
	            this.keyTicks++;
	            this.tileMap.view.moveView(direction.multiply(this.keyTicks));
	        }
	    }, {
	        key: 'keyRelease',
	        value: function keyRelease() {
	            this.keyTicks = 0;
	        }

	        /**
	         * momentum flicking
	         * @param  {number} velocity - speed
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'momentumAccerlation',
	        value: function momentumAccerlation(velocity) {
	            this.maxMomentumSteps = 30;
	            this.triggerMomentum(this.maxMomentumSteps, 10, velocity.multiply(-1));
	            return this;
	        }

	        /**
	         * recursive momentum handler
	         * @param  {number} steps - current step (decreasing)
	         * @param  {number} timing - time for step
	         * @param  {Point} change - distance
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'triggerMomentum',
	        value: function triggerMomentum(steps, timing, change) {
	            var _this3 = this;

	            this.momentum = setTimeout(function () {
	                steps--;
	                var delta = _Helper.Helper.easeOutQuadratic((_this3.maxMomentumSteps - steps) * timing, change, change.clone.multiply(-1), timing * _this3.maxMomentumSteps);
	                _this3.moveView(delta);
	                if (steps >= 0) _this3.triggerMomentum(steps, timing, change);
	            }, timing);
	            return this;
	        }

	        /**
	         * move by delta momentum
	         * @param  {Point} delta - delta of x/y
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'moveView',
	        value: function moveView(delta) {
	            this.tileMap.view.moveView(delta);
	            this.tileMap.view.drawIsNeeded = true;
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
	                this.tileMap.view.zoom(factor, position);
	                this.tileMap.view.drawIsNeeded = true;
	            }
	            return this;
	        }

	        /**
	         * handles resizing of window
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'resizeHandler',
	        value: function resizeHandler() {
	            this.tileMap.resize();
	            return this;
	        }

	        /**
	         * called when loading and initialization is finished
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'loadingFinished',
	        value: function loadingFinished() {
	            this.$container.trigger(this.events.loaded);
	            return this;
	        }
	    }]);

	    return MappedJS;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TileMap = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Helper = __webpack_require__(3);

	var _Publisher = __webpack_require__(4);

	var _StateHandler = __webpack_require__(5);

	var _Rectangle = __webpack_require__(6);

	var _View = __webpack_require__(8);

	var _Marker = __webpack_require__(12);

	var _DataEnrichment = __webpack_require__(14);

	var _ToolTip = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TileMap = exports.TileMap = function () {
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

	        /** Constructor
	         * @param  {Object} container - jQuery-object holding the container
	         * @param  {Object} tilesData={} - json object representing data of TileMap
	         * @param  {Object} settings={} - json object representing settings of TileMap
	         * @return {TileMap} instance of TileMap
	         */

	    }]);

	    function TileMap(_ref) {
	        var _this = this;

	        var container = _ref.container;
	        var _ref$tilesData = _ref.tilesData;
	        var tilesData = _ref$tilesData === undefined ? {} : _ref$tilesData;
	        var _ref$settings = _ref.settings;
	        var settings = _ref$settings === undefined ? {} : _ref$settings;

	        _classCallCheck(this, TileMap);

	        if (!container) throw Error("You must define a container to initialize a TileMap");
	        this.$container = container;

	        this.imgData = tilesData[TileMap.IMG_DATA_NAME];
	        this.markerData = tilesData[TileMap.MARKER_DATA_NAME];
	        this.settings = settings;

	        this.levels = [];
	        this.markers = [];

	        _Helper.Helper.forEach(this.imgData, function (element, i) {
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
	     * @return {TileMap} instance of TileMap
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
	    }, {
	        key: 'reset',
	        value: function reset() {
	            if (this.levelHandler.hasPrevious()) {
	                this.levelHandler.changeTo(0);
	                this.view = this.createViewFromData(this.initial.bounds, this.initial.center, this.currentLevelData, this.initial.zoom);
	            } else this.view.reset();
	        }
	    }, {
	        key: 'createViewFromData',
	        value: function createViewFromData(bounds, center, data, zoom) {
	            return new _View.View({
	                viewport: new _Rectangle.Rectangle(this.left, this.top, this.width, this.height),
	                mapView: new _Rectangle.Rectangle(0, 0, data.dimensions.width, data.dimensions.height),
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
	         * @return {View} instance of View for chaining
	         */

	    }, {
	        key: 'initializeMarkers',
	        value: function initializeMarkers(markerData) {
	            var _this2 = this;

	            if (markerData) {
	                markerData = this.enrichMarkerData(markerData);
	                _Helper.Helper.forEach(markerData, function (currentData) {
	                    _this2.markers.push(new _Marker.Marker(currentData, _this2.view));
	                });
	            }
	            return this;
	        }

	        /**
	         * append marker container to DOM
	         * @param  {Object} $container - jQuery-selector
	         * @return {View} instance of View for chaining
	         */

	    }, {
	        key: 'appendMarkerContainerToDom',
	        value: function appendMarkerContainerToDom() {
	            this.$markerContainer = (0, _jQuery2.default)("<div class='marker-container' />");
	            this.$container.append(this.$markerContainer);
	            return this;
	        }
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
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this3 = this;

	            this.eventManager.subscribe("resize", function () {
	                _this3.resize();
	            });

	            this.eventManager.subscribe("next-level", function (argument_array) {
	                var center = argument_array[0],
	                    bounds = argument_array[1],
	                    lastLevel = _this3.levelHandler.current.description;

	                _this3.levelHandler.next();

	                if (lastLevel !== _this3.levelHandler.current.description) {
	                    _this3.view = _this3.createViewFromData(bounds, center.multiply(-1), _this3.currentLevelData, _this3.currentLevelData.zoom.min + 0.0000001);
	                }
	            });

	            this.eventManager.subscribe("previous-level", function (argument_array) {
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
	         * @return {TileMap} instance of TileMap
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
	            this.view.mapView.translate(delta.x, delta.y);
	            return this;
	        }
	    }]);

	    return TileMap;
	}();

	/**
	 * name of image data in data.json
	 * @type {String}
	 */


	TileMap.IMG_DATA_NAME = "img_data";

	/**
	 * name of marker data in data.json
	 * @type {String}
	 */
		TileMap.MARKER_DATA_NAME = "marker";

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Helper = exports.Helper = {
	    /**
	     * request json-data from given file and calls callback on success
	     * @param  {string} filename - path to file
	     * @param  {Function} callback - function called when data is loaded successfully
	     * @return {Helper} Helper object for chaining
	     */

	    requestJSON: function requestJSON(filename, callback) {
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === XMLHttpRequest.DONE) {
	                if (xhr.status === 200) {
	                    if (callback) callback(JSON.parse(xhr.responseText));
	                } else {
	                    throw new Error("The JSON submitted seems not valid", xhr);
	                }
	            }
	        };
	        xhr.open("GET", filename, true);
	        xhr.send();
	        return this;
	    },

	    /**
	     * loads an image and calls callback on success
	     * @param {Function} cb - callback-function on success
	     * @return {Helper} Helper object for chaining
	     */
	    loadImage: function loadImage(path, cb) {
	        var img = new Image();
	        img.onload = function () {
	            if (cb && typeof cb === "function") cb(img);
	        };
	        img.src = path;
	        return this;
	    },

	    /**
	     * for each helper
	     * @param  {Object[]} a - array to iterate over each value
	     * @param  {Function} fn - callback for each object
	     * @return {Helper} Helper object for chaining
	     */
	    forEach: function forEach(a, fn) {
	        for (var i in a) {
	            if (a[i] && typeof fn === "function") fn(a[i], i);
	        }
	        return this;
	    },

	    /**
	     * formula for quadratic ease out
	     * @param  {number} t - current time
	     * @param  {Point} b - start value
	     * @param  {Point} c - total difference to start
	     * @param  {number} d - duration
	     * @return {number} quadratic value at specific time
	     */
	    easeOutQuadratic: function easeOutQuadratic(t, b, c, d) {
	        t /= d;
	        return c.clone.multiply(-1 * t * (t - 2)).add(b);
	    },

	    /**
	     * convert degree to radian
	     * @param {number} degrees - specified degrees
	     * @return {number} converted radian
	     */
	    toRadians: function toRadians(degrees) {
	        return degrees * Math.PI / 180;
	    },
	    /**
	     * checks if mouse is possible
	     * @return {Boolean} if true, mouse is possible
	     */
	    isMouse: function isMouse() {
	        return 'onmousedown' in window;
	    },

	    /**
	     * checks if touch is possible
	     * @return {Boolean} if true, touch is possible
	     */
	    isTouch: function isTouch() {
	        return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	    },

	    /**
	     * checks if IE is used
	     * @return {Boolean} if true, IE is used
	     */
	    isIE: function isIE() {
	        return navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	    },

	    /**
	     * gets cross-browser scroll-event
	     * @return {string} name of scroll event
	     */
	    scrollEvent: function scrollEvent() {
	        return "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
	    }
		};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * singleton instance
	 * @type {Publisher}
	 */
	var instance = null;

	var Publisher = exports.Publisher = function () {

	    /**
	     * Constructor
	     * @return {Publisher} instance of Publisher
	     */

	    function Publisher() {
	        _classCallCheck(this, Publisher);

	        if (!instance) {
	            this.subscribers = {};
	            instance = this;
	        }
	        return instance;
	    }

	    /**
	     * subscribe to a topic
	     * @param  {string} type="any" - a topic
	     * @param  {Function} fn=function(){} - a function to callback
	     * @return {Publisher} instance of Publisher
	     */


	    _createClass(Publisher, [{
	        key: "subscribe",
	        value: function subscribe() {
	            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
	            var fn = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

	            if (!this.subscribers[type]) this.subscribers[type] = [];
	            this.subscribers[type].push(fn);
	            return this;
	        }

	        /**
	         * unsubscribe from a topic
	         * @param  {string} type="any" - a topic
	         * @param  {Function} fn=function(){} - a function to callback
	         * @return {Publisher} instance of Publisher
	         */

	    }, {
	        key: "unsubscribe",
	        value: function unsubscribe() {
	            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
	            var fn = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

	            return this.handle(Publisher.UNSUBSCRIBE, type, fn);
	        }

	        /**
	         * publish to a topic
	         * @param  {string} type="any" - a topic
	         * @param  {Function} arg=[] - list of parameters
	         * @return {Publisher} instance of Publisher
	         */

	    }, {
	        key: "publish",
	        value: function publish() {
	            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
	            var arg = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	            return this.handle(Publisher.PUBLISH, type, arg);
	        }

	        /**
	         * handle subscribe to a topic
	         * @param  {string} action - eventname
	         * @param  {string} type="any" - a topic
	         * @param  {Object} a function to callback or arguments
	         * @return {Publisher} instance of Publisher
	         */

	    }, {
	        key: "handle",
	        value: function handle(action, type, data) {
	            var subs = this.subscribers[type] ? this.subscribers[type] : [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = subs.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _step$value = _slicedToArray(_step.value, 2);

	                    var i = _step$value[0];
	                    var fn = _step$value[1];

	                    if (action === Publisher.PUBLISH) {
	                        fn(data);
	                    } else {
	                        if (fn === data) subs.splice(i, 1);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return this;
	        }

	        /**
	         * destroys singleton instance
	         */

	    }, {
	        key: "destroy",
	        value: function destroy() {
	            instance = null;
	        }
	    }]);

	    return Publisher;
	}();

	/**
	 * Eventname for publishing
	 * @type {String}
	 */


	Publisher.PUBLISH = "publish";

	/**
	 * Eventname for unsubscribing
	 * @type {String}
	 */
		Publisher.UNSUBSCRIBE = "unsubscribe";

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StateHandler = exports.StateHandler = function () {
	    _createClass(StateHandler, [{
	        key: 'current',


	        /**
	         * get current state
	         * @return {Object} current state from STATES-array
	         */
	        get: function get() {
	            return this.states[this.i];
	        }

	        /**
	         * get number of states
	         * @return {number} number of states
	         */

	    }, {
	        key: 'length',
	        get: function get() {
	            return this.states.length;
	        }

	        /**
	         * Constructor
	         * @param  {Array} states_array=[{value: 0, description: 'Default'}] - [description]
	         * @return {StateHandler} instance of StateHandler
	         */

	    }]);

	    function StateHandler() {
	        var states_array = arguments.length <= 0 || arguments[0] === undefined ? [{ value: 0, description: 'Default' }] : arguments[0];

	        _classCallCheck(this, StateHandler);

	        this.states = states_array;
	        this.i = 0;
	        this.lastState = this.current;
	        return this;
	    }

	    /**
	     * get the next element
	     * @return {StateHandler} instance of StateHandler
	     */


	    _createClass(StateHandler, [{
	        key: 'next',
	        value: function next() {
	            this.lastState = this.current;
	            if (this.hasNext()) this.i++;
	            return this;
	        }

	        /**
	         * get the previous element
	         * @return {StateHandler} instance of StateHandler
	         */

	    }, {
	        key: 'previous',
	        value: function previous() {
	            this.lastState = this.current;
	            if (this.hasPrevious()) this.i--;
	            return this;
	        }

	        /**
	         * change the state to specified state
	         * @param {number} state - index of state in array
	         * @return {StateHandler} instance of StateHandler
	         */

	    }, {
	        key: 'changeTo',
	        value: function changeTo(state) {
	            if (state >= 0 && state < this.length) this.i = state;
	            return this;
	        }

	        /**
	         * change the state to specified value of specified property
	         * @param {number} state - index of state in array
	         * @return {StateHandler} instance of StateHandler
	         */

	    }, {
	        key: 'changeToValue',
	        value: function changeToValue(prop, value) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _step$value = _slicedToArray(_step.value, 2);

	                    var i = _step$value[0];
	                    var element = _step$value[1];

	                    if (value === element[prop]) {
	                        this.i = i;
	                        break;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return this;
	        }

	        /**
	         * checks if there is a next element
	         * @return {Boolean} wheter there is a next state or not
	         */

	    }, {
	        key: 'hasNext',
	        value: function hasNext() {
	            return this.i < this.length - 1;
	        }

	        /**
	         * checks if there is a previous element
	         * @return {Boolean} wheter there is a previous state or not
	         */

	    }, {
	        key: 'hasPrevious',
	        value: function hasPrevious() {
	            return this.i > 0;
	        }
	    }]);

	    return StateHandler;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Rectangle = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Point2 = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rectangle = exports.Rectangle = function (_Point) {
	  _inherits(Rectangle, _Point);

	  _createClass(Rectangle, [{
	    key: 'center',


	    /**
	     * get center-position of rectangle
	     * @return {Point} center point
	     */
	    get: function get() {
	      return new _Point2.Point(this.x + this.width / 2, this.y + this.height / 2);
	    }

	    /**
	     * get top-left-position of rectangle
	     * @return {Point} top-left point
	     */

	  }, {
	    key: 'topLeft',
	    get: function get() {
	      return new _Point2.Point(this.x, this.y);
	    }

	    /**
	     * get top-right-position of rectangle
	     * @return {Point} top-right point
	     */

	  }, {
	    key: 'topRight',
	    get: function get() {
	      return new _Point2.Point(this.x + this.width, this.y);
	    }

	    /**
	     * get bottom-left-position of rectangle
	     * @return {Point} bottom-left point
	     */

	  }, {
	    key: 'bottomLeft',
	    get: function get() {
	      return new _Point2.Point(this.x, this.y + this.height);
	    }

	    /**
	     * get bottom-right-position of rectangle
	     * @return {Point} bottom-right point
	     */

	  }, {
	    key: 'bottomRight',
	    get: function get() {
	      return new _Point2.Point(this.x + this.width, this.y + this.height);
	    }

	    /**
	     * Returns right position of Rectangle
	     * @return {number} right position
	     */

	  }, {
	    key: 'right',
	    get: function get() {
	      return this.x + this.width;
	    }

	    /**
	     * Returns left position of Rectangle
	     * @return {number} left position
	     */

	  }, {
	    key: 'left',
	    get: function get() {
	      return this.x;
	    }

	    /**
	     * Returns top position of Rectangle
	     * @return {number} top position
	     */

	  }, {
	    key: 'top',
	    get: function get() {
	      return this.y;
	    }

	    /**
	     * Returns bottom position of Rectangle
	     * @return {number} bottom position
	     */

	  }, {
	    key: 'bottom',
	    get: function get() {
	      return this.y + this.height;
	    }

	    /**
	     * clones a rectangle
	     * @return {Rectangle} duplicated rectangle
	     */

	  }, {
	    key: 'clone',
	    get: function get() {
	      return Rectangle.createFromRectangle(this);
	    }

	    /**
	     * Constructor
	     * @param  {number} x=0 - x-position of specified rectangle
	     * @param  {number} y=0 - y-position of specified rectangle
	     * @param  {number} width=0 - width of specified rectangle
	     * @param  {number} height=0 - height of specified rectangle
	     * @return {Rectangle} instance of Rectangle
	     */

	  }]);

	  function Rectangle() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	    var _ret;

	    var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	    _classCallCheck(this, Rectangle);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rectangle).call(this, x, y));

	    _this.width = width;
	    _this.height = height;
	    return _ret = _this, _possibleConstructorReturn(_this, _ret);
	  }

	  /**
	   * Checks whether Rectangle intersects with specified Rectangle
	   * @param  {Rectangle} rect = new Rectangle() - the specified rectangle to check against
	   * @return {Boolean} true if containment is entirely
	   */


	  _createClass(Rectangle, [{
	    key: 'intersects',
	    value: function intersects() {
	      var rect = arguments.length <= 0 || arguments[0] === undefined ? new Rectangle() : arguments[0];

	      return !(rect.left > this.right || rect.right < this.left || rect.top > this.bottom || rect.bottom < this.top);
	    }

	    /**
	     * Checks whether Rectangle entirely contains the Rectangle or Point
	     * @param  {Rectangle|Point} rectOrPoint - the specified point or rectangle to check against
	     * @return {Boolean} true if containment is entirely
	     */

	  }, {
	    key: 'contains',
	    value: function contains(rectOrPoint) {
	      return rectOrPoint instanceof Rectangle ? this.containsRect(rectOrPoint) : rectOrPoint instanceof _Point2.Point ? this.containsPoint(rectOrPoint) : false;
	    }

	    /**
	     * Sets the center of this Rectangle to specified point
	     * @param  {Point} point = new Point() - specified point to set center of rectangle to
	     * @return {Rectangle} instance of Rectangle
	     */

	  }, {
	    key: 'setCenter',
	    value: function setCenter() {
	      var point = arguments.length <= 0 || arguments[0] === undefined ? new _Point2.Point() : arguments[0];

	      var difference = point.substract(this.center);
	      this.translate(difference.x, difference.y);
	      return this;
	    }

	    /**
	     * Sets the x-center of this Rectangle to specified x
	     * @param  {number} x = 0 - specified x coordinate to set x center of rectangle to
	     * @return {Rectangle} instance of Rectangle
	     */

	  }, {
	    key: 'setCenterX',
	    value: function setCenterX() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      var difference = x - this.center.x;
	      this.translate(difference, 0);
	      return this;
	    }

	    /**
	     * Sets the y-center of this Rectangle to specified y
	     * @param  {number} y = 0 - specified y coordinate to set y center of rectangle to
	     * @return {Rectangle} instance of Rectangle
	     */

	  }, {
	    key: 'setCenterY',
	    value: function setCenterY() {
	      var y = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      var difference = y - this.center.y;
	      this.translate(0, difference);
	      return this;
	    }

	    /**
	     * Checks whether Rectangle entirely contains the Point
	     * @param  {Point} point = new Point() - the specified point to check against
	     * @return {Boolean} true if containment is entirely
	     */

	  }, {
	    key: 'containsPoint',
	    value: function containsPoint() {
	      var point = arguments.length <= 0 || arguments[0] === undefined ? new _Point2.Point() : arguments[0];

	      return point instanceof _Point2.Point ? point.x >= this.left && point.y >= this.top && point.x <= this.right && point.y <= this.bottom : false;
	    }

	    /**
	     * Checks whether Rectangle entirely contains the Rectangle
	     * @param  {Rectangle} rect = new Rectangle() - the specified rectangle to check against
	     * @return {Boolean} true if containment is entirely
	     */

	  }, {
	    key: 'containsRect',
	    value: function containsRect() {
	      var rect = arguments.length <= 0 || arguments[0] === undefined ? new Rectangle() : arguments[0];

	      return rect instanceof Rectangle ? rect.left >= this.left && rect.top >= this.top && rect.right <= this.right && rect.bottom <= this.bottom : false;
	    }

	    /**
	     * distorts rectangle by factor
	     * @param  {number} factor = 1 - the specified factor of distortion
	     * @return {Rectangle} a new instance of Rectangle
	     */

	  }, {
	    key: 'getDistortedRect',
	    value: function getDistortedRect() {
	      var factor = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	      return new Rectangle(this.x, this.y, this.width, this.height).scaleX(factor);
	    }

	    /**
	     * redistorts rectangle by factor
	     * @param  {number} factor = 1- the specified factor of distortion
	     * @return {Rectangle} a new instance of Rectangle
	     */

	  }, {
	    key: 'getNormalRect',
	    value: function getNormalRect() {
	      var factor = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	      return new Rectangle(this.x, this.y, this.width, this.height).scaleX(1 / factor);
	    }

	    /**
	     * scale x and width of rectangle
	     * @param  {number} x = 1 - factor to be applied to scale
	     * @return {Rectangle} scaled Rectangle
	     */

	  }, {
	    key: 'scaleX',
	    value: function scaleX() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	      this.x *= x;
	      this.width *= x;
	      return this;
	    }

	    /**
	     * scale y and height of rectangle
	     * @param  {number} y = 1- factor to be applied to scale
	     * @return {Rectangle} new scaled Rectangle
	     */

	  }, {
	    key: 'scaleY',
	    value: function scaleY() {
	      var y = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	      this.y *= y;
	      this.height *= y;
	      return this;
	    }

	    /**
	     * scale x and y for width and height of rectangle
	     * @param  {number} x = 1 - factor to be applied to scale
	     * @param  {number} y = x - factor to be applied to scale
	     * @return {Rectangle} new scaled Rectangle
	     */

	  }, {
	    key: 'scale',
	    value: function scale() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

	      this.scaleX(x);
	      this.scaleY(y);
	      return this;
	    }

	    /**
	     * moves a rectangle by specified coords
	     * @param  {number} x = 0 - specified x to be added to x position
	     * @param  {number} y = x - specified y to be added to y position
	     * @return {Rectangle} Returns the altered rectangle
	     */

	  }, {
	    key: 'translate',
	    value: function translate() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

	      _get(Object.getPrototypeOf(Rectangle.prototype), 'translate', this).call(this, x, y);
	      return this;
	    }

	    /**
	     * transforms a rectangle by specified coords
	     * @param  {number} x = 0 - specified x to be added to x position
	     * @param  {number} y = x - specified y to be added to y position
	     * @param  {number} width = 0 - specified width to be added to this width
	     * @param  {number} height = 0 - specified height to be added to this height
	     * @return {Rectangle} Returns the altered rectangle
	     */

	  }, {
	    key: 'transform',
	    value: function transform() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];
	      var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	      var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	      this.translate(x, y);
	      this.width += width;
	      this.height += height;
	      return this;
	    }

	    /**
	     * changes the position a rectangle by specified coords
	     * @param  {number} x = 0 - the new x position
	     * @param  {number} y = 0 - he new y position
	     * @return {Rectangle} Returns the altered rectangle
	     */

	  }, {
	    key: 'position',
	    value: function position() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	      _get(Object.getPrototypeOf(Rectangle.prototype), 'position', this).call(this, x, y);
	      return this;
	    }

	    /**
	     * changes the size of a rectangle by specified params
	     * @param  {number} x = 0- the new x position
	     * @param  {number} y = x - the new y position
	     * @param  {number} width = 0 - the new width
	     * @param  {number} height = 0 - the new width
	     * @return {Rectangle} Returns the altered rectangle
	     */

	  }, {
	    key: 'size',
	    value: function size() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];
	      var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	      var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	      this.position(x, y);
	      this.width = width;
	      this.height = height;
	      return this;
	    }

	    /**
	     * changes the size of a rectangle by specified params
	     * @param  {number} width = 0 - the new width
	     * @param  {number} height = width - the new width
	     * @return {Rectangle} Returns the altered rectangle
	     */

	  }, {
	    key: 'setSize',
	    value: function setSize() {
	      var width = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var height = arguments.length <= 1 || arguments[1] === undefined ? width : arguments[1];

	      this.width = width;
	      this.height = height;
	      return this;
	    }

	    /**
	     * check if rectangles are equal
	     * @param  {Rectangle} rectangle - the specified rectangle to check against this
	     * @return {Boolean} is true, if x, y, width and height are the same
	     */

	  }, {
	    key: 'equals',
	    value: function equals(rectangle) {
	      return rectangle instanceof Rectangle ? this.x === rectangle.x && this.y === rectangle.y && this.width === rectangle.width && this.height === rectangle.height : false;
	    }
	  }]);

	  return Rectangle;
	}(_Point2.Point);

	/**
	 * Creates a Rectangle from specified Rectangle
	 * @param  {Rectangle} rect - specified Rectangle
	 * @return {Rectangle} the point specified
	 */


	Rectangle.createFromRectangle = function (rect) {
	  return new Rectangle(rect.x, rect.y, rect.width, rect.height);
		};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = exports.Point = function () {
	  _createClass(Point, [{
	    key: "length",


	    /**
	     * length of a point
	     * @return {number} length of a point
	     */
	    get: function get() {
	      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	    }

	    /**
	     * gets a clone of this point
	     * @return {Point} new instance equals this point
	     */

	  }, {
	    key: "clone",
	    get: function get() {
	      return Point.createFromPoint(this);
	    }

	    /**
	     * gets absolute Point
	     * @return {Point} returns Point with absolute values
	     */

	  }, {
	    key: "abs",
	    get: function get() {
	      return new Point(Math.abs(this.x), Math.abs(this.y));
	    }

	    /**
	     * Constructor
	     * @param  {number} x = 0 - representation of x coordinate
	     * @param  {number} y = 0 - representation of y coordinate
	     * @return {Point} new instance of point
	     */

	  }]);

	  function Point() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	    _classCallCheck(this, Point);

	    this.x = x;
	    this.y = y;
	    return this;
	  }

	  /**
	   * substracts 2 points
	   * @param  {Point} point = new Point() - the point to substract from this
	   * @return {Point} difference between this point and parameter point
	   */


	  _createClass(Point, [{
	    key: "substract",
	    value: function substract() {
	      var point = arguments.length <= 0 || arguments[0] === undefined ? new Point() : arguments[0];

	      this.x -= point.x;
	      this.y -= point.y;
	      return this;
	    }

	    /**
	     * adds 2 points
	     * @param  {Point} point = new Point() - the point to add to this
	     * @return {Point} addition of this point and parameter point
	     */

	  }, {
	    key: "add",
	    value: function add() {
	      var point = arguments.length <= 0 || arguments[0] === undefined ? new Point() : arguments[0];

	      this.x += point.x;
	      this.y += point.y;
	      return this;
	    }

	    /**
	     * multiplicates a point with a given x and y
	     * @param  {number} x = 1 - factor to multiplicate x with
	     * @param  {number} y - factor to multiplicate y with
	     * @return {Point} Returns a new instance
	     */

	  }, {
	    key: "multiply",
	    value: function multiply() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

	      this.x *= x;
	      this.y *= y;
	      return this;
	    }

	    /**
	     * divide a point with a given x and y
	     * @param  {number} x = 1 - factor to divide x with
	     * @param  {number} y - factor to divide y with
	     * @return {Point} Returns a new instance
	     */

	  }, {
	    key: "divide",
	    value: function divide() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

	      this.x /= x;
	      this.y /= y;
	      return this;
	    }

	    /**
	     * check if points are equal
	     * @param  {Point} point - the point to check against this
	     * @return {Boolean} is true, if x and y are the same
	     */

	  }, {
	    key: "equals",
	    value: function equals(point) {
	      return this.x === point.x && this.y === point.y;
	    }

	    /**
	     * Returns the distance from this Point to a specified Point
	     * @param  {Point} point = new Point() - the specified point to be measured against this Point
	     * @return {Point} the distance between this Point and specified point
	     */

	  }, {
	    key: "distance",
	    value: function distance() {
	      var point = arguments.length <= 0 || arguments[0] === undefined ? new Point() : arguments[0];

	      return this.clone.substract(point).length;
	    }

	    /**
	     * translates a point by x and y
	     * @param  {number} x = 0 - value to move x
	     * @param  {number} y = x - value to move y
	     * @return {Point} instance of Point
	     */

	  }, {
	    key: "translate",
	    value: function translate() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

	      this.x += x;
	      this.y += y;
	      return this;
	    }

	    /**
	     * positions a point by x and y
	     * @param  {number} x - value to position x
	     * @param  {number} y - value to position y
	     * @return {Point} instance of Point
	     */

	  }, {
	    key: "position",
	    value: function position() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

	      this.x = x;
	      this.y = y;
	      return this;
	    }

	    /**
	     * translates a Point to an array
	     * @return {Array} Returns Point as Array(x, y)
	     */

	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return [this.x, this.y];
	    }
	  }]);

	  return Point;
	}();

	/**
	 * Creates a Point from specified point
	 * @param  {Point} point - specified point
	 * @return {Point} the point specified
	 */


	Point.createFromPoint = function (point) {
	  return new Point(point.x, point.y);
		};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.View = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Helper = __webpack_require__(3);

	var _Point = __webpack_require__(7);

	var _LatLng = __webpack_require__(9);

	var _Bounds = __webpack_require__(10);

	var _Rectangle = __webpack_require__(6);

	var _Tile = __webpack_require__(11);

	var _Publisher = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = exports.View = function () {
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
	            var _this = this;

	            return this.tiles.filter(function (t) {
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
	         * Constructor
	         * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
	         * @param  {Rectangle} mapView = new Rectangle() - current representation of map
	         * @param  {Bounds} bounds = new Bounds() - current bounds of map
	         * @param  {LatLng} center = new LatLng() - current center of map
	         * @param  {Object} data = {} - tile data of current map
	         * @param  {Object} markerData = {} - marker data of current map
	         * @param  {Object} $container = null - parent container for markers
	         * @param  {Object} context = null - canvas context for drawing
	         * @param  {number} maxZoom = 1.5 - maximal zoom of view
	         * @param  {number} minZoom = 0.8 - minimal zoom of view
	         * @return {View} instance of View for chaining
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
	        var _ref$limitToBounds = _ref.limitToBounds;
	        var limitToBounds = _ref$limitToBounds === undefined ? bounds : _ref$limitToBounds;

	        _classCallCheck(this, View);

	        this.$markerContainer = $markerContainer;
	        this.mapView = mapView;
	        this.originalMapView = mapView.clone;
	        this.viewport = viewport;
	        this.bounds = bounds;
	        this.center = center;
	        this.zoomFactor = currentZoom;
	        this.maxZoom = maxZoom;
	        this.minZoom = minZoom;
	        this.origin = new _Point.Point(0, 0);
	        this.eventManager = new _Publisher.Publisher();
	        this.limitToBounds = limitToBounds;

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
	                this.drawIsNeeded = false;
	                this.context.clearRect(0, 0, this.viewport.width, this.viewport.height);
	                this.draw();
	            }
	            window.requestAnimFrame(function () {
	                return _this2.mainLoop();
	            });
	        }

	        /**
	         * loads thumbnail of view
	         * @return {View} instance of View for chaining
	         */

	    }, {
	        key: 'loadThumb',
	        value: function loadThumb() {
	            _Helper.Helper.loadImage(this.data.thumb, function (img) {
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

	            this.drawIsNeeded = true;

	            if (this.zoomFactor >= this.maxZoom) {
	                this.eventManager.publish("next-level", [this.center, this.bounds]);
	            } else if (this.zoomFactor <= this.minZoom) {
	                this.eventManager.publish("previous-level", [this.center, this.bounds]);
	            }

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
	            var redo = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];


	            var nw = this.convertLatLngToPoint(this.limitToBounds.nw),
	                so = this.convertLatLngToPoint(this.limitToBounds.so),
	                limit = new _Rectangle.Rectangle(nw.x + this.currentView.x, nw.y + this.currentView.y, so.x - nw.x, so.y - nw.y);

	            pos.divide(this.distortionFactor, 1);
	            var equalizedMap = limit.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter + pos.x, pos.y);
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

	            // TODO: could be more optimized
	            if (redo) this.moveView(new _Point.Point(), false);

	            return this;
	        }

	        /**
	         * Handles draw of visible elements
	         * @return {View} instance of View for chaining
	         */

	    }, {
	        key: 'draw',
	        value: function draw() {
	            return this.drawThumbnail().repositionMarkerContainer().drawVisibleTiles();
	        }

	        /**
	         * draws all visible tiles
	         * @return {View} instance of View for chaining
	         */

	    }, {
	        key: 'drawVisibleTiles',
	        value: function drawVisibleTiles() {
	            _Helper.Helper.forEach(this.visibleTiles, function (tile) {
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
	            var _this3 = this;

	            var currentLevel = this.data.tiles;
	            _Helper.Helper.forEach(currentLevel, function (currentTileData) {
	                _this3.tiles.push(new _Tile.Tile(currentTileData, _this3));
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


	window.requestAnimFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	}();

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LatLng = exports.LatLng = function () {
	    _createClass(LatLng, [{
	        key: "length",


	        /**
	         * length of a latlng
	         * @return {number} length of a latlng
	         */
	        get: function get() {
	            return Math.sqrt(Math.pow(this.lat, 2) + Math.pow(this.lng, 2));
	        }

	        /**
	         * gets a clone of this latlng
	         * @return {LatLng} new instance equals this latlng
	         */

	    }, {
	        key: "clone",
	        get: function get() {
	            return LatLng.createFromLatLng(this);
	        }

	        /**
	         * Constructor
	         * @param  {number} lat = 0 - representation of latitude
	         * @param  {number} lng = 0 - representation of longitude
	         * @param  {Boolean} isDistance = false - if LatLng should be checked against bounds
	         * @return {LatLng} new instance of LatLng
	         */

	    }]);

	    function LatLng() {
	        var lat = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var lng = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	        _classCallCheck(this, LatLng);

	        this.lat = lat;
	        this.lng = lng;
	        return this;
	    }

	    /**
	     * substract specified coord from this coordinate
	     * @param  {LatLng} coord = new LatLng() - specified coordinate to substract from this coord
	     * @return {LatLng} the new calculated LatLng
	     */


	    _createClass(LatLng, [{
	        key: "substract",
	        value: function substract() {
	            var coord = arguments.length <= 0 || arguments[0] === undefined ? new LatLng() : arguments[0];

	            this.lat -= coord.lat;
	            this.lng -= coord.lng;
	            return this;
	        }

	        /**
	         * add specified coord to this coordinate
	         * @param  {LatLng} coord = new LatLng() - specified coordinate to add to this coord
	         * @return {LatLng} the new calculated LatLng
	         */

	    }, {
	        key: "add",
	        value: function add() {
	            var coord = arguments.length <= 0 || arguments[0] === undefined ? new LatLng() : arguments[0];

	            this.lat += coord.lat;
	            this.lng += coord.lng;
	            return this;
	        }

	        /**
	        * divides a latlng with a given factor
	        * @param  {number} factorLat = 1 - factor to divide lat with
	        * @param  {number} factorLng = factorLat - factor to divide lng with
	         * @return {LatLng} Returns instance for chaining
	         */

	    }, {
	        key: "divide",
	        value: function divide() {
	            var factorLat = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	            var factorLng = arguments.length <= 1 || arguments[1] === undefined ? factorLat : arguments[1];

	            this.lat /= factorLat;
	            this.lng /= factorLng;
	            return this;
	        }

	        /**
	         * multiplicates a latlng with a given factor
	         * @param  {number} factorLat = 1 - factor to multiplicate lat with
	         * @param  {number} factorLng = factorLat - factor to multiplicate lng with
	         * @return {LatLng} Returns instance for chaining
	         */

	    }, {
	        key: "multiply",
	        value: function multiply() {
	            var factorLat = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	            var factorLng = arguments.length <= 1 || arguments[1] === undefined ? factorLat : arguments[1];

	            this.lat *= factorLat;
	            this.lng *= factorLng;
	            return this;
	        }

	        /**
	         * checks if specified coord equals this coord
	         * @param  {LatLng} coord - specified coord to check against
	         * @return {Boolean} Returns if specified coord equals this coord
	         */

	    }, {
	        key: "equals",
	        value: function equals(coord) {
	            return this.lat === coord.lat && this.lng === coord.lng;
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            return "(" + this.lat + ", " + this.lng + ")";
	        }
	    }]);

	    return LatLng;
	}();

	/**
	 * Creates a LatLng from specified LatLng
	 * @param  {LatLng} LatLng - specified LatLng
	 * @return {LatLng} the LatLng specified
	 */


	LatLng.createFromLatLng = function (latlng) {
	    return new LatLng(latlng.lat, latlng.lng);
		};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Bounds = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LatLng = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bounds = exports.Bounds = function () {
	    _createClass(Bounds, [{
	        key: 'width',


	        /**
	         * get width of boundaries
	         * @return {number} width of boundaries
	         */
	        get: function get() {
	            return Math.abs(this.so.lng - this.nw.lng);
	        }

	        /**
	         * get height of boundaries
	         * @return {number} height of boundaries
	         */

	    }, {
	        key: 'height',
	        get: function get() {
	            return Math.abs(this.so.lat - this.nw.lat);
	        }

	        /**
	         * get size
	         * @return {Point} calculated Size of boundaries
	         */

	    }, {
	        key: 'range',
	        get: function get() {
	            return this.nw.clone.substract(this.so);
	        }

	        /**
	         * Constructor
	         * @param  {number} northWest = new LatLng() - representation of northWest boundary
	         * @param  {number} southEast = new LatLng() - representation of southEast boundary
	         * @return {Bounds} instance of Bounds for chaining
	         */

	    }]);

	    function Bounds() {
	        var northWest = arguments.length <= 0 || arguments[0] === undefined ? new _LatLng.LatLng() : arguments[0];
	        var southEast = arguments.length <= 1 || arguments[1] === undefined ? new _LatLng.LatLng() : arguments[1];

	        _classCallCheck(this, Bounds);

	        if (northWest.lat < southEast.lat || northWest.lng > southEast.lng) throw new Error(northWest + ' needs to be top-right corner and ' + southEast + ' bottom-left');
	        this.nw = northWest;
	        this.so = southEast;
	        return this;
	    }

	    return Bounds;
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tile = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Helper = __webpack_require__(3);

	var _StateHandler = __webpack_require__(5);

	var _Rectangle2 = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * States of a tile
	 * @type {Array}
	 */
	var STATES = [{ value: 0, description: 'Starting' }, { value: 1, description: 'Initialized' }, { value: 2, description: 'Loaded' }, { value: 3, description: 'Drawn' }];

	var Tile = exports.Tile = function (_Rectangle) {
	    _inherits(Tile, _Rectangle);

	    /**
	     * Constructor
	     * @param  {string} path = null - path to image
	     * @param  {number} x = 0 - position x of tile
	     * @param  {number} y = 0 - position y of tile
	     * @param  {number} w = 0 - tile width
	     * @param  {number} h = 0 - tile height
	     * @param  {View} _instance = null - instance of parent View
	     * @return {Tile} instance of Tile
	     */

	    function Tile() {
	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        var path = _ref.path;
	        var _ref$x = _ref.x;
	        var x = _ref$x === undefined ? 0 : _ref$x;
	        var _ref$y = _ref.y;
	        var y = _ref$y === undefined ? 0 : _ref$y;
	        var _ref$w = _ref.w;
	        var w = _ref$w === undefined ? 0 : _ref$w;
	        var _ref$h = _ref.h;
	        var h = _ref$h === undefined ? 0 : _ref$h;

	        var _ret;

	        var _instance = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	        _classCallCheck(this, Tile);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this, x, y, w, h));

	        if (!path || typeof path !== "string" || path.length === 0) throw new TypeError('Path ' + path + ' needs to be of type string and should not be empty');else if (!_instance) throw new Error('Tile needs an instance');

	        _this.state = new _StateHandler.StateHandler(STATES);
	        _this.instance = _instance;
	        _this.context = _this.instance.context;
	        _this.path = path;

	        return _ret = _this, _possibleConstructorReturn(_this, _ret);
	    }

	    /**
	     * initializes tile and starts loading image
	     * @return {Tile} instance of Tile for chaining
	     */


	    _createClass(Tile, [{
	        key: 'initialize',
	        value: function initialize() {
	            var _this2 = this;

	            this.state.next();
	            _Helper.Helper.loadImage(this.path, function (img) {
	                _this2.img = img;
	                _this2.state.next();
	                _this2.draw();
	            });
	            return this;
	        }

	        /**
	         * draws image data of tile on context
	         * @return {Tile} instance of Tile for chaining
	         */

	    }, {
	        key: 'draw',
	        value: function draw() {
	            var distortedTile = this.clone.scale(this.instance.zoomFactor).translate(this.instance.currentView.x, this.instance.currentView.y).scaleX(this.instance.distortionFactor).translate(this.instance.offsetToCenter, 0);
	            if (this.state.current.value >= 2) {
	                if (!this.context) {
	                    console.error("context not specified", this);
	                    return false;
	                }
	                this.state.next();
	                this.context.drawImage(this.img, distortedTile.x, distortedTile.y, distortedTile.width, distortedTile.height);
	            } else if (this.state.current.value === 0) {
	                this.initialize();
	            }
	            return this;
	        }

	        /**
	         * check if tiles are equal
	         * @param  {Tile} tile - the specified tile to check against this
	         * @return {Boolean} is true, if x, y, width and height and path are the same
	         */

	    }, {
	        key: 'equals',
	        value: function equals(tile) {
	            return tile instanceof Tile ? _get(Object.getPrototypeOf(Tile.prototype), 'equals', this).call(this, tile) && this.path === tile.path : false;
	        }
	    }]);

	    return Tile;
	}(_Rectangle2.Rectangle);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Marker = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Events = __webpack_require__(13);

	var _Helper = __webpack_require__(3);

	var _Point = __webpack_require__(7);

	var _Publisher = __webpack_require__(4);

	var _DataEnrichment = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Marker = exports.Marker = function () {

	    /**
	     * Constructor
	     * @param  {Object} data = DataEnrichment.DATA_MARKER - enriched data
	     * @param  {View} _instance = parent instance - instance of parent view
	     * @return {Marker} - instance of Marker for chaining
	     */

	    function Marker() {
	        var data = arguments.length <= 0 || arguments[0] === undefined ? _DataEnrichment.DataEnrichment.DATA_MARKER : arguments[0];

	        var _instance = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	        _classCallCheck(this, Marker);

	        if (!_instance) throw new Error('Tile needs an instance');
	        this.instance = _instance;

	        this.size = data.size;

	        this.hover = data.hover;
	        if (this.hover) this.size.divide(2, 1);

	        this.img = data.icon;
	        this.offset = data.offset.add(new _Point.Point(-(this.size.x / 2), -this.size.y));
	        this.latlng = data.latlng;

	        this.content = data.content;
	        this.position = this.instance.convertLatLngToPoint(this.latlng);
	        this.$icon = this.addMarkerToDOM(this.instance.$markerContainer);

	        return this.bindEvents().positionMarker();
	    }

	    _createClass(Marker, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;

	            this.eventManager = new _Publisher.Publisher();

	            var gesture = _Helper.Helper.isTouch() ? "touchstart" : "mousedown";

	            this.$icon.on(gesture, function () {
	                _this.eventManager.publish(_Events.Events.ToolTip.OPEN, _this.content);
	                _this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
	                _this.$icon.addClass("active");
	            });

	            this.eventManager.subscribe(_Events.Events.Marker.DEACTIVATE, function () {
	                _this.$icon.removeClass("active");
	            });

	            return this;
	        }

	        /**
	         * adds a marker to the DOM
	         * @param {Object} $container - container to append to (jQuery selector)
	         * @returns {Object} jQuery-selector of append markup
	         */

	    }, {
	        key: 'addMarkerToDOM',
	        value: function addMarkerToDOM($container) {
	            var icon = (0, _jQuery2.default)("<div class='marker' />").css({
	                "width": this.size.x + 'px',
	                "height": this.size.y + 'px',
	                "margin-left": this.offset.x + 'px',
	                "margin-top": this.offset.y + 'px',
	                "background-image": 'url(' + this.img + ')',
	                "background-size": (this.hover ? this.size.x * 2 : this.size.x) + 'px ' + this.size.y + 'px'
	            });
	            if ($container) {
	                icon.hide();
	                $container.append(icon);
	            }
	            return icon;
	        }

	        /**
	         * set initial position of this marker
	         * @return {Marker} - instance of Marker for chaining
	         */

	    }, {
	        key: 'positionMarker',
	        value: function positionMarker() {
	            this.position = this.instance.convertLatLngToPoint(this.latlng);
	            if (this.$icon) {
	                this.$icon.css({
	                    "left": this.position.x / this.instance.currentView.width * 100 + '%',
	                    "top": this.position.y / this.instance.currentView.height * 100 + '%'
	                }).show();
	            }
	            return this;
	        }
	    }]);

	    return Marker;
	}();

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Events = exports.Events = {
	    ToolTip: {
	        OPEN: "tooltip-open",
	        CLOSE: "tooltip-close"
	    },
	    Marker: {
	        DEACTIVATE: "deactivate-marker"
	    }
		};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DataEnrichment = undefined;

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Point = __webpack_require__(7);

	var _LatLng = __webpack_require__(9);

	var _Bounds = __webpack_require__(10);

	var _Helper = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DataEnrichment = exports.DataEnrichment = {
	    /**
	     * enriches marker data with all needed data
	     * @param  {object} data - specified data for marker
	     * @param  {Function} cb - callback function, when enrichment is done
	     * @return {DataEnrichment} DataEnrichment object for chaining
	     */

	    marker: function marker(data) {

	        var enrichedData = [];

	        _Helper.Helper.forEach(data, function (entry) {
	            entry = Object.assign(DataEnrichment.DATA_MARKER, entry);

	            var offset = new _Point.Point(entry.offset.x, entry.offset.y),
	                latlng = new _LatLng.LatLng(entry.position.lat, entry.position.lng),
	                size = new _Point.Point(entry.size.width, entry.size.height);

	            enrichedData.push({
	                offset: offset,
	                latlng: latlng,
	                size: size,
	                hover: entry.hover,
	                icon: entry.icon,
	                content: entry.content
	            });
	        });

	        return enrichedData;
	    },
	    mapSettings: function mapSettings(data) {

	        var enrichedData = Object.assign(DataEnrichment.MAP_SETTINGS, data),
	            bounds = new _Bounds.Bounds(new _LatLng.LatLng(enrichedData.bounds.northWest[0], enrichedData.bounds.northWest[1]), new _LatLng.LatLng(enrichedData.bounds.southEast[0], enrichedData.bounds.southEast[1])),
	            center = new _LatLng.LatLng(enrichedData.center.lat, enrichedData.center.lng);

	        if (!enrichedData.limitToBounds) {
	            enrichedData.limitToBounds = bounds;
	        } else {
	            enrichedData.limitToBounds = new _Bounds.Bounds(new _LatLng.LatLng(enrichedData.limitToBounds.northWest[0], enrichedData.limitToBounds.northWest[1]), new _LatLng.LatLng(enrichedData.limitToBounds.southEast[0], enrichedData.limitToBounds.southEast[1]));
	        }

	        enrichedData.bounds = bounds;
	        enrichedData.center = center;

	        return enrichedData;
	    }
	};

	/**
	 * Default initial values for a Marker
	 * @type {Object}
	 */
	DataEnrichment.DATA_MARKER = {
	    icon: null,
	    hover: false,
	    position: {
	        lat: 0,
	        lng: 0
	    },
	    offset: {
	        x: 0,
	        y: 0
	    },
	    size: {
	        width: 32,
	        height: 32
	    },
	    content: []
	};

	DataEnrichment.MAP_SETTINGS = {
	    level: 0,
	    center: { "lat": 0, "lng": 0 },
	    bounds: {
	        "northWest": [90, -180],
	        "southEast": [-90, 180]
	    },
	    controls: {
	        zoom: false,
	        home: false,
	        position: "bottom-right",
	        theme: "dark"
	    }
		};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ToolTip = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Handlebars = __webpack_require__(16);

	var _Handlebars2 = _interopRequireDefault(_Handlebars);

	var _Events = __webpack_require__(13);

	var _Helper = __webpack_require__(3);

	var _Publisher = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ToolTip = exports.ToolTip = function () {
	    _createClass(ToolTip, [{
	        key: 'allTemplatesLoaded',
	        get: function get() {
	            return this.loadedTemplates === Object.keys(this.templates).length;
	        }
	    }]);

	    function ToolTip(_ref) {
	        var container = _ref.container;
	        var templates = _ref.templates;

	        _classCallCheck(this, ToolTip);

	        this.$container = typeof container === "string" ? (0, _jQuery2.default)(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : (0, _jQuery2.default)(container);
	        if (!(this.$container instanceof jQuery)) throw new Error("Container " + container + " not found");

	        this.$container.addClass(_Events.Events.ToolTip.CLOSE);

	        this.$close = (0, _jQuery2.default)('<span class=\'close-button\' />');
	        this.$content = (0, _jQuery2.default)('<div class=\'tooltip-content\' />');
	        this.$popup = (0, _jQuery2.default)('<div class=\'tooltip-container\' />').append(this.$close).append(this.$content);
	        this.eventManager = new _Publisher.Publisher();

	        this.bindEvents();
	        this.registerHandlebarHelpers();

	        return this.setPosition().initializeTemplates(templates);
	    }

	    _createClass(ToolTip, [{
	        key: 'registerHandlebarHelpers',
	        value: function registerHandlebarHelpers() {
	            if (_Handlebars2.default) {
	                _Handlebars2.default.registerHelper('getRatio', function (w, h) {
	                    return h / w * 100 + "%";
	                });
	            }
	        }
	    }, {
	        key: 'initializeTemplates',
	        value: function initializeTemplates(templates) {
	            this.templates = this.getDefaultTemplates();
	            Object.assign(this.templates, templates);
	            this.loadedTemplates = 0;
	            this.compileTemplates();
	            return this;
	        }
	    }, {
	        key: 'getDefaultTemplates',
	        value: function getDefaultTemplates() {
	            return {
	                image: "/plugin/src/hbs/image.hbs",
	                text: "/plugin/src/hbs/text.hbs",
	                headline: "/plugin/src/hbs/headline.hbs",
	                crossheading: "/plugin/src/hbs/crossheading.hbs",
	                iframe: "/plugin/src/hbs/iframe.hbs"
	            };
	        }
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;

	            (0, _jQuery2.default)(window).on("resize orientationchange", function () {
	                _this.resizeHandler();
	            });
	            this.eventManager.subscribe(_Events.Events.ToolTip.OPEN, this.open.bind(this));
	            this.eventManager.subscribe(_Events.Events.ToolTip.CLOSE, function () {
	                _this.close();
	            });
	            this.$close.on("click", function () {
	                _this.close();
	            });
	        }
	    }, {
	        key: 'resizeHandler',
	        value: function resizeHandler() {
	            this.setPosition();
	        }
	    }, {
	        key: 'insertContent',
	        value: function insertContent(content) {
	            var _this2 = this;

	            this.$content.html("");
	            _Helper.Helper.forEach(content, function (data) {
	                if (_this2.templates[data.type]) {
	                    var html = _this2.templates[data.type](data.content);
	                    _this2.$content.append(html);
	                }
	            });
	        }
	    }, {
	        key: 'open',
	        value: function open(data) {
	            if (data) this.insertContent(data);
	            if (this.$container.hasClass(_Events.Events.ToolTip.CLOSE)) {
	                this.setPosition();
	                this.$container.removeClass(_Events.Events.ToolTip.CLOSE).addClass(_Events.Events.ToolTip.OPEN);
	                this.eventManager.publish("resize");
	            }
	            return this;
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            if (this.$container.hasClass(_Events.Events.ToolTip.OPEN)) {
	                this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
	                this.setPosition();
	                this.$container.removeClass(_Events.Events.ToolTip.OPEN).addClass(_Events.Events.ToolTip.CLOSE);
	                this.eventManager.publish("resize");
	            }
	            return this;
	        }
	    }, {
	        key: 'setPosition',
	        value: function setPosition() {
	            if (this.$container.innerWidth() > this.$container.innerHeight()) {
	                this.$container.addClass("left").removeClass("bottom");
	            } else {
	                this.$container.addClass("bottom").removeClass("left");
	            }
	            return this;
	        }
	    }, {
	        key: 'compileTemplates',
	        value: function compileTemplates() {
	            var _this3 = this;

	            _Helper.Helper.forEach(this.templates, function (template, type) {
	                _this3.getTemplateFromFile(template, function (compiledTemplate) {
	                    _this3.templates[type] = compiledTemplate;
	                    _this3.loadedTemplates++;
	                    if (_this3.allTemplatesLoaded) _this3.initialize();
	                });
	            });
	        }
	    }, {
	        key: 'getTemplateFromFile',
	        value: function getTemplateFromFile(url, cb) {
	            _jQuery2.default.get(url, function (data) {
	                cb(_Handlebars2.default.compile(data));
	            }, 'html');
	        }
	    }, {
	        key: 'initialize',
	        value: function initialize() {
	            this.$container.prepend(this.$popup);
	        }
	    }]);

	    return ToolTip;
	}();

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Interact = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*global PointerEvent,MSPointerEvent*/


	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Point = __webpack_require__(7);

	var _Helper = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interact = exports.Interact = function () {
	    _createClass(Interact, [{
	        key: 'timeToLastMove',

	        /**
	         * get time difference to last
	         * @return {number} difference
	         */
	        get: function get() {
	            return this.data.time.end - this.data.time.last;
	        }

	        /**
	         * get time difference to start
	         * @return {number} difference
	         */

	    }, {
	        key: 'time',
	        get: function get() {
	            return this.data.time.end - this.data.time.start;
	        }

	        /**
	         * clones the data object
	         * @return {Object} data object
	         */

	    }, {
	        key: 'dataClone',
	        get: function get() {
	            return (0, _jQuery2.default)(this.data)[0];
	        }

	        /**
	         * Constructor
	         * @param {Object} settings = {} - all the settings
	         * @param {string|Object} settings.container = ".interact-container" - Container, either string, jQuery-object or dom-object
	         * @param {Object} settings.timeTreshold = {} - settings for the timing tresholds
	         * @param {number} settings.timeTreshold.tap = 200 - timing treshold for tap
	         * @param {number} settings.timeTreshold.hold = 500 - timing treshold for hold
	         * @param {number} settings.timeTreshold.swipe = 300 - timing treshold for swipe
	         * @param {number} settings.timeTreshold.flick = 30 - timing treshold for flick
	         * @param {Object} settings.distanceTreshold = {} - settings for the distance tresholds
	         * @param {number} settings.distanceTreshold.swipe = 200 - distance treshold for swipe
	         * @param {Boolean|string} settings.overwriteViewportSettings = false - on true prevents pinching, can be a custom string too
	         * @param {Boolean} settings.stopPropagation = true - on true stops the propagation of events
	         * @param {Boolean} settings.preventDefault = true - on true prevents the default actions of events
	         * @param {Boolean} settings.autoFireHold = false - if set to false hold-event is not fired
	         * @param {number} settings.pinchBalanceTime = 50 - prevents from firing too much pinching events
	         * @param {Object} settings.callbacks = {} - settings for the callback-functions
	         * @param {function} settings.callbacks.tap = null - callback-function for tap
	         * @param {function} settings.callbacks.tapHold = null - callback-function for tapHold
	         * @param {function} settings.callbacks.doubletap = null - callback-function for doubletap
	         * @param {function} settings.callbacks.hold = null - callback-function for hold
	         * @param {function} settings.callbacks.pan = null - callback-function for pan
	         * @param {function} settings.callbacks.swipe = null - callback-function for swipe
	         * @param {function} settings.callbacks.flick = null - callback-function for flick
	         * @param {function} settings.callbacks.zoom = null - callback-function for zoom
	         * @param {function} settings.callbacks.wheel = null - callback-function for wheel
	         * @param {function} settings.callbacks.pinch = null - callback-function for pinch
	         * @param {Object} settings.events = {} - settings all eventnames
	         * @param {Object} settings.events.start = {} - settings all start eventnames
	         * @param {Object} settings.events.start.touch = ("MSPointerDown pointerdown" || "touchstart") - settings start touch eventnames
	         * @param {Object} settings.events.start.mouse = ("MSPointerDown pointerdown" || "mousedown") - settings start mouse eventnames
	         * @param {Object} settings.events.move = {} - settings all move eventnames
	         * @param {Object} settings.events.move.touch = ("MSPointerMove pointermove" || "touchmove") - settings move touch eventnames
	         * @param {Object} settings.events.move.mouse = ("MSPointerMove pointermove" || "mousemove") - settings move mouse eventnames
	         * @param {Object} settings.events.end = {} - settings all end eventnames
	         * @param {Object} settings.events.end.touch = ("MSPointerUp pointerup" || "touchend") - settings end touch eventnames
	         * @param {Object} settings.events.end.mouse = ("MSPointerUp pointerup" || "mouseup") - settings end mouse eventnames
	         * @param {Object} settings.events.leave = {} - settings all leave eventnames
	         * @param {Object} settings.events.leave.touch = ("MSPointerLeave pointerleave" || "touchleave") - settings leave touch eventnames
	         * @param {Object} settings.events.leave.mouse = ("MSPointerLeave pointerleave" || "mouseleave") - settings leave mouse eventnames
	         * @param {string} settings.events.scroll = ("wheel" || "mousewhell" || "DOMMouseScroll") - settings all scroll eventnames
	         * @return {Interact} new instance
	         */

	    }]);

	    function Interact() {
	        var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Interact);

	        this.settings = Object.assign(this.getDefaultSettings(), settings);
	        this.data = this.getDefaultData();
	        if (this.settings.overwriteViewportSettings) this.handleViewport(this.settings.overwriteViewportSettings);
	        this.init(this.settings.container).bindEvents();
	    }

	    /**
	     * get the default settings
	     * @return {Object} settings
	     */


	    _createClass(Interact, [{
	        key: 'getDefaultSettings',
	        value: function getDefaultSettings() {
	            return {
	                container: ".interact-container",
	                timeTreshold: {
	                    tap: 200,
	                    hold: 500,
	                    swipe: 300,
	                    flick: 20
	                },
	                distanceTreshold: {
	                    swipe: 200
	                },
	                speedThreshold: 0.01,
	                overwriteViewportSettings: false,
	                stopPropagation: true,
	                preventDefault: true,
	                autoFireHold: false,
	                pinchBalanceTime: 500,
	                callbacks: this.getDefaultCallbacks(),
	                events: this.getDefaultEventNames()
	            };
	        }

	        /**
	         * get default callbacks
	         * @return {Object} callbacks
	         */

	    }, {
	        key: 'getDefaultCallbacks',
	        value: function getDefaultCallbacks() {
	            return {
	                tap: null,
	                tapHold: null,
	                doubletap: null,
	                hold: null,
	                pan: null,
	                swipe: null,
	                flick: null,
	                zoom: null,
	                wheel: null,
	                pinch: null
	            };
	        }

	        /**
	         * get default eventnames
	         * @return {Object} eventnames
	         */

	    }, {
	        key: 'getDefaultEventNames',
	        value: function getDefaultEventNames() {
	            var isIE = _Helper.Helper.isIE();
	            return {
	                start: {
	                    touch: isIE ? "MSPointerDown pointerdown" : "touchstart",
	                    mouse: isIE ? "MSPointerDown pointerdown" : "mousedown"
	                },
	                move: {
	                    touch: isIE ? "MSPointerMove pointermove" : "touchmove",
	                    mouse: isIE ? "MSPointerMove pointermove" : "mousemove"
	                },
	                end: {
	                    touch: isIE ? "MSPointerUp pointerup" : "touchend",
	                    mouse: isIE ? "MSPointerUp pointerup" : "mouseup"
	                },
	                leave: {
	                    touch: isIE ? "MSPointerLeave pointerleave" : "touchleave",
	                    mouse: isIE ? "MSPointerLeave pointerleave" : "mouseleave"
	                },
	                scroll: _Helper.Helper.scrollEvent()
	            };
	        }

	        /**
	         * get default data
	         * @return {Object} data
	         */

	    }, {
	        key: 'getDefaultData',
	        value: function getDefaultData() {
	            return {
	                down: false,
	                moved: false,
	                pinched: false,
	                pointerArray: {},
	                multitouch: false,
	                distance: null,
	                directions: [],
	                zoom: 0,
	                difference: null,
	                target: null,
	                last: {
	                    position: null,
	                    distance: null,
	                    action: null
	                },
	                position: {
	                    start: null,
	                    move: null,
	                    end: null
	                },
	                time: {
	                    start: null,
	                    last: null,
	                    end: null
	                },
	                timeout: {
	                    hold: null,
	                    default: null
	                }
	            };
	        }

	        /**
	         * handles the overwrite of viewport meta
	         * @param  {Boolean|string} viewport - specified viewport option
	         * @return {Interact} Returns this instance
	         */

	    }, {
	        key: 'handleViewport',
	        value: function handleViewport(viewport) {
	            if (typeof viewport !== "string") {
	                viewport = "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no";
	            }
	            var metaViewInHead = (0, _jQuery2.default)("meta[name=viewport]").length,
	                $viewportMeta = metaViewInHead !== 0 ? (0, _jQuery2.default)("meta[name=viewport]") : (0, _jQuery2.default)("head").append((0, _jQuery2.default)("<meta name='viewport' />"));
	            $viewportMeta.attr("content", viewport);
	            return this;
	        }

	        /**
	         * initializes class settings and bindings
	         * @param  {Object|string} container - Container, either string, jQuery-object or dom-object
	         * @return {Interact} Returns this instance
	         */

	    }, {
	        key: 'init',
	        value: function init(container) {
	            this.$container = typeof container === "string" ? (0, _jQuery2.default)(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : (0, _jQuery2.default)(container);
	            if (!(this.$container instanceof jQuery)) throw new Error("Container " + container + " not found");
	            var css = {
	                "-ms-touch-action": "none",
	                "touch-action": "none",
	                "-ms-content-zooming": "none"
	            };
	            this.$container.css(css);
	            this.$container.find("> *").css(css);
	            this.container = this.$container[0];
	            return this;
	        }

	        /**
	         * binds all needed events
	         * @return {Interact} Returns this instance
	         */

	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            if (_Helper.Helper.isIE()) {
	                this.bindIEEvents();
	            } else {
	                if (_Helper.Helper.isTouch()) this.bindTouchEvents();
	                if (_Helper.Helper.isMouse()) this.bindMouseEvents();
	            }
	            return this;
	        }

	        /**
	         * binds all needed events for IE
	         * @return {Interact} Returns this instance
	         */

	    }, {
	        key: 'bindIEEvents',
	        value: function bindIEEvents() {
	            this.$container.on(this.settings.events.scroll, this.scrollHandler.bind(this));
	            this.bindTouchEvents();
	            this.container.addEventListener("contextmenu", function (e) {
	                return e.preventDefault();
	            }, false);
	            return this;
	        }

	        /**
	         * binds all needed events for touch devices
	         * @return {Interact} Returns this instance
	         */

	    }, {
	        key: 'bindTouchEvents',
	        value: function bindTouchEvents() {
	            this.$container.on(this.settings.events.start.touch, this.startHandler.bind(this)).on(this.settings.events.move.touch, this.moveHandler.bind(this)).on(this.settings.events.end.touch, this.endHandler.bind(this)).on(this.settings.events.leave.touch, this.endHandler.bind(this));
	            return this;
	        }

	        /**
	         * binds all needed events for mouse devices
	         * @return {Interact} Returns this instance
	         */

	    }, {
	        key: 'bindMouseEvents',
	        value: function bindMouseEvents() {
	            this.$container.on(this.settings.events.scroll, this.scrollHandler.bind(this)).on(this.settings.events.start.mouse, this.startHandler.bind(this)).on(this.settings.events.move.mouse, this.moveHandler.bind(this)).on(this.settings.events.end.mouse, this.endHandler.bind(this)).on(this.settings.events.leave.mouse, this.endHandler.bind(this));
	            return this;
	        }

	        /**
	         * pre handle all events
	         * @param  {Object} event - original event of Vanilla JS
	         * @return {Object} normalized jQuery-fixed event
	         */

	    }, {
	        key: 'preHandle',
	        value: function preHandle(event) {
	            if (this.settings.stopPropagation) event.stopPropagation();
	            if (this.settings.preventDefault) event.preventDefault();
	            this.data.target = event.target;
	            return this.getEvent(event);
	        }

	        /**
	         * handles cross-browser and -device scroll
	         * @param  {Object} event - jQuery-Event-Object
	         * @return {Boolean} always returns false
	         */

	    }, {
	        key: 'scrollHandler',
	        value: function scrollHandler(event) {
	            event = event || window.event;

	            var e = this.preHandle(event) || event.originalEvent;

	            this.data.delta = this.normalizeWheelDelta(event);
	            this.data.position.start = this.getRelativePosition(e);
	            this.data.directions = this.getScrollDirection(e);
	            this.data.zoom = this.data.directions.indexOf("up") > -1 ? 1 : this.data.directions.indexOf("down") > -1 ? -1 : 0;

	            if (this.settings.callbacks.wheel) {
	                this.eventCallback(this.settings.callbacks.wheel, this.dataClone);
	            }
	            if (this.settings.callbacks.zoom && (this.data.directions.indexOf("up") > -1 || this.data.directions.indexOf("down") > -1)) {
	                this.eventCallback(this.settings.callbacks.zoom, this.dataClone);
	            }
	            return false;
	        }

	        /**
	         *
	         * Solution from http://jsfiddle.net/uNeBr/
	         * @param  {Object} event - VanillaJS-Event-Object
	         * @return {number} normalized wheel delta
	         */

	    }, {
	        key: 'normalizeWheelDelta',
	        value: function normalizeWheelDelta(e) {
	            var o = e.originalEvent,
	                w = o.wheelDelta || o.deltaY * -1 * 10,
	                n = 225,
	                n1 = n - 1;

	            var d = o.detail,
	                f = void 0;

	            // Normalize delta
	            d = d ? w && (f = w / d) ? d / f : -d / 1.35 : w / 120;
	            // Quadratic scale if |d| > 1
	            d = d < 1 ? d < -1 ? (-Math.pow(d, 2) - n1) / n : d : (Math.pow(d, 2) + n1) / n;
	            // Delta *should* not be greater than 2...
	            return Math.min(Math.max(d / 2, -1), 1);
	        }

	        /**
	         * check if event is a PointerEvent (IE)
	         * @param  {Object} event - original event of Vanilla JS
	         * @return {Boolean} Whether event is PointerEvent
	         */

	    }, {
	        key: 'isPointerEvent',
	        value: function isPointerEvent(e) {
	            return _Helper.Helper.isIE() && (e instanceof MSPointerEvent || e instanceof PointerEvent);
	        }

	        /**
	         * calculation to be made at start-handler
	         * @param  {Object} e - jQuery-Event-Object
	         * @return {Object} calculated data
	         */

	    }, {
	        key: 'calculateStart',
	        value: function calculateStart(e) {
	            var data = {
	                multitouch: false,
	                distance: 0,
	                down: true,
	                position: {
	                    start: new _Point.Point()
	                }
	            };
	            // mouse is used
	            if (e instanceof MouseEvent && !this.isPointerEvent(e)) {
	                return _jQuery2.default.extend(true, data, this.handleSingletouchStart(e));
	            }
	            // if is pointerEvent
	            if (this.isPointerEvent(e)) {
	                return this.handlePointerEventStart(data, e);
	            } // touch is used
	            else {
	                    // singletouch startet
	                    return this.handleTouchEventStart(data, e);
	                }
	        }

	        /**
	         * handle PointerEvent calculations
	         * @param  {Object} data - current data
	         * @param  {Object} e - jQuery-Event-Object
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handlePointerEventStart',
	        value: function handlePointerEventStart(data, e) {
	            this.data.pointerArray[e.pointerId] = e;
	            var getData = Object.keys(this.data.pointerArray).length <= 1 ? this.handleSingletouchStart(e) : this.handleMultitouchStart(this.getPointerArray());
	            return _jQuery2.default.extend(true, data, getData);
	        }

	        /**
	         * handle TouchEvent calculations for start
	         * @param  {Object} data - current data
	         * @param  {Object} e - jQuery-Event-Object
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handleTouchEventStart',
	        value: function handleTouchEventStart(data, e) {
	            return this.handleTouchEvent(data, e, this.handleSingletouchStart.bind(this), this.handleMultitouchStart.bind(this));
	        }

	        /**
	         * get array of pointers (IE)
	         * @return {Object} array of pointerIDs
	         */

	    }, {
	        key: 'getPointerArray',
	        value: function getPointerArray() {
	            var pointerPos = [];
	            for (var pointer in this.data.pointerArray) {
	                if (this.data.pointerArray[pointer]) {
	                    pointerPos.push(this.data.pointerArray[pointer]);
	                }
	            }
	            return pointerPos;
	        }

	        /**
	         * handles multitouch for start
	         * @param  {Object} positionsArray - array of positions
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handleMultitouchStart',
	        value: function handleMultitouchStart(positionsArray) {
	            var pos1 = this.getRelativePosition(positionsArray[0]),
	                pos2 = this.getRelativePosition(positionsArray[1]);
	            return {
	                multitouch: true,
	                distance: pos1.distance(pos2),
	                position: {
	                    start: pos1.add(pos2).divide(2, 2)
	                }
	            };
	        }

	        /**
	         * handles singletouch for start
	         * @param  {Point} position - position of touch
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handleSingletouchStart',
	        value: function handleSingletouchStart(position) {
	            return {
	                position: {
	                    start: this.getRelativePosition(position)
	                }
	            };
	        }

	        /**
	         * handle action at start event handler
	         * @param  {String} action - last action made
	         * @return {Interact} instance of Interact for chaining
	         */

	    }, {
	        key: 'takeActionStart',
	        value: function takeActionStart(action) {
	            switch (action) {
	                case null:
	                    this.data.last.action = "tap";
	                    if (this.settings.autoFireHold) {
	                        this.setTimeoutForEvent(this.settings.callbacks.hold, this.settings.autoFireHold, this.dataClone, true);
	                    }
	                    break;
	                case "tap":
	                    this.data.last.action = "doubletap";
	                    if (this.settings.autoFireHold) {
	                        this.setTimeoutForEvent(this.settings.callbacks.tapHold, this.settings.autoFireHold, this.dataClone, true);
	                    }
	                    break;
	                default:
	                    break;
	            }
	            return this;
	        }

	        /**
	         * handles cross-browser and -device start-event
	         * @param  {Object} event - jQuery-Event-Object
	         * @return {Boolean} always returns false
	         */

	    }, {
	        key: 'startHandler',
	        value: function startHandler(event) {
	            if (event.button && event.button !== 0) {
	                return false;
	            }
	            var e = this.preHandle(event);
	            this.data.time.start = event.timeStamp;
	            this.clearTimeouts(this.data.timeout.default);
	            this.data = _jQuery2.default.extend(true, this.data, this.calculateStart(e));
	            this.takeActionStart(this.data.last.action);
	            return false;
	        }

	        /**
	         * clear timeout helper
	         * @param  {Object} timeout - timeout object to be cleared
	         * @return {Interact} instance of Interact for chaining
	         */

	    }, {
	        key: 'clearTimeouts',
	        value: function clearTimeouts(timeout) {
	            if (timeout) {
	                timeout = clearTimeout(timeout);
	            }
	            return this;
	        }

	        /**
	         * calculation to be made at move-handler
	         * @param  {Object} e - jQuery-Event-Object
	         * @return {Object} calculated data
	         */

	    }, {
	        key: 'calculateMove',
	        value: function calculateMove(e) {
	            var data = {
	                moved: true,
	                last: {
	                    action: "moved"
	                },
	                position: {
	                    move: new _Point.Point()
	                }
	            };

	            if (e instanceof MouseEvent && !this.isPointerEvent(e)) {
	                return _jQuery2.default.extend(true, data, this.handleSingletouchMove(e));
	            } // if is pointerEvent
	            if (this.isPointerEvent(e)) {
	                return this.handlePointerEventMove(data, e);
	            } // touch is used
	            else {
	                    return this.handleTouchEventMove(data, e);
	                }
	        }

	        /**
	         * handle PointerEvent at moving (IE)
	         * @param  {Object} data - specified input data
	         * @param  {Object} e - jQuery-Event-Object
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handlePointerEventMove',
	        value: function handlePointerEventMove(data, e) {
	            this.data.pointerArray[e.pointerId] = e;
	            if (Object.keys(this.data.pointerArray).length <= 1) {
	                return _jQuery2.default.extend(true, data, this.handleSingletouchMove(e));
	            } else {
	                var pointerPos = this.getPointerArray();
	                return _jQuery2.default.extend(true, data, this.handleMultitouchMove(pointerPos));
	            }
	        }

	        /**
	         * handle TouchEvent calculations for move
	         * @param  {Object} data - current data
	         * @param  {Object} e - jQuery-Event-Object
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handleTouchEventMove',
	        value: function handleTouchEventMove(data, e) {
	            return this.handleTouchEvent(data, e, this.handleSingletouchMove.bind(this), this.handleMultitouchMove.bind(this));
	        }
	    }, {
	        key: 'handleTouchEvent',
	        value: function handleTouchEvent(data, e, fnSingle, fnMulti) {
	            var getData = e.length === 1 ? fnSingle(e[0]) : fnMulti(e);
	            return _jQuery2.default.extend(true, data, getData);
	        }

	        /**
	         * handles multitouch for move
	         * @param  {Object} positionsArray - array of positions
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handleMultitouchMove',
	        value: function handleMultitouchMove(positionsArray) {
	            var pointerPos1 = this.getRelativePosition(positionsArray[0]);
	            var pointerPos2 = this.getRelativePosition(positionsArray[1]);
	            var pos = pointerPos2.clone.add(pointerPos1).divide(2);
	            return {
	                position: {
	                    move: pos
	                },
	                distance: pointerPos1.distance(pointerPos2),
	                multitouch: true
	            };
	        }

	        /**
	         * handles singletouch for move
	         * @param  {Point} position - position
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handleSingletouchMove',
	        value: function handleSingletouchMove(position) {
	            var pos = this.getRelativePosition(position);
	            return {
	                position: {
	                    move: pos
	                },
	                distance: this.data.last.position.distance(pos),
	                multitouch: false
	            };
	        }

	        /**
	         * handles cross-browser and -device move-event
	         * @param  {Object} event - jQuery-Event-Object
	         * @return {Boolean} always returns false
	         */

	    }, {
	        key: 'moveHandler',
	        value: function moveHandler(event) {
	            // if touchstart event was not fired
	            if (!this.data.down || this.data.pinched) return false;

	            var e = this.preHandle(event);
	            this.data.time.last = event.timeStamp;
	            this.data.last.position = this.data.position.move ? this.data.position.move : this.data.position.start;
	            this.data.time.last = this.data.time.last ? this.data.time.last : this.data.time.start;

	            // if positions have not changed
	            if (this.positionDidNotChange(e)) return false;

	            this.clearTimeouts(this.data.timeout.default);
	            this.clearTimeouts(this.data.timeout.hold);
	            this.data = _jQuery2.default.extend(true, this.data, this.calculateMove(e));

	            if (this.data.multitouch) {
	                this.handlePinchAndZoom();
	            } else {
	                this.eventCallback(this.settings.callbacks.pan, this.dataClone);
	            }
	            return false;
	        }

	        /**
	         * handles pinch and zoom
	         * @return {Interact} instance of Interact for chaining
	         */

	    }, {
	        key: 'handlePinchAndZoom',
	        value: function handlePinchAndZoom() {
	            if (!this.data.last.distance) this.data.last.distance = this.data.distance;

	            this.data.difference = this.data.distance - this.data.last.distance;
	            if (Math.abs(this.data.difference) >= 0.005) {
	                if (this.settings.callbacks.pinch) this.eventCallback(this.settings.callbacks.pinch, this.dataClone);
	                if (this.settings.callbacks.zoom) this.eventCallback(this.settings.callbacks.zoom, this.dataClone);
	                this.data.last.distance = this.data.distance;
	            }
	            return this;
	        }

	        /**
	         * check if position has been changed
	         * @param  {Object} e - jQuery-Event-Object
	         * @return {Boolean} Whether or not position has changed
	         */

	    }, {
	        key: 'positionDidNotChange',
	        value: function positionDidNotChange(e) {
	            return _Helper.Helper.isIE() && (this.getRelativePosition(e).equals(this.data.last.position) || this.getRelativePosition(e).equals(this.data.position.start)) || !_Helper.Helper.isIE() && _Helper.Helper.isTouch() && this.getRelativePosition(e[0]).equals(this.data.last.position);
	        }

	        /**
	         * calculation to be made at end-handler
	         * @param  {Object} e - jQuery-Event-Object
	         * @return {Object} calculated data
	         */

	    }, {
	        key: 'calculateEnd',
	        value: function calculateEnd(e) {
	            var data = {
	                position: {
	                    end: new _Point.Point()
	                }
	            };

	            if (e instanceof MouseEvent && !this.isPointerEvent(e)) {
	                return _jQuery2.default.extend(true, data, this.handleSingletouchEnd(e));
	            } // if is pointerEvent
	            if (this.isPointerEvent(e)) {
	                var end = this.handleSingletouchEnd(e);
	                delete this.data.pointerArray[e.pointerId];
	                return _jQuery2.default.extend(true, data, end);
	            } // touch is used
	            else {
	                    // singletouch ended
	                    if (e.length <= 1) {
	                        return _jQuery2.default.extend(true, data, this.handleSingletouchEnd(e[0]));
	                    }
	                }
	        }

	        /**
	         * handles singletouch for end
	         * @param  {Object} position - position
	         * @return {Object} manipulated enriched data
	         */

	    }, {
	        key: 'handleSingletouchEnd',
	        value: function handleSingletouchEnd(position) {
	            return {
	                position: {
	                    end: this.getRelativePosition(position)
	                }
	            };
	        }

	        /**
	         * handle action at end event handler
	         * @param  {String} action - last action made
	         * @return {Interact} instance of Interact for chaining
	         */

	    }, {
	        key: 'takeActionEnd',
	        value: function takeActionEnd(action) {
	            switch (action) {
	                case "tap":
	                    if (this.time < this.settings.timeTreshold.hold) {
	                        this.setTimeoutForEvent(this.settings.callbacks.tap, this.settings.timeTreshold.tap, this.dataClone);
	                    } else {
	                        this.eventCallback(this.settings.callbacks.hold, this.dataClone);
	                    }
	                    break;
	                case "doubletap":
	                    if (this.time < this.settings.timeTreshold.hold) {
	                        this.setTimeoutForEvent(this.settings.callbacks.doubletap, this.settings.timeTreshold.tap, this.dataClone);
	                    } else {
	                        this.eventCallback(this.settings.callbacks.tapHold, this.dataClone);
	                    }
	                    break;
	                default:
	                    this.data.last.action = null;
	            }
	        }

	        /**
	         * handles cross-browser and -device end-event
	         * @param  {Object} event - jQuery-Event-Object
	         * @return {Boolean} always returns false
	         */

	    }, {
	        key: 'endHandler',
	        value: function endHandler(event) {

	            var e = this.preHandle(event);

	            this.data.time.end = event.timeStamp;

	            this.clearTimeouts(this.data.timeout.hold);

	            this.data = _jQuery2.default.extend(true, this.data, this.calculateEnd(e));

	            // called only when not moved
	            if (!this.data.moved && this.data.down && !this.data.multitouch) {
	                this.takeActionEnd(this.data.last.action);
	            }
	            // if was moved
	            else if (this.data.moved && this.data.down && !this.data.multitouch) {
	                    if (this.settings.callbacks.swipe || this.settings.callbacks.flick) {
	                        this.handleSwipeAndFlick();
	                    }
	                    this.data.last.action = null;
	                }
	            this.pinchBalance();
	            this.handleMultitouchEnd(e);
	            this.data.last.position = null;
	            return false;
	        }

	        /**
	         * handles flick and swipe events
	         * @return {Interact} instance of Interact for chaining
	         */

	    }, {
	        key: 'handleSwipeAndFlick',
	        value: function handleSwipeAndFlick() {
	            var direction = this.data.position.end.clone.substract(this.data.last.position);

	            var vLDirection = direction.length,
	                directionNormalized = direction.divide(vLDirection, vLDirection);

	            if (this.settings.callbacks.swipe && this.time <= this.settings.timeTreshold.swipe) {
	                var originalStart = this.getAbsolutePosition(this.data.position.start);
	                var originalEnd = this.getAbsolutePosition(this.data.position.end);
	                if (originalEnd.distance(originalStart) >= this.settings.distanceTreshold.swipe) {
	                    this.data.directions = this.getSwipeDirections(directionNormalized);
	                    this.eventCallback(this.settings.callbacks.swipe, this.dataClone);
	                }
	            }

	            if (this.settings.callbacks.flick && this.timeToLastMove <= this.settings.timeTreshold.flick) {
	                var distance = this.data.last.position.distance(this.data.position.end);
	                this.data.distance = distance;
	                var _direction = this.data.last.position.clone.substract(this.data.position.end);
	                this.data.directions = [_direction.x, _direction.y];
	                this.data.speed = this.calculateSpeed(distance, this.time);
	                if (this.data.speed >= this.settings.speedThreshold) {
	                    this.eventCallback(this.settings.callbacks.flick, this.dataClone);
	                }
	            }

	            return this;
	        }

	        /**
	         * handles multitouch for end
	         * @param  {e} e - jQuery-Event-Object
	         * @return {Interact} instance of Interact for chaining
	         */

	    }, {
	        key: 'handleMultitouchEnd',
	        value: function handleMultitouchEnd(e) {
	            this.data.multitouch = false;
	            this.data.down = false;
	            this.data.moved = false;

	            // if is pointerEvent
	            if (this.isPointerEvent(e)) {
	                if (Object.keys(this.data.pointerArray).length > 1) {
	                    this.data.multitouch = true;
	                } else if (Object.keys(this.data.pointerArray).length > 0) {
	                    this.data.down = true;
	                }
	            } // touch is used
	            else {
	                    if (e.length > 1) {
	                        this.data.multitouch = true;
	                    } else if (e.length > 0) {
	                        this.data.down = true;
	                    }
	                    this.data.position.move = null;
	                }
	            return this;
	        }

	        /**
	         * balances pinching after release of finger
	         * @return {Interact} instance of Interact for chaining
	         */

	    }, {
	        key: 'pinchBalance',
	        value: function pinchBalance() {
	            if (this.data.multitouch) {
	                this.data.pinched = true;
	                setTimeout(function () {
	                    this.data.pinched = false;
	                    this.data.last.distance = null;
	                }.bind(this), this.settings.pinchBalanceTime);
	            }
	            return this;
	        }

	        /**
	         * calculates the speed with specified distance and time
	         * @param  {number} distance - the specified distance
	         * @param  {number} time - the specified time elapsed
	         * @return {number} the calculated speed
	         */

	    }, {
	        key: 'calculateSpeed',
	        value: function calculateSpeed(distance, time) {
	            return distance / (time || 0.00001) * 100;
	        }

	        /**
	         * Returns an array of strings, representing the directions
	         * @param  {Point} direction - the specified direction in pixel
	         * @return {string[]} returns an array representing the directions as strings
	         */

	    }, {
	        key: 'getSwipeDirections',
	        value: function getSwipeDirections(direction) {
	            return [direction.x < 0 ? "left" : direction.x > 0 ? "right" : "none", direction.y < 0 ? "up" : direction.y > 0 ? "down" : "none"];
	        }

	        /**
	         * Helper for setting a timeout for events
	         * @param {Function} callback - function to be called
	         * @param {number} timeout - time in milliseconds
	         * @param {Object[]} args - array of arguments
	         * @param {Boolean} holdTimeout - if true, a different variable will be used
	         * @return {Interact} Returns this instance
	         */

	    }, {
	        key: 'setTimeoutForEvent',
	        value: function setTimeoutForEvent(callback, timeout, args, holdTimeout) {
	            if (holdTimeout) {
	                this.data.timeout.hold = setTimeout(this.eventCallback.bind(this, callback, args), timeout);
	            } else {
	                this.data.timeout.default = setTimeout(this.eventCallback.bind(this, callback, args), timeout);
	            }
	            return this;
	        }

	        /**
	         * Eventhandler for handling the callbacks
	         * @param  {Function} callback - function to be called
	         * @param  {object[]} args - arguments for the function
	         * @return {Interact} Returns this instance
	         */

	    }, {
	        key: 'eventCallback',
	        value: function eventCallback(callback, args) {
	            if (callback && typeof callback === "function") callback(args);
	            this.data.last.action = null;
	            return this;
	        }

	        /**
	         * get the relative position of clientX and clientY
	         * @param  {Object} e - event object
	         * @return {Point} calculated relative position
	         */

	    }, {
	        key: 'getRelativePosition',
	        value: function getRelativePosition(e) {
	            var clientBounds = this.container.getBoundingClientRect(),
	                pos = new _Point.Point(e.clientX, e.clientY),
	                bounds = new _Point.Point(clientBounds.left, clientBounds.top);
	            return pos.substract(bounds).divide(clientBounds.width, clientBounds.height);
	        }

	        /**
	         * get the absolute position of clientX and clientY
	         * @param  {Object} e - event object
	         * @return {Point} calculated absolute position
	         */

	    }, {
	        key: 'getAbsolutePosition',
	        value: function getAbsolutePosition(point) {
	            var clientBounds = this.container.getBoundingClientRect();
	            return point.mult(clientBounds.width, clientBounds.height);
	        }

	        /**
	         * get scroll direction from event
	         * @param  {Object} event - event object
	         * @return {string[]} an array with scroll directions
	         */

	    }, {
	        key: 'getScrollDirection',
	        value: function getScrollDirection(event) {
	            var axis = parseInt(event.axis, 10);
	            var direction = [];
	            if (this.isDownDirection(axis, event)) direction.push("down"); // down
	            else if (this.isUpDirection(axis, event)) direction.push("up"); // up
	            if (this.isRightDirection(axis, event)) direction.push("right"); // right
	            else if (this.isLeftDirection(axis, event)) direction.push("left"); // left
	            return direction;
	        }

	        /**
	         * checks if direction is down
	         * @param  {number} axis - what axis is used
	         * @param  {Object} event - Vanilla JS event
	         * @return {Boolean} Whether or not direction is down
	         */

	    }, {
	        key: 'isDownDirection',
	        value: function isDownDirection(axis, event) {
	            return event.deltaY > 0 || !event.deltaY && event.wheelDeltaY < 0 || axis === 2 && event.detail > 0 || Math.max(-1, Math.min(1, event.wheelDelta || -event.detail)) < 0;
	        }

	        /**
	         * checks if direction is up
	         * @param  {number} axis - what axis is used
	         * @param  {Object} event - Vanilla JS event
	         * @return {Boolean} Whether or not direction is up
	         */

	    }, {
	        key: 'isUpDirection',
	        value: function isUpDirection(axis, event) {
	            return event.deltaY < 0 || !event.deltaY && event.wheelDeltaY > 0 || axis === 2 && event.detail < 0 || Math.max(-1, Math.min(1, event.wheelDelta || -event.detail)) > 0;
	        }

	        /**
	         * checks if direction is right
	         * @param  {number} axis - what axis is used
	         * @param  {Object} event - Vanilla JS event
	         * @return {Boolean} Whether or not direction is right
	         */

	    }, {
	        key: 'isRightDirection',
	        value: function isRightDirection(axis, event) {
	            return event.deltaX > 0 || !event.deltaX && event.wheelDeltaX > 0 || axis === 1 && event.detail > 0;
	        }

	        /**
	         * checks if direction is left
	         * @param  {number} axis - what axis is used
	         * @param  {Object} event - Vanilla JS event
	         * @return {Boolean} Whether or not direction is left
	         */

	    }, {
	        key: 'isLeftDirection',
	        value: function isLeftDirection(axis, event) {
	            return event.deltaX < 0 || !event.deltaX && event.wheelDeltaX < 0 || axis === 1 && event.detail < 0;
	        }

	        /**
	         * Get event helper, applies jQuery-event-fix too
	         * @param  {Object} e - event object
	         * @return {Object} new fixed and optimized event
	         */

	    }, {
	        key: 'getEvent',
	        value: function getEvent(e) {
	            jQuery.event.fix(e);
	            if (e.originalEvent.touches && e.originalEvent.touches.length === 0) {
	                return e.originalEvent.changedTouches || e.originalEvent;
	            }
	            return e.originalEvent.touches || e.originalEvent.changedTouches || e.originalEvent;
	        }
	    }]);

	    return Interact;
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mappedJS.js.map