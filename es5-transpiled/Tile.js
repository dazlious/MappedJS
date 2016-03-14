/*jshint -W067*/
(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './State.js', './Rectangle.js', './Publisher.js', './Helper.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./State.js'), require('./Rectangle.js'), require('./Publisher.js'), require('./Helper.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.State, global.Rectangle, global.Publisher, global.Helper);
        global.Tile = mod.exports;
    }
})(this, function(exports, _jquery, _State, _Rectangle2, _Publisher, _Helper) {
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

    /**
     * Singleton instance of Publisher
     */
    var PUBLISHER = new /*jshint -W067*/ _Publisher.Publisher();

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
     * Name of event fired, when tile is loaded
     * @type {String}
     */
    var EVENT_TILE_LOADED = "tile-loaded";

    /**
     * Name of event fired, when tile is not found on loading
     * @type {String}
     */
    var EVENT_TILE_FAILED = "tile-failed";

    var Tile = exports.Tile = function(_Rectangle) {
        _inherits(Tile, _Rectangle);

        _createClass(Tile, [{
            key: 'Publisher',


            /**
             * Return the Publisher
             */
            get: function get() {
                return PUBLISHER;
            }

            /**
             * Constructor
             * @param  {string} path=null - path to image
             * @param  {number} x=0 - position x of tile
             * @param  {number} y=0 - position y of tile
             * @param  {number} w=0 - tile width
             * @param  {number} h=0 - tile height
             * @return {Tile} instance of Tile
             */

        }]);

        function Tile() {
            /*jshint -W067*/
            var _ret;

            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            /*jshint -W067*/
            var path = _ref.path;
            /*jshint -W067*/
            var _ref$x = _ref.x;
            /*jshint -W067*/
            var x = _ref$x === undefined ? 0 : _ref$x;
            /*jshint -W067*/
            var _ref$y = _ref.y;
            /*jshint -W067*/
            var y = _ref$y === undefined ? 0 : _ref$y;
            /*jshint -W067*/
            var _ref$w = _ref.w;
            /*jshint -W067*/
            var w = _ref$w === undefined ? 0 : _ref$w;
            /*jshint -W067*/
            var _ref$h = _ref.h;
            /*jshint -W067*/
            var h = _ref$h === undefined ? 0 : _ref$h;
            /*jshint -W067*/
            _classCallCheck(this, Tile);

            /*jshint -W067*/
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this, x, y, w, h));

            /*jshint -W067*/
            _this.state = new /*jshint -W067*/ _State.State(STATES);
            if (!path || typeof path !== "string" || path.length === 0) {
                throw new TypeError( /*jshint -W067*/ 'Path ' + path + ' needs to be of type string and should not be empty');
            }
            /*jshint -W067*/
            _this.path = path;
            return ( /*jshint -W067*/ _ret = _this, _possibleConstructorReturn(_this, _ret));
        }

        /**
         * initializes tile and starts loading image
         * @return {Tile} instance of Tile
         */


        _createClass(Tile, [{
            key: 'initialize',
            value: function initialize() {
                this.state.next();
                /*jshint -W067*/
                _Helper.Helper.loadImage(this.path, function(img) {
                    this.img = img;
                    this.state.next();
                    PUBLISHER.publish(EVENT_TILE_LOADED, this);
                }.bind(this));

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
                return tile instanceof Tile ? /*jshint -W067*/ _get(Object.getPrototypeOf(Tile.prototype), 'equals', this).call(this, tile) && this.path === tile.path : false;
            }
        }]);

        return Tile;
    }(_Rectangle2.Rectangle);
});
