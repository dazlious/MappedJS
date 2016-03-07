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
        global.Point = mod.exports;
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

    var Point = exports.Point = function() {

        /**
         * Constructor
         * @param  {number} x = 0 - representation of x coordinate
         * @param  {number} y = 0 - representation of y coordinate
         * @return {Point} new instance of point
         */

        function Point() {
            var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            _classCallCheck(this, Point);

            this.x = x;
            this.y = y;
            return this;
        }

        /**
         * substracts 2 points
         * @param  {Point} point - the point to substract from this
         * @return {Point} difference between this point and parameter point
         */


        _createClass(Point, [{
            key: "sub",
            value: function sub(point) {
                return new Point(this.x - point.x, this.y - point.y);
            }

            /**
             * adds 2 points
             * @param  {Point} point - the point to add to this
             * @return {Point} addition of this point and parameter point
             */

        }, {
            key: "add",
            value: function add(point) {
                return new Point(this.x + point.x, this.y + point.y);
            }
        }]);

        return Point;
    }();

    Point.createFromPoint = function(point) {
        return new Point(point.x, point.y);
    };
});
