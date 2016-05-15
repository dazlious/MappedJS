(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["de"] = factory(require("jQuery"));
	else
		root["de"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	var _TileMap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./TileMap.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _DataEnrichment = __webpack_require__(3);

	var _Helper = __webpack_require__(4);

	var _Interact = __webpack_require__(8);

	var _Point = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file application initializes all instances and objects
	 * @copyright Michael Duve 2016
	 */

	var MappedJS = exports.MappedJS = function () {

	    /**
	     * @constructor
	     * @param  {string|Object} container=".mjs" - Container, either string, jQuery-object or dom-object
	     * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
	     * @param  {string|Object} markerData={} - data of markers, can be json or path to file
	     * @param  {Object} mapSettings={} - settings for map, must be json
	     * @param  {Object} events={loaded: "mjs-loaded"} - List of events
	     * @return {MappedJS} instance of MappedJS for chaining
	     */

	    function MappedJS() {
	        var _this = this;

	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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

	    /**
	     * add controls (zoom, home) to DOM
	     */


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
	         * @param  {object} settings - List of settings
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'initializeSettings',
	        value: function initializeSettings(container) {
	            var events = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	            var settings = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

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
	         * @param  {Helper~requestJSONCallback} cb - called, when data is received
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

	        /**
	         * initializes interaction
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

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
	            return this;
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

	        /**
	         * resets map to initial state
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'resetToInitialState',
	        value: function resetToInitialState() {
	            this.tileMap.reset();
	            return this;
	        }

	        /**
	         * zooms into center of map
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'zoomInToCenter',
	        value: function zoomInToCenter() {
	            this.zoom(0.1, this.tileMap.view.viewport.center);
	            return this;
	        }

	        /**
	         * zooms out of center of map
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'zoomOutToCenter',
	        value: function zoomOutToCenter() {
	            this.zoom(-0.1, this.tileMap.view.viewport.center);
	            return this;
	        }

	        /**
	         * Keypress handler
	         * @param  {object} e VanillaJS-Event-Object
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

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
	            return this;
	        }

	        /**
	         * handles the translation of the map by keypress
	         * @param  {Point} direction - x,y point where to translate to
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'handleMovementByKeys',
	        value: function handleMovementByKeys(direction) {
	            this.keyTicks++;
	            this.tileMap.view.moveView(direction.multiply(this.keyTicks));
	            return this;
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
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DataEnrichment = undefined;

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Helper = __webpack_require__(4);

	var _Point = __webpack_require__(5);

	var _LatLng = __webpack_require__(6);

	var _Bounds = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file enriches delivered data with default values
	 * @copyright Michael Duve 2016
	 * @module DataEnrichment
	 */
	var DataEnrichment = exports.DataEnrichment = {
	    /**
	     * enriches marker data with all needed data
	     * @function
	     * @memberof module:DataEnrichment
	     * @param  {object} data - specified data for marker
	     * @return {object} enriched marker data
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

	    /**
	     * enriches map data with all needed data
	     * @function
	     * @memberof module:DataEnrichment
	     * @param  {object} data - specified data for mapsettings
	     * @return {object} enriched mapsettings data
	     */
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
	/**
	 * Default initial values for a Map
	 * @type {Object}
	 */
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
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file Helper for general purposes
	 * @copyright Michael Duve 2016
	 * @module Helper
	 */
	var Helper = exports.Helper = {
	    /**
	     * request json-data from given file and calls callback on success
	     * @function
	     * @memberof module:Helper
	     * @param  {string} filename - path to file
	     * @param  {Helper~requestJSONCallback} callback - function called when data is loaded successfully
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
	     * @function
	     * @memberof module:Helper
	     * @param {requestCallback} cb - callback-function on success
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
	     * @function
	     * @memberof module:Helper
	     * @param  {Object[]} a - array to iterate over each value
	     * @param  {requestCallback} cb - callback for each object
	     * @return {Helper} Helper object for chaining
	     */
	    forEach: function forEach(a, cb) {
	        for (var i in a) {
	            if (a[i] && typeof cb === "function") cb(a[i], i);
	        }
	        return this;
	    },

	    /**
	     * formula for quadratic ease out
	     * @function
	     * @memberof module:Helper
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
	     * @function
	     * @memberof module:Helper
	     * @param {number} degrees - specified degrees
	     * @return {number} converted radian
	     */
	    toRadians: function toRadians(degrees) {
	        return degrees * Math.PI / 180;
	    },
	    /**
	     * checks if mouse is possible
	     * @function
	     * @memberof module:Helper
	     * @return {Boolean} if true, mouse is possible
	     */
	    isMouse: function isMouse() {
	        return 'onmousedown' in window;
	    },

	    /**
	     * checks if touch is possible
	     * @function
	     * @memberof module:Helper
	     * @return {Boolean} if true, touch is possible
	     */
	    isTouch: function isTouch() {
	        return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	    },

	    /**
	     * checks if IE is used
	     * @function
	     * @memberof module:Helper
	     * @return {Boolean} if true, IE is used
	     */
	    isIE: function isIE() {
	        return navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	    },

	    /**
	     * gets cross-browser scroll-event
	     * @function
	     * @memberof module:Helper
	     * @return {string} name of scroll event
	     */
	    scrollEvent: function scrollEvent() {
	        return "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
	    }
		};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents a point with x and y value
	 * @copyright Michael Duve 2016
	 */

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
	     * @constructor
	     * @param  {number} x = 0 - representation of x coordinate
	     * @param  {number} y = 0 - representation of y coordinate
	     * @return {Point} instance of Point for chaining
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
	   * @return {Point} instance of Point for chaining
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
	     * @return {Point} instance of Point for chaining
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
	     * @param  {number} y = x - factor to multiplicate y with
	     * @return {Point} instance of Point for chaining
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
	     * @param  {number} y = x - factor to divide y with
	     * @return {Point} instance of Point for chaining
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
	     * @return {Point} instance of Point for chaining
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
	     * @param  {number} x = 0 - value to position x
	     * @param  {number} y = x - value to position y
	     * @return {Point} instance of Point for chaining
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
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents latitude and longitude coordinates in a geographic coordinate system
	 * @copyright Michael Duve 2016
	 */

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
	     * @return {LatLng} create a copy
	     */

	  }, {
	    key: "clone",
	    get: function get() {
	      return LatLng.createFromLatLng(this);
	    }

	    /**
	     * @constructor
	     * @param  {number} lat = 0 - representation of latitude
	     * @param  {number} lng = 0 - representation of longitude
	     * @return {LatLng} instance of LatLng for chaining
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
	   * @return {LatLng} instance of LatLng for chaining
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
	     * @return {LatLng} instance of LatLng for chaining
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
	    * @return {LatLng} instance of LatLng for chaining
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
	     * @return {LatLng} instance of LatLng for chaining
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

	    /**
	     * converts a LatLng to string
	     * @return {string} representing LatLng
	     */

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Bounds = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LatLng = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents boundaries of a geographic coordinate system
	 * @copyright Michael Duve 2016
	 */

	var Bounds = exports.Bounds = function () {
	    _createClass(Bounds, [{
	        key: 'width',


	        /**
	         * get width of boundaries
	         * @return {number} distance between east and west boundary
	         */
	        get: function get() {
	            return Math.abs(this.se.lng - this.nw.lng);
	        }

	        /**
	         * get height of boundaries
	         * @return {number} distance between north and south boundary
	         */

	    }, {
	        key: 'height',
	        get: function get() {
	            return Math.abs(this.se.lat - this.nw.lat);
	        }

	        /**
	        <<<<<<< HEAD
	         * @constructor
	        =======
	         * Constructor
	        >>>>>>> cef61a4e7f38825fcdfe66914b46cc3a03472a68
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
	        this.se = southEast;
	        return this;
	    }

	    return Bounds;
	}();

/***/ },
/* 8 */
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

	var _Point = __webpack_require__(5);

	var _Helper = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file implements interaction like panning, zooming, flicking and more, cross-browser and cross-device
	 * @copyright Michael Duve 2016
	 */

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
	         * @constructor
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