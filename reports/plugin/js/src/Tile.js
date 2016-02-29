'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var $ = require('jquery');
var State = require('./State').State;
var Publisher = require("./Publisher.js").Publisher;

/**
 * Singleton instance of Publisher
 */
var PUBLISHER = new Publisher();

var Tile = exports.Tile = function() {

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

        this.state = new State(Tile.STATES);

        if (!path || typeof path !== "string" || path.length === 0) {
            throw new Error('Path {path} needs to be of type string and should not be empty');
        }
        this.path = path;

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.initialize();

        return this;
    }

    /**
     * initializes tile and starts loading image
     * @return {Tile} instance of Tile
     */


    _createClass(Tile, [{
        key: 'initialize',
        value: function initialize() {
            this.state.next();

            var _this = this;
            this.loadImage(function(img) {
                _this.img = img;
                _this.state.next();
                PUBLISHER.publish("tile-loaded", _this);
            });
            return this;
        }

        /**
         * image loader, asynchronous
         * @param  {Function} cb - callback after loading image
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
}();

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
