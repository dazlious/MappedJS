(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Helper.js', './Events.js', './TileMap.js', './DataEnrichment.js', './Interact.js', './Point.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Helper.js'), require('./Events.js'), require('./TileMap.js'), require('./DataEnrichment.js'), require('./Interact.js'), require('./Point.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Helper, global.Events, global.TileMap, global.DataEnrichment, global.Interact, global.Point);
        global.Main = mod.exports;
    }
})(this, function(exports, _jQuery, _Helper, _Events, _TileMap, _DataEnrichment, _Interact, _Point) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MappedJS = undefined;

    var _jQuery2 = _interopRequireDefault(_jQuery);

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
            var events = _ref$events === undefined ? {
                loaded: "mjs-loaded"
            } : _ref$events;

            _classCallCheck(this, MappedJS);

            this.initializeSettings(container, events, mapSettings);

            this.initializeData(mapData, function(loadedMapData) {
                _this.mapData = loadedMapData;
                _this.initializeData(markerData, function(loadedMarkerData) {
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

                this.interact = new _Interact.Interact({
                    container: this.$content,
                    autoFireHold: 300,
                    overwriteViewportSettings: true,
                    callbacks: {
                        pan: function pan(data) {
                            if ((0, _jQuery2.default)(data.target).hasClass("control")) return false;
                            var change = data.last.position.clone.substract(data.position.move);
                            _this2.move(_this2.getAbsolutePosition(change).multiply(-1, -1));
                        },
                        wheel: function wheel(data) {
                            var factor = data.delta / 4;
                            _this2.tileMap.zoom(factor, _this2.getAbsolutePosition(data.position.start));
                        },
                        pinch: function pinch(data) {
                            _this2.tileMap.zoom(data.difference * 3, _this2.getAbsolutePosition(data.position.move));
                        },
                        doubletap: function doubletap(data) {
                            if (!(0, _jQuery2.default)(data.target).hasClass("marker-container")) return false;
                            _this2.tileMap.zoom(0.2, _this2.getAbsolutePosition(data.position.start));
                        },
                        flick: function flick(data) {
                            var direction = new _Point.Point(data.directions[0], data.directions[1]),
                                velocity = direction.clone.divide(data.speed).multiply(10);
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

                (0, _jQuery2.default)(window).on(_Events.Events.Handling.RESIZE, this.resizeHandler.bind(this));

                (0, _jQuery2.default)(document).on(_Events.Events.Handling.KEYDOWN, this.keyPress.bind(this));
                (0, _jQuery2.default)(document).on(_Events.Events.Handling.KEYUP, this.keyRelease.bind(this));

                var gesture = _Helper.Helper.isTouch() ? _Events.Events.Handling.TOUCHSTART : _Events.Events.Handling.CLICK;

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
                this.move(direction.multiply(this.keyTicks));
                return this;
            }
        }, {
            key: 'move',
            value: function move(delta) {
                if (this.momentum) this.momentum = clearTimeout(this.momentum);
                this.tileMap.moveView(delta);
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
                this.maxMomentumSteps = 90;
                if (this.momentum) this.momentum = clearTimeout(this.momentum);
                this.triggerMomentum(this.maxMomentumSteps, 1 / 60, velocity.multiply(-1));
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

                this.momentum = setTimeout(function() {
                    steps--;
                    var delta = _Helper.Helper.linearEase((_this3.maxMomentumSteps - steps) * timing, change, change.clone.multiply(-1), timing * _this3.maxMomentumSteps);
                    _this3.move(delta);
                    if (steps >= 0) _this3.triggerMomentum(steps, timing, change);
                }, timing);
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
});
