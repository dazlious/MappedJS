import $ from 'jquery';
import {Publisher} from './Publisher.js';

export class Interact {

    get isIETouch() {
        return ((navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    get isTouch() {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    get isMouse() {
        return ('onmousedown' in window);
    }

    get scrollEventName() {
        return "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
    }

    constructor(settings = {}) {
        this.settings = {
            container: ".gesturizer",
            timing: {
                tap: 200,
                hold: 500,
                swipe: 300,
                flick: 25,
                pinch: 50
            },
            cb: {
                tap: false,
                tapHold: false,
                doubletap: false,
                hold: false,
                pan: false,
                swipe: false,
                flick: false,
                zoom: false,
                wheel: false,
                pinch: false
            }
        };
        $.extend(true, this.settings, settings || {});
        return this;
    }

    getEvent(e) {
        $.event.fix(e);
        if (e.originalEvent.touches && e.originalEvent.touches.length === 0) {
            return e.originalEvent.changedTouches || e.originalEvent;
        }
        return e.originalEvent.touches || e.originalEvent.changedTouches || e.originalEvent;
    }

}
