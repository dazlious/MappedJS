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
        global.LatLng = mod.exports;
    }
})(this, function(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var LatLng = exports.LatLng = function() {

        /**
         * Constructor
         * @param  {number} lat = 0 - representation of latitude
         * @param  {number} lng = 0 - representation of longitude
         * @return {LatLng} new instance of LatLng
         */

        function LatLng() {
            var lat = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var lng = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            _classCallCheck(this, LatLng);

            this.lat = lat;
            this.lng = lng;
            return this;
        }

        /**
         * representation of a LatLng as String
         * @return {String} representation of this LatLng
         */


        _createClass(LatLng, [{
            key: "toString",
            value: function toString() {
                return "(" + this.lat + "," + this.lng + ")";
            }
        }]);

        return LatLng;
    }();
});
