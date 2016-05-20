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
    /**
     * loads an image and calls callback on success
     * @function
     * @memberof module:Helper
     * @param {Helper~loadImageCallback} cb - callback-function on success
     * @return {Helper} Helper object for chaining
     */
    loadImage(path, cb) {
        const img = new Image();
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
    getFile(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
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
    forEach(a, cb) {
        for (const i in a) {
            if (a[i] && typeof cb === "function") cb(a[i], i);
        }
        return this;
    },
    /**
     * formula for quadratic ease out
     * @function
     * @memberof module:Helper
     * @param  {number} t - current time
     * @param  {Point} b - start value
     * @param  {Point} c - total difference to start
     * @param  {number} d - duration
     * @return {number} quadratic value at specific time
     */
    easeOutQuadratic(t, b, c, d) {
	    t /= d;
        return c.clone.multiply(-1 * t * (t-2)).add(b);
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
