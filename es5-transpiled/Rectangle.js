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
         * check if rectangles are equal
         * @param  {Rectangle} rectangle - the specified rectangle to check against this
         * @return {Boolean} is true, if x, y, width and height are the same
         */


        _createClass(Rectangle, [{
            key: 'equals',
            value: function equals(rectangle) {
                return this.x === rectangle.x && this.y === rectangle.y && this.width === rectangle.width && this.height === rectangle.height;
            }

            /**
             * representation of a Rectangle as String
             * @return {String} representation of this Rectangle
             */

        }, {
            key: 'toString',
            value: function toString() {
                return '(' + _get(Object.getPrototypeOf(Rectangle.prototype), 'toString', this).call(this) + ',' + this.width + ',' + this.height + ')';
            }
        }]);

        return Rectangle;
    }(_Point2.Point);
});
