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
    /**
     * @author Michael Duve <mduve@designmail.net>
     * @file Helper for general purposes
     * @copyright Michael Duve 2016
     * @module Helper
     */
    var Helper = exports.Helper = {
        /**
         * request json-data from given file and calls callback on success
         * @function
         * @memberof module:Helper
         * @param  {string} filename - path to file
         * @param  {Helper~requestJSONCallback} callback - function called when data is loaded successfully
         * @return {Helper} Helper object for chaining
         */

        requestJSON: function requestJSON(filename, callback) {
            Helper.getFile(filename, function(jsonFileData) {
                if (callback) callback(JSON.parse(jsonFileData));
            });
            return this;
        },
        show: function show(elem) {
            elem.style.display = "";
        },
        hide: function hide(elem) {
            elem.style.display = "none";
        },
        css: function css(elem, _css) {
            for (var property in _css) {
                elem.style[property] = _css[property];
            }
        },

        /**
         * clamps a value to specified min and max
         * @function
         * @memberof module:Helper
         * @param  {number} v = 0 - specified value to clamp
         * @param  {number} min = v - minimum value to clamp to
         * @param  {number} max = v - maximum value to clamp to
         * @return {number} clamped value
         */
        clamp: function clamp() {
            var v = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var min = arguments.length <= 1 || arguments[1] === undefined ? v : arguments[1];
            var max = arguments.length <= 2 || arguments[2] === undefined ? v : arguments[2];

            return Math.min(Math.max(v, min), max);
        },

        /**
         * loads an image and calls callback on success
         * @function
         * @memberof module:Helper
         * @param {Helper~loadImageCallback} cb - callback-function on success
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
         * request data from given file and calls callback on success
         * @function
         * @memberof module:Helper
         * @param  {string} url - path to file
         * @param  {Helper~getFileCallback} callback - function called when data is loaded successfully
         * @return {Helper} Helper object for chaining
         */
        getFile: function getFile(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        if (callback) callback(xhr.responseText);
                    } else {
                        throw new Error("The JSON submitted seems not valid", xhr);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
            return this;
        },

        /**
         * for each helper
         * @function
         * @memberof module:Helper
         * @param  {Object[]} a - array to iterate over each value
         * @param  {Helper~forEachCallback} cb - callback for each object
         * @return {Helper} Helper object for chaining
         */
        forEach: function forEach(a, cb) {
            for (var i in a) {
                if (a[i] && typeof cb === "function") cb(a[i], i);
            }
            return this;
        },

        /**
         * formula for linear easing
         * @function
         * @memberof module:Helper
         * @param  {number} t - current time
         * @param  {Point} b - start value
         * @param  {Point} c - total difference to start
         * @param  {number} d - duration
         * @return {number} linear value at specific time
         */
        linearEase: function linearEase(t, b, c, d) {
            return c.clone.multiply(t).divide(d).add(b);
        },

        /**
         * convert degree to radian
         * @function
         * @memberof module:Helper
         * @param {number} degrees - specified degrees
         * @return {number} converted radian
         */
        toRadians: function toRadians(degrees) {
            return degrees * Math.PI / 180;
        },
        /**
         * checks if mouse is possible
         * @function
         * @memberof module:Helper
         * @return {Boolean} if true, mouse is possible
         */
        isMouse: function isMouse() {
            return 'onmousedown' in window;
        },

        /**
         * checks if touch is possible
         * @function
         * @memberof module:Helper
         * @return {Boolean} if true, touch is possible
         */
        isTouch: function isTouch() {
            return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        },

        /**
         * checks if IE is used
         * @function
         * @memberof module:Helper
         * @return {Boolean} if true, IE is used
         */
        isIE: function isIE() {
            return navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        },

        /**
         * gets cross-browser scroll-event
         * @function
         * @memberof module:Helper
         * @return {string} name of scroll event
         */
        scrollEvent: function scrollEvent() {
            return "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
        }
    };
});
