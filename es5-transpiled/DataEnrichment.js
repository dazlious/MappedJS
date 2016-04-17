(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './Point.js', './LatLng.js', './Helper.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./Point.js'), require('./LatLng.js'), require('./Helper.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.Point, global.LatLng, global.Helper);
        global.DataEnrichment = mod.exports;
    }
})(this, function(exports, _jquery, _Point, _LatLng, _Helper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataEnrichment = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var DataEnrichment = exports.DataEnrichment = {
        marker: function marker(data, cb) {

            var enrichedData = [];

            _Helper.Helper.forEach(data, function(entry) {

                entry = _jquery2.default.extend(true, DataEnrichment.DATA_MARKER, entry);

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
        }
    };

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
