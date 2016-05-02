(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './TileMap.js', './DataEnrichment.js', './Helper.js', './Interact.js', './LatLng.js', './Point.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./TileMap.js'), require('./DataEnrichment.js'), require('./Helper.js'), require('./Interact.js'), require('./LatLng.js'), require('./Point.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.TileMap, global.DataEnrichment, global.Helper, global.Interact, global.LatLng, global.Point);
        global.Main = mod.exports;
    }
})(this, function(exports, _jQuery, _TileMap, _DataEnrichment, _Helper, _Interact, _LatLng, _Point) {
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
         * Constructor
         * @param  {string|Object} container=".mjs" - Container, either string, jQuery-object or dom-object
         * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
         * @param  {Object} mapSettings={} - settings for map, must be json
         * @param  {Object} events={loaded: "mjs-loaded"} - List of events
         * @return {MappedJS} instance of MappedJS for chaining
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
            var _ref$debug = _ref.debug;
            var debug = _ref$debug === undefined ? false : _ref$debug;

            _classCallCheck(this, MappedJS);

            this.initializeSettings(container, events, mapSettings);

            this.initializeData(mapData, function() {
                this.initializeMap();
                this.addControls();
                this.bindEvents();
                this.loadingFinished();
            }.bind(this));

            this.momentum = null;
            this.keyTicks = 0;

            this.debug = debug;

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
                    this.$container.append(this.$controls);
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
                if (!(this.$container instanceof jQuery)) {
                    throw new Error("Container " + container + " not found");
                }
                this.$container.addClass("mappedJS");

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
             * @return {MappedJS} instance of MappedJS for chaining
             */

        }, {
            key: 'initializeMap',
            value: function initializeMap() {
                this.tileMap = new _TileMap.TileMap({
                    container: this.$container,
                    tilesData: this.mapData,
                    settings: this.mapSettings,
                    debug: this.debug
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
                this.interact = new _Interact.Interact({
                    container: this.$container,
                    autoFireHold: 300,
                    overwriteViewportSettings: true,
                    callbacks: {
                        pan: function(data) {
                            if ((0, _jQuery2.default)(data.target).hasClass("control")) {
                                return false;
                            }
                            var change = data.last.position.clone.substract(data.position.move);
                            this.moveView(this.getAbsolutePosition(change).multiply(-1, -1));
                        }.bind(this),
                        wheel: function(data) {
                            var factor = data.zoom / 10;
                            this.zoom(factor, this.getAbsolutePosition(data.position.start));
                        }.bind(this),
                        pinch: function(data) {
                            this.zoom(data.difference * 3, this.getAbsolutePosition(data.position.move));
                        }.bind(this),
                        doubletap: function(data) {
                            if ((0, _jQuery2.default)(data.target).hasClass("control")) {
                                return false;
                            }
                            this.zoom(0.2, this.getAbsolutePosition(data.position.start));
                        }.bind(this),
                        flick: function(data) {
                            var direction = new _Point.Point(data.directions[0], data.directions[1]),
                                velocity = direction.clone.divide(data.speed).multiply(20);
                            this.momentumAccerlation(velocity);
                        }.bind(this)
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
                this.tileMap.view.reset();
                this.tileMap.view.drawIsNeeded = true;
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
                this.momentum = setTimeout(function() {
                    steps--;
                    var delta = _Helper.Helper.easeOutQuadratic((this.maxMomentumSteps - steps) * timing, change, change.clone.multiply(-1), timing * this.maxMomentumSteps);
                    this.moveView(delta);
                    if (steps >= 0) {
                        this.triggerMomentum(steps, timing, change);
                    }
                }.bind(this), timing);
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
});
