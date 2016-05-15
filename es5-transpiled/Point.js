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
        _createClass(Point, [{
            key: "length",


            /**
             * length of a point
             * @return {number} length of a point
             */
            get: function get() {
                return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
            }

            /**
             * gets a clone of this point
             * @return {Point} new instance equals this point
             */

        }, {
            key: "clone",
            get: function get() {
                return Point.createFromPoint(this);
            }

            /**
             * gets absolute Point
             * @return {Point} returns Point with absolute values
             */

        }, {
            key: "abs",
            get: function get() {
                return new Point(Math.abs(this.x), Math.abs(this.y));
            }

            /**
             * @constructor
             * @param  {number} x = 0 - representation of x coordinate
             * @param  {number} y = 0 - representation of y coordinate
             * @return {Point} instance of Point for chaining
             */

        }]);

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
         * @param  {Point} point = new Point() - the point to substract from this
         * @return {Point} instance of Point for chaining
         */


        _createClass(Point, [{
            key: "substract",
            value: function substract() {
                var point = arguments.length <= 0 || arguments[0] === undefined ? new Point() : arguments[0];

                this.x -= point.x;
                this.y -= point.y;
                return this;
            }

            /**
             * adds 2 points
             * @param  {Point} point = new Point() - the point to add to this
             * @return {Point} instance of Point for chaining
             */

        }, {
            key: "add",
            value: function add() {
                var point = arguments.length <= 0 || arguments[0] === undefined ? new Point() : arguments[0];

                this.x += point.x;
                this.y += point.y;
                return this;
            }

            /**
             * multiplicates a point with a given x and y
             * @param  {number} x = 1 - factor to multiplicate x with
             * @param  {number} y = x - factor to multiplicate y with
             * @return {Point} instance of Point for chaining
             */

        }, {
            key: "multiply",
            value: function multiply() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

                this.x *= x;
                this.y *= y;
                return this;
            }

            /**
             * divide a point with a given x and y
             * @param  {number} x = 1 - factor to divide x with
             * @param  {number} y = x - factor to divide y with
             * @return {Point} instance of Point for chaining
             */

        }, {
            key: "divide",
            value: function divide() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

                this.x /= x;
                this.y /= y;
                return this;
            }

            /**
             * check if points are equal
             * @param  {Point} point - the point to check against this
             * @return {Boolean} is true, if x and y are the same
             */

        }, {
            key: "equals",
            value: function equals(point) {
                return this.x === point.x && this.y === point.y;
            }

            /**
             * Returns the distance from this Point to a specified Point
             * @param  {Point} point = new Point() - the specified point to be measured against this Point
             * @return {Point} the distance between this Point and specified point
             */

        }, {
            key: "distance",
            value: function distance() {
                var point = arguments.length <= 0 || arguments[0] === undefined ? new Point() : arguments[0];

                return this.clone.substract(point).length;
            }

            /**
             * translates a point by x and y
             * @param  {number} x = 0 - value to move x
             * @param  {number} y = x - value to move y
             * @return {Point} instance of Point for chaining
             */

        }, {
            key: "translate",
            value: function translate() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

                this.x += x;
                this.y += y;
                return this;
            }

            /**
             * positions a point by x and y
             * @param  {number} x = 0 - value to position x
             * @param  {number} y = x - value to position y
             * @return {Point} instance of Point for chaining
             */

        }, {
            key: "position",
            value: function position() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

                this.x = x;
                this.y = y;
                return this;
            }

            /**
             * translates a Point to an array
             * @return {Array} Returns Point as Array(x, y)
             */

        }, {
            key: "toArray",
            value: function toArray() {
                return [this.x, this.y];
            }
        }]);

        return Point;
    }();

    /**
     * Creates a Point from specified point
     * @param  {Point} point - specified point
     * @return {Point} the point specified
     */
    Point.createFromPoint = function(point) {
        return new Point(point.x, point.y);
    };
});
