(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.Helper = mod.exports;
    }
})(this, function(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Helper = exports.Helper = {
        /**
         * request json-data from given file and calls callback on success
         * @param  {string} filename - path to file
         * @param  {Function} callback - function called when data is loaded successfully
         * @return {Helper} Helper object for chaining
         */

        requestJSON: function requestJSON(filename, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        if (callback) callback(JSON.parse(xhr.responseText));
                    } else {
                        throw new Error("The JSON submitted seems not valid", xhr);
                    }
                }
            };
            xhr.open("GET", filename, true);
            xhr.send();
            return this;
        },

        /**
         * loads an image and calls callback on success
         * @param {Function} cb - callback-function on success
         * @return {Helper} Helper object for chaining
         */
        loadImage: function loadImage(path, cb) {
            var img = new Image();
            img.onload = function() {
                if (cb && typeof cb === "function") cb(img);
            };
            img.src = path;
            return this;
        },

        /**
         * for each helper
         * @param  {Object[]} a - array to iterate over each value
         * @param  {Function} fn - callback for each object
         * @return {Helper} Helper object for chaining
         */
        forEach: function forEach(a, fn) {
            for (var i in a) {
                if (a[i] && typeof fn === "function") fn(a[i], i);
            }
            return this;
        },

        /**
         * formula for quadratic ease out
         * @param  {number} t - current time
         * @param  {Point} b - start value
         * @param  {Point} c - total difference to start
         * @param  {number} d - duration
         * @return {number} quadratic value at specific time
         */
        easeOutQuadratic: function easeOutQuadratic(t, b, c, d) {
            t /= d;
            return c.clone.multiply(-1 * t * (t - 2)).add(b);
        },

        /**
         * convert degree to radian
         * @param {number} degrees - specified degrees
         * @return {number} converted radian
         */
        toRadians: function toRadians(degrees) {
            return degrees * Math.PI / 180;
        },
        /**
         * checks if mouse is possible
         * @return {Boolean} if true, mouse is possible
         */
        isMouse: function isMouse() {
            return 'onmousedown' in window;
        },

        /**
         * checks if touch is possible
         * @return {Boolean} if true, touch is possible
         */
        isTouch: function isTouch() {
            return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        },

        /**
         * checks if IE is used
         * @return {Boolean} if true, IE is used
         */
        isIE: function isIE() {
            return navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        },

        /**
         * gets cross-browser scroll-event
         * @return {string} name of scroll event
         */
        scrollEvent: function scrollEvent() {
            return "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
        }
    };
});
