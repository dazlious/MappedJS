(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Point.js', './LatLng.js', './Helper.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Point.js'), require('./LatLng.js'), require('./Helper.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Point, global.LatLng, global.Helper);
        global.DataEnrichment = mod.exports;
    }
})(this, function(exports, _jQuery, _Point, _LatLng, _Helper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataEnrichment = undefined;

    var _jQuery2 = _interopRequireDefault(_jQuery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var DataEnrichment = exports.DataEnrichment = {
        /**
         * enriches marker data with all needed data
         * @param  {object} data - specified data for marker
         * @param  {Function} cb - callback function, when enrichment is done
         * @return {DataEnrichment} DataEnrichment object for chaining
         */
        marker: function marker(data, cb) {

            var enrichedData = [];

            _Helper.Helper.forEach(data, function(entry) {

                entry = _jQuery2.default.extend(true, DataEnrichment.DATA_MARKER, entry);

                var offset = new _Point.Point(entry.offset.x, entry.offset.y);
                var latlng = new _LatLng.LatLng(entry.position.lat, entry.position.lng);
                var size = new _Point.Point(entry.size.width, entry.size.height);

                enrichedData.push({
                    offset: offset,
                    latlng: latlng,
                    size: size,
                    hover: entry.hover,
                    icon: entry.icon
                });
            });

            if (typeof cb === "function") {
                cb(enrichedData);
            }

            return this;
        }
    };

    /**
     * Default initial values for a Marker
     * @type {Object}
     */
    DataEnrichment.DATA_MARKER = {
        icon: null,
        hover: false,
        position: {
            lat: 0,
            lng: 0
        },
        offset: {
            x: 0,
            y: 0
        },
        size: {
            width: 32,
            height: 32
        }
    };
});
