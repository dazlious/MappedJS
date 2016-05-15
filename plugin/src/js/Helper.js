export var Helper = {
    /**
     * request json-data from given file and calls callback on success
     * @param  {string} filename - path to file
     * @param  {Function} callback - function called when data is loaded successfully
     * @return {Helper} Helper object for chaining
     */
    requestJSON(filename, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
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
    loadImage(path, cb) {
        const img = new Image();
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
    forEach(a, fn) {
        for (const i in a) {
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
    easeOutQuadratic(t, b, c, d) {
	    t /= d;
        return c.clone.multiply(-1 * t * (t-2)).add(b);
    },
    /**
     * convert degree to radian
     * @param {number} degrees - specified degrees
     * @return {number} converted radian
     */
    toRadians: degrees => degrees * Math.PI / 180,
    /**
     * checks if mouse is possible
     * @return {Boolean} if true, mouse is possible
     */
    isMouse: () => ('onmousedown' in window),

    /**
     * checks if touch is possible
     * @return {Boolean} if true, touch is possible
     */
    isTouch: () => (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)),

    /**
     * checks if IE is used
     * @return {Boolean} if true, IE is used
     */
    isIE: () => ((navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)),

    /**
     * gets cross-browser scroll-event
     * @return {string} name of scroll event
     */
    scrollEvent: () => "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll"
};
