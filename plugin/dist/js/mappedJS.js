(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["de"] = factory(require("jQuery"));
	else
		root["de"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MapController = __webpack_require__(1).MapController;
	var $ = __webpack_require__(2);
	var Helper = __webpack_require__(6).Helper;

	var MappedJS = exports.MappedJS = function () {

	    /**
	     * Constructor
	     * @param  {string|Object} container=".mjs" - Container, either string, jQuery-object or dom-object
	     * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
	     * @param  {Object} events={loaded: "mjs-loaded"}} - List of events
	     */

	    function MappedJS(_ref) {
	        var _ref$container = _ref.container;
	        var container = _ref$container === undefined ? ".mjs" : _ref$container;
	        var _ref$mapData = _ref.mapData;
	        var mapData = _ref$mapData === undefined ? {} : _ref$mapData;
	        var _ref$events = _ref.events;
	        var events = _ref$events === undefined ? { loaded: "mjs-loaded" } : _ref$events;

	        _classCallCheck(this, MappedJS);

	        this.initializeApi();
	        this.initializeSettings(container, events);

	        var _this = this;
	        this.initializeData(mapData, function () {
	            _this.initializeMap();
	            _this.bindEvents();
	            _this.loadingFinished();
	        });
	    }

	    /**
	     * initializes the settings and handles errors
	     * @param  {string|Object} container - Container, either string, jQuery-object or dom-object
	     * @param  {object} events - List of events
	     */


	    _createClass(MappedJS, [{
	        key: 'initializeSettings',
	        value: function initializeSettings(container, events) {
	            this.$container = typeof container === "string" ? $(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : $(container);
	            if (!(this.$container instanceof jQuery)) {
	                throw new Error("Container " + container + " not found");
	            }
	            this.$container.addClass("mappedJS");

	            this.events = events;
	        }

	        /**
	         * initializes the data, asynchronous
	         * @param  {Object} mapData - data of map tiles, can be json or path to file
	         * @param  {Function} cb - called, when data is received
	         */

	    }, {
	        key: 'initializeData',
	        value: function initializeData(mapData, cb) {
	            var _this = this;
	            if (typeof mapData === "string") {
	                Helper.requestJSON(mapData, function (data) {
	                    _this.mapData = data;
	                    cb();
	                });
	            } else {
	                this.mapData = (typeof mapData === 'undefined' ? 'undefined' : _typeof(mapData)) === "object" ? mapData : null;
	                cb();
	            }
	        }

	        /**
	         * initializes Map module
	         */

	    }, {
	        key: 'initializeMap',
	        value: function initializeMap() {
	            this.$canvas = new MapController({
	                container: this.$container,
	                tilesData: this.mapData
	            });
	        }

	        /**
	         * initializes the public Api
	         */

	    }, {
	        key: 'initializeApi',
	        value: function initializeApi() {
	            this.api = {
	                MapController: MapController,
	                Helper: Helper
	            };
	        }

	        /**
	         * binds all events to handlers
	         */

	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            $(window).on("resize orientationchange", this.resizeHandler.bind(this));
	        }

	        /**
	         * handles resizing of window
	         */

	    }, {
	        key: 'resizeHandler',
	        value: function resizeHandler() {
	            this.$canvas.resize();
	        }

	        /**
	         * called when loading and initialization is finisehd
	         */

	    }, {
	        key: 'loadingFinished',
	        value: function loadingFinished() {
	            this.$container.trigger(this.events.loaded);
	        }
	    }]);

	    return MappedJS;
	}();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var $ = __webpack_require__(2);
	var Tile = __webpack_require__(3).Tile;
	var Publisher = __webpack_require__(5).Publisher;

	var PUBLISHER = new Publisher();

	var MapController = exports.MapController = function () {

	    /**
	     * Constructor
	     * @param  {Object} container - jQuery-object holding the container
	     */

	    function MapController(_ref) {
	        var container = _ref.container;
	        var _ref$tilesData = _ref.tilesData;
	        var tilesData = _ref$tilesData === undefined ? {} : _ref$tilesData;

	        _classCallCheck(this, MapController);

	        if (!container) {
	            throw Error("You must define a container to initialize a map");
	        }

	        this.$container = container;
	        this.data = tilesData;

	        this.initialize();
	        this.initializeTiles();
	    }

	    /**
	     * initializes the MapController
	     */


	    _createClass(MapController, [{
	        key: "initialize",
	        value: function initialize() {

	            PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));

	            this.$canvas = $("<canvas class='mjs-canvas' />");
	            this.canvas = this.$canvas[0];
	            this.$container.append(this.$canvas);
	            this.canvasContext = this.canvas.getContext("2d");
	            this.resize();
	        }
	    }, {
	        key: "initializeTiles",
	        value: function initializeTiles() {
	            this.tiles = [];
	            for (var tile in this.data.images) {
	                var currentTileData = this.data.images[tile];
	                var _tile = new Tile(currentTileData);
	                this.tiles.push(_tile);
	            }
	        }
	    }, {
	        key: "onTilesLoaded",
	        value: function onTilesLoaded(tile) {
	            this.canvasContext.drawImage(tile.img, tile.x, tile.y, tile.width, tile.height);
	        }

	        /**
	         * Handles resizing of map
	         */

	    }, {
	        key: "resize",
	        value: function resize() {
	            this.canvasWidth = this.$container.innerWidth();
	            this.canvasHeight = this.$container.innerHeight();

	            this.canvasContext.canvas.width = this.canvasWidth;
	            this.canvasContext.canvas.height = this.canvasHeight;

	            this.draw();
	        }

	        /**
	         * Handles the redraw of the map
	         */

	    }, {
	        key: "draw",
	        value: function draw() {}
	    }]);

	    return MapController;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var $ = __webpack_require__(2);
	var State = __webpack_require__(4).State;
	var Publisher = __webpack_require__(5).Publisher;

	var PUBLISHER = new Publisher();

	var Tile = exports.Tile = function () {
	    function Tile(_ref) {
	        var _ref$path = _ref.path;
	        var path = _ref$path === undefined ? null : _ref$path;
	        var _ref$x = _ref.x;
	        var x = _ref$x === undefined ? 0 : _ref$x;
	        var _ref$y = _ref.y;
	        var y = _ref$y === undefined ? 0 : _ref$y;
	        var _ref$w = _ref.w;
	        var w = _ref$w === undefined ? 0 : _ref$w;
	        var _ref$h = _ref.h;
	        var h = _ref$h === undefined ? 0 : _ref$h;

	        _classCallCheck(this, Tile);

	        this.state = new State(Tile.STATES);

	        if (!path || typeof path !== "string" || path.length === 0) {
	            throw new Error('Path {path} needs to be of type string and should not be empty');
	        }
	        this.path = path;

	        this.x = x;
	        this.y = y;
	        this.width = w;
	        this.height = h;

	        this.initialize();
	    }

	    _createClass(Tile, [{
	        key: 'initialize',
	        value: function initialize() {
	            this.state.next();

	            var _this = this;
	            this.loadImage(function (img) {
	                _this.img = img;
	                _this.state.next();
	                PUBLISHER.publish("tile-loaded", _this);
	            });
	        }
	    }, {
	        key: 'loadImage',
	        value: function loadImage(cb) {
	            var img = new Image();
	            img.src = this.path;
	            img.onload = function () {
	                cb(img);
	            };
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'Tile({path})';
	        }
	    }]);

	    return Tile;
	}();

		Tile.STATES = [{ value: 0, description: 'Starting' }, { value: 1, description: 'Initialized' }, { value: 2, description: 'Loaded' }, { value: 3, description: 'Drawn' }];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var State = exports.State = function () {
	    function State() {
	        var states_array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	        _classCallCheck(this, State);

	        this.STATES = states_array;
	        this.i = 0;
	        this.state = this.getState();
	    }

	    _createClass(State, [{
	        key: "getState",
	        value: function getState() {
	            return this.STATES[this.i];
	        }
	    }, {
	        key: "next",
	        value: function next() {
	            if (this.hasNext()) {
	                this.i++;
	            }
	            this.state = this.getState();
	            return this;
	        }
	    }, {
	        key: "hasNext",
	        value: function hasNext() {
	            return this.i < this.STATES.length;
	        }
	    }]);

	    return State;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var instance = null;

	var Publisher = exports.Publisher = function () {
	    function Publisher() {
	        _classCallCheck(this, Publisher);

	        if (!instance) {
	            this.subscribers = {
	                any: []
	            };
	            instance = this;
	        }

	        return instance;
	    }

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
	    }, {
	        key: "unsubscribe",
	        value: function unsubscribe() {
	            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
	            var fn = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

	            this.handle(Publisher.UNSUBSCRIBE, type, fn);
	            return this;
	        }
	    }, {
	        key: "publish",
	        value: function publish() {
	            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
	            var arg = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	            this.handle(Publisher.PUBLISH, type, arg);
	            return this;
	        }
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
	    }]);

	    return Publisher;
	}();

	Publisher.PUBLISH = "publish";
	Publisher.UNSUBSCRIBE = "unsubscribe";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var $ = __webpack_require__(2);

	var Helper = exports.Helper = {
	    /**
	     * request json-data from given file and calls callback on success
	     * @param  {string} filename - path to file
	     * @param  {Function} callback - function called when data is loaded successfully
	     */
	    requestJSON: function requestJSON(filename, callback) {
	        "use strict";

	        $.ajax({
	            type: "GET",
	            url: filename,
	            dataType: "json",
	            success: function success(data, status, request) {
	                callback(data);
	            },
	            error: function error(response) {
	                if (response.status === 200) {
	                    throw new Error("The JSON submitted seems not valid");
	                }
	                console.error("Error requesting file: ", response);
	            }
	        });
	    }
		};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mappedJS.js.map