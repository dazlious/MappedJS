(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Helper.js', './StateHandler.js', './Rectangle.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Helper.js'), require('./StateHandler.js'), require('./Rectangle.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Helper, global.StateHandler, global.Rectangle);
        global.Tile = mod.exports;
    }
})(this, function(exports, _Helper, _StateHandler, _Rectangle2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Tile = undefined;

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
     * States of a tile
     * @type {Array}
     */
    var STATES = [{
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

    /**
     * @author Michael Duve <mduve@designmail.net>
     * @file Represents a part of the background map
     * @extends Rectangle
     * @copyright Michael Duve 2016
     */

    var Tile = exports.Tile = function(_Rectangle) {
        _inherits(Tile, _Rectangle);

        /**
         * Constructor
         * @param  {string} path = null - path to image
         * @param  {number} x = 0 - position x of tile
         * @param  {number} y = 0 - position y of tile
         * @param  {number} w = 0 - tile width
         * @param  {number} h = 0 - tile height
         * @param  {View} _instance = null - instance of parent View
         * @return {Tile} instance of Tile for chaining
         */

        function Tile() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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

            var _ret;

            var _instance = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            _classCallCheck(this, Tile);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this, x, y, w, h));

            if (!path || typeof path !== "string" || path.length === 0) throw new TypeError('Path ' + path + ' needs to be of type string and should not be empty');
            else if (!_instance) throw new Error('Tile needs an instance');

            _this.state = new _StateHandler.StateHandler(STATES);
            _this.instance = _instance;
            _this.context = _this.instance.context;
            _this.path = path;

            return _ret = _this, _possibleConstructorReturn(_this, _ret);
        }

        /**
         * initializes tile and starts loading image
         * @return {Tile} instance of Tile for chaining
         */


        _createClass(Tile, [{
            key: 'initialize',
            value: function initialize() {
                var _this2 = this;

                this.state.next();
                _Helper.Helper.loadImage(this.path, function(img) {
                    _this2.img = img;
                    _this2.state.next();
                    _this2.draw();
                });
                return this;
            }

            /**
             * draws image data of tile on context
             * @return {Tile} instance of Tile for chaining
             */

        }, {
            key: 'draw',
            value: function draw() {
                var distortedTile = this.clone.scale(this.instance.zoomFactor).translate(this.instance.currentView.x, this.instance.currentView.y).scaleX(this.instance.distortionFactor).translate(this.instance.offsetToCenter, 0);
                if (this.state.current.value >= 2) {
                    if (!this.context) {
                        console.error("context not specified", this);
                        return false;
                    }
                    this.state.next();
                    this.context.drawImage(this.img, distortedTile.x, distortedTile.y, distortedTile.width, distortedTile.height);
                } else if (this.state.current.value === 0) {
                    this.initialize();
                }
                return this;
            }

            /**
             * check if tiles are equal
             * @param  {Tile} tile - the specified tile to check against this
             * @return {Boolean} is true, if x, y, width and height and path are the same
             */

        }, {
            key: 'equals',
            value: function equals(tile) {
                return tile instanceof Tile ? _get(Object.getPrototypeOf(Tile.prototype), 'equals', this).call(this, tile) && this.path === tile.path : false;
            }
        }]);

        return Tile;
    }(_Rectangle2.Rectangle);
});
