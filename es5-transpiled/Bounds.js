(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './LatLng.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./LatLng.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.LatLng);
        global.Bounds = mod.exports;
    }
})(this, function(exports, _LatLng) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Bounds = undefined;

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

    var Bounds = exports.Bounds = function() {
        _createClass(Bounds, [{
            key: 'width',


            /**
             * get width of boundaries
             * @return {number} distance between east and west boundary
             */
            get: function get() {
                return Math.abs(this.se.lng - this.nw.lng);
            }

            /**
             * get height of boundaries
             * @return {number} distance between north and south boundary
             */

        }, {
            key: 'height',
            get: function get() {
                return Math.abs(this.se.lat - this.nw.lat);
            }

            /**
<<<<<<< HEAD
             * @constructor
=======
             * Constructor
>>>>>>> cef61a4e7f38825fcdfe66914b46cc3a03472a68
             * @param  {number} northWest = new LatLng() - representation of northWest boundary
             * @param  {number} southEast = new LatLng() - representation of southEast boundary
             * @return {Bounds} instance of Bounds for chaining
             */

        }]);

        function Bounds() {
            var northWest = arguments.length <= 0 || arguments[0] === undefined ? new _LatLng.LatLng() : arguments[0];
            var southEast = arguments.length <= 1 || arguments[1] === undefined ? new _LatLng.LatLng() : arguments[1];

            _classCallCheck(this, Bounds);

            if (northWest.lat < southEast.lat || northWest.lng > southEast.lng) throw new Error(northWest + ' needs to be top-right corner and ' + southEast + ' bottom-left');
            this.nw = northWest;
            this.se = southEast;
            return this;
        }

        return Bounds;
    }();
});
