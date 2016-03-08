(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './State.js', './Rectangle.js', './Publisher.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./State.js'), require('./Rectangle.js'), require('./Publisher.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.State, global.Rectangle, global.Publisher);
        global.Tile = mod.exports;
    }
})(this, function(exports, _jquery, _State, _Rectangle2, _Publisher) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Tile = undefined;

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

    /**
     * Singleton instance of Publisher
     */
    var PUBLISHER = new _Publisher.Publisher();

    var Tile = exports.Tile = function(_Rectangle) {
        _inherits(Tile, _Rectangle);

        /**
         * Constructor
         * @param  {string} path=null - path to image
         * @param  {number} x=0 - position x of tile
         * @param  {number} y=0 - position y of tile
         * @param  {number} w=0 - tile width
         * @param  {number} h=0 - tile height
         * @return {Tile} instance of Tile
         */

        function Tile(_ref) {
            var _ret;

            var _ref$path = _ref.path;
            var path = _ref$path === undefined ? null : _ref$path;
            var _ref$x = _ref.x;
            var x = _ref$x === undefined ? 0 : _ref$x;
            var _ref$y = _ref.y;
            var y = _ref$y === undefined ? 0 : _ref$y;
            var _ref$w = _ref.w;
            var w = _ref$w === undefined ? 0 : _ref$w;
            var _ref$h = _ref.h;
            var h = _ref$h === undefined ? 0 : _ref$h;

            _classCallCheck(this, Tile);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this, x, y, w, h));

            _this.state = new _State.State(Tile.STATES);
            if (!path || typeof path !== "string" || path.length === 0) {
                throw new Error('Path {path} needs to be of type string and should not be empty');
            }
            _this.path = path;
            _this.initialize();
            return _ret = _this, _possibleConstructorReturn(_this, _ret);
        }

        /**
         * initializes tile and starts loading image
         * @return {Tile} instance of Tile
         */


        _createClass(Tile, [{
            key: 'initialize',
            value: function initialize() {
                this.state.next();
                this.loadImage(function(img) {
                    this.img = img;
                    this.state.next();
                    PUBLISHER.publish("tile-loaded", this);
                }.bind(this));
                return this;
            }

            /**
             * image loader, asynchronous
             * @param {Function} cb - callback after loading image
             * @return {Tile} instance of Tile
             */

        }, {
            key: 'loadImage',
            value: function loadImage(cb) {
                var img = new Image();
                img.src = this.path;
                img.onload = function() {
                    cb(img);
                };
                return this;
            }
        }]);

        return Tile;
    }(_Rectangle2.Rectangle);

    /**
     * States of a tile
     * @type {Array}
     */
    Tile.STATES = [{
        value: 0,
        description: 'Starting'
    }, {
        value: 1,
        description: 'Initialized'
    }, {
        value: 2,
        description: 'Loaded'
    }, {
        value: 3,
        description: 'Drawn'
    }];
});
