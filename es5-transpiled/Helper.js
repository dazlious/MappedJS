(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "jquery"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("jquery"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery);
        global.Helper = mod.exports;
    }
})(this, function(exports, _jquery) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Helper = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Helper = exports.Helper = {

        /**
         * request json-data from given file and calls callback on success
         * @param  {string} filename - path to file
         * @param  {Function} callback - function called when data is loaded successfully
         * @return {Helper} Helper
         */
        requestJSON: function requestJSON(filename, callback) {
            _jquery2.default.ajax({
                type: "GET",
                url: filename,
                dataType: "json",
                success: function success(data, status, request) {
                    return callback(data);
                },
                error: function error(response) {
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
         * @param  {Function} cb - callback-function on success
         * @return {Helper} Helper
         */
        loadImage: function loadImage(path, cb) {
            var img = new Image();
            img.onload = function() {
                if (cb && typeof cb === "function") {
                    cb(img);
                }
            };
            img.src = path;
            return this;
        }

    };
});
