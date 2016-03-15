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

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _TileMap = __webpack_require__(2);

	var _Helper = __webpack_require__(11);

	var _Publisher = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MappedJS = exports.MappedJS = function () {

	    /**
	     * Constructor
	     * @param  {string|Object} container=".mjs" - Container, either string, jQuery-object or dom-object
	     * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
	     * @param  {Object} mapSettings={} - settings for map, must be json
	     * @param  {Object} events={loaded: "mjs-loaded"} - List of events
	     * @param  {Boolean} jasmine=false - Option for jasmine tests
	     * @return {MappedJS} instance of MappedJS
	     */

	    function MappedJS(_ref) {
	        var _ref$container = _ref.container;
	        var container = _ref$container === undefined ? ".mjs" : _ref$container;
	        var _ref$mapData = _ref.mapData;
	        var mapData = _ref$mapData === undefined ? {} : _ref$mapData;
	        var _ref$mapSettings = _ref.mapSettings;
	        var mapSettings = _ref$mapSettings === undefined ? {} : _ref$mapSettings;
	        var _ref$events = _ref.events;
	        var events = _ref$events === undefined ? { loaded: "mjs-loaded" } : _ref$events;

	        _classCallCheck(this, MappedJS);

	        this.initializeApi();

	        this.initializeSettings(container, events, mapSettings);

	        this.initializeData(mapData, function () {
	            this.initializeMap();
	            this.bindEvents();
	            this.loadingFinished();
	        }.bind(this));

	        return this;
	    }

	    /**
	     * initializes the settings and handles errors
	     * @param  {string|Object} container - Container, either string, jQuery-object or dom-object
	     * @param  {object} events - List of events
	     * @return {MappedJS} instance of MappedJS
	     */


	    _createClass(MappedJS, [{
	        key: 'initializeSettings',
	        value: function initializeSettings(container, events, mapSettings) {
	            this.$container = typeof container === "string" ? (0, _jquery2.default)(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : (0, _jquery2.default)(container);
	            if (!(this.$container instanceof jQuery)) {
	                throw new Error("Container " + container + " not found");
	            }
	            this.$container.addClass("mappedJS");

	            this.mapSettings = {
	                level: mapSettings.level || 0,
	                center: mapSettings.center || { "lat": 0, "lng": 0 },
	                bounds: mapSettings.bounds || {
	                    "top": 90,
	                    "left": -180,
	                    "width": 360,
	                    "height": 180
	                }
	            };

	            this.events = events;

	            return this;
	        }

	        /**
	         * initializes the data, asynchronous
	         * @param  {Object} mapData - data of map tiles, can be json or path to file
	         * @param  {Function} cb - called, when data is received
	         * @return {MappedJS} instance of MappedJS
	         */

	    }, {
	        key: 'initializeData',
	        value: function initializeData(mapData, cb) {
	            var _this = this;
	            if (typeof mapData === "string") {
	                _Helper.Helper.requestJSON(mapData, function (data) {
	                    _this.mapData = data;
	                    cb();
	                });
	            } else {
	                this.mapData = (typeof mapData === 'undefined' ? 'undefined' : _typeof(mapData)) === "object" ? mapData : null;
	                cb();
	            }
	            return this;
	        }

	        /**
	         * initializes Map module
	         * @return {MappedJS} instance of MappedJS
	         */

	    }, {
	        key: 'initializeMap',
	        value: function initializeMap() {
	            this.$canvas = new _TileMap.TileMap({
	                container: this.$container,
	                tilesData: this.mapData,
	                settings: this.mapSettings
	            });
	            return this;
	        }

	        /**
	         * initializes the public Api
	         * @return {MappedJS} instance of MappedJS
	         */

	    }, {
	        key: 'initializeApi',
	        value: function initializeApi() {
	            this.api = {
	                TileMap: _TileMap.TileMap,
	                Publisher: _Publisher.Publisher,
	                Helper: _Helper.Helper
	            };
	            return this;
	        }

	        /**
	         * binds all events to handlers
	         * @return {MappedJS} instance of MappedJS
	         */

	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            (0, _jquery2.default)(window).on("resize orientationchange", this.resizeHandler.bind(this));
	            return this;
	        }

	        /**
	         * handles resizing of window
	         * @return {MappedJS} instance of MappedJS
	         */

	    }, {
	        key: 'resizeHandler',
	        value: function resizeHandler() {
	            this.$canvas.resize();
	            return this;
	        }

	        /**
	         * called when loading and initialization is finished
	         * @return {MappedJS} instance of MappedJS
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

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _LatLng = __webpack_require__(3);

	var _Bounds = __webpack_require__(6);

	var _Rectangle = __webpack_require__(5);

	var _View = __webpack_require__(7);

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
	            return this.$container.offset().left;
	        }

	        /**
	         * Returns top offset of container
	         * @return {number} - top offset of container
	         */

	    }, {
	        key: 'top',
	        get: function get() {
	            return this.$container.offset().top;
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

	        /** Constructor
	         * @param  {Object} container - jQuery-object holding the container
	         * @param  {Object} tilesData={} - json object representing data of TileMap
	         * @param  {Object} settings={} - json object representing settings of TileMap
	         * @return {TileMap} instance of TileMap
	         */

	    }]);

	    function TileMap(_ref) {
	        var container = _ref.container;
	        var _ref$tilesData = _ref.tilesData;
	        var tilesData = _ref$tilesData === undefined ? {} : _ref$tilesData;
	        var _ref$settings = _ref.settings;
	        var settings = _ref$settings === undefined ? {} : _ref$settings;

	        _classCallCheck(this, TileMap);

	        if (!container) {
	            throw Error("You must define a container to initialize a TileMap");
	        }

	        this.$container = container;
	        this.imgData = tilesData[TileMap.IMG_DATA_NAME];
	        this.settings = settings;

	        this.initialize(settings.bounds, settings.center, this.getCurrentLevelData().dimensions);

	        return this;
	    }

	    /**
	     * initializes the TileMap
	     * @return {TileMap} instance of TileMap
	     */


	    _createClass(TileMap, [{
	        key: 'initialize',
	        value: function initialize(bounds, center, mapDimensions) {
	            this.view = new _View.View({
	                viewport: new _Rectangle.Rectangle(this.left, this.top, this.width, this.height),
	                mapView: new _Rectangle.Rectangle(0, 0, mapDimensions.width, mapDimensions.height),
	                bounds: new _Bounds.Bounds(new _LatLng.LatLng(bounds.northWest[0], bounds.northWest[1]), new _LatLng.LatLng(bounds.southEast[0], bounds.southEast[1])),
	                center: new _LatLng.LatLng(center.lat, center.lng),
	                data: this.getCurrentLevelData(),
	                drawCb: function (img, x, y, w, h) {
	                    this.canvasContext.drawImage(img, x, y, w, h);
	                }.bind(this)
	            });
	            this.initializeCanvas();
	            return this;
	        }

	        /**
	         * initializes the canvas, adds to DOM
	         * @return {TileMap} instance of TileMap
	         */

	    }, {
	        key: 'initializeCanvas',
	        value: function initializeCanvas() {
	            this.$canvas = (0, _jquery2.default)("<canvas class='mjs-canvas' />");
	            this.canvas = this.$canvas[0];
	            this.$container.append(this.$canvas);
	            this.canvasContext = this.canvas.getContext("2d");
	            this.resize();
	            return this;
	        }

	        /**
	         * gets data of current zoom level
	         * @return {Object} data for current level as json
	         */

	    }, {
	        key: 'getCurrentLevelData',
	        value: function getCurrentLevelData() {
	            return this.imgData["level-" + this.settings.level];
	        }

	        /**
	         * Handles resizing of TileMap
	         * @return {TileMap} instance of TileMap
	         */

	    }, {
	        key: 'resize',
	        value: function resize() {
	            this.canvasContext.canvas.width = this.width;
	            this.canvasContext.canvas.height = this.height;
	            this.resizeView();
	            return this;
	        }

	        /**
	         * Handles resizing of view
	         * @return {TileMap} instance of TileMap
	         */

	    }, {
	        key: 'resizeView',
	        value: function resizeView() {
	            this.view.drawVisibleTiles();
	            this.view.viewport.transform(this.left, this.top, this.width, this.height);
	            return this;
	        }
	    }]);

	    return TileMap;
	}();

	/**
	 * name of imagedata in data.json
	 * @type {String}
	 */


		TileMap.IMG_DATA_NAME = "img_data";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LatLng = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Point = __webpack_require__(4);

	var _Rectangle = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LatLng = exports.LatLng = function () {

	    /**
	     * Constructor
	     * @param  {number} lat = 0 - representation of latitude
	     * @param  {number} lng = 0 - representation of longitude
	     * @param  {Boolean} isDistance = false - if LatLng should be checked against bounds
	     * @return {LatLng} new instance of LatLng
	     */

	    function LatLng() {
	        var lat = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var lng = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var isDistance = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	        _classCallCheck(this, LatLng);

	        if (!isDistance && (lat > 90 || lat < -90 || lng > 180 || lng < -180)) {
	            throw new Error('latitude(' + lat + ') is greater/smaller than +/-90 or longitude(' + lng + ') is greater/smaller than +/-180');
	        }
	        this.lat = lat;
	        this.lng = lng;
	        return this;
	    }

	    /**
	     * substract specified coord from this coordinate
	     * @param  {LatLng} coord - specified coordinate to substract from this coord
	     * @return {LatLng} the new calculated LatLng
	     */


	    _createClass(LatLng, [{
	        key: 'sub',
	        value: function sub(coord) {
	            return new LatLng(this.lat - coord.lat, this.lng - coord.lng);
	        }

	        /**
	         * substract specified coord from this coordinate
	         * @param  {LatLng} coord - specified coordinate to substract from this coord
	         * @return {LatLng} the new calculated LatLng
	         */

	    }, {
	        key: 'difference',
	        value: function difference(coord) {
	            return new LatLng(this.lat - coord.lat, this.lng - coord.lng, true);
	        }

	        /**
	         * add specified coord to this coordinate
	         * @param  {LatLng} coord - specified coordinate to add to this coord
	         * @return {LatLng} the new calculated LatLng
	         */

	    }, {
	        key: 'add',
	        value: function add(coord) {
	            return new LatLng(this.lat + coord.lat, this.lng + coord.lng);
	        }

	        /**
	         * converts Latlng to a Point
	         * @return {Point} Returns a Point representing LatLng in Pixels
	         */

	    }, {
	        key: 'toPoint',
	        value: function toPoint(bounds, rect) {
	            var relativePosition = bounds.nw.difference(this),
	                factorX = rect.width / bounds.width,
	                factorY = rect.height / bounds.height;
	            return new _Point.Point(Math.abs(relativePosition.lng * factorX), Math.abs(relativePosition.lat * factorY));
	        }

	        /**
	         * checks if specified coord equals this coord
	         * @param  {LatLng} coord - specified coord to check against
	         * @return {Boolean} Returns if specified coord equals this coord
	         */

	    }, {
	        key: 'equals',
	        value: function equals(coord) {
	            return this.lat === coord.lat && this.lng === coord.lng;
	        }
	    }]);

	    return LatLng;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = exports.Point = function () {

	  /**
	   * Constructor
	   * @param  {number} x = 0 - representation of x coordinate
	   * @param  {number} y = 0 - representation of y coordinate
	   * @return {Point} new instance of point
	   */

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
	   * @param  {Point} point - the point to substract from this
	   * @return {Point} difference between this point and parameter point
	   */


	  _createClass(Point, [{
	    key: "sub",
	    value: function sub(point) {
	      return new Point(this.x - point.x, this.y - point.y);
	    }

	    /**
	     * adds 2 points
	     * @param  {Point} point - the point to add to this
	     * @return {Point} addition of this point and parameter point
	     */

	  }, {
	    key: "add",
	    value: function add(point) {
	      return new Point(this.x + point.x, this.y + point.y);
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
	     * Returns the difference from this Point to a specified Point
	     * @param  {Point} point - the specified point to be measured against this Point
	     * @return {Point} the difference between this Point and specified point
	     */

	  }, {
	    key: "difference",
	    value: function difference(point) {
	      return new Point(this.x - point.x, this.y - point.y);
	    }

	    /**
	     * Returns the distance from this Point to a specified Point
	     * @param  {Point} point - the specified point to be measured against this Point
	     * @return {Point} the distance between this Point and specified point
	     */

	  }, {
	    key: "distance",
	    value: function distance(point) {
	      var difference = this.difference(point);
	      return Math.sqrt(Math.pow(difference.x, 2) + Math.pow(difference.y, 2));
	    }

	    /**
	     * moves a point by x and y
	     * @param  {number} x - value to move x
	     * @param  {number} y - value to move y
	     * @return {Point} instance of Point
	     */

	  }, {
	    key: "translate",
	    value: function translate(x, y) {
	      this.x += x;
	      this.y += y;
	      return this;
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Rectangle = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Point2 = __webpack_require__(4);

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
	         * Constructor
	         * @param  {number} x=0 - x-position of specified rectangle
	         * @param  {number} y=0 - y-position of specified rectangle
	         * @param  {number} width=0 - width of specified rectangle
	         * @param  {number} height=0 - height of specified rectangle
	         * @return {Rectangle} new instance of Rectangle
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
	     * @param  {Rectangle} rect - the specified rectangle to check against
	     * @return {Boolean} true if containment is entirely
	     */


	    _createClass(Rectangle, [{
	        key: 'intersects',
	        value: function intersects(rect) {
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
	         * Checks whether Rectangle entirely contains the Point
	         * @param  {Point} point - the specified point to check against
	         * @return {Boolean} true if containment is entirely
	         */

	    }, {
	        key: 'containsPoint',
	        value: function containsPoint(point) {
	            return point instanceof _Point2.Point ? point.x >= this.left && point.y >= this.top && point.x <= this.right && point.y <= this.bottom : false;
	        }

	        /**
	         * Checks whether Rectangle entirely contains the Rectangle
	         * @param  {Rectangle} rect - the specified rectangle to check against
	         * @return {Boolean} true if containment is entirely
	         */

	    }, {
	        key: 'containsRect',
	        value: function containsRect(rect) {
	            return rect instanceof Rectangle ? rect.left >= this.left && rect.top >= this.top && rect.right <= this.right && rect.bottom <= this.bottom : false;
	        }

	        /**
	         * distort rectangle by factor
	         * @param  {number} factor - the specified factor of distortion
	         * @return {Rectangle} a new instance of Rectangle
	         */

	    }, {
	        key: 'getDistortedRect',
	        value: function getDistortedRect(factor) {
	            return new Rectangle(this.x * factor, this.y, this.width * factor, this.height);
	        }

	        /**
	         * moves a rectangle by specified coords
	         * @param  {number} x - how far to move in x direction
	         * @param  {number} y - how far to move in y direction
	         * @return {Rectangle} Returns the altered rectangle
	         */

	    }, {
	        key: 'translate',
	        value: function translate(x, y) {
	            this.x += x;
	            this.y += y;
	            return this;
	        }

	        /**
	         * transforms a rectangle by specified coords
	         * @param  {number} x - how far to transform in x direction
	         * @param  {number} y - how far to transform in y direction
	         * @param  {number} width - changes the width
	         * @param  {number} height - changes the width
	         * @return {Rectangle} Returns the altered rectangle
	         */

	    }, {
	        key: 'transform',
	        value: function transform(x, y, width, height) {
	            this.translate(x, y);
	            this.width += width;
	            this.height += height;
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Bounds = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LatLng = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bounds = exports.Bounds = function () {
	    _createClass(Bounds, [{
	        key: 'width',


	        /**
	         * gets width of boundaries
	         * @return {number} width of boundaries
	         */
	        get: function get() {
	            return Math.abs(this.so.lng - this.nw.lng);
	        }

	        /**
	         * gets height of boundaries
	         * @return {number} height of boundaries
	         */

	    }, {
	        key: 'height',
	        get: function get() {
	            return Math.abs(this.so.lat - this.nw.lat);
	        }

	        /**
	         * Constructor
	         * @param  {number} northWest = new LatLng() - representation of northWest boundary
	         * @param  {number} southEast = new LatLng() - representation of southEast boundary
	         * @return {Bounds} new instance of Bounds
	         */

	    }]);

	    function Bounds() {
	        var northWest = arguments.length <= 0 || arguments[0] === undefined ? new _LatLng.LatLng() : arguments[0];
	        var southEast = arguments.length <= 1 || arguments[1] === undefined ? new _LatLng.LatLng() : arguments[1];

	        _classCallCheck(this, Bounds);

	        if (northWest.lat < southEast.lat || northWest.lng > southEast.lng) {
	            throw new Error(northWest + ' needs to be top-right corner and ' + southEast + ' bottom-left');
	        }
	        this.nw = northWest;
	        this.so = southEast;
	        return this;
	    }

	    return Bounds;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.View = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LatLng = __webpack_require__(3);

	var _Bounds = __webpack_require__(6);

	var _Rectangle = __webpack_require__(5);

	var _Tile = __webpack_require__(8);

	var _Publisher = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Singleton instance of Publisher
	 */
	var PUBLISHER = new _Publisher.Publisher();

	var View = exports.View = function () {
	    _createClass(View, [{
	        key: 'distortion',


	        /**
	         * Returns current distortion
	         * @return {number} returns current distortion of latitude
	         */
	        get: function get() {
	            return Math.cos(this.center.lat);
	        }

	        /**
	         * Returns the offset of the center
	         */

	    }, {
	        key: 'offset',
	        get: function get() {
	            var center = this.center.toPoint(this.bounds, this.mapView);
	            return this.viewport.center.sub(center);
	        }

	        /**
	         * Returns the offset of the map
	         * @param {number} distortion - the current latitude distortion
	         * @return {number} calculated offset
	         */

	    }, {
	        key: 'mapOffset',
	        get: function get() {
	            return this.offset.x + (this.mapView.width - this.mapView.width * this.distortion) / 2;
	        }

	        /**
	         * get all visible tiles
	         * @return {array} all tiles that are currently visible
	         */

	    }, {
	        key: 'visibleTiles',
	        get: function get() {
	            return this.tiles.filter(function (t, i, a) {
	                var newTile = t.getDistortedRect(this.distortion).translate(this.mapOffset, this.offset.y);
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
	        var drawCb = _ref.drawCb;

	        _classCallCheck(this, View);

	        this.mapView = mapView;
	        this.viewport = viewport;
	        this.bounds = bounds;
	        this.center = center;
	        this.tiles = [];
	        this.data = data;
	        this.draw = drawCb;
	        this.bindEvents().initializeTiles();

	        return this;
	    }

	    /**
	     * handles on load of a tile
	     * @param  {Tile} tile a tile of the TileMap
	     * @return {TileMap} instance of TileMap
	     */


	    _createClass(View, [{
	        key: 'onTilesLoaded',
	        value: function onTilesLoaded(tile) {
	            this.drawTile(tile);
	            tile.state.next();
	            return this;
	        }

	        /**
	         * Handles draw of TileMap
	         * @return {TileMap} instance of TileMap
	         */

	    }, {
	        key: 'drawVisibleTiles',
	        value: function drawVisibleTiles() {
	            for (var tile in this.visibleTiles) {
	                this.drawTile(this.visibleTiles[tile]);
	            }
	            return this;
	        }

	        /**
	         * draws tiles on canvas
	         * @param  {Tile} tile a tile of the TileMap
	         * @return {TileMap} instance of TileMap
	         */

	    }, {
	        key: 'drawTile',
	        value: function drawTile(tile) {
	            if (tile.state.current.value >= 2) {
	                if (this.draw && typeof this.draw === "function") {
	                    this.draw(tile.img, tile.x * this.distortion + this.mapOffset, tile.y + this.offset.y, tile.width * this.distortion, tile.height);
	                } else {
	                    console.error("Draw method is not defined or not a function");
	                }
	            } else if (tile.state.current.value === 0) {
	                tile.initialize();
	            }
	            return this;
	        }

	        /**
	         * Handles all events for class
	         * @return {TileMap} instance of TileMap
	         */

	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));
	            return this;
	        }

	        /**
	         * initializes tiles
	         * @return {TileMap} instance of TileMap
	         */

	    }, {
	        key: 'initializeTiles',
	        value: function initializeTiles() {
	            var currentLevel = this.data.tiles;
	            for (var tile in currentLevel) {
	                var currentTileData = currentLevel[tile];
	                var _tile = new _Tile.Tile(currentTileData);
	                this.tiles.push(_tile);
	            }
	            return this;
	        }
	    }]);

	    return View;
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tile = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _State = __webpack_require__(9);

	var _Rectangle2 = __webpack_require__(5);

	var _Publisher = __webpack_require__(10);

	var _Helper = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Singleton instance of Publisher
	 */
	var PUBLISHER = new _Publisher.Publisher();

	/**
	 * States of a tile
	 * @type {Array}
	 */
	var STATES = [{ value: 0, description: 'Starting' }, { value: 1, description: 'Initialized' }, { value: 2, description: 'Loaded' }, { value: 3, description: 'Drawn' }];

	/**
	 * Name of event fired, when tile is loaded
	 * @type {String}
	 */
	var EVENT_TILE_LOADED = "tile-loaded";

	/**
	 * Name of event fired, when tile is not found on loading
	 * @type {String}
	 */
	var EVENT_TILE_FAILED = "tile-failed";

	var Tile = exports.Tile = function (_Rectangle) {
	  _inherits(Tile, _Rectangle);

	  _createClass(Tile, [{
	    key: 'Publisher',


	    /**
	     * Return the Publisher
	     */
	    get: function get() {
	      return PUBLISHER;
	    }

	    /**
	     * Constructor
	     * @param  {string} path=null - path to image
	     * @param  {number} x=0 - position x of tile
	     * @param  {number} y=0 - position y of tile
	     * @param  {number} w=0 - tile width
	     * @param  {number} h=0 - tile height
	     * @return {Tile} instance of Tile
	     */

	  }]);

	  function Tile() {
	    var _ret;

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

	    _classCallCheck(this, Tile);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this, x, y, w, h));

	    _this.state = new _State.State(STATES);
	    if (!path || typeof path !== "string" || path.length === 0) {
	      throw new TypeError('Path ' + path + ' needs to be of type string and should not be empty');
	    }
	    _this.path = path;
	    return _ret = _this, _possibleConstructorReturn(_this, _ret);
	  }

	  /**
	   * initializes tile and starts loading image
	   * @return {Tile} instance of Tile
	   */


	  _createClass(Tile, [{
	    key: 'initialize',
	    value: function initialize() {
	      this.state.next();
	      _Helper.Helper.loadImage(this.path, function (img) {
	        this.img = img;
	        this.state.next();
	        PUBLISHER.publish(EVENT_TILE_LOADED, this);
	      }.bind(this));

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
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var STATES = new WeakMap();

	var _makePrivate = function _makePrivate(o) {
	    return STATES.set(o, {});
	};
	var _getPrivate = function _getPrivate(o) {
	    return STATES.get(o);
	};

	var State = exports.State = function () {

	    /**
	     * Constructor
	     * @param  {Array} states_array=[{value: 0, description: 'Default'}] - [description]
	     * @return {State} instance of State
	     */

	    function State() {
	        var states_array = arguments.length <= 0 || arguments[0] === undefined ? [{ value: 0, description: 'Default' }] : arguments[0];

	        _classCallCheck(this, State);

	        _makePrivate(this);
	        _getPrivate(this).STATES = states_array;
	        this.i = 0;
	        return this;
	    }

	    /**
	     * get current state
	     * @return {Object} a state from STATES-array
	     */


	    _createClass(State, [{
	        key: 'next',


	        /**
	         * get the next element
	         * @return {State} instance of State
	         */
	        value: function next() {
	            if (this.hasNext()) {
	                this.i++;
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
	            return this.i < _getPrivate(this).STATES.length - 1;
	        }
	    }, {
	        key: 'current',
	        get: function get() {
	            return _getPrivate(this).STATES[this.i];
	        }
	    }]);

	    return State;
	}();

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

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

	            if (!this.subscribers[type]) {
	                this.subscribers[type] = [];
	            }
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

	            this.handle(Publisher.UNSUBSCRIBE, type, fn);
	            return this;
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

	            this.handle(Publisher.PUBLISH, type, arg);
	            return this;
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
	            for (var i = 0; i < subs.length; i++) {
	                if (action === Publisher.PUBLISH) {
	                    subs[i](data);
	                } else {
	                    if (subs[i] === data) {
	                        subs.splice(i, 1);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Helper = undefined;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Helper = exports.Helper = {

	    /**
	     * request json-data from given file and calls callback on success
	     * @param  {string} filename - path to file
	     * @param  {Function} callback - function called when data is loaded successfully
	     * @return {Helper} Helper
	     */
	    requestJSON: function requestJSON(filename, callback) {
	        _jquery2.default.ajax({
	            type: "GET",
	            url: filename,
	            dataType: "json",
	            success: function success(data, status, request) {
	                return callback(data);
	            },
	            error: function error(response) {
	                if (response.status === 200) {
	                    throw new Error("The JSON submitted seems not valid");
	                }
	                console.error("Error requesting file: ", response);
	            }
	        });
	        return this;
	    },
	    /**
	     * loads an image and calls callback on success
	     * @param  {Function} cb - callback-function on success
	     * @return {Helper} Helper
	     */
	    loadImage: function loadImage(path, cb) {
	        var img = new Image();
	        img.onload = function () {
	            if (cb && typeof cb === "function") {
	                cb(img);
	            }
	        };
	        img.src = path;
	        return this;
	    }

		};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mappedJS.js.map