(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './LatLng.js', './Bounds.js', './Rectangle.js', './View.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./LatLng.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./View.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.LatLng, global.Bounds, global.Rectangle, global.View);
        global.TileMap = mod.exports;
    }
})(this, function(exports, _jquery, _LatLng, _Bounds, _Rectangle, _View) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TileMap = undefined;

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

    var TileMap = exports.TileMap = function() {
        _createClass(TileMap, [{
            key: 'left',


            /**
             * Returns left offset of container
             * @return {number} - left offset of container
             */
            get: function get() {
                return this.$container.offset().left;
            }

            /**
             * Returns top offset of container
             * @return {number} - top offset of container
             */

        }, {
            key: 'top',
            get: function get() {
                return this.$container.offset().top;
            }

            /**
             * Returns width of container
             * @return {number} - width of container
             */

        }, {
            key: 'width',
            get: function get() {
                return this.$container.innerWidth();
            }

            /**
             * Returns height of container
             * @return {number} - height of container
             */

        }, {
            key: 'height',
            get: function get() {
                return this.$container.innerHeight();
            }

            /** Constructor
             * @param  {Object} container - jQuery-object holding the container
             * @param  {Object} tilesData={} - json object representing data of TileMap
             * @param  {Object} settings={} - json object representing settings of TileMap
             * @return {TileMap} instance of TileMap
             */

        }]);

        function TileMap(_ref) {
            var container = _ref.container;
            var _ref$tilesData = _ref.tilesData;
            var tilesData = _ref$tilesData === undefined ? {} : _ref$tilesData;
            var _ref$settings = _ref.settings;
            var settings = _ref$settings === undefined ? {} : _ref$settings;

            _classCallCheck(this, TileMap);

            if (!container) {
                throw Error("You must define a container to initialize a TileMap");
            }

            this.$container = container;
            this.imgData = tilesData[TileMap.IMG_DATA_NAME];
            this.settings = settings;

            this.initialize(settings.bounds, settings.center, this.getCurrentLevelData().dimensions);

            return this;
        }

        /**
         * initializes the TileMap
         * @return {TileMap} instance of TileMap
         */


        _createClass(TileMap, [{
            key: 'initialize',
            value: function initialize(bounds, center, mapDimensions) {
                this.view = new _View.View({
                    viewport: new _Rectangle.Rectangle(this.left, this.top, this.width, this.height),
                    mapView: new _Rectangle.Rectangle(0, 0, mapDimensions.width, mapDimensions.height),
                    bounds: new _Bounds.Bounds(new _LatLng.LatLng(bounds.northWest[0], bounds.northWest[1]), new _LatLng.LatLng(bounds.southEast[0], bounds.southEast[1])),
                    center: new _LatLng.LatLng(center.lat, center.lng),
                    data: this.getCurrentLevelData(),
                    drawCb: function(img, x, y, w, h) {
                        this.canvasContext.drawImage(img, x, y, w, h);
                    }.bind(this)
                });
                this.initializeCanvas();
                return this;
            }

            /**
             * initializes the canvas, adds to DOM
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'initializeCanvas',
            value: function initializeCanvas() {
                this.$canvas = (0, _jquery2.default)("<canvas class='mjs-canvas' />");
                this.canvas = this.$canvas[0];
                this.$container.append(this.$canvas);
                this.canvasContext = this.canvas.getContext("2d");
                this.resize();
                return this;
            }

            /**
             * gets data of current zoom level
             * @return {Object} data for current level as json
             */

        }, {
            key: 'getCurrentLevelData',
            value: function getCurrentLevelData() {
                return this.imgData["level-" + this.settings.level];
            }

            /**
             * Handles resizing of TileMap
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'resize',
            value: function resize() {
                this.canvasContext.canvas.width = this.width;
                this.canvasContext.canvas.height = this.height;
                this.resizeView();
                return this;
            }

            /**
             * Handles resizing of view
             * @return {TileMap} instance of TileMap
             */

        }, {
            key: 'resizeView',
            value: function resizeView() {
                this.view.viewport.change(this.left, this.top, this.width, this.height);
                this.view.drawVisibleTiles();
                return this;
            }
        }]);

        return TileMap;
    }();

    /**
     * name of imagedata in data.json
     * @type {String}
     */
    TileMap.IMG_DATA_NAME = "img_data";
});
