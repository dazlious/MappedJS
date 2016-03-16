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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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
                return new _Point2.Point(this.x + this.width / 2, this.y + this.height / 2);
            }

            /**
             * get top-left-position of rectangle
             * @return {Point} top-left point
             */

        }, {
            key: 'topLeft',
            get: function get() {
                return new _Point2.Point(this.x, this.y);
            }

            /**
             * get top-right-position of rectangle
             * @return {Point} top-right point
             */

        }, {
            key: 'topRight',
            get: function get() {
                return new _Point2.Point(this.x + this.width, this.y);
            }

            /**
             * get bottom-left-position of rectangle
             * @return {Point} bottom-left point
             */

        }, {
            key: 'bottomLeft',
            get: function get() {
                return new _Point2.Point(this.x, this.y + this.height);
            }

            /**
             * get bottom-right-position of rectangle
             * @return {Point} bottom-right point
             */

        }, {
            key: 'bottomRight',
            get: function get() {
                return new _Point2.Point(this.x + this.width, this.y + this.height);
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
            var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

            var _ret;

            var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

            _classCallCheck(this, Rectangle);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rectangle).call(this, x, y));

            _this.width = width;
            _this.height = height;
            return _ret = _this, _possibleConstructorReturn(_this, _ret);
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
                return rectOrPoint instanceof Rectangle ? this.containsRect(rectOrPoint) : rectOrPoint instanceof _Point2.Point ? this.containsPoint(rectOrPoint) : false;
            }

            /**
             * Checks whether Rectangle entirely contains the Point
             * @param  {Point} point - the specified point to check against
             * @return {Boolean} true if containment is entirely
             */

        }, {
            key: 'containsPoint',
            value: function containsPoint(point) {
                return point instanceof _Point2.Point ? point.x >= this.left && point.y >= this.top && point.x <= this.right && point.y <= this.bottom : false;
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
                return new Rectangle(this.x, this.y, this.width, this.height).scaleX(factor);
            }

            /**
             * scale x and width of rectangle
             * @param  {number} x - factor to be applied to scale
             * @return {Rectangle} scaled Rectangle
             */

        }, {
            key: 'scaleX',
            value: function scaleX(x) {
                this.x *= x;
                this.width *= x;
                return this;
            }

            /**
             * scale y and height of rectangle
             * @param  {number} y - factor to be applied to scale
             * @return {Rectangle} new scaled Rectangle
             */

        }, {
            key: 'scaleY',
            value: function scaleY(y) {
                this.y *= y;
                this.height *= y;
                return this;
            }

            /**
             * scale x and y for width and height of rectangle
             * @param  {number} x - factor to be applied to scale
             * @param  {number} y = x - factor to be applied to scale
             * @return {Rectangle} new scaled Rectangle
             */

        }, {
            key: 'scale',
            value: function scale(x) {
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

                this.x *= x;
                this.y *= y;
                this.width *= x;
                this.height *= y;
                return this;
            }

            /**
             * moves a rectangle by specified coords
             * @param  {number} x - specified x to be added to x position
             * @param  {number} y - specified y to be added to y position
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'translate',
            value: function translate(x, y) {
                _get(Object.getPrototypeOf(Rectangle.prototype), 'translate', this).call(this, x, y);
                return this;
            }

            /**
             * transforms a rectangle by specified coords
             * @param  {number} x - specified x to be added to x position
             * @param  {number} y - specified y to be added to y position
             * @param  {number} width - specified width to be added to this width
             * @param  {number} height - specified height to be added to this height
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'transform',
            value: function transform(x, y, width, height) {
                this.translate(x, y);
                this.width += width;
                this.height += height;
                return this;
            }

            /**
             * changes the position a rectangle by specified coords
             * @param  {number} x - the new x position
             * @param  {number} y - he new y position
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'position',
            value: function position(x, y) {
                _get(Object.getPrototypeOf(Rectangle.prototype), 'position', this).call(this, x, y);
                return this;
            }

            /**
             * changes the size of a rectangle by specified params
             * @param  {number} x - the new x position
             * @param  {number} y - the new y position
             * @param  {number} width - the new width
             * @param  {number} height - the new width
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'size',
            value: function size(x, y, width, height) {
                this.position(x, y);
                this.width = width;
                this.height = height;
                return this;
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
        }]);

        return Rectangle;
    }(_Point2.Point);
});
