"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var $ = require('jquery');

var Helper = exports.Helper = {
    /**
     * request json-data from given file and calls callback on success
     * @param  {string} filename - path to file
     * @param  {Function} callback - function called when data is loaded successfully
     */
    requestJSON: function requestJSON(filename, callback) {
        "use strict";

        $.ajax({
            type: "GET",
            url: filename,
            dataType: "json",
            success: function success(data, status, request) {
                callback(data);
            },
            error: function error(response) {
                if (response.status === 200) {
                    throw new Error("The JSON submitted seems not valid");
                }
                console.error("Error requesting file: ", response);
            }
        });
    }
};
