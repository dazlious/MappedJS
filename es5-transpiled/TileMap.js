(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './LatLng.js', './Point.js', './Bounds.js', './Rectangle.js', './Marker.js', './View.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./LatLng.js'), require('./Point.js'), require('./Bounds.js'), require('./Rectangle.js'), require('./Marker.js'), require('./View.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.LatLng, global.Point, global.Bounds, global.Rectangle, global.Marker, global.View);
        global.TileMap = mod.exports;
    }
})(this, function(exports, _jquery, _LatLng, _Point, _Bounds, _Rectangle, _Marker, _View) {
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
            this.markerData = tilesData[TileMap.MARKER_DATA_NAME];
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
                this.initializeCanvas();
                this.view = new _View.View({
                    viewport: new _Rectangle.Rectangle(this.left, this.top, this.width, this.height),
                    mapView: new _Rectangle.Rectangle(0, 0, mapDimensions.width, mapDimensions.height),
                    bounds: new _Bounds.Bounds(new _LatLng.LatLng(bounds.northWest[0], bounds.northWest[1]), new _LatLng.LatLng(bounds.southEast[0], bounds.southEast[1])),
                    center: new _LatLng.LatLng(center.lat, center.lng),
                    data: this.getCurrentLevelData(),
                    markerData: this.markerData,
                    $container: this.$container,
                    context: this.canvasContext
                });
                this.resizeCanvas();
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
             * clears canvas
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'clearCanvas',
            value: function clearCanvas() {
                this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
                return this;
            }

            /**
             * complete clear and draw of all visible tiles
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'redraw',
            value: function redraw() {
                this.clearCanvas();
                this.view.draw();
                return this;
            }

            /**
             * Handles resizing of TileMap
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'resize',
            value: function resize() {
                this.resizeCanvas();
                this.resizeView();
                this.view.draw();
                return this;
            }

            /**
             * resizes the canvas sizes
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'resizeCanvas',
            value: function resizeCanvas() {
                this.canvasContext.canvas.width = this.width;
                this.canvasContext.canvas.height = this.height;
                return this;
            }

            /**
             * Handles resizing of view
             * @return {TileMap} instance of TileMap for chaining
             */

        }, {
            key: 'resizeView',
            value: function resizeView() {
                var oldViewport = this.view.viewport.clone;
                this.view.viewport.size(this.left, this.top, this.width, this.height);
                var difference = this.view.viewport.center.substract(oldViewport.center);
                this.view.mapView.translate(difference.x, difference.y);
                return this;
            }
        }]);

        return TileMap;
    }();

    /**
     * name of image data in data.json
     * @type {String}
     */
    TileMap.IMG_DATA_NAME = "img_data";

    /**
     * name of marker data in data.json
     * @type {String}
     */
    TileMap.MARKER_DATA_NAME = "marker";
});
