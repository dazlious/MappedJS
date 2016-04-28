import $ from 'jQuery';
import {Point} from './Point.js';

export var Helper = {

    /**
     * request json-data from given file and calls callback on success
     * @param  {string} filename - path to file
     * @param  {Function} callback - function called when data is loaded successfully
     * @return {Helper} Helper object for chaining
     */
    requestJSON: function(filename, callback) {
        $.ajax({
            type: "GET",
            url: filename,
            dataType: "json",
            success: function(data) {
                return callback(data);
            },
            error: function(response) {
                if (response.status === 200) {
                    throw new Error("The JSON submitted seems not valid");
                }
                console.error("Error requesting file: ", response);
            }
        });
        return this;
    },
    /**
     * loads an image and calls callback on success
     * @param {Function} cb - callback-function on success
     * @return {Helper} Helper object for chaining
     */
    loadImage: function(path, cb) {
        const img = new Image();
        img.onload = function() {
            if (cb && typeof cb === "function") {
                cb(img);
            }
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
    forEach: function(a, fn) {
        for (const i in a) {
            if (a[i] && typeof fn === "function") {
                fn(a[i], i);
            }
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
    easeOutQuadratic: function (t, b, c, d) {
	    t /= d;
        return c.clone.multiply(-1 * t * (t-2)).add(b);
    },

    /**
     * convert degree to radian
     * @param {number} degrees - specified degrees
     * @return {number} converted radian
     */
    toRadians: degrees => degrees * Math.PI / 180


};
