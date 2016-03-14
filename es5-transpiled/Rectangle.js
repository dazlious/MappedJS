/*jshint -W067*/
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
        global.Rectangle = mod.exports;
    }
})(this, function(exports, _Point2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Rectangle = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Rectangle = exports.Rectangle = function(_Point) {
        _inherits(Rectangle, _Point);

        _createClass(Rectangle, [{
            key: 'center',


            /**
             * get center-position of rectangle
             * @return {Point} center point
             */
            get: function get() {
                return new /*jshint -W067*/ _Point2.Point(this.x + this.width / 2, this.y + this.height / 2);
            }

            /**
             * get top-left-position of rectangle
             * @return {Point} top-left point
             */

        }, {
            key: 'topLeft',
            get: function get() {
                return new /*jshint -W067*/ _Point2.Point(this.x, this.y);
            }

            /**
             * get top-right-position of rectangle
             * @return {Point} top-right point
             */

        }, {
            key: 'topRight',
            get: function get() {
                return new /*jshint -W067*/ _Point2.Point(this.x + this.width, this.y);
            }

            /**
             * get bottom-left-position of rectangle
             * @return {Point} bottom-left point
             */

        }, {
            key: 'bottomLeft',
            get: function get() {
                return new /*jshint -W067*/ _Point2.Point(this.x, this.y + this.height);
            }

            /**
             * get bottom-right-position of rectangle
             * @return {Point} bottom-right point
             */

        }, {
            key: 'bottomRight',
            get: function get() {
                return new /*jshint -W067*/ _Point2.Point(this.x + this.width, this.y + this.height);
            }

            /**
             * Returns right position of Rectangle
             * @return {number} right position
             */

        }, {
            key: 'right',
            get: function get() {
                return this.x + this.width;
            }

            /**
             * Returns left position of Rectangle
             * @return {number} left position
             */

        }, {
            key: 'left',
            get: function get() {
                return this.x;
            }

            /**
             * Returns top position of Rectangle
             * @return {number} top position
             */

        }, {
            key: 'top',
            get: function get() {
                return this.y;
            }

            /**
             * Returns bottom position of Rectangle
             * @return {number} bottom position
             */

        }, {
            key: 'bottom',
            get: function get() {
                return this.y + this.height;
            }

            /**
             * Constructor
             * @param  {number} x=0 - x-position of specified rectangle
             * @param  {number} y=0 - y-position of specified rectangle
             * @param  {number} width=0 - width of specified rectangle
             * @param  {number} height=0 - height of specified rectangle
             * @return {Rectangle} new instance of Rectangle
             */

        }]);

        function Rectangle() {
            /*jshint -W067*/
            var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            /*jshint -W067*/
            var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            /*jshint -W067*/
            var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
            /*jshint -W067*/
            var _ret;

            var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            /*jshint -W067*/
            _classCallCheck(this, Rectangle);

            /*jshint -W067*/
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rectangle).call(this, x, y));

            /*jshint -W067*/
            _this.width = width;
            /*jshint -W067*/
            _this.height = height;
            return ( /*jshint -W067*/ _ret = _this, _possibleConstructorReturn(_this, _ret));
        }

        /**
         * Checks whether Rectangle intersects with specified Rectangle
         * @param  {Rectangle} rect - the specified rectangle to check against
         * @return {Boolean} true if containment is entirely
         */


        _createClass(Rectangle, [{
            key: 'intersects',
            value: function intersects(rect) {
                return !(rect.left > this.right || rect.right < this.left || rect.top > this.bottom || rect.bottom < this.top);
            }

            /**
             * Checks whether Rectangle entirely contains the Rectangle or Point
             * @param  {Rectangle|Point} rectOrPoint - the specified point or rectangle to check against
             * @return {Boolean} true if containment is entirely
             */

        }, {
            key: 'contains',
            value: function contains(rectOrPoint) {
                return rectOrPoint instanceof Rectangle ? this.containsRect(rectOrPoint) : rectOrPoint instanceof /*jshint -W067*/ _Point2.Point ? this.containsPoint(rectOrPoint) : false;
            }

            /**
             * Checks whether Rectangle entirely contains the Point
             * @param  {Point} point - the specified point to check against
             * @return {Boolean} true if containment is entirely
             */

        }, {
            key: 'containsPoint',
            value: function containsPoint(point) {
                return point instanceof /*jshint -W067*/ _Point2.Point ? point.x >= this.left && point.y >= this.top && point.x <= this.right && point.y <= this.bottom : false;
            }

            /**
             * Checks whether Rectangle entirely contains the Rectangle
             * @param  {Rectangle} rect - the specified rectangle to check against
             * @return {Boolean} true if containment is entirely
             */

        }, {
            key: 'containsRect',
            value: function containsRect(rect) {
                return rect instanceof Rectangle ? rect.left >= this.left && rect.top >= this.top && rect.right <= this.right && rect.bottom <= this.bottom : false;
            }

            /**
             * distort rectangle by factor
             * @param  {number} factor - the specified factor of distortion
             * @return {Rectangle} a new instance of Rectangle
             */

        }, {
            key: 'getDistortedRect',
            value: function getDistortedRect(factor) {
                return new Rectangle(this.x * factor, this.y, this.width * factor, this.height);
            }

            /**
             * check if rectangles are equal
             * @param  {Rectangle} rectangle - the specified rectangle to check against this
             * @return {Boolean} is true, if x, y, width and height are the same
             */

        }, {
            key: 'equals',
            value: function equals(rectangle) {
                return rectangle instanceof Rectangle ? this.x === rectangle.x && this.y === rectangle.y && this.width === rectangle.width && this.height === rectangle.height : false;
            }

            /**
             * representation of a Rectangle as String
             * @return {String} representation of this Rectangle
             */

        }, {
            key: 'toString',
            value: function toString() {
                return ( /*jshint -W067*/ '(' + this.x + ',' + this.y + ',' + this.width + ',' + this.height + ')');
            }
        }]);

        return Rectangle;
    }(_Point2.Point);
});