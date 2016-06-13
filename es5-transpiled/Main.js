(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Helper.js', './Events.js', './Publisher.js', './TileMap.js', './DataEnrichment.js', './Interact.js', './Point.js', 'babel-polyfill'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Helper.js'), require('./Events.js'), require('./Publisher.js'), require('./TileMap.js'), require('./DataEnrichment.js'), require('./Interact.js'), require('./Point.js'), require('babel-polyfill'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Helper, global.Events, global.Publisher, global.TileMap, global.DataEnrichment, global.Interact, global.Point, global.babelPolyfill);
        global.Main = mod.exports;
    }
})(this, function(exports, _Helper, _Events, _Publisher, _TileMap, _DataEnrichment, _Interact, _Point) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MappedJS = undefined;

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
         * @constructor
         * @param  {string|Object} container=".mjs" - Container, either string or dom-object
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
            var events = _ref$events === undefined ? {
                loaded: "mjs-loaded"
            } : _ref$events;

            _classCallCheck(this, MappedJS);

            this.initializeSettings(container, events, mapSettings);

            this.id = this.generateUniqueID();

            this.eventManager = new _Publisher.Publisher(this.id);
            this.initializeData(mapData, function(loadedMapData) {
                _this.mapData = loadedMapData;
                _this.initializeData(markerData, function(loadedMarkerData) {
                    _this.mapData = Object.assign(_this.mapData, loadedMarkerData);
                    _this.initializeData(labelData, function(loadedLabelData) {
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
                    this.controls = document.createElement("div");
                    this.controls.classList.add("control-container", this.mapSettings.controls.theme, this.mapSettings.controls.position);
                    this.zoomIn = document.createElement("div");
                    this.zoomIn.classList.add("control", "zoom-in");
                    this.zoomOut = document.createElement("div");
                    this.zoomOut.classList.add("control", "zoom-out");
                    this.home = document.createElement("div");
                    this.home.classList.add("control", "home");
                    this.controls.appendChild(this.home);
                    this.controls.appendChild(this.zoomIn);
                    this.controls.appendChild(this.zoomOut);
                    this.content.appendChild(this.controls);
                }
            }

            /**
             * initializes the settings and handles errors
             * @param  {string|Object} container - Container, either string or dom-object
             * @param  {object} events - List of events
             * @param  {object} settings - List of settings
             * @return {MappedJS} instance of MappedJS for chaining
             */

        }, {
            key: 'initializeSettings',
            value: function initializeSettings(container) {
                var events = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var settings = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                this.container = typeof container === "string" ? _Helper.Helper.find(container) : container;
                this.container.classList.add("mappedJS");
                this.content = document.createElement("div");
                this.content.classList.add("map-content");
                this.container.appendChild(this.content);

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
                    _Helper.Helper.requestJSON(mapData, function(data) {
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
                    container: this.content,
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
                    container: this.content,
                    autoFireHold: 300,
                    overwriteViewportSettings: true,
                    callbacks: {
                        tap: function tap(data) {
                            var pos = _this2.getAbsolutePosition(data.positionStart);
                            _this2.tileMap.velocity = new _Point.Point();
                            var id = data.target.getAttribute("data-id");
                            if (id) _this2.eventManager.publish(id, pos);
                        },
                        doubletap: function doubletap(data) {
                            _this2.tileMap.velocity = new _Point.Point();
                            _this2.tileMap.zoom(0.2, _this2.getAbsolutePosition(data.positionStart));
                        },
                        pan: function pan(data) {
                            if (data.target.classList.contains("control")) return false;
                            var change = data.positionLast.clone.substract(data.positionMove);
                            _this2.tileMap.velocity = new _Point.Point();
                            _this2.tileMap.moveView(_this2.getAbsolutePosition(change).multiply(-1, -1));
                        },
                        wheel: function wheel(data) {
                            var factor = data.delta / 4;
                            _this2.tileMap.velocity = new _Point.Point();
                            _this2.tileMap.zoom(factor, _this2.getAbsolutePosition(data.positionStart));
                        },
                        pinch: function pinch(data) {
                            _this2.tileMap.velocity = new _Point.Point();
                            _this2.tileMap.zoom(data.difference * 3, _this2.getAbsolutePosition(data.positionMove));
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

                _Helper.Helper.addListener(window, "resize orientationchange", this.resizeHandler.bind(this));

                _Helper.Helper.addListener(document, _Events.Events.Handling.KEYDOWN, this.keyPress.bind(this));
                _Helper.Helper.addListener(document, _Events.Events.Handling.KEYUP, this.keyRelease.bind(this));

                this.zoomIn.setAttribute("data-id", "zoom-button-plus");
                this.eventManager.subscribe("zoom-button-plus", this.zoomInToCenter.bind(this));

                this.zoomOut.setAttribute("data-id", "zoom-button-minus");
                this.eventManager.subscribe("zoom-button-minus", this.zoomOutToCenter.bind(this));

                this.home.setAttribute("data-id", "home-button");
                this.eventManager.subscribe("home-button", this.resetToInitialState.bind(this));

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
                this.eventManager.publish(_Events.Events.TileMap.DRAW);
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
                return this;
            }
        }]);

        return MappedJS;
    }();
});
