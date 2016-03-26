(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Point.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Point.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Point);
        global.LatLng = mod.exports;
    }
})(this, function(exports, _Point) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LatLng = undefined;

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
        _createClass(LatLng, [{
            key: 'length',


            /**
             * length of a latlng
             * @return {number} length of a latlng
             */
            get: function get() {
                return Math.sqrt(Math.pow(this.lat, 2) + Math.pow(this.lng, 2));
            }

            /**
             * gets a clone of this latlng
             * @return {LatLng} new instance equals this latlng
             */

        }, {
            key: 'clone',
            get: function get() {
                return LatLng.createFromLatLng(this);
            }

            /**
             * Constructor
             * @param  {number} lat = 0 - representation of latitude
             * @param  {number} lng = 0 - representation of longitude
             * @param  {Boolean} isDistance = false - if LatLng should be checked against bounds
             * @return {LatLng} new instance of LatLng
             */

        }]);

        function LatLng() {
            var lat = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var lng = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var isDistance = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            _classCallCheck(this, LatLng);

            this.lat = lat % 90;
            this.lat = this.lat === -0 ? 0 : this.lat;
            this.lng = lng % 180;
            this.lng = this.lng === -0 ? 0 : this.lng;
            return this;
        }

        /**
         * substract specified coord from this coordinate
         * @param  {LatLng} coord - specified coordinate to substract from this coord
         * @return {LatLng} the new calculated LatLng
         */


        _createClass(LatLng, [{
            key: 'substract',
            value: function substract(coord) {
                this.lat -= coord.lat;
                this.lng -= coord.lng;
                return this;
            }

            /**
             * add specified coord to this coordinate
             * @param  {LatLng} coord - specified coordinate to add to this coord
             * @return {LatLng} the new calculated LatLng
             */

        }, {
            key: 'add',
            value: function add(coord) {
                this.lat += coord.lat;
                this.lng += coord.lng;
                return this;
            }
        }, {
            key: 'divide',
            value: function divide(factorLat) {
                var factorLng = arguments.length <= 1 || arguments[1] === undefined ? factorLat : arguments[1];

                this.lat /= factorLat;
                this.lng /= factorLng;
                return this;
            }
        }, {
            key: 'multiply',
            value: function multiply(factorLat) {
                var factorLng = arguments.length <= 1 || arguments[1] === undefined ? factorLat : arguments[1];

                this.lat *= factorLat;
                this.lng *= factorLng;
                return this;
            }

            /**
             * checks if specified coord equals this coord
             * @param  {LatLng} coord - specified coord to check against
             * @return {Boolean} Returns if specified coord equals this coord
             */

        }, {
            key: 'equals',
            value: function equals(coord) {
                return this.lat === coord.lat && this.lng === coord.lng;
            }
        }]);

        return LatLng;
    }();

    /**
     * Creates a LatLng from specified LatLng
     * @param  {LatLng} LatLng - specified LatLng
     * @return {LatLng} the LatLng specified
     */
    LatLng.createFromLatLng = function(latlng) {
        return new LatLng(latlng.lat, latlng.lng);
    };
});
