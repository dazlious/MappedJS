/*global PointerEvent,MSPointerEvent*/

import $ from 'jquery';
import {
    Point
} from './Point.js';

export class Interact {

    /**
     * checks if mouse is possible
     * @return {Boolean} if true, mouse is possible
     */
    get isMouse() {
        return ('onmousedown' in window);
    }

    /**
     * checks if touch is possible
     * @return {Boolean} if true, touch is possible
     */
    get isTouch() {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    /**
     * checks if IE is used
     * @return {Boolean} if true, IE is used
     */
    get isIE() {
        return ((navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    /**
     * gets cross-browser scroll-event
     * @return {string} name of scroll event
     */
    get scrollEvent() {
        return "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
    }

    get timeToLastMove() {
        return this.data.time.end - this.data.time.last;
    }

    get time() {
        return this.data.time.end - this.data.time.start;
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
        this.settings = {
            container: ".interact-container",
            timeTreshold: {
                tap: 200,
                hold: 500,
                swipe: 300,
                flick: 30
            },
            distanceTreshold: {
                swipe: 200
            },
            overwriteViewportSettings: false,
            stopPropagation: true,
            preventDefault: true,
            autoFireHold: false,
            pinchBalanceTime: 50,
            callbacks: {
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
            },
            events: {
                start: {
                    touch: (this.isIE) ? "MSPointerDown pointerdown" : "touchstart",
                    mouse: (this.isIE) ? "MSPointerDown pointerdown" : "mousedown"
                },
                move: {
                    touch: (this.isIE) ? "MSPointerMove pointermove" : "touchmove",
                    mouse: (this.isIE) ? "MSPointerMove pointermove" : "mousemove"
                },
                end: {
                    touch: (this.isIE) ? "MSPointerUp pointerup" : "touchend",
                    mouse: (this.isIE) ? "MSPointerUp pointerup" : "mouseup"
                },
                leave: {
                    touch: (this.isIE) ? "MSPointerLeave pointerleave" : "touchleave",
                    mouse: (this.isIE) ? "MSPointerLeave pointerleave" : "mouseleave"
                },
                scroll: this.scrollEvent
            }
        };

        $.extend(true, this.settings, settings || {});

        this.data = {
            down: false,
            moved: false,
            pinched: false,
            pointerArray: {},
            multitouch: false,
            distance: null,
            difference: null,
            last: {
                position: null,
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

        if (this.settings.overwriteViewportSettings) {
            this.handleViewport(this.settings.overwriteViewportSettings);
        }

        this.init(this.settings.container).bindEvents();

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
        let metaViewInHead = $("meta[name=viewport]").length,
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
        this.container = this.$container[0];
        return this;
    }

    /**
     * binds all needed events
     * @return {Interact} Returns this instance
     */
    bindEvents() {
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

    preHandle(event) {
        if (this.settings.stopPropagation) {
            event.stopPropagation();
        }
        if (this.settings.preventDefault) {
            event.preventDefault();
        }

        this.target = event.target;

        return this.getEvent(event);
    }

    /**
     * handles cross-browser and -device scroll
     * @param  {Object} event - jQuery-Event-Object
     * @return {Boolean} always returns false
     */
    scrollHandler(event) {
        event = event || window.event;

        let e = this.preHandle(event) || event.originalEvent,
            directions = this.getScrollDirection(e),
            position = this.getRelativePosition(e);

        if (this.settings.callbacks.wheel) {
            this.eventCallback(this.settings.callbacks.wheel, {
                target: event.target,
                directions: directions,
                position: position
            });
        }

        if (this.settings.callbacks.zoom && (directions.indexOf("up") > -1 || directions.indexOf("down") > -1)) {
            this.eventCallback(this.settings.callbacks.zoom, {
                target: event.target,
                direction: (directions.indexOf("up") > -1) ? "in" : (directions.indexOf("down") > -1) ? "out" : "none",
                position: position,
                factor: (directions.indexOf("up") > -1) ? 1 : (directions.indexOf("down") > -1) ? -1 : 0
            });
        }

        return false;
    }

    calculateStart(e) {

        let data = {
            multitouch: false,
            distance: 0,
            down: true,
            position: {
                start: new Point()
            },
            time: {
                start: e.timeStamp
            }
        };

        // mouse is used
        if (e instanceof MouseEvent) {
            return $.extend(true, data, this.handleSingletouch(e));
        }

        // if is pointerEvent
        if (this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent)) {
            this.data.pointerArray[e.pointerId] = e;
            if (Object.keys(this.data.pointerArray).length <= 1) {
                return $.extend(true, data, this.handleSingletouch(e));
            } else {
                let pointerPos = [];
                for (let pointer in this.data.pointerArray) {
                    pointerPos.push(this.data.pointerArray[pointer]);
                }
                return this.handleMultitouch(pointerPos);
            }
        } // touch is used
        else {
            // singletouch startet
            if (e.length <= 1) {
                return $.extend(true, data, this.handleSingletouch(e[0]));
            } // multitouch started
            else if (e.length === 2) {
                return this.handleMultitouch(e);
            }
        }
    }

    handleMultitouch(positionsArray) {
        let pos1 = this.getRelativePosition(positionsArray[0]),
            pos2 = this.getRelativePosition(positionsArray[1]);
        return {
            multitouch: true,
            distance: pos1.distance(pos2),
            position: {
                start: pos1.add(pos2).divide(2, 2)
            }
        };
    }

    handleSingletouch(position) {
        return {
            position: {
                start: this.getRelativePosition(position)
            }
        };
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

        let e = this.preHandle(event);

        if (this.data.timeout.default) {
            this.data.timeout.default = clearTimeout(this.data.timeout.default);
        }

        this.data = $.extend(true, this.data, this.calculateStart(e));

        switch (this.data.last.action) {
            case null:
                this.data.last.action = "tap";
                if (this.settings.autoFireHold) {
                    this.setTimeoutForEvent(this.settings.callbacks.hold, this.settings.autoFireHold, {
                        target: this.target,
                        positions: {
                            start: this.data.position.start
                        }
                    }, true);
                }
                break;
            case "tap":
                this.data.last.action = "doubletap";
                if (this.settings.autoFireHold) {
                    this.setTimeoutForEvent(this.settings.callbacks.tapHold, this.settings.autoFireHold, {
                        target: this.target,
                        positions: {
                            start: this.data.position.start
                        }
                    }, true);
                }
                break;
            default:
                break;
        }

        return false;
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

        let e = this.preHandle(event),
            currentPos,
            currentDist,
            lastPos = (this.data.position.move) ? this.data.position.move : this.data.position.start,
            lastTime = (this.data.time.last) ? this.data.time.last : this.data.time.start,
            currentTime = event.timeStamp;

        if (this.isIE && (this.getRelativePosition(e).equals(lastPos) || this.getRelativePosition(e).equals(this.data.position.start))) {
            return false;
        } else if (!this.isIE && this.isTouch && this.getRelativePosition(e[0]).equals(lastPos)) {
            return false;
        }

        if (this.data.timeout.default) {
            this.data.timeout.default = clearTimeout(this.data.timeout.default);
        }
        if (this.data.timeout.hold) {
            this.data.timeout.hold = clearTimeout(this.data.timeout.hold);
        }

        this.data.moved = true;
        this.data.last.action = "move";

        this.data.time.last = event.timeStamp;

        if (e instanceof MouseEvent) {
            currentPos = this.getRelativePosition(e);
            currentDist = lastPos.distance(currentPos);
        } // if is pointerEvent
        if (this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent)) {
            this.data.pointerArray[e.pointerId] = e;
            if (Object.keys(this.data.pointerArray).length <= 1) {
                currentPos = this.getRelativePosition(e);
                currentDist = lastPos.distance(currentPos);
                this.data.multitouch = false;
            } else {
                this.data.multitouch = true;
                let pointerPos = [];
                for (let pointer in this.data.pointerArray) {
                    if (this.data.pointerArray.hasOwnProperty(pointer)) {
                        pointerPos.push(this.data.pointerArray[pointer]);
                    }
                }
                let pointerPos1 = this.getRelativePosition(pointerPos[0]),
                    pointerPos2 = this.getRelativePosition(pointerPos[1]);

                currentDist = pointerPos1.distance(pointerPos2);
                currentPos = pointerPos1.substract(pointerPos2).divide(2, 2);
            }
        } // touch is used
        else {
            // singletouch startet
            if (e.length <= 1) {
                currentPos = this.getRelativePosition(e[0]);
                currentDist = lastPos.distance(currentPos);
            } else if (e.length === 2) {
                let pos1 = this.getRelativePosition(e[0]),
                    pos2 = this.getRelativePosition(e[1]);
                currentDist = pos1.distance(pos2);
                currentPos = pos1.substract(pos2).divide(2, 2);
            }
        }

        let timeDiff = (currentTime - lastTime);

        if (this.data.multitouch) {
            this.data.difference = currentDist - this.data.distance;
            this.data.distance = currentDist;
            this.data.last.position = this.data.position.move;
            this.data.position.move = currentPos;
            if (this.settings.callbacks.pinch && this.data.difference !== 0) {
                this.eventCallback(this.settings.callbacks.pinch, {
                    target: event.target,
                    positions: {
                        start: this.data.position.start,
                        current: this.data.position.move,
                        last: this.data.last.position
                    },
                    distance: {
                        current: currentDist,
                        differenceToLast: this.data.difference
                    }
                });
            }
            if (this.settings.callbacks.zoom && this.data.difference !== 0) {
                this.eventCallback(this.settings.callbacks.zoom, {
                    target: event.target,
                    positions: {
                        start: this.data.position.start,
                        current: this.data.position.move,
                        last: this.data.last.position
                    },
                    direction: (this.data.difference < 0) ? "out" : (this.data.difference > 0) ? "in" : "none",
                    factor: this.data.difference
                });
            }
        } else {
            this.speed = this.calculateSpeed(currentDist, timeDiff);

            this.data.last.position = this.data.position.move;
            this.data.position.move = currentPos;

            this.eventCallback(this.settings.callbacks.pan, {
                target: this.target,
                positions: {
                    start: this.data.position.start,
                    current: this.data.position.move,
                    last: lastPos
                },
                timeElapsed: {
                    sinceLast: timeDiff,
                    sinceStart: currentTime - this.data.time.start
                },
                distanceToLastPoint: currentDist,
                speed: this.speed
            });
        }

        return false;
    }

    /**
     * handles cross-browser and -device end-event
     * @param  {Object} event - jQuery-Event-Object
     * @return {Boolean} always returns false
     */
    endHandler(event) {

        let e = this.preHandle(event);

        this.data.time.end = event.timeStamp;

        if (this.data.timeout.hold) {
            this.data.timeout.hold = clearTimeout(this.data.timeout.hold);
        }

        if (e instanceof MouseEvent) {
            this.data.position.end = this.getRelativePosition(e);
        } // if is pointerEvent
        if (this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent)) {
            this.data.position.end = this.getRelativePosition(e);
            delete this.data.pointerArray[e.pointerId];
        } // touch is used
        else {
            // singletouch ended
            if (e.length <= 1) {
                this.data.position.end = this.getRelativePosition(e[0]);
            }
        }

        // called only when not moved
        if (!this.data.moved && this.data.down && !this.data.multitouch) {
            switch (this.data.last.action) {
                case "tap":
                    if (this.time < this.settings.timeTreshold.hold) {
                        this.setTimeoutForEvent(this.settings.callbacks.tap, this.settings.timeTreshold.tap, {
                            target: this.target,
                            positions: {
                                start: this.data.position.start
                            }
                        });
                    } else {
                        this.eventCallback(this.settings.callbacks.hold, {
                            target: this.target,
                            positions: {
                                start: this.data.position.start
                            }
                        });
                    }
                    break;
                case "doubletap":
                    if (this.time < this.settings.timeTreshold.hold) {
                        this.setTimeoutForEvent(this.settings.callbacks.doubletap, this.settings.timeTreshold.tap, {
                            target: this.target,
                            positions: {
                                start: this.data.position.start,
                                end: this.data.position.end
                            }
                        });
                    } else {
                        this.eventCallback(this.settings.callbacks.tapHold, {
                            target: this.target,
                            positions: {
                                start: this.data.position.start,
                                end: this.data.position.end
                            }
                        });
                    }
                    break;
                default:
                    this.data.last.action = null;
            }
        }
        // if was moved
        else if (this.data.moved && this.data.down && !this.data.multitouch) {

            if (this.settings.callbacks.swipe || this.settings.callbacks.flick) {

                let direction = (this.settings.callbacks.swipe) ? this.data.position.end.substract(this.data.position.start) : this.data.position.end.substract(this.data.last.position);

                let vLDirection = direction.length,
                    directionNormalized = direction.divide(vLDirection, vLDirection),
                    distance = this.data.position.end.distance(this.data.position.start),
                    speed = this.calculateSpeed(distance, this.time);

                if (this.settings.callbacks.swipe && this.time <= this.settings.timeTreshold.swipe) {
                    let originalStart = this.getAbsolutePosition(this.data.position.start),
                        originalEnd = this.getAbsolutePosition(this.data.position.end);
                    if (originalEnd.distance(originalStart) >= this.settings.distanceTreshold.swipe) {
                        let directions = this.getSwipeDirections(directionNormalized);
                        this.eventCallback(this.settings.callbacks.swipe, {
                            positions: {
                                start: this.data.position.start,
                                end: this.data.position.end
                            },
                            speed: speed,
                            directions: {
                                named: directions,
                                detailed: directionNormalized
                            }
                        });
                    }
                }

                if (this.settings.callbacks.flick && (this.timeToLastMove <= this.settings.timeTreshold.flick)) {
                    this.eventCallback(this.settings.callbacks.flick, {
                        speed: speed,
                        direction: directionNormalized,
                        positions: {
                            start: this.data.position.start,
                            end: this.data.position.end
                        }
                    });
                }
            }

            switch (this.data.last.action) {
                default: this.data.last.action = null;
            }
        }

        if (this.data.multitouch) {
            this.data.pinched = true;
            setTimeout((function() {
                this.data.pinched = false;
            }).bind(this), this.settings.pinchBalanceTime);
        }

        this.data.multitouch = false;
        this.data.down = false;
        this.data.moved = false;

        // if is pointerEvent
        if (this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent)) {
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

        return false;
    }

    /**
     * calculates the speed with specified distance and time
     * @param  {number} distance - the specified distance
     * @param  {number} time - the specified time elapsed
     * @return {number} the calculated speed
     */
    calculateSpeed(distance, time) {
        return (distance / (time || 1)) * 100;
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
        let clientBounds = this.container.getBoundingClientRect(),
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
        let clientBounds = this.container.getBoundingClientRect();
        return point.mult(clientBounds.width, clientBounds.height);
    }

    /**
     * get scroll direction from event
     * @param  {Object} event - event object
     * @return {string[]} an array with scroll directions
     */
    getScrollDirection(event) {
        let axis = parseInt(event.axis, 10),
            direction = [];

        // down
        if (event.deltaY > 0 || (!event.deltaY && event.wheelDeltaY < 0) || ((axis === 2) && (event.detail > 0)) || (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) < 0)) {
            direction.push("down");
        } // up
        else if (event.deltaY < 0 || (!event.deltaY && event.wheelDeltaY > 0) || (axis === 2 && event.detail < 0) || (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) > 0)) {
            direction.push("up");
        }

        // right
        if (event.deltaX > 0 || (!event.deltaX && event.wheelDeltaX > 0) || (axis === 1 && event.detail > 0)) {
            direction.push("right");
        } // left
        else if (event.deltaX < 0 || (!event.deltaX && event.wheelDeltaX < 0) || (axis === 1 && event.detail < 0)) {
            direction.push("left");
        }

        return direction;
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
