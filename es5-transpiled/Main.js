(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './TileMap.js', './Helper.js', './Interact.js', './LatLng.js', './Point.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./TileMap.js'), require('./Helper.js'), require('./Interact.js'), require('./LatLng.js'), require('./Point.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.TileMap, global.Helper, global.Interact, global.LatLng, global.Point);
        global.Main = mod.exports;
    }
})(this, function(exports, _jquery, _TileMap, _Helper, _Interact, _LatLng, _Point) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MappedJS = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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

            _classCallCheck(this, MappedJS);

            this.initializeSettings(container, events, mapSettings);

            this.initializeData(mapData, function() {
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
                    center: mapSettings.center || {
                        "lat": 0,
                        "lng": 0
                    },
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
                    _Helper.Helper.requestJSON(mapData, function(data) {
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
                this.tileMap = new _TileMap.TileMap({
                    container: this.$container,
                    tilesData: this.mapData,
                    settings: this.mapSettings
                });
                return this;
            }
        }, {
            key: 'getAbsolutePosition',
            value: function getAbsolutePosition(point) {
                return point.clone.multiply(this.tileMap.view.viewport.width, this.tileMap.view.viewport.height);
            }

            /**
             * binds all events to handlers
             * @return {MappedJS} instance of MappedJS
             */

        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                this.interact = new _Interact.Interact({
                    container: this.$container,
                    autoFireHold: 300,
                    overwriteViewportSettings: true,
                    callbacks: {
                        tap: function(data) {}.bind(this),
                        pan: function(data) {
                            var change = data.last.position.substract(data.position.move);
                            this.tileMap.view.moveView(this.getAbsolutePosition(change).multiply(-1, -1));
                            this.tileMap.view.drawIsNeeded = true;
                        }.bind(this),
                        hold: function(data) {}.bind(this),
                        wheel: function(data) {
                            var factor = data.zoom / 10;
                            this.zoom(factor, this.getAbsolutePosition(data.position.start));
                        }.bind(this),
                        pinch: function(data) {
                            this.zoom(data.difference * 3, this.getAbsolutePosition(data.position.move));
                        }.bind(this),
                        doubletap: function(data) {
                            this.zoom(0.2, this.getAbsolutePosition(data.position.start));
                        }.bind(this),
                        flick: function(data) {}.bind(this)
                    }
                });

                (0, _jquery2.default)(window).on("resize orientationchange", this.resizeHandler.bind(this));

                return this;
            }
        }, {
            key: 'zoom',
            value: function zoom(factor, position) {
                if (factor !== 0) {
                    this.tileMap.view.zoom(factor, position);
                    this.tileMap.view.drawIsNeeded = true;
                }
            }

            /**
             * handles resizing of window
             * @return {MappedJS} instance of MappedJS
             */

        }, {
            key: 'resizeHandler',
            value: function resizeHandler() {
                this.tileMap.resize();
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
});
