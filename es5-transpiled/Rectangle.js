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
             * clones a rectangle
             * @return {Rectangle} duplicated rectangle
             */

        }, {
            key: 'clone',
            get: function get() {
                return Rectangle.createFromRectangle(this);
            }

            /**
             * Constructor
             * @param  {number} x=0 - x-position of specified rectangle
             * @param  {number} y=0 - y-position of specified rectangle
             * @param  {number} width=0 - width of specified rectangle
             * @param  {number} height=0 - height of specified rectangle
             * @return {Rectangle} instance of Rectangle
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
         * @param  {Rectangle} rect = new Rectangle() - the specified rectangle to check against
         * @return {Boolean} true if containment is entirely
         */


        _createClass(Rectangle, [{
            key: 'intersects',
            value: function intersects() {
                var rect = arguments.length <= 0 || arguments[0] === undefined ? new Rectangle() : arguments[0];

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
             * Sets the center of this Rectangle to specified point
             * @param  {Point} point = new Point() - specified point to set center of rectangle to
             * @return {Rectangle} instance of Rectangle
             */

        }, {
            key: 'setCenter',
            value: function setCenter() {
                var point = arguments.length <= 0 || arguments[0] === undefined ? new _Point2.Point() : arguments[0];

                var difference = point.substract(this.center);
                this.translate(difference.x, difference.y);
                return this;
            }

            /**
             * Sets the x-center of this Rectangle to specified x
             * @param  {number} x = 0 - specified x coordinate to set x center of rectangle to
             * @return {Rectangle} instance of Rectangle
             */

        }, {
            key: 'setCenterX',
            value: function setCenterX() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                var difference = x - this.center.x;
                this.translate(difference, 0);
                return this;
            }

            /**
             * Sets the y-center of this Rectangle to specified y
             * @param  {number} y = 0 - specified y coordinate to set y center of rectangle to
             * @return {Rectangle} instance of Rectangle
             */

        }, {
            key: 'setCenterY',
            value: function setCenterY() {
                var y = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                var difference = y - this.center.y;
                this.translate(0, difference);
                return this;
            }

            /**
             * Checks whether Rectangle entirely contains the Point
             * @param  {Point} point = new Point() - the specified point to check against
             * @return {Boolean} true if containment is entirely
             */

        }, {
            key: 'containsPoint',
            value: function containsPoint() {
                var point = arguments.length <= 0 || arguments[0] === undefined ? new _Point2.Point() : arguments[0];

                return point instanceof _Point2.Point ? point.x >= this.left && point.y >= this.top && point.x <= this.right && point.y <= this.bottom : false;
            }

            /**
             * Checks whether Rectangle entirely contains the Rectangle
             * @param  {Rectangle} rect = new Rectangle() - the specified rectangle to check against
             * @return {Boolean} true if containment is entirely
             */

        }, {
            key: 'containsRect',
            value: function containsRect() {
                var rect = arguments.length <= 0 || arguments[0] === undefined ? new Rectangle() : arguments[0];

                return rect instanceof Rectangle ? rect.left >= this.left && rect.top >= this.top && rect.right <= this.right && rect.bottom <= this.bottom : false;
            }

            /**
             * distorts rectangle by factor
             * @param  {number} factor = 1 - the specified factor of distortion
             * @return {Rectangle} a new instance of Rectangle
             */

        }, {
            key: 'getDistortedRect',
            value: function getDistortedRect() {
                var factor = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

                return new Rectangle(this.x, this.y, this.width, this.height).scaleX(factor);
            }

            /**
             * redistorts rectangle by factor
             * @param  {number} factor = 1- the specified factor of distortion
             * @return {Rectangle} a new instance of Rectangle
             */

        }, {
            key: 'getNormalRect',
            value: function getNormalRect() {
                var factor = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

                return new Rectangle(this.x, this.y, this.width, this.height).scaleX(1 / factor);
            }

            /**
             * scale x and width of rectangle
             * @param  {number} x = 1 - factor to be applied to scale
             * @return {Rectangle} scaled Rectangle
             */

        }, {
            key: 'scaleX',
            value: function scaleX() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

                this.x *= x;
                this.width *= x;
                return this;
            }

            /**
             * scale y and height of rectangle
             * @param  {number} y = 1- factor to be applied to scale
             * @return {Rectangle} new scaled Rectangle
             */

        }, {
            key: 'scaleY',
            value: function scaleY() {
                var y = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

                this.y *= y;
                this.height *= y;
                return this;
            }

            /**
             * scale x and y for width and height of rectangle
             * @param  {number} x = 1 - factor to be applied to scale
             * @param  {number} y = x - factor to be applied to scale
             * @return {Rectangle} new scaled Rectangle
             */

        }, {
            key: 'scale',
            value: function scale() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

                this.scaleX(x);
                this.scaleY(y);
                return this;
            }

            /**
             * moves a rectangle by specified coords
             * @param  {number} x = 0 - specified x to be added to x position
             * @param  {number} y = x - specified y to be added to y position
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'translate',
            value: function translate() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

                _get(Object.getPrototypeOf(Rectangle.prototype), 'translate', this).call(this, x, y);
                return this;
            }

            /**
             * transforms a rectangle by specified coords
             * @param  {number} x = 0 - specified x to be added to x position
             * @param  {number} y = x - specified y to be added to y position
             * @param  {number} width = 0 - specified width to be added to this width
             * @param  {number} height = 0 - specified height to be added to this height
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'transform',
            value: function transform() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];
                var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
                var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

                this.translate(x, y);
                this.width += width;
                this.height += height;
                return this;
            }

            /**
             * changes the position a rectangle by specified coords
             * @param  {number} x = 0 - the new x position
             * @param  {number} y = 0 - he new y position
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'position',
            value: function position() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

                _get(Object.getPrototypeOf(Rectangle.prototype), 'position', this).call(this, x, y);
                return this;
            }

            /**
             * changes the size of a rectangle by specified params
             * @param  {number} x = 0- the new x position
             * @param  {number} y = x - the new y position
             * @param  {number} width = 0 - the new width
             * @param  {number} height = 0 - the new width
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'size',
            value: function size() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];
                var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
                var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

                this.position(x, y);
                this.width = width;
                this.height = height;
                return this;
            }

            /**
             * changes the size of a rectangle by specified params
             * @param  {number} width = 0 - the new width
             * @param  {number} height = width - the new width
             * @return {Rectangle} Returns the altered rectangle
             */

        }, {
            key: 'setSize',
            value: function setSize() {
                var width = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var height = arguments.length <= 1 || arguments[1] === undefined ? width : arguments[1];

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

    /**
     * Creates a Rectangle from specified Rectangle
     * @param  {Rectangle} rect - specified Rectangle
     * @return {Rectangle} the point specified
     */
    Rectangle.createFromRectangle = function(rect) {
        return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    };
});
