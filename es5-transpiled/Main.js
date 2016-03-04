'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var MapController = require('./MapController.js').MapController;
var $ = require('jquery');
var Helper = require('./Helper.js').Helper;
var Publisher = require('./Publisher.js').Publisher;

var MappedJS = exports.MappedJS = function() {

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
        var _this2 = this;

        var _ref$container = _ref.container;
        var container = _ref$container === undefined ? ".mjs" : _ref$container;
        var _ref$mapData = _ref.mapData;
        var mapData = _ref$mapData === undefined ? {} : _ref$mapData;
        var _ref$mapSettings = _ref.mapSettings;
        var mapSettings = _ref$mapSettings === undefined ? {} : _ref$mapSettings;
        var _ref$events = _ref.events;
        var events = _ref$events === undefined ? {
            loaded: "mjs-loaded"
        } : _ref$events;
        var _ref$jasmine = _ref.jasmine;
        var jasmine = _ref$jasmine === undefined ? false : _ref$jasmine;

        _classCallCheck(this, MappedJS);

        this.initializeApi();

        if (!jasmine) {
            (function() {
                _this2.initializeSettings(container, events, mapSettings);
                var _this = _this2;
                _this2.initializeData(mapData, function() {
                    _this.initializeMap();
                    _this.bindEvents();
                    _this.loadingFinished();
                });
            })();
        }

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
            this.$container = typeof container === "string" ? $(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : $(container);
            if (!(this.$container instanceof jQuery)) {
                throw new Error("Container " + container + " not found");
            }
            this.$container.addClass("mappedJS");

            this.mapSettings = mapSettings;

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
                Helper.requestJSON(mapData, function(data) {
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
            this.$canvas = new MapController({
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
                MapController: MapController,
                Publisher: Publisher,
                Helper: Helper
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
            $(window).on("resize orientationchange", this.resizeHandler.bind(this));
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
