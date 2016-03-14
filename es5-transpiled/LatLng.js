(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Point.js', './Rectangle.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Point.js'), require('./Rectangle.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Point, global.Rectangle);
        global.LatLng = mod.exports;
    }
})(this, function(exports, _Point, _Rectangle) {
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

        /**
         * Constructor
         * @param  {number} lat = 0 - representation of latitude
         * @param  {number} lng = 0 - representation of longitude
         * @param  {Boolean} isDistance = false - if LatLng should be checked against bounds
         * @return {LatLng} new instance of LatLng
         */

        function LatLng() {
            var lat = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var lng = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var isDistance = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            _classCallCheck(this, LatLng);

            if (!isDistance && (lat > 90 || lat < -90 || lng > 180 || lng < -180)) {
                throw new Error('latitude(' + lat + ') is greater/smaller than +/-90 or longitude(' + lng + ') is greater/smaller than +/-180');
            }
            this.lat = lat;
            this.lng = lng;
            return this;
        }

        /**
         * substract specified coord from this coordinate
         * @param  {LatLng} coord - specified coordinate to substract from this coord
         * @return {LatLng} the new calculated LatLng
         */


        _createClass(LatLng, [{
            key: 'sub',
            value: function sub(coord) {
                return new LatLng(this.lat - coord.lat, this.lng - coord.lng);
            }

            /**
             * substract specified coord from this coordinate
             * @param  {LatLng} coord - specified coordinate to substract from this coord
             * @return {LatLng} the new calculated LatLng
             */

        }, {
            key: 'difference',
            value: function difference(coord) {
                return new LatLng(this.lat - coord.lat, this.lng - coord.lng, true);
            }

            /**
             * add specified coord to this coordinate
             * @param  {LatLng} coord - specified coordinate to add to this coord
             * @return {LatLng} the new calculated LatLng
             */

        }, {
            key: 'add',
            value: function add(coord) {
                return new LatLng(this.lat + coord.lat, this.lng + coord.lng);
            }

            /**
             * converts Latlng to a Point
             * @return {Point} Returns a Point representing LatLng in Pixels
             */

        }, {
            key: 'toPoint',
            value: function toPoint(bounds, rect) {
                var relativePosition = bounds.nw.difference(this),
                    factorX = rect.width / bounds.width,
                    factorY = rect.height / bounds.height;
                return new _Point.Point(Math.abs(relativePosition.lng * factorX), Math.abs(relativePosition.lat * factorY));
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
});
