import $ from 'jquery';

export var Helper = {

    /**
     * request json-data from given file and calls callback on success
     * @param  {string} filename - path to file
     * @param  {Function} callback - function called when data is loaded successfully
     * @return {Helper} Helper
     */
    requestJSON: function(filename, callback) {
        $.ajax({
            type: "GET",
            url: filename,
            dataType: "json",
            success: function(data, status, request) {
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
     * @return {Helper} Helper
     */
    loadImage: function(path, cb) {
        let img = new Image();
        img.onload = function() {
            if (cb && typeof cb === "function") {
                cb(img);
            }
        };
        img.src = path;
        return this;
    },
    /**
     * convert degree to radian
     * @param {number} degrees - specified degrees
     * @return {number} converted radian
     */
    toRadians: degrees => degrees * Math.PI / 180


};
