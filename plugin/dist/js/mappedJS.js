(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("Handlebars"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "Handlebars"], factory);
	else if(typeof exports === 'object')
		exports["de"] = factory(require("jQuery"), require("Handlebars"));
	else
		root["de"] = factory(root["jQuery"], root["Handlebars"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_208__) {
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

	__webpack_require__(2);

	var _Helper = __webpack_require__(192);

	var _Events = __webpack_require__(193);

	var _TileMap = __webpack_require__(194);

	var _DataEnrichment = __webpack_require__(206);

	var _Interact = __webpack_require__(210);

	var _Point = __webpack_require__(195);

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
	        var _ref$labelData = _ref.labelData;
	        var labelData = _ref$labelData === undefined ? {} : _ref$labelData;
	        var _ref$mapSettings = _ref.mapSettings;
	        var mapSettings = _ref$mapSettings === undefined ? {} : _ref$mapSettings;
	        var _ref$events = _ref.events;
	        var events = _ref$events === undefined ? { loaded: "mjs-loaded" } : _ref$events;

	        _classCallCheck(this, MappedJS);

	        this.initializeSettings(container, events, mapSettings);

	        this.id = this.generateUniqueID();
	        this.initializeData(mapData, function (loadedMapData) {
	            _this.mapData = loadedMapData;
	            _this.initializeData(markerData, function (loadedMarkerData) {
	                _this.mapData = Object.assign(_this.mapData, loadedMarkerData);
	                _this.initializeData(labelData, function (loadedLabelData) {
	                    _this.mapData = Object.assign(_this.mapData, loadedLabelData);
	                    _this.initializeMap();
	                    _this.addControls();
	                    _this.bindEvents();
	                    _this.loadingFinished();
	                });
	            });
	        });

	        this.keyTicks = 0;

	        return this;
	    }

	    _createClass(MappedJS, [{
	        key: 'generateUniqueID',
	        value: function generateUniqueID() {
	            return parseInt(Date.now() * (Math.random() * 10), 10);
	        }

	        /**
	         * add controls (zoom, home) to DOM
	         */

	    }, {
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
	                id: this.id,
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
	            return point.clone.multiply(this.tileMap.width, this.tileMap.height);
	        }

	        /**
	         * initializes interaction
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'initializeInteractForMap',
	        value: function initializeInteractForMap() {
	            var _this2 = this;

	            this.interact = new _Interact.Interact({
	                container: this.$content,
	                autoFireHold: 300,
	                overwriteViewportSettings: true,
	                callbacks: {
	                    tap: function tap(data) {
	                        var action = (0, _jQuery2.default)(data.target).data("mjs-action");
	                        _this2.tileMap.velocity = new _Point.Point();
	                        if (action) action();
	                    },
	                    pan: function pan(data) {
	                        if ((0, _jQuery2.default)(data.target).hasClass("control")) return false;
	                        var change = data.last.position.clone.substract(data.position.move);
	                        _this2.tileMap.velocity = new _Point.Point();
	                        _this2.tileMap.moveView(_this2.getAbsolutePosition(change).multiply(-1, -1));
	                    },
	                    wheel: function wheel(data) {
	                        var factor = data.delta / 4;
	                        _this2.tileMap.velocity = new _Point.Point();
	                        _this2.tileMap.zoom(factor, _this2.getAbsolutePosition(data.position.start));
	                    },
	                    pinch: function pinch(data) {
	                        _this2.tileMap.velocity = new _Point.Point();
	                        _this2.tileMap.zoom(data.difference * 3, _this2.getAbsolutePosition(data.position.move));
	                    },
	                    doubletap: function doubletap(data) {
	                        _this2.tileMap.velocity = new _Point.Point();
	                        _this2.tileMap.zoom(0.2, _this2.getAbsolutePosition(data.position.start));
	                    },
	                    flick: function flick(data) {
	                        _this2.tileMap.velocity = data.velocity.multiply(20);
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

	            (0, _jQuery2.default)(window).on(_Events.Events.Handling.RESIZE, this.resizeHandler.bind(this));

	            var $document = (0, _jQuery2.default)(document);
	            $document.on(_Events.Events.Handling.KEYDOWN, this.keyPress.bind(this));
	            $document.on(_Events.Events.Handling.KEYUP, this.keyRelease.bind(this));

	            this.$zoomIn.data("mjs-action", this.zoomInToCenter.bind(this));
	            this.$zoomOut.data("mjs-action", this.zoomOutToCenter.bind(this));
	            this.$home.data("mjs-action", this.resetToInitialState.bind(this));

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
	            this.tileMap.zoom(0.2, this.tileMap.view.viewport.center);
	            return this;
	        }

	        /**
	         * zooms out of center of map
	         * @return {MappedJS} instance of MappedJS for chaining
	         */

	    }, {
	        key: 'zoomOutToCenter',
	        value: function zoomOutToCenter() {
	            this.tileMap.zoom(-0.2, this.tileMap.view.viewport.center);
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
	                case 72: // h
	                case 27:
	                    // esc
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
	            this.tileMap.moveView(direction.multiply(this.keyTicks));
	            return this;
	        }
	    }, {
	        key: 'keyRelease',
	        value: function keyRelease() {
	            this.keyTicks = 0;
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

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	__webpack_require__(3);

	__webpack_require__(190);

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(37);
	__webpack_require__(43);
	__webpack_require__(45);
	__webpack_require__(47);
	__webpack_require__(49);
	__webpack_require__(51);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(71);
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(77);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(83);
	__webpack_require__(84);
	__webpack_require__(85);
	__webpack_require__(87);
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(91);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(113);
	__webpack_require__(114);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(123);
	__webpack_require__(125);
	__webpack_require__(127);
	__webpack_require__(129);
	__webpack_require__(130);
	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(136);
	__webpack_require__(137);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(146);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(161);
	__webpack_require__(162);
	__webpack_require__(163);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(188);
	__webpack_require__(189);
	module.exports = __webpack_require__(8);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(5)
	  , $export           = __webpack_require__(6)
	  , DESCRIPTORS       = __webpack_require__(11)
	  , createDesc        = __webpack_require__(10)
	  , html              = __webpack_require__(17)
	  , cel               = __webpack_require__(18)
	  , has               = __webpack_require__(20)
	  , cof               = __webpack_require__(21)
	  , invoke            = __webpack_require__(22)
	  , fails             = __webpack_require__(12)
	  , anObject          = __webpack_require__(23)
	  , aFunction         = __webpack_require__(16)
	  , isObject          = __webpack_require__(19)
	  , toObject          = __webpack_require__(24)
	  , toIObject         = __webpack_require__(26)
	  , toInteger         = __webpack_require__(28)
	  , toIndex           = __webpack_require__(29)
	  , toLength          = __webpack_require__(30)
	  , IObject           = __webpack_require__(27)
	  , IE_PROTO          = __webpack_require__(14)('__proto__')
	  , createArrayMethod = __webpack_require__(31)
	  , arrayIndexOf      = __webpack_require__(36)(false)
	  , ObjectProto       = Object.prototype
	  , ArrayProto        = Array.prototype
	  , arraySlice        = ArrayProto.slice
	  , arrayJoin         = ArrayProto.join
	  , defineProperty    = $.setDesc
	  , getOwnDescriptor  = $.getDesc
	  , defineProperties  = $.setDescs
	  , factories         = {}
	  , IE8_DOM_DEFINE;

	if(!DESCRIPTORS){
	  IE8_DOM_DEFINE = !fails(function(){
	    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
	  });
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)anObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    anObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
	  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $.getDesc,
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  defineProperty: $.setDesc,
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties
	});

	  // IE 8- don't enum bug keys
	var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
	            'toLocaleString,toString,valueOf').split(',')
	  // Additional keys for getOwnPropertyNames
	  , keys2 = keys1.concat('length', 'prototype')
	  , keysLen1 = keys1.length;

	// Create object with `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe')
	    , i      = keysLen1
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict.prototype[keys1[i]];
	  return createDict();
	};
	var createGetKeys = function(names, length){
	  return function(object){
	    var O      = toIObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	    return result;
	  };
	};
	var Empty = function(){};
	$export($export.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = toObject(O);
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(typeof O.constructor == 'function' && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = anObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
	});

	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }
	  return factories[len](F, args);
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$export($export.P, 'Function', {
	  bind: function bind(that /*, args... */){
	    var fn       = aFunction(this)
	      , partArgs = arraySlice.call(arguments, 1);
	    var bound = function(/* args... */){
	      var args = partArgs.concat(arraySlice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if(isObject(fn.prototype))bound.prototype = fn.prototype;
	    return bound;
	  }
	});

	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * fails(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});
	$export($export.P + $export.F * (IObject != Object), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
	  }
	});

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$export($export.S, 'Array', {isArray: __webpack_require__(33)});

	var createArrayReduce = function(isRight){
	  return function(callbackfn, memo){
	    aFunction(callbackfn);
	    var O      = IObject(this)
	      , length = toLength(O.length)
	      , index  = isRight ? length - 1 : 0
	      , i      = isRight ? -1 : 1;
	    if(arguments.length < 2)for(;;){
	      if(index in O){
	        memo = O[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if(isRight ? index < 0 : length <= index){
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	};

	var methodize = function($fn){
	  return function(arg1/*, arg2 = undefined */){
	    return $fn(this, arg1, arguments[1]);
	  };
	};

	$export($export.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || methodize(createArrayMethod(0)),
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: methodize(createArrayMethod(1)),
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: methodize(createArrayMethod(2)),
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: methodize(createArrayMethod(3)),
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: methodize(createArrayMethod(4)),
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: methodize(arrayIndexOf),
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()
	$export($export.S, 'Date', {now: function(){ return +new Date; }});

	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(this))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , hide      = __webpack_require__(9)
	  , redefine  = __webpack_require__(13)
	  , ctx       = __webpack_require__(15)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)redefine(target, key, out);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , createDesc = __webpack_require__(10);
	module.exports = __webpack_require__(11) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(12)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(7)
	  , hide      = __webpack_require__(9)
	  , SRC       = __webpack_require__(14)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(8).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    val.hasOwnProperty('name') || hide(val, 'name', key);
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).document && document.documentElement;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(25);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(27)
	  , defined = __webpack_require__(25);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(21);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(28)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(15)
	  , IObject  = __webpack_require__(27)
	  , toObject = __webpack_require__(24)
	  , toLength = __webpack_require__(30)
	  , asc      = __webpack_require__(32);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(19)
	  , isArray  = __webpack_require__(33)
	  , SPECIES  = __webpack_require__(34)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(21);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(35)('wks')
	  , uid    = __webpack_require__(14)
	  , Symbol = __webpack_require__(7).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(26)
	  , toLength  = __webpack_require__(30)
	  , toIndex   = __webpack_require__(29);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(5)
	  , global         = __webpack_require__(7)
	  , has            = __webpack_require__(20)
	  , DESCRIPTORS    = __webpack_require__(11)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(13)
	  , $fails         = __webpack_require__(12)
	  , shared         = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(38)
	  , uid            = __webpack_require__(14)
	  , wks            = __webpack_require__(34)
	  , keyOf          = __webpack_require__(39)
	  , $names         = __webpack_require__(40)
	  , enumKeys       = __webpack_require__(41)
	  , isArray        = __webpack_require__(33)
	  , anObject       = __webpack_require__(23)
	  , toIObject      = __webpack_require__(26)
	  , createDesc     = __webpack_require__(10)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(42)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(5).setDesc
	  , has = __webpack_require__(20)
	  , TAG = __webpack_require__(34)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(5)
	  , toIObject = __webpack_require__(26);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(26)
	  , getNames  = __webpack_require__(5).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(5);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(44)});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(5)
	  , toObject = __webpack_require__(24)
	  , IObject  = __webpack_require__(27);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(12)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(6);
	$export($export.S, 'Object', {is: __webpack_require__(46)});

/***/ },
/* 46 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(6);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(48).set});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(5).getDesc
	  , isObject = __webpack_require__(19)
	  , anObject = __webpack_require__(23);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(15)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(50)
	  , test    = {};
	test[__webpack_require__(34)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(13)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(21)
	  , TAG = __webpack_require__(34)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(19);

	__webpack_require__(52)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(6)
	  , core    = __webpack_require__(8)
	  , fails   = __webpack_require__(12);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(19);

	__webpack_require__(52)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(19);

	__webpack_require__(52)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
	  };
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(19);

	__webpack_require__(52)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(19);

	__webpack_require__(52)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(19);

	__webpack_require__(52)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(26);

	__webpack_require__(52)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(24);

	__webpack_require__(52)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(24);

	__webpack_require__(52)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(52)('getOwnPropertyNames', function(){
	  return __webpack_require__(40).get;
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var setDesc    = __webpack_require__(5).setDesc
	  , createDesc = __webpack_require__(10)
	  , has        = __webpack_require__(20)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(11) && setDesc(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = ('' + this).match(nameRE)
	      , name  = match ? match[1] : '';
	    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
	    return name;
	  }
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $             = __webpack_require__(5)
	  , isObject      = __webpack_require__(19)
	  , HAS_INSTANCE  = __webpack_require__(34)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $           = __webpack_require__(5)
	  , global      = __webpack_require__(7)
	  , has         = __webpack_require__(20)
	  , cof         = __webpack_require__(21)
	  , toPrimitive = __webpack_require__(65)
	  , fails       = __webpack_require__(12)
	  , $trim       = __webpack_require__(66).trim
	  , NUMBER      = 'Number'
	  , $Number     = global[NUMBER]
	  , Base        = $Number
	  , proto       = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF  = cof($.create(proto)) == NUMBER
	  , TRIM        = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call(__webpack_require__(11) ? $.getNames(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), function(key){
	    if(has(Base, key) && !has($Number, key)){
	      $.setDesc($Number, key, $.getDesc(Base, key));
	    }
	  });
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(13)(global, NUMBER, $Number);
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(19);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6)
	  , defined = __webpack_require__(25)
	  , fails   = __webpack_require__(12)
	  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');

	var exporter = function(KEY, exec){
	  var exp  = {};
	  exp[KEY] = exec(trim);
	  $export($export.P + $export.F * fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  }), 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(6);

	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(6)
	  , _isFinite = __webpack_require__(7).isFinite;

	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(6);

	$export($export.S, 'Number', {isInteger: __webpack_require__(70)});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(19)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(6);

	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(6)
	  , isInteger = __webpack_require__(70)
	  , abs       = Math.abs;

	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(6);

	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(6);

	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.12 Number.parseFloat(string)
	var $export = __webpack_require__(6);

	$export($export.S, 'Number', {parseFloat: parseFloat});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.13 Number.parseInt(string, radix)
	var $export = __webpack_require__(6);

	$export($export.S, 'Number', {parseInt: parseInt});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(6)
	  , log1p   = __webpack_require__(78)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;

	// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
	$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 78 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(6);

	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	$export($export.S, 'Math', {asinh: asinh});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(6);

	$export($export.S, 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(6)
	  , sign    = __webpack_require__(82);

	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 82 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(6);

	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(6)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(6);

	$export($export.S, 'Math', {expm1: __webpack_require__(86)});

/***/ },
/* 86 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	module.exports = Math.expm1 || function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(6)
	  , sign      = __webpack_require__(82)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);

	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};


	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(6)
	  , abs     = Math.abs;

	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum   = 0
	      , i     = 0
	      , $$    = arguments
	      , $$len = $$.length
	      , larg  = 0
	      , arg, div;
	    while(i < $$len){
	      arg = abs($$[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(6)
	  , $imul   = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(12)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(6);

	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(6);

	$export($export.S, 'Math', {log1p: __webpack_require__(78)});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(6);

	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(6);

	$export($export.S, 'Math', {sign: __webpack_require__(82)});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(6)
	  , expm1   = __webpack_require__(86)
	  , exp     = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(12)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(6)
	  , expm1   = __webpack_require__(86)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(6);

	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(6)
	  , toIndex        = __webpack_require__(29)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res   = []
	      , $$    = arguments
	      , $$len = $$.length
	      , i     = 0
	      , code;
	    while($$len > i){
	      code = +$$[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(6)
	  , toIObject = __webpack_require__(26)
	  , toLength  = __webpack_require__(30);

	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl   = toIObject(callSite.raw)
	      , len   = toLength(tpl.length)
	      , $$    = arguments
	      , $$len = $$.length
	      , res   = []
	      , i     = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < $$len)res.push(String($$[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(66)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(101)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(102)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , defined   = __webpack_require__(25);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(42)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(13)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(20)
	  , Iterators      = __webpack_require__(103)
	  , $iterCreate    = __webpack_require__(104)
	  , setToStringTag = __webpack_require__(38)
	  , getProto       = __webpack_require__(5).getProto
	  , ITERATOR       = __webpack_require__(34)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(5)
	  , descriptor     = __webpack_require__(10)
	  , setToStringTag = __webpack_require__(38)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(34)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(6)
	  , $at     = __webpack_require__(101)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(6)
	  , toLength  = __webpack_require__(30)
	  , context   = __webpack_require__(107)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];

	$export($export.P + $export.F * __webpack_require__(109)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , $$   = arguments
	      , endPosition = $$.length > 1 ? $$[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(108)
	  , defined  = __webpack_require__(25);

	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(19)
	  , cof      = __webpack_require__(21)
	  , MATCH    = __webpack_require__(34)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(34)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(6)
	  , context  = __webpack_require__(107)
	  , INCLUDES = 'includes';

	$export($export.P + $export.F * __webpack_require__(109)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);

	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(112)
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(28)
	  , defined   = __webpack_require__(25);

	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(6)
	  , toLength    = __webpack_require__(30)
	  , context     = __webpack_require__(107)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];

	$export($export.P + $export.F * __webpack_require__(109)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , $$     = arguments
	      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(15)
	  , $export     = __webpack_require__(6)
	  , toObject    = __webpack_require__(24)
	  , call        = __webpack_require__(115)
	  , isArrayIter = __webpack_require__(116)
	  , toLength    = __webpack_require__(30)
	  , getIterFn   = __webpack_require__(117);
	$export($export.S + $export.F * !__webpack_require__(118)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(23);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(103)
	  , ITERATOR   = __webpack_require__(34)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(50)
	  , ITERATOR  = __webpack_require__(34)('iterator')
	  , Iterators = __webpack_require__(103);
	module.exports = __webpack_require__(8).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(34)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(6);

	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(12)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , $$     = arguments
	      , $$len  = $$.length
	      , result = new (typeof this == 'function' ? this : Array)($$len);
	    while($$len > index)result[index] = $$[index++];
	    result.length = $$len;
	    return result;
	  }
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(121)
	  , step             = __webpack_require__(122)
	  , Iterators        = __webpack_require__(103)
	  , toIObject        = __webpack_require__(26);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(102)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(34)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(9)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(124)('Array');

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(7)
	  , $           = __webpack_require__(5)
	  , DESCRIPTORS = __webpack_require__(11)
	  , SPECIES     = __webpack_require__(34)('species');

	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(6);

	$export($export.P, 'Array', {copyWithin: __webpack_require__(126)});

	__webpack_require__(121)('copyWithin');

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(24)
	  , toIndex  = __webpack_require__(29)
	  , toLength = __webpack_require__(30);

	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , $$    = arguments
	    , end   = $$.length > 2 ? $$[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(6);

	$export($export.P, 'Array', {fill: __webpack_require__(128)});

	__webpack_require__(121)('fill');

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(24)
	  , toIndex  = __webpack_require__(29)
	  , toLength = __webpack_require__(30);
	module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , $$     = arguments
	    , $$len  = $$.length
	    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
	    , end    = $$len > 2 ? $$[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(6)
	  , $find   = __webpack_require__(31)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(121)(KEY);

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(6)
	  , $find   = __webpack_require__(31)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(121)(KEY);

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , global   = __webpack_require__(7)
	  , isRegExp = __webpack_require__(108)
	  , $flags   = __webpack_require__(132)
	  , $RegExp  = global.RegExp
	  , Base     = $RegExp
	  , proto    = $RegExp.prototype
	  , re1      = /a/g
	  , re2      = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW = new $RegExp(re1) !== re1;

	if(__webpack_require__(11) && (!CORRECT_NEW || __webpack_require__(12)(function(){
	  re2[__webpack_require__(34)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
	      : CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
	  };
	  $.each.call($.getNames(Base), function(key){
	    key in $RegExp || $.setDesc($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  });
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(13)(global, 'RegExp', $RegExp);
	}

	__webpack_require__(124)('RegExp');

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(23);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	var $ = __webpack_require__(5);
	if(__webpack_require__(11) && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(132)
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(135)('match', 1, function(defined, MATCH){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  };
	});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(9)
	  , redefine = __webpack_require__(13)
	  , fails    = __webpack_require__(12)
	  , defined  = __webpack_require__(25)
	  , wks      = __webpack_require__(34);

	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , original = ''[KEY];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return original.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return original.call(string, this); }
	    );
	  }
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(135)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  };
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(135)('search', 1, function(defined, SEARCH){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  };
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(135)('split', 2, function(defined, SPLIT, $split){
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return function split(separator, limit){
	    'use strict';
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined
	      ? fn.call(separator, O, limit)
	      : $split.call(String(O), separator, limit);
	  };
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(5)
	  , LIBRARY    = __webpack_require__(42)
	  , global     = __webpack_require__(7)
	  , ctx        = __webpack_require__(15)
	  , classof    = __webpack_require__(50)
	  , $export    = __webpack_require__(6)
	  , isObject   = __webpack_require__(19)
	  , anObject   = __webpack_require__(23)
	  , aFunction  = __webpack_require__(16)
	  , strictNew  = __webpack_require__(140)
	  , forOf      = __webpack_require__(141)
	  , setProto   = __webpack_require__(48).set
	  , same       = __webpack_require__(46)
	  , SPECIES    = __webpack_require__(34)('species')
	  , speciesConstructor = __webpack_require__(142)
	  , asap       = __webpack_require__(143)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;

	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};

	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(11)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(145)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(38)(P, PROMISE);
	__webpack_require__(124)(PROMISE);
	Wrapper = __webpack_require__(8)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(118)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(15)
	  , call        = __webpack_require__(115)
	  , isArrayIter = __webpack_require__(116)
	  , anObject    = __webpack_require__(23)
	  , toLength    = __webpack_require__(30)
	  , getIterFn   = __webpack_require__(117);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(23)
	  , aFunction = __webpack_require__(16)
	  , SPECIES   = __webpack_require__(34)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , macrotask = __webpack_require__(144).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(21)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(15)
	  , invoke             = __webpack_require__(22)
	  , html               = __webpack_require__(17)
	  , cel                = __webpack_require__(18)
	  , global             = __webpack_require__(7)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(21)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(13);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(147);

	// 23.1 Map Objects
	__webpack_require__(148)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(5)
	  , hide         = __webpack_require__(9)
	  , redefineAll  = __webpack_require__(145)
	  , ctx          = __webpack_require__(15)
	  , strictNew    = __webpack_require__(140)
	  , defined      = __webpack_require__(25)
	  , forOf        = __webpack_require__(141)
	  , $iterDefine  = __webpack_require__(102)
	  , step         = __webpack_require__(122)
	  , ID           = __webpack_require__(14)('id')
	  , $has         = __webpack_require__(20)
	  , isObject     = __webpack_require__(19)
	  , setSpecies   = __webpack_require__(124)
	  , DESCRIPTORS  = __webpack_require__(11)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;

	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(7)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(13)
	  , redefineAll    = __webpack_require__(145)
	  , forOf          = __webpack_require__(141)
	  , strictNew      = __webpack_require__(140)
	  , isObject       = __webpack_require__(19)
	  , fails          = __webpack_require__(12)
	  , $iterDetect    = __webpack_require__(118)
	  , setToStringTag = __webpack_require__(38);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO;
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        strictNew(target, C, NAME);
	        var that = new Base;
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    IS_WEAK || instance.forEach(function(val, key){
	      BUGGY_ZERO = 1 / key === -Infinity;
	    });
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(147);

	// 23.2 Set Objects
	__webpack_require__(148)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(5)
	  , redefine     = __webpack_require__(13)
	  , weak         = __webpack_require__(151)
	  , isObject     = __webpack_require__(19)
	  , has          = __webpack_require__(20)
	  , frozenStore  = weak.frozenStore
	  , WEAK         = weak.WEAK
	  , isExtensible = Object.isExtensible || isObject
	  , tmp          = {};

	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(148)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return frozenStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide              = __webpack_require__(9)
	  , redefineAll       = __webpack_require__(145)
	  , anObject          = __webpack_require__(23)
	  , isObject          = __webpack_require__(19)
	  , strictNew         = __webpack_require__(140)
	  , forOf             = __webpack_require__(141)
	  , createArrayMethod = __webpack_require__(31)
	  , $has              = __webpack_require__(20)
	  , WEAK              = __webpack_require__(14)('weak')
	  , isExtensible      = Object.isExtensible || isObject
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;

	// fallback for frozen keys
	var frozenStore = function(that){
	  return that._l || (that._l = new FrozenStore);
	};
	var FrozenStore = function(){
	  this.a = [];
	};
	var findFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function(key){
	    var entry = findFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(anObject(key))){
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    } return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(151);

	// 23.4 WeakSet Objects
	__webpack_require__(148)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(6)
	  , _apply  = Function.apply;

	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  }
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $         = __webpack_require__(5)
	  , $export   = __webpack_require__(6)
	  , aFunction = __webpack_require__(16)
	  , anObject  = __webpack_require__(23)
	  , isObject  = __webpack_require__(19)
	  , bind      = Function.bind || __webpack_require__(8).Function.prototype.bind;

	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(12)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      if(args != undefined)switch(anObject(args).length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var $        = __webpack_require__(5)
	  , $export  = __webpack_require__(6)
	  , anObject = __webpack_require__(23);

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(12)(function(){
	  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(6)
	  , getDesc  = __webpack_require__(5).getDesc
	  , anObject = __webpack_require__(23);

	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = getDesc(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(6)
	  , anObject = __webpack_require__(23);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(104)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});

	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var $        = __webpack_require__(5)
	  , has      = __webpack_require__(20)
	  , $export  = __webpack_require__(6)
	  , isObject = __webpack_require__(19)
	  , anObject = __webpack_require__(23);

	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
	}

	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var $        = __webpack_require__(5)
	  , $export  = __webpack_require__(6)
	  , anObject = __webpack_require__(23);

	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(6)
	  , getProto = __webpack_require__(5).getProto
	  , anObject = __webpack_require__(23);

	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(6);

	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(6)
	  , anObject      = __webpack_require__(23)
	  , $isExtensible = Object.isExtensible;

	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(6);

	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(164)});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var $        = __webpack_require__(5)
	  , anObject = __webpack_require__(23)
	  , Reflect  = __webpack_require__(7).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = $.getNames(anObject(it))
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(6)
	  , anObject           = __webpack_require__(23)
	  , $preventExtensions = Object.preventExtensions;

	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var $          = __webpack_require__(5)
	  , has        = __webpack_require__(20)
	  , $export    = __webpack_require__(6)
	  , createDesc = __webpack_require__(10)
	  , anObject   = __webpack_require__(23)
	  , isObject   = __webpack_require__(19);

	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = $.getDesc(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = $.getProto(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    $.setDesc(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(6)
	  , setProto = __webpack_require__(48);

	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(6)
	  , $includes = __webpack_require__(36)(true);

	$export($export.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	__webpack_require__(121)('includes');

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(6)
	  , $at     = __webpack_require__(101)(true);

	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(6)
	  , $pad    = __webpack_require__(171);

	$export($export.P, 'String', {
	  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-string-pad-left-right
	var toLength = __webpack_require__(30)
	  , repeat   = __webpack_require__(112)
	  , defined  = __webpack_require__(25);

	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength)return S;
	  if(fillStr == '')fillStr = ' ';
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(6)
	  , $pad    = __webpack_require__(171);

	$export($export.P, 'String', {
	  padRight: function padRight(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(66)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(66)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(6)
	  , $re     = __webpack_require__(176)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 176 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $          = __webpack_require__(5)
	  , $export    = __webpack_require__(6)
	  , ownKeys    = __webpack_require__(164)
	  , toIObject  = __webpack_require__(26)
	  , createDesc = __webpack_require__(10);

	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , setDesc = $.setDesc
	      , getDesc = $.getDesc
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i){
	      D = getDesc(O, key = keys[i++]);
	      if(key in result)setDesc(result, key, createDesc(0, D));
	      else result[key] = D;
	    } return result;
	  }
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export = __webpack_require__(6)
	  , $values = __webpack_require__(179)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(5)
	  , toIObject = __webpack_require__(26)
	  , isEnum    = $.isEnum;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export  = __webpack_require__(6)
	  , $entries = __webpack_require__(179)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(6);

	$export($export.P, 'Map', {toJSON: __webpack_require__(182)('Map')});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(141)
	  , classof = __webpack_require__(50);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(6);

	$export($export.P, 'Set', {toJSON: __webpack_require__(182)('Set')});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(5)
	  , $export = __webpack_require__(6)
	  , $ctx    = __webpack_require__(15)
	  , $Array  = __webpack_require__(8).Array || Array
	  , statics = {};
	var setStatics = function(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
	  });
	};
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill');
	$export($export.S, 'Array', statics);

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(7)
	  , $export    = __webpack_require__(6)
	  , invoke     = __webpack_require__(22)
	  , partial    = __webpack_require__(186)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(187)
	  , invoke    = __webpack_require__(22)
	  , aFunction = __webpack_require__(16);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that  = this
	      , $$    = arguments
	      , $$len = $$.length
	      , j = 0, k = 0, args;
	    if(!holder && !$$len)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
	    while($$len > k)args.push($$[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6)
	  , $task   = __webpack_require__(144);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(120);
	var global      = __webpack_require__(7)
	  , hide        = __webpack_require__(9)
	  , Iterators   = __webpack_require__(103)
	  , ITERATOR    = __webpack_require__(34)('iterator')
	  , NL          = global.NodeList
	  , HTC         = global.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype
	  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
	if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
	if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          context._sent = arg;

	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(191)))

/***/ },
/* 191 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 192 */
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
	        Helper.getFile(filename, function (jsonFileData) {
	            if (callback) callback(JSON.parse(jsonFileData));
	        });
	        return this;
	    },
	    clamp: function clamp(v, min, max) {
	        return Math.min(Math.max(v, min), max);
	    },

	    /**
	     * loads an image and calls callback on success
	     * @function
	     * @memberof module:Helper
	     * @param {Helper~loadImageCallback} cb - callback-function on success
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
	     * request data from given file and calls callback on success
	     * @function
	     * @memberof module:Helper
	     * @param  {string} url - path to file
	     * @param  {Helper~getFileCallback} callback - function called when data is loaded successfully
	     * @return {Helper} Helper object for chaining
	     */
	    getFile: function getFile(url, callback) {
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === XMLHttpRequest.DONE) {
	                if (xhr.status === 200) {
	                    if (callback) callback(xhr.responseText);
	                } else {
	                    throw new Error("The JSON submitted seems not valid", xhr);
	                }
	            }
	        };
	        xhr.open("GET", url, true);
	        xhr.send();
	        return this;
	    },

	    /**
	     * for each helper
	     * @function
	     * @memberof module:Helper
	     * @param  {Object[]} a - array to iterate over each value
	     * @param  {Helper~forEachCallback} cb - callback for each object
	     * @return {Helper} Helper object for chaining
	     */
	    forEach: function forEach(a, cb) {
	        for (var i in a) {
	            if (a[i] && typeof cb === "function") cb(a[i], i);
	        }
	        return this;
	    },

	    /**
	     * formula for linear easing
	     * @function
	     * @memberof module:Helper
	     * @param  {number} t - current time
	     * @param  {Point} b - start value
	     * @param  {Point} c - total difference to start
	     * @param  {number} d - duration
	     * @return {number} linear value at specific time
	     */
	    linearEase: function linearEase(t, b, c, d) {
	        return c.clone.multiply(t).divide(d).add(b);
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
/* 193 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file Helper for naming events
	 * @copyright Michael Duve 2016
	 * @namespace Events
	*/
	var Events = exports.Events = {
	  /**
	   * Eventnames for ToolTip class
	   * @type {Object}
	   * @memberof Events
	   * @property {object} OPEN - when a tooltip should be openend
	   * @property {object} CLOSE - when a tooltip should be closed
	   */
	  ToolTip: {
	    OPEN: "tooltip-open",
	    CLOSE: "tooltip-close"
	  },
	  /**
	   * Eventnames for Marker class
	   * @type {Object}
	   * @memberof Events
	   * @property {object} DEACTIVATE - when a Marker should be in deactived state
	   */
	  Marker: {
	    DEACTIVATE: "deactivate-marker"
	  },
	  /**
	   * Eventnames for Publisher class
	   * @type {Object}
	   * @memberof Events
	   * @property {object} PUBLISH - notifies all subscribers
	   * @property {object} SUBSCRIBE - subscribes to a topic
	   * @property {object} UNSUBSCRIBE - unsubscribes from a topic
	   */
	  Publisher: {
	    PUBLISH: "publish",
	    SUBSCRIBE: "subscribe",
	    UNSUBSCRIBE: "unsubscribe"
	  },
	  /**
	   * Eventnames for TileMap class
	   * @type {Object}
	   * @memberof Events
	   * @property {object} IMG_DATA_NAME - notifies all subscribers
	   * @property {object} MARKER_DATA_NAME - subscribes to a topic
	   * @property {object} NEXT_LEVEL - next level of view
	   * @property {object} PREVIOUS_LEVEL - previous level of view
	   * @property {object} RESIZE - resize of view needed
	   * @property {object} ZOOM_TO_BOUNDS - zoom to bounds
	   */
	  TileMap: {
	    IMG_DATA_NAME: "img_data",
	    MARKER_DATA_NAME: "marker",
	    LABEL_DATA_NAME: "labels",
	    NEXT_LEVEL: "next-level",
	    PREVIOUS_LEVEL: "previous-level",
	    RESIZE: "resize",
	    ZOOM_TO_BOUNDS: "zoom-to-bounds",
	    DRAW: "draw"
	  },
	  /**
	   * Eventnames for Handling in all classes
	   * @type {Object}
	   * @memberof Events
	   * @property {object} RESIZE - resize of window happened needed
	   * @property {object} CLICK - click occured
	   * @property {object} TOUCHSTART - Touch started
	   * @property {object} TOUCHEND - Touch ended
	   * @property {object} MOUSEDOWN - Mouse started
	   * @property {object} MOUSEUP - Mouse ended
	   * @property {object} KEYDOWN - key pressed
	   * @property {object} KEYUP - key released
	   */
	  Handling: {
	    RESIZE: "resize orientationchange",
	    CLICK: "click",
	    TOUCHSTART: "touchstart",
	    MOUSEDOWN: "mousedown",
	    TOUCHEND: "touchend",
	    MOUSEUP: "mouseup",
	    KEYDOWN: "keydown",
	    KEYUP: "keyup"
	  },
	  /**
	  * Eventnames for View class
	   * @type {Object}
	   * @memberof Events
	   * @property {object} DRAW - draw is needed
	   * @property {object} THUMB_LOADED - thumbnail was loaded
	   */
	  View: {
	    THUMB_LOADED: "thumb-loaded"
	  },
	  /**
	  * Eventnames for MarkerClusterer class
	   * @type {Object}
	   * @memberof Events
	   * @property {object} CLUSTERIZE - create cluster
	   * @property {object} UNCLUSTERIZE - destroy cluster
	   */
	  MarkerClusterer: {
	    CLUSTERIZE: "clusterize",
	    UNCLUSTERIZE: "unclusterize"

	  }
		};

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TileMap = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Helper = __webpack_require__(192);

	var _Events = __webpack_require__(193);

	var _Point = __webpack_require__(195);

	var _LatLng = __webpack_require__(196);

	var _Publisher = __webpack_require__(197);

	var _StateHandler = __webpack_require__(198);

	var _Rectangle = __webpack_require__(199);

	var _View = __webpack_require__(200);

	var _Marker = __webpack_require__(205);

	var _DataEnrichment = __webpack_require__(206);

	var _ToolTip = __webpack_require__(207);

	var _Label = __webpack_require__(209);

	var _MarkerClusterer = __webpack_require__(203);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file Represents a map with its different levels of zooms and markers
	 * @copyright Michael Duve 2016
	 */

	var TileMap = exports.TileMap = function () {
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
	        this.$container = container;
	        this.container = container[0];

	        this.id = id;

	        this.imgData = tilesData[_Events.Events.TileMap.IMG_DATA_NAME];
	        this.markerData = tilesData[_Events.Events.TileMap.MARKER_DATA_NAME];
	        this.labelData = tilesData[_Events.Events.TileMap.LABEL_DATA_NAME];

	        this.settings = settings;

	        this.stateHandler = new _StateHandler.StateHandler([{ value: 0, description: "start" }, { value: 1, description: "view-initialized" }, { value: 2, description: "marker-initialized" }, { value: 3, description: "tooltip-initialized" }]);

	        if (this.settings.tooltip && this.settings.tooltip.templates) {
	            this.templates = _DataEnrichment.DataEnrichment.tooltip(this.settings.tooltip.templates);
	        }

	        this.levels = [];
	        this.clusterHandlingTimeout = null;

	        this.lastFrameMillisecs = Date.now();
	        this.deltaTiming = 1.0;
	        this.bestDeltaTiming = 1000.0 / 60.0;

	        this.velocity = new _Point.Point();

	        this.initial = {
	            bounds: settings.bounds,
	            center: settings.center,
	            level: settings.level,
	            zoom: settings.zoom
	        };

	        this.initializeCanvas();

	        _Helper.Helper.forEach(this.imgData, function (element, i) {
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

	        this.eventManager = new _Publisher.Publisher(this.id);

	        this.drawIsNeeded = false;

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
	            if (this.levelHandler.current.description !== this.settings.level) this.levelHandler.changeTo(this.settings.level);
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
	            _Helper.Helper.forEach(this.labelData, function (label) {
	                var currentLabel = new _Label.Label({
	                    context: _this2.canvasContext,
	                    instance: _this2,
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
	                $container: this.$container,
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
	            if (this.$markerContainer) {
	                var newSize = this.view.currentView.getDistortedRect(this.view.distortionFactor);
	                this.$markerContainer.css({
	                    "width": newSize.width + 'px',
	                    "height": newSize.height + 'px',
	                    "transform": 'translate3d(' + (newSize.left + this.view.offsetToCenter) + 'px, ' + newSize.top + 'px, 0px)'
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

	            if (this.markerData) {
	                (function () {
	                    var markers = [];
	                    _this3.markerData = _this3.enrichMarkerData(_this3.markerData);
	                    _Helper.Helper.forEach(_this3.markerData, function (currentData) {
	                        markers.push(new _Marker.Marker({
	                            data: currentData,
	                            _instance: _this3,
	                            id: _this3.id
	                        }));
	                    });
	                    markers = markers.sort(function (a, b) {
	                        return b.latlng.lat - a.latlng.lat !== 0 ? b.latlng.lat - a.latlng.lat : b.latlng.lng - a.latlng.lng;
	                    });
	                    _Helper.Helper.forEach(markers, function (marker, i) {
	                        marker.$icon.css("z-index", i);
	                    });

	                    if (markers.length !== 0) _this3.createTooltipContainer();

	                    _this3.markerClusterer = new _MarkerClusterer.MarkerClusterer({
	                        markers: markers,
	                        id: _this3.id,
	                        $container: _this3.$markerContainer
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

	            this.eventManager.subscribe(_Events.Events.TileMap.RESIZE, function () {
	                _this4.resize();
	            });

	            this.eventManager.subscribe(_Events.Events.TileMap.DRAW, function () {
	                _this4.redraw();
	            });

	            this.eventManager.subscribe(_Events.Events.View.THUMB_LOADED, function () {
	                _this4.redraw();
	                if (_this4.stateHandler.current.value < 2) _this4.initializeMarkers();
	            });

	            this.eventManager.subscribe(_Events.Events.TileMap.ZOOM_TO_BOUNDS, function (bounds) {
	                var zoomIncrease = Math.min(_this4.view.viewport.width / bounds.width, _this4.view.viewport.height / bounds.height);
	                _this4.zoom(zoomIncrease, bounds.center);
	            });

	            this.eventManager.subscribe(_Events.Events.TileMap.NEXT_LEVEL, function () {
	                _this4.changelevel(1);
	            });
	            this.eventManager.subscribe(_Events.Events.TileMap.PREVIOUS_LEVEL, function () {
	                _this4.changelevel(-1);
	            });

	            return this;
	        }
	    }, {
	        key: 'setViewToOldView',
	        value: function setViewToOldView(center, zoom) {
	            this.view.zoomFactor = zoom;
	            this.view.zoom(0, this.view.viewport.center);
	            this.view.currentView.setCenter(center);
	            this.drawIsNeeded = true;
	        }
	    }, {
	        key: 'changelevel',
	        value: function changelevel(direction) {
	            var lastLevel = this.levelHandler.current.description,
	                lastCenter = this.view.currentView.center;
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
	            if (lastLevel !== this.levelHandler.current.description) {
	                this.setViewToOldView(lastCenter, extrema);
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
	            this.clusterHandlingTimeout = setTimeout(function () {
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
	            var _this6 = this;

	            var oldViewport = this.view.viewport.clone;
	            this.view.viewport.size(this.left, this.top, this.width, this.height);
	            _Helper.Helper.forEach(this.levelHandler.states, function (view) {
	                view.instance.viewport = new _Rectangle.Rectangle(_this6.left, _this6.top, _this6.width, _this6.height);
	            });
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
	            var _this7 = this;

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

	            window.requestAnimFrame(function () {
	                return _this7.mainLoop();
	            });
	        }
	    }, {
	        key: 'drawLabels',
	        value: function drawLabels() {
	            _Helper.Helper.forEach(this.labels, function (label) {
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


	window.requestAnimFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	}();

/***/ },
/* 195 */
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
/* 196 */
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

	    _createClass(LatLng, [{
	        key: "distance",
	        value: function distance() {
	            var latlng = arguments.length <= 0 || arguments[0] === undefined ? new LatLng() : arguments[0];

	            return this.clone.substract(latlng).length;
	        }

	        /**
	         * substract specified coord from this coordinate
	         * @param  {LatLng} coord = new LatLng() - specified coordinate to substract from this coord
	         * @return {LatLng} instance of LatLng for chaining
	         */

	    }, {
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
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Publisher = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(193);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * singleton instance
	 * @type {Publisher}
	 */
	var instances = {};

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file Publish/Subscribe pattern
	 * @copyright Michael Duve 2016
	 */

	var Publisher = exports.Publisher = function () {

	    /**
	     * @constructor
	     * @return {Publisher} singleton instance of Publisher for chaining
	     */

	    function Publisher() {
	        var id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	        _classCallCheck(this, Publisher);

	        if (!instances[id]) {
	            this.subscribers = {};
	            this.id = id;
	            instances[id] = this;
	        }
	        return instances[id];
	    }

	    /**
	     * subscribe to a topic
	     * @param  {string} type="any" - a topic
	     * @param  {Function} fn=function(){} - a function to callback
	     * @return {Publisher} instance of Publisher for chaining
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
	         * @return {Publisher} instance of Publisher for chaining
	         */

	    }, {
	        key: "unsubscribe",
	        value: function unsubscribe() {
	            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
	            var fn = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

	            return this.handle(_Events.Events.Publisher.UNSUBSCRIBE, type, fn);
	        }

	        /**
	         * publish to a topic
	         * @param  {string} type="any" - a topic
	         * @param  {Function} arg=[] - list of parameters
	         * @return {Publisher} instance of Publisher for chaining
	         */

	    }, {
	        key: "publish",
	        value: function publish() {
	            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
	            var arg = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	            return this.handle(_Events.Events.Publisher.PUBLISH, type, arg);
	        }

	        /**
	         * handle subscribe to a topic
	         * @param  {string} action - eventname
	         * @param  {string} type="any" - a topic
	         * @param  {Object} a function to callback or arguments
	         * @return {Publisher} instance of Publisher for chaining
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

	                    if (action === _Events.Events.Publisher.PUBLISH) {
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
	            instances[this.id] = null;
	        }
	    }]);

	    return Publisher;
	}();

/***/ },
/* 198 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file State pattern
	 * @copyright Michael Duve 2016
	 */

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
	         * @constructor
	         * @param  {Array} states_array=[{value: 0, description: 'Default'}] - [description]
	         * @return {StateHandler} instance of StateHandler for chaining
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
	     * @return {StateHandler} instance of StateHandler for chaining
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
	         * @return {StateHandler} instance of StateHandler for chaining
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
	         * @return {StateHandler} instance of StateHandler for chaining
	         */

	    }, {
	        key: 'changeTo',
	        value: function changeTo(state) {
	            if (state >= 0 && state < this.length) this.i = state;
	            return this;
	        }

	        /**
	         * change the state to specified value of specified property
	         * @param {object} prop - specified property to be changed
	         * @param {object} value - specified value that should be changed to
	         * @return {StateHandler} instance of StateHandler for chaining
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
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Rectangle = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Point2 = __webpack_require__(195);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents a rectangle with a point as position, width and height
	 * @extends Point
	 * @copyright Michael Duve 2016
	 */

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
	     * @constructor
	     * @param  {number} x=0 - x-position of specified rectangle
	     * @param  {number} y=0 - y-position of specified rectangle
	     * @param  {number} width=0 - width of specified rectangle
	     * @param  {number} height=0 - height of specified rectangle
	     * @return {Rectangle} instance of Rectangle for chaining
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
	  }, {
	    key: 'extend',
	    value: function extend(rect) {
	      var left = Math.min(this.left, rect.left);
	      var right = Math.max(this.right, rect.right);
	      var top = Math.min(this.top, rect.top);
	      var bottom = Math.max(this.bottom, rect.bottom);
	      this.size(left, top, right - left, bottom - top);
	      return this;
	    }

	    /**
	     * Sets the center of this Rectangle to specified point
	     * @param  {Point} point = new Point() - specified point to set center of rectangle to
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} a distorted Rectangle
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
	     * @return {Rectangle} an undistorted Rectangle
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * scale x and y for width and height of rectangle
	     * @param  {number} x = 1 - factor to be applied to scale
	     * @param  {number} y = x - factor to be applied to scale
	     * @return {Rectangle} instance of Rectangle for chaining
	     */

	  }, {
	    key: 'scaleCenter',
	    value: function scaleCenter() {
	      var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	      var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

	      var oldCenter = this.clone.center;
	      this.scale(x, y);
	      this.setCenter(oldCenter);
	      return this;
	    }

	    /**
	     * moves a rectangle by specified coords
	     * @param  {number} x = 0 - specified x to be added to x position
	     * @param  {number} y = x - specified y to be added to y position
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	     * @return {Rectangle} instance of Rectangle for chaining
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
	 * @return {Rectangle} a copy of specified rectangle
	 */


	Rectangle.createFromRectangle = function (rect) {
	  return new Rectangle(rect.x, rect.y, rect.width, rect.height);
		};

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.View = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Helper = __webpack_require__(192);

	var _Events = __webpack_require__(193);

	var _Point = __webpack_require__(195);

	var _LatLng = __webpack_require__(196);

	var _Bounds = __webpack_require__(201);

	var _Rectangle = __webpack_require__(199);

	var _Tile = __webpack_require__(202);

	var _Publisher = __webpack_require__(197);

	var _MarkerClusterer = __webpack_require__(203);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents a level of zoom
	 * @copyright Michael Duve 2016
	 */

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
	        var _ref$centerSmallMap = _ref.centerSmallMap;
	        var centerSmallMap = _ref$centerSmallMap === undefined ? false : _ref$centerSmallMap;
	        var limitToBounds = _ref.limitToBounds;
	        var id = _ref.id;

	        _classCallCheck(this, View);

	        this.currentView = currentView;
	        this.originalMapView = currentView.clone;
	        this.viewport = viewport;
	        this.bounds = bounds;
	        this.center = center;
	        this.zoomFactor = currentZoom;
	        this.maxZoom = maxZoom;
	        this.minZoom = minZoom;
	        this.origin = new _Point.Point();
	        this.id = id;
	        this.eventManager = new _Publisher.Publisher(this.id);
	        this.limitToBounds = limitToBounds || bounds;
	        this.isInitialized = false;
	        this.centerSmallMap = centerSmallMap;
	        var newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
	        this.currentView.position(newCenter.x, newCenter.y);
	        this.tiles = [];
	        this.data = data;
	        this.context = context;

	        this.initial = {
	            position: initialCenter,
	            zoom: this.zoomFactor
	        };

	        return this.zoom(0, this.viewport.center).loadThumb();
	    }

	    _createClass(View, [{
	        key: 'init',
	        value: function init() {
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
	        key: 'checkBoundaries',
	        value: function checkBoundaries() {
	            var nw = this.convertLatLngToPoint(this.limitToBounds.nw),
	                se = this.convertLatLngToPoint(this.limitToBounds.se),
	                limit = new _Rectangle.Rectangle(nw.x + this.currentView.x, nw.y + this.currentView.y, se.x - nw.x, se.y - nw.y);

	            var offset = new _Point.Point();
	            var equalizedMap = limit.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
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
	            var _this2 = this;

	            _Helper.Helper.loadImage(this.data.thumb, function (img) {
	                _this2.thumb = img;
	                _this2.eventManager.publish(_Events.Events.View.THUMB_LOADED);
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

	            if (this.zoomFactor >= this.maxZoom && factor > 0) {
	                this.eventManager.publish(_Events.Events.TileMap.NEXT_LEVEL);
	            } else if (this.zoomFactor <= this.minZoom && factor < 0) {
	                this.eventManager.publish(_Events.Events.TileMap.PREVIOUS_LEVEL);
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
	            return this.drawThumbnail().drawVisibleTiles();
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
	            var _this3 = this;

	            var currentLevel = this.data.tiles;
	            _Helper.Helper.forEach(currentLevel, function (currentTileData) {
	                _this3.tiles.push(new _Tile.Tile(currentTileData, _this3, _this3.id));
	            });
	            return this;
	        }
	    }]);

	    return View;
	}();

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Bounds = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LatLng = __webpack_require__(196);

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
	     * @constructor
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
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tile = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(193);

	var _Helper = __webpack_require__(192);

	var _StateHandler = __webpack_require__(198);

	var _Rectangle2 = __webpack_require__(199);

	var _Publisher = __webpack_require__(197);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * States of a tile
	 * @type {Array}
	 */
	var STATES = [{ value: 0, description: 'Starting' }, { value: 1, description: 'Initialized' }, { value: 2, description: 'Loaded' }, { value: 3, description: 'Drawn' }];

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file Represents a part of the background map
	 * @extends Rectangle
	 * @copyright Michael Duve 2016
	 */

	var Tile = exports.Tile = function (_Rectangle) {
	    _inherits(Tile, _Rectangle);

	    _createClass(Tile, [{
	        key: 'distortedTile',
	        get: function get() {
	            return this.clone.scale(this.instance.zoomFactor).translate(this.instance.currentView.x, this.instance.currentView.y).scaleX(this.instance.distortionFactor).translate(this.instance.offsetToCenter, 0);
	        }

	        /**
	         * @constructor
	         * @param  {string} path = null - path to image
	         * @param  {number} x = 0 - position x of tile
	         * @param  {number} y = 0 - position y of tile
	         * @param  {number} w = 0 - tile width
	         * @param  {number} h = 0 - tile height
	         * @param  {View} _instance = null - instance of parent View
	         * @return {Tile} instance of Tile for chaining
	         */

	    }]);

	    function Tile() {
	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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

	        var _instance = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	        var _ret;

	        var id = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

	        _classCallCheck(this, Tile);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this, x, y, w, h));

	        _this.id = id;
	        if (!path || typeof path !== "string" || path.length === 0) throw new TypeError('Path ' + path + ' needs to be of type string and should not be empty');else if (!_instance) throw new Error('Tile needs an instance');

	        _this.state = new _StateHandler.StateHandler(STATES);
	        _this.instance = _instance;
	        _this.context = _this.instance.context;
	        _this.eventManager = new _Publisher.Publisher(_this.id);
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
	                _this2.eventManager.publish(_Events.Events.TileMap.DRAW);
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
	            if (this.state.current.value >= 2) {
	                this.state.next();
	                this.context.drawImage(this.img, this.distortedTile.x, this.distortedTile.y, this.distortedTile.width, this.distortedTile.height);
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
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MarkerClusterer = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(193);

	var _Publisher = __webpack_require__(197);

	var _Cluster = __webpack_require__(204);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents a class which helps clustering overlapping markers
	 * @copyright Michael Duve 2016
	 */

	var MarkerClusterer = exports.MarkerClusterer = function () {
	    /**
	     * @constructor
	     * @return {MarkerClusterer} instance of MarkerClusterer for chaining
	     */

	    function MarkerClusterer(_ref) {
	        var _ref$markers = _ref.markers;
	        var markers = _ref$markers === undefined ? [] : _ref$markers;
	        var _ref$$container = _ref.$container;
	        var $container = _ref$$container === undefined ? null : _ref$$container;
	        var id = _ref.id;

	        _classCallCheck(this, MarkerClusterer);

	        this.markers = markers;
	        this.id = id;
	        this.$container = $container;
	        this.clusters = [];
	        this.eventManager = new _Publisher.Publisher(this.id);
	        this.bindEvents();
	        this.clusterize();
	        return this;
	    }

	    _createClass(MarkerClusterer, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;

	            this.eventManager.subscribe(_Events.Events.MarkerClusterer.CLUSTERIZE, function () {
	                _this.clusterize();
	            });
	            this.eventManager.subscribe(_Events.Events.MarkerClusterer.UNCLUSTERIZE, function () {
	                _this.deleteAllClusters();
	            });
	        }
	    }, {
	        key: 'clusterize',
	        value: function clusterize() {
	            this.deleteAllClusters();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.markers.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _step$value = _slicedToArray(_step.value, 2);

	                    var i = _step$value[0];
	                    var marker = _step$value[1];

	                    var hits = [];
	                    var _iteratorNormalCompletion3 = true;
	                    var _didIteratorError3 = false;
	                    var _iteratorError3 = undefined;

	                    try {
	                        for (var _iterator3 = this.clusters.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                            var _step3$value = _slicedToArray(_step3.value, 2);

	                            var j = _step3$value[0];
	                            var cluster = _step3$value[1];

	                            if (marker.boundingBox.intersects(cluster.boundingBox)) {
	                                hits.push(cluster);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError3 = true;
	                        _iteratorError3 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                                _iterator3.return();
	                            }
	                        } finally {
	                            if (_didIteratorError3) {
	                                throw _iteratorError3;
	                            }
	                        }
	                    }

	                    if (!hits.length) {
	                        var newCluster = this.createCluster(marker);
	                        this.clusters.push(newCluster);
	                    } else {
	                        var nearestCluster = this.findNearestHit(marker, hits);
	                        nearestCluster.addMarker(marker);
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

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.clusters.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _step2$value = _slicedToArray(_step2.value, 2);

	                    var i = _step2$value[0];
	                    var cluster = _step2$value[1];

	                    cluster.init();
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'findNearestHit',
	        value: function findNearestHit(marker, hits) {
	            var lastDistance = void 0,
	                minimalHit = void 0;
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = hits.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var _step4$value = _slicedToArray(_step4.value, 2);

	                    var i = _step4$value[0];
	                    var hit = _step4$value[1];

	                    if (!lastDistance) {
	                        lastDistance = this.getDistance(marker, hit);
	                        minimalHit = hit;
	                    } else {
	                        var currentDistance = this.getDistance(marker, hit);
	                        if (currentDistance < lastDistance) {
	                            lastDistance = currentDistance;
	                            minimalHit = hit;
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            return minimalHit;
	        }
	    }, {
	        key: 'getDistance',
	        value: function getDistance(marker, cluster) {
	            return marker.boundingBox.center.distance(cluster.boundingBox.center);
	        }
	    }, {
	        key: 'createCluster',
	        value: function createCluster(marker) {
	            var newCluster = new _Cluster.Cluster({
	                $container: this.$container,
	                id: this.id
	            });
	            newCluster.addMarker(marker);
	            return newCluster;
	        }
	    }, {
	        key: 'deleteAllClusters',
	        value: function deleteAllClusters() {
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = this.clusters.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var _step5$value = _slicedToArray(_step5.value, 2);

	                    var i = _step5$value[0];
	                    var cluster = _step5$value[1];

	                    cluster.removeFromDOM();
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }

	            this.clusters = [];
	        }
	    }]);

	    return MarkerClusterer;
	}();

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Cluster = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Events = __webpack_require__(193);

	var _Publisher = __webpack_require__(197);

	var _Point = __webpack_require__(195);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents a cluster of markers
	 * @copyright Michael Duve 2016
	 */

	var Cluster = exports.Cluster = function () {
	    /**
	     * @constructor
	     * @return {Cluster} instance of Cluster for chaining
	     */

	    function Cluster(_ref) {
	        var _ref$$container = _ref.$container;
	        var $container = _ref$$container === undefined ? null : _ref$$container;
	        var id = _ref.id;

	        _classCallCheck(this, Cluster);

	        this.markers = [];
	        this.id = id;
	        this.$container = $container;
	        this.eventManager = new _Publisher.Publisher(this.id);
	        return this;
	    }

	    _createClass(Cluster, [{
	        key: 'init',
	        value: function init() {
	            if (this.markers.length === 1) {
	                this.markers[0].$icon.show();
	            } else {
	                this.createClusterMarker();
	            }
	        }
	    }, {
	        key: 'createClusterMarker',
	        value: function createClusterMarker() {
	            var p = void 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.markers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var marker = _step.value;

	                    marker.$icon.hide();
	                    var currentPos = new _Point.Point(parseFloat(marker.icon.style.left), parseFloat(marker.icon.style.top));
	                    p = !p ? currentPos : p.add(currentPos);
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

	            p.divide(this.markers.length);

	            this.$cluster = (0, _jQuery2.default)("<div class='cluster'>" + this.markers.length + "</div>").css({
	                "left": p.x + '%',
	                "top": p.y + '%'
	            });
	            this.$container.append(this.$cluster);
	            this.bindEvents();
	        }
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            this.$cluster.data("mjs-action", this.action.bind(this));
	        }
	    }, {
	        key: 'action',
	        value: function action() {
	            this.eventManager.publish(_Events.Events.TileMap.ZOOM_TO_BOUNDS, this.boundingBox);
	        }
	    }, {
	        key: 'addMarker',
	        value: function addMarker(marker) {
	            this.markers.push(marker);
	            this.boundingBox = !this.boundingBox ? marker.boundingBox : this.boundingBox.extend(marker.boundingBox);
	        }
	    }, {
	        key: 'removeFromDOM',
	        value: function removeFromDOM() {
	            if (this.markers.length > 1) {
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = this.markers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var marker = _step2.value;

	                        marker.$icon.show();
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }

	                this.$cluster.remove();
	            }
	        }
	    }]);

	    return Cluster;
	}();

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Marker = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Events = __webpack_require__(193);

	var _Helper = __webpack_require__(192);

	var _Point = __webpack_require__(195);

	var _Rectangle = __webpack_require__(199);

	var _Publisher = __webpack_require__(197);

	var _DataEnrichment = __webpack_require__(206);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents a marker with an image, a position and content
	 * @copyright Michael Duve 2016
	 */

	var Marker = exports.Marker = function () {
	    _createClass(Marker, [{
	        key: 'boundingBox',
	        get: function get() {
	            var bBox = this.icon.getBoundingClientRect();
	            var parentBBox = this.instance.container.getBoundingClientRect();
	            return new _Rectangle.Rectangle(bBox.left - parentBBox.left, bBox.top - parentBBox.top, bBox.width, bBox.height).scaleCenter(1.2);
	        }

	        /**
	         * @constructor
	         * @param  {Object} data = DataEnrichment.DATA_MARKER - enriched data
	         * @param  {View} _instance = parent instance - instance of parent view
	         * @return {Marker} - instance of Marker for chaining
	         */

	    }]);

	    function Marker(_ref) {
	        var _ref$data = _ref.data;
	        var data = _ref$data === undefined ? _DataEnrichment.DataEnrichment.DATA_MARKER : _ref$data;
	        var _ref$_instance = _ref._instance;

	        var _instance = _ref$_instance === undefined ? null : _ref$_instance;

	        var id = _ref.id;

	        _classCallCheck(this, Marker);

	        if (!_instance) throw new Error('Tile needs an instance');
	        this.instance = _instance;
	        this.eventID = id;

	        this.id = Marker.count;
	        Marker.count++;

	        this.size = data.size;

	        this.hover = data.hover;
	        if (this.hover) this.size.divide(2, 1);

	        this.img = data.icon;
	        this.offset = data.offset.add(new _Point.Point(-(this.size.x / 2), -this.size.y));
	        this.latlng = data.latlng;

	        this.content = data.content;
	        this.$icon = this.addMarkerToDOM(this.instance.$markerContainer);
	        this.icon = this.$icon[0];

	        return this.bindEvents().positionMarker();
	    }

	    /**
	     * binds all events
	     * @return {Marker} instance of Marker for chaining
	     */


	    _createClass(Marker, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;

	            this.eventManager = new _Publisher.Publisher(this.eventID);

	            if (this.content.length) {
	                this.$icon.data("mjs-action", this.action.bind(this));
	                this.eventManager.subscribe(_Events.Events.Marker.DEACTIVATE, function () {
	                    _this.$icon.removeClass("active");
	                });
	            }

	            return this;
	        }
	    }, {
	        key: 'action',
	        value: function action() {
	            this.eventManager.publish(_Events.Events.ToolTip.OPEN, this.content);
	            this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
	            this.$icon.addClass("active");
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
	         * @return {Marker} instance of Marker for chaining
	         */

	    }, {
	        key: 'positionMarker',
	        value: function positionMarker() {
	            this.position = this.instance.view.convertLatLngToPoint(this.latlng);
	            var p = this.position.clone.divide(this.instance.view.currentView.width, this.instance.view.currentView.height).multiply(100);
	            if (this.$icon) {
	                this.$icon.css({
	                    "left": p.x + '%',
	                    "top": p.y + '%'
	                }).show();
	            }
	            return this;
	        }
	    }]);

	    return Marker;
	}();

		Marker.count = 0;

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DataEnrichment = undefined;

	var _jQuery = __webpack_require__(1);

	var _jQuery2 = _interopRequireDefault(_jQuery);

	var _Helper = __webpack_require__(192);

	var _Point = __webpack_require__(195);

	var _LatLng = __webpack_require__(196);

	var _Bounds = __webpack_require__(201);

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
	            entry = Object.assign({}, DataEnrichment.DATA_MARKER, entry);

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
	    label: function label(data) {
	        var enrichedData = [];

	        _Helper.Helper.forEach(data, function (entry) {
	            entry = Object.assign({}, DataEnrichment.DATA_LABEL, entry);

	            if (entry.text) entry.text = Object.assign({}, DataEnrichment.DATA_LABEL_TEXT, entry.text);
	            if (entry.icon) entry.icon = Object.assign({}, DataEnrichment.DATA_LABEL_ICON, entry.icon);

	            if (typeof entry.position[0] === "number") {
	                entry.position = new _LatLng.LatLng(entry.position[0], entry.position[1]);
	            } else {
	                _Helper.Helper.forEach(entry.position, function (pos, i) {
	                    entry.position[i] = new _LatLng.LatLng(pos[0], pos[1]);
	                });
	            }

	            if (entry.text) entry.text.offset = new _Point.Point(entry.text.offset[0], entry.text.offset[1]);
	            if (entry.icon) entry.icon.offset = new _Point.Point(entry.icon.offset[0], entry.icon.offset[1]);
	            if (entry.icon && typeof entry.icon.size !== "number") entry.icon.size = new _Point.Point(entry.icon.size[0], entry.icon.size[1]);

	            enrichedData.push(entry);
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
	        var enrichedData = Object.assign({}, DataEnrichment.MAP_SETTINGS, data),
	            bounds = new _Bounds.Bounds(new _LatLng.LatLng(enrichedData.bounds.northWest[0], enrichedData.bounds.northWest[1]), new _LatLng.LatLng(enrichedData.bounds.southEast[0], enrichedData.bounds.southEast[1])),
	            center = new _LatLng.LatLng(enrichedData.center.lat, enrichedData.center.lng);

	        if (!enrichedData.limitToBounds) {
	            enrichedData.limitToBounds = bounds;
	        } else {
	            if (!(enrichedData.limitToBounds instanceof _Bounds.Bounds)) {
	                enrichedData.limitToBounds = new _Bounds.Bounds(new _LatLng.LatLng(enrichedData.limitToBounds.northWest[0], enrichedData.limitToBounds.northWest[1]), new _LatLng.LatLng(enrichedData.limitToBounds.southEast[0], enrichedData.limitToBounds.southEast[1]));
	            }
	        }

	        enrichedData.bounds = bounds;
	        enrichedData.center = center;

	        return enrichedData;
	    },
	    tooltip: function tooltip(data) {
	        return Object.assign({}, DataEnrichment.TOOLTIP, data);
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
	DataEnrichment.DATA_LABEL = {
	    "position": [0, 0]
	};
	DataEnrichment.DATA_LABEL_TEXT = {
	    "content": "",
	    "color": "#333333",
	    "shadow": {
	        "color": "#f7f7f7",
	        "blur": 2
	    },
	    "offset": [0, 0],
	    "align": "center",
	    "baseline": "hanging",
	    "font": "10pt Arial"
	};
	DataEnrichment.DATA_LABEL_ICON = {
	    "type": "circle",
	    "size": 2,
	    "color": "#333333",
	    "offset": [0, 0],
	    "shadow": {
	        "color": "#f7f7f7",
	        "blur": 2
	    }
	};
	DataEnrichment.TOOLTIP = {
	    image: "/plugin/hbs/image.hbs",
	    text: "/plugin/hbs/text.hbs",
	    headline: "/plugin/hbs/headline.hbs",
	    crossheading: "/plugin/hbs/crossheading.hbs",
	    iframe: "/plugin/hbs/iframe.hbs"
		};

/***/ },
/* 207 */
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

	var _Handlebars = __webpack_require__(208);

	var _Handlebars2 = _interopRequireDefault(_Handlebars);

	var _Events = __webpack_require__(193);

	var _Helper = __webpack_require__(192);

	var _Publisher = __webpack_require__(197);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file represents an overlay showing detailed contents
	 * @copyright Michael Duve 2016
	 */

	var ToolTip = exports.ToolTip = function () {
	    _createClass(ToolTip, [{
	        key: 'allTemplatesLoaded',


	        /**
	         * checks if all templates were loaded
	         * @return {boolean} wheter true if all templates were loaded or false
	         */
	        get: function get() {
	            return this.loadedTemplates === Object.keys(this.templates).length;
	        }

	        /**
	         *
	         * @constructor
	         * @param  {string|object} container - Container, either string, jQuery-object or dom-object
	         * @param  {object} templates - defined templates
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

	    }]);

	    function ToolTip(_ref) {
	        var container = _ref.container;
	        var templates = _ref.templates;
	        var id = _ref.id;

	        _classCallCheck(this, ToolTip);

	        this.$container = typeof container === "string" ? (0, _jQuery2.default)(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : (0, _jQuery2.default)(container);
	        if (!(this.$container instanceof jQuery)) throw new Error("Container " + container + " not found");
	        this.id = id;
	        this.$container.addClass(_Events.Events.ToolTip.CLOSE);

	        this.$close = (0, _jQuery2.default)('<span class=\'close-button\' />');
	        this.$content = (0, _jQuery2.default)('<div class=\'tooltip-content\' />');
	        this.$popup = (0, _jQuery2.default)('<div class=\'tooltip-container\' />').append(this.$close).append(this.$content);
	        this.eventManager = new _Publisher.Publisher(this.id);

	        this.bindEvents();
	        this.registerHandlebarHelpers();

	        return this.setPosition().initializeTemplates(templates);
	    }

	    /**
	     * register helpers for handlebars
	     * @return {ToolTip} instance of ToolTip for chaining
	     */


	    _createClass(ToolTip, [{
	        key: 'registerHandlebarHelpers',
	        value: function registerHandlebarHelpers() {
	            if (_Handlebars2.default) {
	                _Handlebars2.default.registerHelper('getRatio', function (w, h) {
	                    return h / w * 100 + "%";
	                });
	            }
	            return this;
	        }

	        /**
	         * initialize all templates
	         * @param  {object} templates = {} - all specified templates
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

	    }, {
	        key: 'initializeTemplates',
	        value: function initializeTemplates(templates) {
	            this.templates = templates;
	            this.loadedTemplates = 0;
	            this.compileTemplates();
	            return this;
	        }

	        /**
	         * bind all events
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;

	            (0, _jQuery2.default)(window).on(_Events.Events.Handling.RESIZE, function () {
	                _this.resizeHandler();
	            });
	            this.eventManager.subscribe(_Events.Events.ToolTip.OPEN, this.open.bind(this));
	            this.eventManager.subscribe(_Events.Events.ToolTip.CLOSE, function () {
	                _this.close();
	            });
	            this.$close.on(_Events.Events.Handling.CLICK, function () {
	                _this.close();
	            });
	            return this;
	        }

	        /**
	         * on resize check if tooltip is bottom or left position
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

	    }, {
	        key: 'resizeHandler',
	        value: function resizeHandler() {
	            this.setPosition();
	            return this;
	        }

	        /**
	         * inserts content to ToolTip instance container
	         * @param  {object} content = {} - content object
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

	    }, {
	        key: 'insertContent',
	        value: function insertContent() {
	            var _this2 = this;

	            var content = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.$content.html("");
	            _Helper.Helper.forEach(content, function (data) {
	                if (_this2.templates[data.type]) {
	                    var html = _this2.templates[data.type](data.content);
	                    _this2.$content.append(html);
	                }
	            });
	            return this;
	        }

	        /**
	         * opens a tooltip
	         * @param  {object} data - content object
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

	    }, {
	        key: 'open',
	        value: function open(data) {
	            if (data) this.insertContent(data);
	            if (this.$container.hasClass(_Events.Events.ToolTip.CLOSE)) {
	                this.setPosition();
	                this.$container.removeClass(_Events.Events.ToolTip.CLOSE).addClass(_Events.Events.ToolTip.OPEN);
	                this.eventManager.publish(_Events.Events.TileMap.RESIZE);
	            }
	            return this;
	        }

	        /**
	         * closes a tooltip
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

	    }, {
	        key: 'close',
	        value: function close() {
	            if (this.$container.hasClass(_Events.Events.ToolTip.OPEN)) {
	                this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
	                this.setPosition();
	                this.$container.removeClass(_Events.Events.ToolTip.OPEN).addClass(_Events.Events.ToolTip.CLOSE);
	                this.eventManager.publish(_Events.Events.TileMap.RESIZE);
	            }
	            return this;
	        }

	        /**
	         * sets position of tooltip to left or bottom
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

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

	        /**
	         * precompiles all Handlebars templates
	         * @return {ToolTip} instance of ToolTip for chaining
	         */

	    }, {
	        key: 'compileTemplates',
	        value: function compileTemplates() {
	            var _this3 = this;

	            _Helper.Helper.forEach(this.templates, function (template, type) {
	                _Helper.Helper.getFile(template, function (html) {
	                    _this3.templates[type] = _Handlebars2.default.compile(html);
	                    _this3.loadedTemplates++;
	                    if (_this3.allTemplatesLoaded) _this3.$container.append(_this3.$popup);
	                });
	            });
	            return this;
	        }
	    }]);

	    return ToolTip;
	}();

/***/ },
/* 208 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_208__;

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Label = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(193);

	var _Helper = __webpack_require__(192);

	var _LatLng = __webpack_require__(196);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Michael Duve <mduve@designmail.net>
	 * @file shows an icon and/or a text at given position
	 * @copyright Michael Duve 2016
	 */

	var Label = exports.Label = function () {
	    _createClass(Label, [{
	        key: 'position',
	        get: function get() {
	            return this.instance.view.convertLatLngToPoint(this.nearestPositionToCenter).translate(this.instance.view.currentView.x, this.instance.view.currentView.y).multiply(this.instance.view.distortionFactor, 1).translate(this.instance.view.offsetToCenter, 0);
	        }
	    }, {
	        key: 'nearestPositionToCenter',
	        get: function get() {
	            return this.latlng instanceof _LatLng.LatLng ? this.latlng : this.getNearestPositionToCenter();
	        }

	        /**
	         * @constructor
	         * @return {Label} instance of Label for chaining
	         */

	    }]);

	    function Label(_ref) {
	        var _this = this;

	        var settings = _ref.settings;
	        var instance = _ref.instance;
	        var context = _ref.context;

	        _classCallCheck(this, Label);

	        this.instance = instance;
	        this.context = context;

	        this.latlng = settings.position;
	        this.text = settings.text;
	        this.icon = settings.icon;

	        if (this.icon && this.icon.type === "circle") this.drawIconType = this.drawCircleIcon(this.icon.size);else if (this.icon && this.icon.type === "square") this.drawIconType = this.drawSquareIcon(this.icon.size);else if (this.icon && this.icon.type === "image") {
	            this.drawIconType = function () {};
	            _Helper.Helper.loadImage(this.icon.url, function (img) {
	                _this.drawIconType = _this.drawImageIcon(img, _this.icon.size, _this.icon.offset);
	            });
	        }

	        this.drawElements = this.decideWhatToDraw(this.text, this.icon);

	        return this;
	    }

	    _createClass(Label, [{
	        key: 'getNearestPositionToCenter',
	        value: function getNearestPositionToCenter() {
	            var _this2 = this;

	            this.latlng = this.latlng.sort(function (a, b) {
	                var center = _this2.instance.view.center.clone.multiply(-1);
	                return center.distance(a) - center.distance(b);
	            });
	            return this.latlng[0];
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var pos = this.position;
	            var textPos = pos.clone.add(this.text.offset);

	            this.context.beginPath();
	            this.drawElements(pos, textPos);
	            this.context.closePath();

	            return this;
	        }
	    }, {
	        key: 'decideWhatToDraw',
	        value: function decideWhatToDraw(text, icon) {
	            var _this3 = this;

	            if (text && icon) {
	                return function (pos, textPos) {
	                    _this3.drawText(textPos);
	                    _this3.drawIcon(pos);
	                };
	            } else if (icon) {
	                return function (pos) {
	                    _this3.drawIcon(pos);
	                };
	            } else if (text) {
	                return function (pos, textPos) {
	                    _this3.drawText(textPos);
	                };
	            }
	        }
	    }, {
	        key: 'drawText',
	        value: function drawText(pos) {
	            this.context.shadowColor = this.text.shadow.color;
	            this.context.shadowBlur = this.text.shadow.blur;
	            this.context.textAlign = this.text.align;
	            this.context.textBaseline = this.text.baseline;
	            this.context.font = this.text.font;
	            this.context.fillText(this.text.content, pos.x, pos.y);
	        }
	    }, {
	        key: 'drawIcon',
	        value: function drawIcon(pos) {
	            this.context.shadowColor = this.icon.shadow.color;
	            this.context.shadowBlur = this.icon.shadow.blur;
	            this.context.fillStyle = this.icon.color;
	            this.drawIconType(pos);
	            this.context.fill();
	        }
	    }, {
	        key: 'drawCircleIcon',
	        value: function drawCircleIcon(size) {
	            var _this4 = this;

	            return function (pos) {
	                _this4.context.arc(pos.x, pos.y, size, 0, 2 * Math.PI, false);
	            };
	        }
	    }, {
	        key: 'drawSquareIcon',
	        value: function drawSquareIcon(size) {
	            var _this5 = this;

	            return function (pos) {
	                _this5.context.rect(pos.x, pos.y, size, size);
	            };
	        }
	    }, {
	        key: 'drawImageIcon',
	        value: function drawImageIcon(image, size, offset) {
	            var _this6 = this;

	            return function (pos) {
	                _this6.context.drawImage(image, pos.x + offset.x, pos.y + offset.y, size.x, size.y);
	            };
	        }
	    }]);

	    return Label;
	}();

/***/ },
/* 210 */
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

	var _Point = __webpack_require__(195);

	var _Helper = __webpack_require__(192);

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
	                direction: new _Point.Point(),
	                velocity: new _Point.Point(),
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
	            if (this.settings.callbacks.swipe || this.settings.callbacks.flick) {
	                this.data.direction = this.data.position.end.clone.substract(this.data.last.position);
	                this.data.velocity = this.data.direction.clone.multiply(this.timeToLastMove);
	                this.data.distance = this.data.last.position.distance(this.data.position.end);
	            }

	            if (this.settings.callbacks.swipe && this.time <= this.settings.timeTreshold.swipe) {
	                var originalStart = this.getAbsolutePosition(this.data.position.start);
	                var originalEnd = this.getAbsolutePosition(this.data.position.end);
	                if (originalEnd.distance(originalStart) >= this.settings.distanceTreshold.swipe) {
	                    this.data.directions = this.getSwipeDirections(this.data.direction);
	                    this.eventCallback(this.settings.callbacks.swipe, this.dataClone);
	                }
	            }
	            if (this.settings.callbacks.flick && this.timeToLastMove <= this.settings.timeTreshold.flick) {
	                this.eventCallback(this.settings.callbacks.flick, this.dataClone);
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
	            return point.multiply(clientBounds.width, clientBounds.height);
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