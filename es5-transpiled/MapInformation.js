(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Events.js', './Helper.js', './Publisher.js', './LatLng.js', './Bounds.js', './Point.js', './Rectangle.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Events.js'), require('./Helper.js'), require('./Publisher.js'), require('./LatLng.js'), require('./Bounds.js'), require('./Point.js'), require('./Rectangle.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Events, global.Helper, global.Publisher, global.LatLng, global.Bounds, global.Point, global.Rectangle);
        global.MapInformation = mod.exports;
    }
})(this, function(exports, _Events, _Helper, _Publisher, _LatLng, _Bounds, _Point, _Rectangle) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MapInformation = undefined;

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

    var MapInformation = exports.MapInformation = function() {
        _createClass(MapInformation, [{
            key: 'offsetToCenter',


            /**
             * Returns the current distorted viewport
             */
            get: function get() {
                return (this.data.viewport.width - this.data.viewport.width * this.data.distortionFactor) / 2;
            }

            /**
             * how many pixels per lat and lng
             * @return {Point} pixels per lat/lng
             */

        }, {
            key: 'pixelPerLatLng',
            get: function get() {
                return new _Point.Point(this.data.view.width / this.data.bounds.width, this.data.view.height / this.data.bounds.height);
            }

            /**
             * @constructor
             * @return {MapInformation} singleton instance of MapInformation for chaining
             */

        }]);

        function MapInformation() {
            var id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            _classCallCheck(this, MapInformation);

            if (!MapInformation.instances[id]) {
                this.id = id;
                this.data = {
                    center: new _LatLng.LatLng(),
                    view: new _Rectangle.Rectangle(),
                    viewport: new _Rectangle.Rectangle(),
                    distortionFactor: 1,
                    offsetToCenter: 0,
                    bounds: new _Bounds.Bounds(),
                    zoomFactor: 0,
                    level: 0
                };
                this.data.offsetToCenter = this.offsetToCenter;
                this.eventManager = new _Publisher.Publisher(this.id);
                this.bindEvents();
                MapInformation.instances[id] = this;
            }
            return MapInformation.instances[id];
        }

        _createClass(MapInformation, [{
            key: 'get',
            value: function get() {
                return this.data;
            }
        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                this.eventManager.subscribe(_Events.Events.MapInformation.UPDATE, this.update.bind(this));
            }
        }, {
            key: 'update',
            value: function update() {
                var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var oldData = this.data;
                this.data = Object.assign({}, this.data, obj);
                var centerUpdateDone = !oldData.center.equals(this.data.center) ? this.centerUpdated() : false;
                if (!centerUpdateDone && !oldData.viewport.equals(this.data.viewport)) this.viewportUpdated();
                this.eventManager.publish(_Events.Events.TileMap.DRAW);
            }

            /**
             * converts a Point to LatLng in view
             * @param  {Point} point - specified point to be converted
             * @return {LatLng} presentation of point in lat-lng system
             */

        }, {
            key: 'convertPointToLatLng',
            value: function convertPointToLatLng(point) {
                point.divide(this.pixelPerLatLng.x, this.pixelPerLatLng.y);
                return new _LatLng.LatLng(this.data.bounds.nw.lat - point.y, point.x + this.data.bounds.nw.lng);
            }

            /**
             * converts a LatLng to Point in view
             * @param  {LatLng} latlng - specified latlng to be converted
             * @return {Point} presentation of point in pixel system
             */

        }, {
            key: 'convertLatLngToPoint',
            value: function convertLatLngToPoint(latlng) {
                var relativePosition = this.data.bounds.nw.clone.substract(latlng);
                relativePosition.multiply(this.pixelPerLatLng.y, this.pixelPerLatLng.x);
                return new _Point.Point(relativePosition.lng, relativePosition.lat).abs;
            }
        }, {
            key: 'centerUpdated',
            value: function centerUpdated() {
                this.data.distortionFactor = this.getDistortionFactorForLatitude(this.data.center);
                this.data.offsetToCenter = this.offsetToCenter;
                return true;
            }
        }, {
            key: 'viewUpdated',
            value: function viewUpdated() {
                this.data.offsetToCenter = this.offsetToCenter;
                return true;
            }
        }, {
            key: 'viewportUpdated',
            value: function viewportUpdated() {
                this.data.offsetToCenter = this.offsetToCenter;
                return true;
            }

            /**
             * get distortion factor for specified latitude
             * @param  {LatLng} latlng - lat/lng position
             * @return {number} distortion factor
             */

        }, {
            key: 'getDistortionFactorForLatitude',
            value: function getDistortionFactorForLatitude(latlng) {
                return Math.cos(_Helper.Helper.toRadians(latlng.lat));
            }

            /**
             * destroys singleton instance
             */

        }, {
            key: 'destroy',
            value: function destroy() {
                MapInformation.instances[this.id] = null;
            }
        }]);

        return MapInformation;
    }();

    /**
     * singleton instance wrapper
     * @type {Object}
     */
    MapInformation.instances = {};
});
