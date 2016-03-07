import $ from 'jquery';

export var Helper = {

    /**
     * request json-data from given file and calls callback on success
     * @param  {string} filename - path to file
     * @param  {Function} callback - function called when data is loaded successfully
     */
    requestJSON: function(filename, callback) {
        "use strict";
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
    }

};
