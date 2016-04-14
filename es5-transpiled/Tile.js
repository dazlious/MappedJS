(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './StateHandler.js', './Rectangle.js', './Publisher.js', './Helper.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./StateHandler.js'), require('./Rectangle.js'), require('./Publisher.js'), require('./Helper.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.StateHandler, global.Rectangle, global.Publisher, global.Helper);
        global.Tile = mod.exports;
    }
})(this, function(exports, _jquery, _StateHandler, _Rectangle2, _Publisher, _Helper) {
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
    var PUBLISHER = new _Publisher.Publisher();

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
     * Name of event fired, when tile is initialized
     * @type {String}
     */
    var EVENT_TILE_INITIALIZED = "tile-initialized";

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
            var _ret;

            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var path = _ref.path;
            var _ref$x = _ref.x;
            var x = _ref$x === undefined ? 0 : _ref$x;
            var _ref$y = _ref.y;
            var y = _ref$y === undefined ? 0 : _ref$y;
            var _ref$w = _ref.w;
            var w = _ref$w === undefined ? 0 : _ref$w;
            var _ref$h = _ref.h;
            var h = _ref$h === undefined ? 0 : _ref$h;
            var _ref$context = _ref.context;
            var context = _ref$context === undefined ? null : _ref$context;

            _classCallCheck(this, Tile);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this, x, y, w, h));

            _this.state = new _StateHandler.StateHandler(STATES);
            if (!path || typeof path !== "string" || path.length === 0) {
                throw new TypeError('Path ' + path + ' needs to be of type string and should not be empty');
            }
            _this.markers = [];
            _this.context = context;
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
                this.state.next();
                PUBLISHER.publish(EVENT_TILE_INITIALIZED, this);
                _Helper.Helper.loadImage(this.path, function(img) {
                    this.img = img;
                    this.state.next();
                    PUBLISHER.publish(EVENT_TILE_LOADED, this);
                }.bind(this));

                return this;
            }

            /**
             * handles draw of a tile in each state
             * @param  {number} x - x-position of tile
             * @param  {number} y - y-position of tile
             * @param  {number} scaleX - scale x of tile
             * @param  {number} offsetX - offset x for centering
             * @param  {object} thumb - img-data of thumbnail
             * @param  {number} thumbScale - thumbnail scale, relative to full image
             * @return {Tile} instance of Tile for chaining
             */

        }, {
            key: 'handleDraw',
            value: function handleDraw(x, y, scaleX, offsetX, thumb, thumbScale) {
                var distortedTile = this.clone.translate(x, y).scaleX(scaleX).translate(offsetX, 0);
                if (this.state.current.value >= 2) {
                    this.state.next();
                    this.draw(this.img, distortedTile);
                } else if (this.state.current.value === 1 && thumb && thumbScale) {
                    var thumbTile = this.clone.scale(thumbScale);
                    this.draw(thumb, thumbTile, distortedTile);
                } else if (this.state.current.value === 0) {
                    this.initialize();
                }
                return this;
            }
        }, {
            key: 'addMarker',
            value: function addMarker(marker) {
                this.markers.push(marker);
            }

            /**
             * draws image data of tile on context
             * @param  {object} img - img-data to draw
             * @param  {Rectangle} source - specified source sizes
             * @param  {Rectangle} destination = null - specified destination sizes
             * @return {Tile} instance of Tile for chaining
             */

        }, {
            key: 'draw',
            value: function draw(img, source) {
                var destination = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

                if (!this.context) {
                    console.error("context not specified", this);
                    return false;
                }
                if (!destination) {
                    this.context.drawImage(img, source.x, source.y, source.width, source.height);
                } else {
                    this.context.drawImage(img, source.x, source.y, source.width, source.height, destination.x, destination.y, destination.width, destination.height);
                }
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