(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Point.js', './LatLng.js', './Bounds.js', './Rectangle.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Point.js'), require('./LatLng.js'), require('./Bounds.js'), require('./Rectangle.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Point, global.LatLng, global.Bounds, global.Rectangle);
        global.View = mod.exports;
    }
})(this, function(exports, _Point, _LatLng, _Bounds, _Rectangle) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.View = undefined;

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

    var View = exports.View = function() {
        _createClass(View, [{
            key: 'getMapOffset',


            /**
             * Returns the offset of the map
             * @param {number} distortion - the current latitude distortion
             * @return {number} calculated offset
             */
            value: function getMapOffset(distortion) {
                return this.offset.x + (this.mapView.width - this.mapView.width * distortion) / 2;
            }

            /**
             * Constructor
             * @param  {Object} settings - the settings Object
             * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
             * @param  {Rectangle} mapView = new Rectangle() - current representation of map
             * @param  {Bounds} bounds = new Bounds() - current bounds of map
             * @param  {LatLng} center = new LatLng() - current center of map
             * @return {View} Instance of View
             */

        }, {
            key: 'offset',


            /**
             * Returns the offset of the center
             */
            get: function get() {
                var center = this.center.toPoint(this.bounds, this.mapView);
                var newCenter = this.viewport.center.sub(center);
                return newCenter;
            }
        }]);

        function View(_ref) {
            var _ref$viewport = _ref.viewport;
            var viewport = _ref$viewport === undefined ? new _Rectangle.Rectangle() : _ref$viewport;
            var _ref$mapView = _ref.mapView;
            var mapView = _ref$mapView === undefined ? new _Rectangle.Rectangle() : _ref$mapView;
            var _ref$bounds = _ref.bounds;
            var bounds = _ref$bounds === undefined ? new _Bounds.Bounds() : _ref$bounds;
            var _ref$center = _ref.center;
            var center = _ref$center === undefined ? new _LatLng.LatLng() : _ref$center;

            _classCallCheck(this, View);

            this.mapView = mapView;
            this.viewport = viewport;
            this.bounds = bounds;
            this.center = center;
            return this;
        }

        return View;
    }();
});
