(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './Point.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./Point.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.Point);
        global.Interact = mod.exports;
    }
})(this, function(exports, _jquery, _Point) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Interact = undefined;

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

    var Interact = exports.Interact = function() {
        _createClass(Interact, [{
            key: 'isMouse',


            /**
             * checks if mouse is possible
             * @return {Boolean} if true, mouse is possible
             */
            get: function get() {
                return 'onmousedown' in window;
            }

            /**
             * checks if touch is possible
             * @return {Boolean} if true, touch is possible
             */

        }, {
            key: 'isTouch',
            get: function get() {
                return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
            }

            /**
             * checks if IE is used
             * @return {Boolean} if true, IE is used
             */

        }, {
            key: 'isIE',
            get: function get() {
                return navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
            }

            /**
             * gets cross-browser scroll-event
             * @return {string} name of scroll event
             */

        }, {
            key: 'scrollEvent',
            get: function get() {
                return "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
            }
        }, {
            key: 'timeToLastMove',
            get: function get() {
                return this.data.time.end - this.data.time.last;
            }
        }, {
            key: 'time',
            get: function get() {
                return this.data.time.end - this.data.time.start;
            }
        }, {
            key: 'dataClone',
            get: function get() {
                return (0, _jquery2.default)(this.data)[0];
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

            this.settings = this.getDefaultSettings();

            _jquery2.default.extend(true, this.settings, settings || {});

            this.data = this.getDefaultData();

            if (this.settings.overwriteViewportSettings) {
                this.handleViewport(this.settings.overwriteViewportSettings);
            }

            this.init(this.settings.container).bindEvents();
        }

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
                    overwriteViewportSettings: false,
                    stopPropagation: true,
                    preventDefault: true,
                    autoFireHold: false,
                    pinchBalanceTime: 50,
                    callbacks: this.getDefaultCallbacks(),
                    events: this.getDefaultEventNames()
                };
            }
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
        }, {
            key: 'getDefaultEventNames',
            value: function getDefaultEventNames() {
                return {
                    start: {
                        touch: this.isIE ? "MSPointerDown pointerdown" : "touchstart",
                        mouse: this.isIE ? "MSPointerDown pointerdown" : "mousedown"
                    },
                    move: {
                        touch: this.isIE ? "MSPointerMove pointermove" : "touchmove",
                        mouse: this.isIE ? "MSPointerMove pointermove" : "mousemove"
                    },
                    end: {
                        touch: this.isIE ? "MSPointerUp pointerup" : "touchend",
                        mouse: this.isIE ? "MSPointerUp pointerup" : "mouseup"
                    },
                    leave: {
                        touch: this.isIE ? "MSPointerLeave pointerleave" : "touchleave",
                        mouse: this.isIE ? "MSPointerLeave pointerleave" : "mouseleave"
                    },
                    scroll: this.scrollEvent
                };
            }
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
                var metaViewInHead = (0, _jquery2.default)("meta[name=viewport]").length,
                    $viewportMeta = metaViewInHead !== 0 ? (0, _jquery2.default)("meta[name=viewport]") : (0, _jquery2.default)("head").append((0, _jquery2.default)("<meta name='viewport' />"));
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
                this.$container = typeof container === "string" ? (0, _jquery2.default)(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof _jquery2.default ? container : (0, _jquery2.default)(container);
                if (!(this.$container instanceof _jquery2.default)) {
                    throw new Error("Container " + container + " not found");
                }
                this.$container.css({
                    "-ms-touch-action": "none",
                    "touch-action": "none",
                    "-ms-content-zooming": "none"
                });
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
                if (this.isIE) {
                    this.bindIEEvents();
                } else {
                    if (this.isTouch) {
                        this.bindTouchEvents();
                    }
                    if (this.isMouse) {
                        this.bindMouseEvents();
                    }
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
                this.container.addEventListener("contextmenu", function(e) {
                    e.preventDefault();
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
        }, {
            key: 'preHandle',
            value: function preHandle(event) {
                if (this.settings.stopPropagation) {
                    event.stopPropagation();
                }
                if (this.settings.preventDefault) {
                    event.preventDefault();
                }

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

                this.data.position.start = this.getRelativePosition(e);
                this.data.directions = this.getScrollDirection(e);

                if (this.settings.callbacks.wheel) {
                    this.eventCallback(this.settings.callbacks.wheel, this.dataClone);
                }

                this.data.zoom = 0;
                if (this.settings.callbacks.zoom && (this.data.directions.indexOf("up") > -1 || this.data.directions.indexOf("down") > -1)) {
                    this.data.zoom = this.data.directions.indexOf("up") > -1 ? 1 : this.data.directions.indexOf("down") > -1 ? -1 : 0;
                    this.eventCallback(this.settings.callbacks.zoom, this.dataClone);
                }

                return false;
            }
        }, {
            key: 'isPointerEvent',
            value: function isPointerEvent(e) {
                return this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent);
            }
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
                if (e instanceof MouseEvent) {
                    return _jquery2.default.extend(true, data, this.handleSingletouchStart(e));
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
        }, {
            key: 'handlePointerEventStart',
            value: function handlePointerEventStart(data, e) {
                this.data.pointerArray[e.pointerId] = e;
                if (Object.keys(this.data.pointerArray).length <= 1) {
                    return _jquery2.default.extend(true, data, this.handleSingletouchStart(e));
                } else {
                    return _jquery2.default.extend(true, data, this.handleMultitouchStart(this.getPointerArray()));
                }
            }
        }, {
            key: 'handleTouchEventStart',
            value: function handleTouchEventStart(data, e) {
                if (e.length === 1) {
                    return _jquery2.default.extend(true, data, this.handleSingletouchStart(e[0]));
                } // multitouch started
                else if (e.length === 2) {
                    return _jquery2.default.extend(true, data, this.handleMultitouchStart(e));
                }
                return data;
            }
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
        }, {
            key: 'handleSingletouchStart',
            value: function handleSingletouchStart(position) {
                return {
                    position: {
                        start: this.getRelativePosition(position)
                    }
                };
            }
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
                this.data = _jquery2.default.extend(true, this.data, this.calculateStart(e));
                this.takeActionStart(this.data.last.action);
                return false;
            }
        }, {
            key: 'clearTimeouts',
            value: function clearTimeouts(timeout) {
                if (timeout) {
                    timeout = clearTimeout(timeout);
                }
            }
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

                if (e instanceof MouseEvent) {
                    return _jquery2.default.extend(true, data, this.handleSingletouchMove(e));
                } // if is pointerEvent
                if (this.isPointerEvent(e)) {
                    return this.handlePointerEventMove(data, e);
                } // touch is used
                else {
                    return this.handleTouchEventMove(data, e);
                }
            }
        }, {
            key: 'handlePointerEventMove',
            value: function handlePointerEventMove(data, e) {
                this.data.pointerArray[e.pointerId] = e;
                if (Object.keys(this.data.pointerArray).length <= 1) {
                    return _jquery2.default.extend(true, data, this.handleSingletouchMove(e));
                } else {
                    var pointerPos = this.getPointerArray();
                    return _jquery2.default.extend(true, data, this.handleMultitouchMove(pointerPos));
                }
            }
        }, {
            key: 'handleTouchEventMove',
            value: function handleTouchEventMove(data, e) {
                // singletouch startet
                if (e.length === 1) {
                    return _jquery2.default.extend(true, data, this.handleSingletouchMove(e[0]));
                } else if (e.length === 2) {
                    return _jquery2.default.extend(true, data, this.handleMultitouchMove(e));
                }
                return data;
            }
        }, {
            key: 'handleMultitouchMove',
            value: function handleMultitouchMove(positionsArray) {
                var pointerPos1 = this.getRelativePosition(positionsArray[0]);
                var pointerPos2 = this.getRelativePosition(positionsArray[1]);
                return {
                    position: {
                        move: pointerPos1.substract(pointerPos2).divide(2, 2)
                    },
                    distance: pointerPos1.distance(pointerPos2),
                    multitouch: true
                };
            }
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
                if (!this.data.down || this.data.pinched) {
                    return false;
                }

                var e = this.preHandle(event);
                this.data.time.last = event.timeStamp;
                this.data.last.position = this.data.position.move ? this.data.position.move : this.data.position.start;
                this.data.time.last = this.data.time.last ? this.data.time.last : this.data.time.start;

                // if positions have not changed
                if (this.positionDidNotChange(e)) {
                    return false;
                }

                this.clearTimeouts(this.data.timeout.default);
                this.clearTimeouts(this.data.timeout.hold);
                this.data = _jquery2.default.extend(true, this.data, this.calculateMove(e));

                if (this.data.multitouch) {
                    this.handlePinchAndZoom();
                } else {
                    this.data.speed = this.calculateSpeed(this.data.distance, this.timeToLastMove);
                    this.eventCallback(this.settings.callbacks.pan, this.dataClone);
                }
                return false;
            }
        }, {
            key: 'handlePinchAndZoom',
            value: function handlePinchAndZoom() {
                this.data.difference = this.data.distance - this.data.last.distance || 0;
                this.data.last.position = this.data.position.move;
                if (this.settings.callbacks.pinch && this.data.difference !== 0) {
                    this.eventCallback(this.settings.callbacks.pinch, this.dataClone);
                }
                if (this.settings.callbacks.zoom && this.data.difference !== 0) {
                    this.eventCallback(this.settings.callbacks.zoom, this.dataClone);
                }
            }
        }, {
            key: 'positionDidNotChange',
            value: function positionDidNotChange(e) {
                return this.isIE && (this.getRelativePosition(e).equals(this.data.last.position) || this.getRelativePosition(e).equals(this.data.position.start)) || !this.isIE && this.isTouch && this.getRelativePosition(e[0]).equals(this.data.last.position);
            }
        }, {
            key: 'calculateEnd',
            value: function calculateEnd(e) {
                var data = {
                    position: {
                        end: new _Point.Point()
                    }
                };

                if (e instanceof MouseEvent) {
                    return _jquery2.default.extend(true, data, this.handleSingletouchEnd(e));
                } // if is pointerEvent
                if (this.isPointerEvent(e)) {
                    var end = this.handleSingletouchEnd(e);
                    delete this.data.pointerArray[e.pointerId];
                    return _jquery2.default.extend(true, data, end);
                } // touch is used
                else {
                    // singletouch ended
                    if (e.length <= 1) {
                        return _jquery2.default.extend(true, data, this.handleSingletouchEnd(e[0]));
                    }
                }
            }
        }, {
            key: 'handleSingletouchEnd',
            value: function handleSingletouchEnd(position) {
                return {
                    position: {
                        end: this.getRelativePosition(position)
                    }
                };
            }
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

                this.data = _jquery2.default.extend(true, this.data, this.calculateEnd(e));

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
                return false;
            }
        }, {
            key: 'handleSwipeAndFlick',
            value: function handleSwipeAndFlick() {
                var direction = this.settings.callbacks.swipe ? this.data.position.end.substract(this.data.position.start) : this.data.position.end.substract(this.data.last.position);

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
                    if (this.data.speed >= 1) {
                        this.eventCallback(this.settings.callbacks.flick, this.dataClone);
                    }
                }
            }
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
            }
        }, {
            key: 'pinchBalance',
            value: function pinchBalance() {
                if (this.data.multitouch) {
                    this.data.pinched = true;
                    setTimeout(function() {
                        this.data.pinched = false;
                    }.bind(this), this.settings.pinchBalanceTime);
                }
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
                if (callback && typeof callback === "function") {
                    callback(args);
                }
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

                // down
                if (this.isDownDirection(axis, event)) {
                    direction.push("down");
                } // up
                else if (this.isUpDirection(axis, event)) {
                    direction.push("up");
                }

                // right
                if (this.isRightDirection(axis, event)) {
                    direction.push("right");
                } // left
                else if (this.isLeftDirection(axis, event)) {
                    direction.push("left");
                }

                return direction;
            }
        }, {
            key: 'isDownDirection',
            value: function isDownDirection(axis, event) {
                return event.deltaY > 0 || !event.deltaY && event.wheelDeltaY < 0 || axis === 2 && event.detail > 0 || Math.max(-1, Math.min(1, event.wheelDelta || -event.detail)) < 0;
            }
        }, {
            key: 'isUpDirection',
            value: function isUpDirection(axis, event) {
                return event.deltaY < 0 || !event.deltaY && event.wheelDeltaY > 0 || axis === 2 && event.detail < 0 || Math.max(-1, Math.min(1, event.wheelDelta || -event.detail)) > 0;
            }
        }, {
            key: 'isRightDirection',
            value: function isRightDirection(axis, event) {
                return event.deltaX > 0 || !event.deltaX && event.wheelDeltaX > 0 || axis === 1 && event.detail > 0;
            }
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
                _jquery2.default.event.fix(e);
                if (e.originalEvent.touches && e.originalEvent.touches.length === 0) {
                    return e.originalEvent.changedTouches || e.originalEvent;
                }
                return e.originalEvent.touches || e.originalEvent.changedTouches || e.originalEvent;
            }
        }]);

        return Interact;
    }();
});
