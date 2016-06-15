/**
 * @author Michael Duve <mduve@designmail.net>
 * @file Helper for general purposes
 * @copyright Michael Duve 2016
 * @module Helper
 */
export var Helper = {
    /**
     * request json-data from given file and calls callback on success
     * @function
     * @memberof module:Helper
     * @param  {string} filename - path to file
     * @param  {Helper~requestJSONCallback} callback - function called when data is loaded successfully
     * @return {Helper} Helper object for chaining
     */
    requestJSON(filename, callback) {
        Helper.getFile(filename, (jsonFileData) => {
            if (callback) callback(JSON.parse(jsonFileData));
        });
        return this;
    },
    find(elementString, element = null) {
        return (element||document).querySelector(elementString);
    },
    findAll(elementString, element = null) {
        return (element||document).querySelectorAll(elementString);
    },
    show(elem) {
        elem.style.display = "";
    },
    hide(elem) {
        elem.style.display = "none";
    },
    css(elem, css) {
        for (const property in css) {
            elem.style[property] = css[property];
        }
    },
    addListener(el, s, fn) {
        s.split(" ").forEach(e => el.addEventListener(e, fn, false));
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
    clamp(v = 0, min = v, max = v) {
        return Math.min(Math.max(v, min), max);
    },
    /**
     * loads an image and calls callback on success
     * @function
     * @memberof module:Helper
     * @param {Helper~loadImageCallback} cb - callback-function on success
     * @return {Helper} Helper object for chaining
     */
    loadImage(path, cb) {
        const img = new Image();
        img.onload = () => {
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
    getFile(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200 && callback) callback(xhr.responseText);
                else throw new Error("The JSON submitted seems not valid", xhr);
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
    forEach(a, cb) {
        for (const i in a) {
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
    linearEase(t, b, c, d) {
        return c.clone.multiply(t).divide(d).add(b);
    },
    /**
     * convert degree to radian
     * @function
     * @memberof module:Helper
     * @param {number} degrees - specified degrees
     * @return {number} converted radian
     */
    toRadians: degrees => degrees * Math.PI / 180,
    /**
     * checks if mouse is possible
     * @function
     * @memberof module:Helper
     * @return {Boolean} if true, mouse is possible
     */
    isMouse: () => ('onmousedown' in window),

    /**
     * checks if touch is possible
     * @function
     * @memberof module:Helper
     * @return {Boolean} if true, touch is possible
     */
    isTouch: () => (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)),

    /**
     * checks if IE is used
     * @function
     * @memberof module:Helper
     * @return {Boolean} if true, IE is used
     */
    isIE: () => ((navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)),

    /**
     * gets cross-browser scroll-event
     * @function
     * @memberof module:Helper
     * @return {string} name of scroll event
     */
    scrollEvent: () => "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll"
};
