/*global PointerEvent,MSPointerEvent*/

import $ from 'jquery';
import {Point} from './Point.js';

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

        this.isDown = false;
        this.hasMoved = false;
        this.multitouch = false;
        this.lastAction = null;
        this.start = null;
        this.move = null;
        this.end = null;
        this.time = null;
        this.timeStart = null;
        this.timeEnd = null;
        this.timeout = null;
        this.holdTimeout = null;
        this.wasPinched = false;
        this.pointerIDs = {};

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

    /**
     * handles cross-browser and -device scroll
     * @param  {Object} event - jQuery-Event-Object
     * @return {Boolean} always returns false
     */
    scrollHandler(event) {
        event = event || window.event;

        if (this.settings.stopPropagation) {
            event.stopPropagation();
        }
        if (this.settings.preventDefault) {
            event.preventDefault();
        }

        let e = this.getEvent(event) || event.originalEvent,
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

    /**
     * handles cross-browser and -device start-event
     * @param  {Object} event - jQuery-Event-Object
     * @return {Boolean} always returns false
     */
    startHandler(event) {

        if (this.settings.stopPropagation) {
            event.stopPropagation();
        }
        if (this.settings.preventDefault) {
            event.preventDefault();
        }

        if (event.button && event.button !== 0) {
            return false;
        }

        let e = this.getEvent(event);

        this.target = event.target;
        this.isDown = true;
        this.timeStart = event.timeStamp;

        if (this.timeout) {
            this.timeout = clearTimeout(this.timeout);
        }

        // mouse is used
        if (e instanceof MouseEvent) {
            this.start = this.getRelativePosition(e);
        } // if is pointerEvent
        if (this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent)) {
            this.pointerIDs[e.pointerId] = e;
            if (Object.keys(this.pointerIDs).length <= 1) {
                this.start = this.getRelativePosition(e);
                this.multitouch = false;
            } else {
                this.multitouch = true;
                let pointerPos = [];
                for (let pointer in this.pointerIDs) {
                    if (this.pointerIDs.hasOwnProperty(pointer)) {
                        pointerPos.push(this.pointerIDs[pointer]);
                    }
                }
                let pointerPos1 = this.getRelativePosition(pointerPos[0]),
                    pointerPos2 = this.getRelativePosition(pointerPos[1]);

                this.current.distance = pointerPos1.distance(pointerPos2);
                this.start = pointerPos1.add(pointerPos2).divide(2, 2);
            }
        } // touch is used
        else {
            // singletouch startet
            if (e.length <= 1) {
                this.start = this.getRelativePosition(e[0]);
            } // multitouch started
            else if (e.length === 2) {
                this.multitouch = true;
                let pos1 = this.getRelativePosition(e[0]),
                    pos2 = this.getRelativePosition(e[1]);
                this.current.distance = pos1.distance(pos2);
                this.start = pos1.add(pos2).divide(2, 2);
            }
        }
        switch (this.lastAction) {
            case null:
                this.lastAction = "tap";
                if (this.settings.autoFireHold) {
                    this.setTimeoutForEvent(this.settings.callbacks.hold, this.settings.autoFireHold, {
                        target: this.target,
                        positions: {
                            start: this.start
                        }
                    }, true);
                }
                break;
            case "tap":
                this.lastAction = "doubletap";
                if (this.settings.autoFireHold) {
                    this.setTimeoutForEvent(this.settings.callbacks.tapHold, this.settings.autoFireHold, {
                        target: this.target,
                        positions: {
                            start: this.start
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

        if (this.settings.stopPropagation) {
            event.stopPropagation();
        }
        if (this.settings.preventDefault) {
            event.preventDefault();
        }

        // if touchstart event was not fired
        if (!this.isDown || this.wasPinched) {
            return false;
        }

        let e = this.getEvent(event),
            currentPos,
            currentDist,
            lastPos = (this.move) ? this.move : this.start,
            lastTime = (this.time) ? this.time : this.timeStart,
            currentTime = event.timeStamp;

        if (this.isIE && (this.getRelativePosition(e).equals(lastPos) || this.getRelativePosition(e).equals(this.start))) {
            return false;
        } else if (!this.isIE && this.isTouch && this.getRelativePosition(e[0]).equals(lastPos)) {
            return false;
        }

        if (this.timeout) {
            this.timeout = clearTimeout(this.timeout);
        }
        if (this.holdTimeout) {
            this.holdTimeout = clearTimeout(this.holdTimeout);
        }

        this.hasMoved = true;
        this.lastAction = "move";

        this.time = event.timeStamp;

        if (e instanceof MouseEvent) {
            currentPos = this.getRelativePosition(e);
            currentDist = lastPos.distance(currentPos);
        } // if is pointerEvent
        if (this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent)) {
            this.pointerIDs[e.pointerId] = e;
            if (Object.keys(this.pointerIDs).length <= 1) {
                currentPos = this.getRelativePosition(e);
                currentDist = lastPos.distance(currentPos);
                this.multitouch = false;
            } else {
                this.multitouch = true;
                let pointerPos = [];
                for (let pointer in this.pointerIDs) {
                    if (this.pointerIDs.hasOwnProperty(pointer)) {
                        pointerPos.push(this.pointerIDs[pointer]);
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

        if (this.multitouch) {
            this.current.difference = currentDist - this.current.distance;
            this.current.distance = currentDist;
            this.oldMove = this.move;
            this.move = currentPos;
            if (this.settings.callbacks.pinch && this.current.difference !== 0) {
                this.eventCallback(this.settings.callbacks.pinch, {
                    target: event.target,
                    positions: {
                        start: this.start,
                        current: this.move,
                        last: this.oldMove
                    },
                    distance: {
                        current: currentDist,
                        differenceToLast: this.current.difference
                    }
                });
            }
            if (this.settings.callbacks.zoom && this.current.difference !== 0) {
                this.eventCallback(this.settings.callbacks.zoom, {
                    target: event.target,
                    positions: {
                        start: this.start,
                        current: this.move,
                        last: this.oldMove
                    },
                    direction: (this.current.difference < 0) ? "out" : (this.current.difference > 0) ? "in" : "none",
                    factor: this.current.difference
                });
            }
        } else {
            this.speed = this.calculateSpeed(currentDist, timeDiff);

            this.oldMove = this.move;
            this.move = currentPos;

            this.eventCallback(this.settings.callbacks.pan, {
                target: this.target,
                positions: {
                    start: this.start,
                    current: this.move,
                    last: lastPos
                },
                timeElapsed: {
                    sinceLast: timeDiff,
                    sinceStart: currentTime - this.timeStart
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

        if (this.settings.stopPropagation) {
            event.stopPropagation();
        }
        if (this.settings.preventDefault) {
            event.preventDefault();
        }

        let e = this.getEvent(event);

        this.timeEnd = event.timeStamp;

        let timeDiff = this.timeEnd - this.timeStart,
            timeDiffToLastMove = this.timeEnd - this.time;

        if (this.holdTimeout) {
            this.holdTimeout = clearTimeout(this.holdTimeout);
        }

        if (e instanceof MouseEvent) {
            this.end = this.getRelativePosition(e);
        } // if is pointerEvent
        if (this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent)) {
            this.end = this.getRelativePosition(e);
            delete this.pointerIDs[e.pointerId];
        } // touch is used
        else {
            // singletouch ended
            if (e.length <= 1) {
                this.end = this.getRelativePosition(e[0]);
            }
        }

        // called only when not moved
        if (!this.hasMoved && this.isDown && !this.multitouch) {
            switch (this.lastAction) {
                case "tap":
                    if (timeDiff < this.settings.timeTreshold.hold) {
                        this.setTimeoutForEvent(this.settings.callbacks.tap, this.settings.timeTreshold.tap, {
                            target: this.target,
                            positions: {
                                start: this.start
                            }
                        });
                    } else {
                        this.eventCallback(this.settings.callbacks.hold, {
                            target: this.target,
                            positions: {
                                start: this.start
                            }
                        });
                    }
                    break;
                case "doubletap":
                    if (timeDiff < this.settings.timeTreshold.hold) {
                        this.setTimeoutForEvent(this.settings.callbacks.doubletap, this.settings.timeTreshold.tap, {
                            target: this.target,
                            positions: {
                                start: this.start,
                                end: this.end
                            }
                        });
                    } else {
                        this.eventCallback(this.settings.callbacks.tapHold, {
                            target: this.target,
                            positions: {
                                start: this.start,
                                end: this.end
                            }
                        });
                    }
                    break;
                default:
                    this.lastAction = null;
            }
        }
        // if was moved
        else if (this.hasMoved && this.isDown && !this.multitouch) {

            if (this.settings.callbacks.swipe || this.settings.callbacks.flick) {

                let direction = (this.settings.callbacks.swipe) ? this.end.substract(this.start) : this.end.substract(this.oldMove);

                let vLDirection = direction.length,
                    directionNormalized = direction.divide(vLDirection, vLDirection),
                    distance = this.end.distance(this.start),
                    speed = this.calculateSpeed(distance, timeDiff);

                if (this.settings.callbacks.swipe && timeDiff <= this.settings.timeTreshold.swipe) {
                    let originalStart = this.getAbsolutePosition(this.start),
                        originalEnd = this.getAbsolutePosition(this.end);
                    if (originalEnd.distance(originalStart) >= this.settings.distanceTreshold.swipe) {
                        let directions = this.getSwipeDirections(directionNormalized);
                        this.eventCallback(this.settings.callbacks.swipe, {
                            positions: {
                                start: this.start,
                                end: this.end
                            },
                            speed: speed,
                            directions: {
                                named: directions,
                                detailed: directionNormalized
                            }
                        });
                    }
                }

                if (this.settings.callbacks.flick && (timeDiffToLastMove <= this.settings.timeTreshold.flick)) {
                    this.eventCallback(this.settings.callbacks.flick, {
                        speed: speed,
                        direction: directionNormalized,
                        positions: {
                            start: this.start,
                            end: this.end
                        }
                    });
                }
            }

            switch (this.lastAction) {
                default: this.lastAction = null;
            }
        }

        if (this.multitouch) {
            this.wasPinched = true;
            setTimeout((function() {
                this.wasPinched = false;
            }).bind(this), this.settings.pinchBalanceTime);
        }

        this.multitouch = false;
        this.isDown = false;
        this.hasMoved = false;

        // if is pointerEvent
        if (this.isIE && (e instanceof MSPointerEvent || e instanceof PointerEvent)) {
            if (Object.keys(this.pointerIDs).length > 1) {
                this.multitouch = true;
            } else if (Object.keys(this.pointerIDs).length > 0) {
                this.isDown = true;
            }
        } // touch is used
        else {
            if (e.length > 1) {
                this.multitouch = true;
            } else if (e.length > 0) {
                this.isDown = true;
            }
            this.move = null;
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
            this.holdTimeout = setTimeout(this.eventCallback.bind(this, callback, args), timeout);
        } else {
            this.timeout = setTimeout(this.eventCallback.bind(this, callback, args), timeout);
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
        this.lastAction = null;
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
        }
        // up
        else if (event.deltaY < 0 || (!event.deltaY && event.wheelDeltaY > 0) || (axis === 2 && event.detail < 0) || (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) > 0)) {
            direction.push("up");
        }

        // right
        if (event.deltaX > 0 || (!event.deltaX && event.wheelDeltaX > 0) || (axis === 1 && event.detail > 0)) {
            direction.push("right");
        }

        // left
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