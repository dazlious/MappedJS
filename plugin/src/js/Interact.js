/*global PointerEvent,MSPointerEvent*/

import $ from 'jQuery';
import {Point} from './Point.js';
import {Helper} from './Helper.js';

export class Interact {


    /**
     * get time difference to last
     * @return {number} difference
     */
    get timeToLastMove() {
        return this.data.time.end - this.data.time.last;
    }

    /**
     * get time difference to start
     * @return {number} difference
     */
    get time() {
        return this.data.time.end - this.data.time.start;
    }

    /**
     * clones the data object
     * @return {Object} data object
     */
    get dataClone() {
        return $(this.data)[0];
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
    constructor(settings = {}) {
        this.settings = this.getDefaultSettings();

        $.extend(true, this.settings, settings || {});

        this.data = this.getDefaultData();

        if (this.settings.overwriteViewportSettings) {
            this.handleViewport(this.settings.overwriteViewportSettings);
        }

        this.init(this.settings.container).bindEvents();

    }

    /**
     * get the default settings
     * @return {Object} settings
     */
    getDefaultSettings() {
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
            pinchBalanceTime: 20,
            callbacks: this.getDefaultCallbacks(),
            events: this.getDefaultEventNames()
        };
    }

    /**
     * get default callbacks
     * @return {Object} callbacks
     */
    getDefaultCallbacks() {
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
    getDefaultEventNames() {
        return {
            start: {
                touch: (Helper.isIE()) ? "MSPointerDown pointerdown" : "touchstart",
                mouse: (Helper.isIE()) ? "MSPointerDown pointerdown" : "mousedown"
            },
            move: {
                touch: (Helper.isIE()) ? "MSPointerMove pointermove" : "touchmove",
                mouse: (Helper.isIE()) ? "MSPointerMove pointermove" : "mousemove"
            },
            end: {
                touch: (Helper.isIE()) ? "MSPointerUp pointerup" : "touchend",
                mouse: (Helper.isIE()) ? "MSPointerUp pointerup" : "mouseup"
            },
            leave: {
                touch: (Helper.isIE()) ? "MSPointerLeave pointerleave" : "touchleave",
                mouse: (Helper.isIE()) ? "MSPointerLeave pointerleave" : "mouseleave"
            },
            scroll: Helper.scrollEvent()
        };
    }

    /**
     * get default data
     * @return {Object} data
     */
    getDefaultData() {
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
    handleViewport(viewport) {
        if (typeof viewport !== "string") {
            viewport = "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no";
        }
        const metaViewInHead = $("meta[name=viewport]").length,
              $viewportMeta = (metaViewInHead !== 0) ? $("meta[name=viewport]") : $("head").append($("<meta name='viewport' />"));
        $viewportMeta.attr("content", viewport);
        return this;
    }

    /**
     * initializes class settings and bindings
     * @param  {Object|string} container - Container, either string, jQuery-object or dom-object
     * @return {Interact} Returns this instance
     */
    init(container) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) {
            throw new Error("Container " + container + " not found");
        }
        this.$container.css({
            "-ms-touch-action": "none",
            "touch-action": "none",
            "-ms-content-zooming": "none"
        });
        this.$container.find("> *").css({
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
    bindEvents() {
        if (Helper.isIE()) {
            this.bindIEEvents();
        } else {
            if (Helper.isTouch()) {
                this.bindTouchEvents();
            }
            if (Helper.isMouse()) {
                this.bindMouseEvents();
            }
        }
        return this;
    }

    /**
     * binds all needed events for IE
     * @return {Interact} Returns this instance
     */
    bindIEEvents() {
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
    bindTouchEvents() {
        this.$container
            .on(this.settings.events.start.touch, this.startHandler.bind(this))
            .on(this.settings.events.move.touch, this.moveHandler.bind(this))
            .on(this.settings.events.end.touch, this.endHandler.bind(this))
            .on(this.settings.events.leave.touch, this.endHandler.bind(this));
        return this;
    }

    /**
     * binds all needed events for mouse devices
     * @return {Interact} Returns this instance
     */
    bindMouseEvents() {
        this.$container.on(this.settings.events.scroll, this.scrollHandler.bind(this))
            .on(this.settings.events.start.mouse, this.startHandler.bind(this))
            .on(this.settings.events.move.mouse, this.moveHandler.bind(this))
            .on(this.settings.events.end.mouse, this.endHandler.bind(this))
            .on(this.settings.events.leave.mouse, this.endHandler.bind(this));
        return this;
    }

    /**
     * pre handle all events
     * @param  {Object} event - original event of Vanilla JS
     * @return {Object} normalized jQuery-fixed event
     */
    preHandle(event) {
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
    scrollHandler(event) {
        event = event || window.event;

        const e = this.preHandle(event) || event.originalEvent;

        this.data.position.start = this.getRelativePosition(e);
        this.data.directions = this.getScrollDirection(e);

        this.data.zoom = (this.data.directions.indexOf("up") > -1) ? 1 : (this.data.directions.indexOf("down") > -1) ? -1 : 0;

        if (this.settings.callbacks.wheel) {
            this.eventCallback(this.settings.callbacks.wheel, this.dataClone);
        }
        if (this.settings.callbacks.zoom && (this.data.directions.indexOf("up") > -1 || this.data.directions.indexOf("down") > -1)) {
            this.eventCallback(this.settings.callbacks.zoom, this.dataClone);
        }

        return false;
    }

    /**
     * check if event is a PointerEvent (IE)
     * @param  {Object} event - original event of Vanilla JS
     * @return {Boolean} Whether event is PointerEvent
     */
    isPointerEvent(e) {
        return Helper.isIE() && (e instanceof MSPointerEvent || e instanceof PointerEvent);
    }

    /**
     * calculation to be made at start-handler
     * @param  {Object} e - jQuery-Event-Object
     * @return {Object} calculated data
     */
    calculateStart(e) {
        const data = {
            multitouch: false,
            distance: 0,
            down: true,
            position: {
                start: new Point()
            }
        };
        // mouse is used
        if (e instanceof MouseEvent && !this.isPointerEvent(e)) {
            return $.extend(true, data, this.handleSingletouchStart(e));
        }
        // if is pointerEvent
        if (this.isPointerEvent(e)) {
            return this.handlePointerEventStart(data, e);
        } // touch is used
        else { // singletouch startet
            return this.handleTouchEventStart(data, e);
        }
    }

    /**
     * handle PointerEvent calculations
     * @param  {Object} data - current data
     * @param  {Object} e - jQuery-Event-Object
     * @return {Object} manipulated enriched data
     */
    handlePointerEventStart(data, e) {
        this.data.pointerArray[e.pointerId] = e;
        if (Object.keys(this.data.pointerArray).length <= 1) {
            return $.extend(true, data, this.handleSingletouchStart(e));
        } else {
            return $.extend(true, data, this.handleMultitouchStart(this.getPointerArray()));
        }
    }

    /**
     * handle TouchEvent calculations for start
     * @param  {Object} data - current data
     * @param  {Object} e - jQuery-Event-Object
     * @return {Object} manipulated enriched data
     */
    handleTouchEventStart(data, e) {
        if (e.length === 1) {
            return $.extend(true, data, this.handleSingletouchStart(e[0]));
        } // multitouch started
        else if (e.length === 2) {
            return $.extend(true, data, this.handleMultitouchStart(e));
        }
        return data;
    }

    /**
     * get array of pointers (IE)
     * @return {Object} array of pointerIDs
     */
    getPointerArray() {
        const pointerPos = [];
        for (const pointer in this.data.pointerArray) {
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
    handleMultitouchStart(positionsArray) {
        const pos1 = this.getRelativePosition(positionsArray[0]),
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
    handleSingletouchStart(position) {
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
    takeActionStart(action) {
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
    startHandler(event) {
        if (event.button && event.button !== 0) {
            return false;
        }
        const e = this.preHandle(event);
        this.data.time.start = event.timeStamp;
        this.clearTimeouts(this.data.timeout.default);
        this.data = $.extend(true, this.data, this.calculateStart(e));
        this.takeActionStart(this.data.last.action);
        return false;
    }

    /**
     * clear timeout helper
     * @param  {Object} timeout - timeout object to be cleared
     * @return {Interact} instance of Interact for chaining
     */
    clearTimeouts(timeout) {
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
    calculateMove(e) {
        const data = {
            moved: true,
            last: {
                action: "moved"
            },
            position: {
                move: new Point()
            }
        };

        if (e instanceof MouseEvent && !this.isPointerEvent(e)) {
            return $.extend(true, data, this.handleSingletouchMove(e));
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
    handlePointerEventMove(data, e) {
        this.data.pointerArray[e.pointerId] = e;
        if (Object.keys(this.data.pointerArray).length <= 1) {
            return $.extend(true, data, this.handleSingletouchMove(e));
        } else {
            const pointerPos = this.getPointerArray();
            return $.extend(true, data, this.handleMultitouchMove(pointerPos));
        }
    }

    /**
     * handle TouchEvent calculations for move
     * @param  {Object} data - current data
     * @param  {Object} e - jQuery-Event-Object
     * @return {Object} manipulated enriched data
     */
    handleTouchEventMove(data, e) {
        // singletouch startet
        if (e.length === 1) {
            return $.extend(true, data, this.handleSingletouchMove(e[0]));
        } else if (e.length === 2) {
            return $.extend(true, data, this.handleMultitouchMove(e));
        }
        return data;
    }

    /**
     * handles multitouch for move
     * @param  {Object} positionsArray - array of positions
     * @return {Object} manipulated enriched data
     */
    handleMultitouchMove(positionsArray) {
        const pointerPos1 = this.getRelativePosition(positionsArray[0]);
        const pointerPos2 = this.getRelativePosition(positionsArray[1]);
        const pos = pointerPos2.clone.add(pointerPos1).divide(2);
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
    handleSingletouchMove(position) {
        const pos = this.getRelativePosition(position);
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
    moveHandler(event) {
        // if touchstart event was not fired
        if (!this.data.down || this.data.pinched) {
            return false;
        }

        const e = this.preHandle(event);
        this.data.time.last = event.timeStamp;
        this.data.last.position = (this.data.position.move) ? this.data.position.move : this.data.position.start;
        this.data.time.last = (this.data.time.last) ? this.data.time.last : this.data.time.start;

        // if positions have not changed
        if (this.positionDidNotChange(e)) {
            return false;
        }

        this.clearTimeouts(this.data.timeout.default);
        this.clearTimeouts(this.data.timeout.hold);
        this.data = $.extend(true, this.data, this.calculateMove(e));

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
    handlePinchAndZoom() {
        if (!this.data.last.distance) {
            this.data.last.distance = this.data.distance;
        }
        this.data.difference = this.data.distance - this.data.last.distance;
        if (Math.abs(this.data.difference) >= 0.005) {
            if (this.settings.callbacks.pinch) {
                this.eventCallback(this.settings.callbacks.pinch, this.dataClone);
            }
            if (this.settings.callbacks.zoom) {
                this.eventCallback(this.settings.callbacks.zoom, this.dataClone);
            }
            this.data.last.distance = this.data.distance;
        }
        return this;
    }

    /**
     * check if position has been changed
     * @param  {Object} e - jQuery-Event-Object
     * @return {Boolean} Whether or not position has changed
     */
    positionDidNotChange(e) {
        return Helper.isIE() && (this.getRelativePosition(e).equals(this.data.last.position) || this.getRelativePosition(e).equals(this.data.position.start)) || (!Helper.isIE() && Helper.isTouch() && this.getRelativePosition(e[0]).equals(this.data.last.position));
    }

    /**
     * calculation to be made at end-handler
     * @param  {Object} e - jQuery-Event-Object
     * @return {Object} calculated data
     */
    calculateEnd(e) {
        const data = {
            position: {
                end: new Point()
            }
        };

        if (e instanceof MouseEvent && !this.isPointerEvent(e)) {
            return $.extend(true, data, this.handleSingletouchEnd(e));
        } // if is pointerEvent
        if (this.isPointerEvent(e)) {
            const end = this.handleSingletouchEnd(e);
            delete this.data.pointerArray[e.pointerId];
            return $.extend(true, data, end);
        } // touch is used
        else {
            // singletouch ended
            if (e.length <= 1) {
                return $.extend(true, data,  this.handleSingletouchEnd(e[0]));
            }
        }
    }

    /**
     * handles singletouch for end
     * @param  {Object} position - position
     * @return {Object} manipulated enriched data
     */
    handleSingletouchEnd(position) {
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
    takeActionEnd(action) {
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
    endHandler(event) {

        const e = this.preHandle(event);

        this.data.time.end = event.timeStamp;

        this.clearTimeouts(this.data.timeout.hold);

        this.data = $.extend(true, this.data, this.calculateEnd(e));

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
    handleSwipeAndFlick() {
        const direction = this.data.position.end.clone.substract(this.data.last.position);

        const vLDirection = direction.length,
              directionNormalized = direction.divide(vLDirection, vLDirection);

        if (this.settings.callbacks.swipe && this.time <= this.settings.timeTreshold.swipe) {
            const originalStart = this.getAbsolutePosition(this.data.position.start);
            const originalEnd = this.getAbsolutePosition(this.data.position.end);
            if (originalEnd.distance(originalStart) >= this.settings.distanceTreshold.swipe) {
                this.data.directions = this.getSwipeDirections(directionNormalized);
                this.eventCallback(this.settings.callbacks.swipe, this.dataClone);
            }
        }

        if (this.settings.callbacks.flick && (this.timeToLastMove <= this.settings.timeTreshold.flick)) {
            const distance = this.data.last.position.distance(this.data.position.end);
            this.data.distance = distance;
            const direction = this.data.last.position.clone.substract(this.data.position.end);
            this.data.directions = [direction.x, direction.y];
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
    handleMultitouchEnd(e) {
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
    pinchBalance() {
        if (this.data.multitouch) {
            this.data.pinched = true;
            setTimeout((function() {
                this.data.pinched = false;
                this.data.last.distance = null;
            }).bind(this), this.settings.pinchBalanceTime);
        }
        return this;
    }

    /**
     * calculates the speed with specified distance and time
     * @param  {number} distance - the specified distance
     * @param  {number} time - the specified time elapsed
     * @return {number} the calculated speed
     */
    calculateSpeed(distance, time) {
        return (distance / (time || 0.00001)) * 100;
    }

    /**
     * Returns an array of strings, representing the directions
     * @param  {Point} direction - the specified direction in pixel
     * @return {string[]} returns an array representing the directions as strings
     */
    getSwipeDirections(direction) {
        return [(direction.x < 0) ? "left" : (direction.x > 0) ? "right" : "none", (direction.y < 0) ? "up" : (direction.y > 0) ? "down" : "none"];
    }

    /**
     * Helper for setting a timeout for events
     * @param {Function} callback - function to be called
     * @param {number} timeout - time in milliseconds
     * @param {Object[]} args - array of arguments
     * @param {Boolean} holdTimeout - if true, a different variable will be used
     * @return {Interact} Returns this instance
     */
    setTimeoutForEvent(callback, timeout, args, holdTimeout) {
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
    eventCallback(callback, args) {
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
    getRelativePosition(e) {
        const clientBounds = this.container.getBoundingClientRect(),
            pos = new Point(e.clientX, e.clientY),
            bounds = new Point(clientBounds.left, clientBounds.top);
        return pos.substract(bounds).divide(clientBounds.width, clientBounds.height);
    }

    /**
     * get the absolute position of clientX and clientY
     * @param  {Object} e - event object
     * @return {Point} calculated absolute position
     */
    getAbsolutePosition(point) {
        const clientBounds = this.container.getBoundingClientRect();
        return point.mult(clientBounds.width, clientBounds.height);
    }

    /**
     * get scroll direction from event
     * @param  {Object} event - event object
     * @return {string[]} an array with scroll directions
     */
    getScrollDirection(event) {
        const axis = parseInt(event.axis, 10);
        const direction = [];

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

    /**
     * checks if direction is down
     * @param  {number} axis - what axis is used
     * @param  {Object} event - Vanilla JS event
     * @return {Boolean} Whether or not direction is down
     */
    isDownDirection(axis, event) {
        return event.deltaY > 0 || (!event.deltaY && event.wheelDeltaY < 0) || ((axis === 2) && (event.detail > 0)) || (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) < 0);
    }

    /**
     * checks if direction is up
     * @param  {number} axis - what axis is used
     * @param  {Object} event - Vanilla JS event
     * @return {Boolean} Whether or not direction is up
     */
    isUpDirection(axis, event) {
        return event.deltaY < 0 || (!event.deltaY && event.wheelDeltaY > 0) || (axis === 2 && event.detail < 0) || (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) > 0);
    }

    /**
     * checks if direction is right
     * @param  {number} axis - what axis is used
     * @param  {Object} event - Vanilla JS event
     * @return {Boolean} Whether or not direction is right
     */
    isRightDirection(axis, event) {
        return event.deltaX > 0 || (!event.deltaX && event.wheelDeltaX > 0) || (axis === 1 && event.detail > 0);
    }

    /**
     * checks if direction is left
     * @param  {number} axis - what axis is used
     * @param  {Object} event - Vanilla JS event
     * @return {Boolean} Whether or not direction is left
     */
    isLeftDirection(axis, event) {
        return event.deltaX < 0 || (!event.deltaX && event.wheelDeltaX < 0) || (axis === 1 && event.detail < 0);
    }

    /**
     * Get event helper, applies jQuery-event-fix too
     * @param  {Object} e - event object
     * @return {Object} new fixed and optimized event
     */
    getEvent(e) {
        jQuery.event.fix(e);
        if (e.originalEvent.touches && e.originalEvent.touches.length === 0) {
            return e.originalEvent.changedTouches || e.originalEvent;
        }
        return e.originalEvent.touches || e.originalEvent.changedTouches || e.originalEvent;
    }
}