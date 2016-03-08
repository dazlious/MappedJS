(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './Rectangle.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./Rectangle.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.Rectangle);
        global.View = mod.exports;
    }
})(this, function(exports, _jquery, _Rectangle2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.View = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

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

    var View = exports.View = function(_Rectangle) {
        _inherits(View, _Rectangle);

        /**
         * Constructor
         * @param  {number} x=0 - x-position of specified view
         * @param  {number} y=0 - y-position of specified view
         * @param  {number} width=0 - width of specified view
         * @param  {number} height=0 - height of specified view
         * @param  {Rectangle} bounds = new Rectangle() - bounding box of currentView
         * @return {View} new instance of View
         */

        function View(_ref) {
            var _ret;

            var x = _ref.x;
            var y = _ref.y;
            var width = _ref.width;
            var height = _ref.height;
            var _ref$bounds = _ref.bounds;
            var bounds = _ref$bounds === undefined ? new _Rectangle2.Rectangle() : _ref$bounds;

            _classCallCheck(this, View);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(View).call(this, x, y, width, height));

            _this.bounds = bounds;
            return _ret = _this, _possibleConstructorReturn(_this, _ret);
        }

        /**
         * representation of a Rectangle as String
         * @return {String} representation of this Rectangle
         */


        _createClass(View, [{
            key: 'toString',
            value: function toString() {
                return '(' + this.x + ',' + this.y + ',' + this.width + ',' + this.height + ',(' + this.bounds + '))';
            }
        }]);

        return View;
    }(_Rectangle2.Rectangle);
});
