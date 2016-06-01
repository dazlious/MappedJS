(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Helper.js', './Point.js', './LatLng.js', './Bounds.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Helper.js'), require('./Point.js'), require('./LatLng.js'), require('./Bounds.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Helper, global.Point, global.LatLng, global.Bounds);
        global.DataEnrichment = mod.exports;
    }
})(this, function(exports, _jQuery, _Helper, _Point, _LatLng, _Bounds) {
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

    /**
     * @author Michael Duve <mduve@designmail.net>
     * @file enriches delivered data with default values
     * @copyright Michael Duve 2016
     * @module DataEnrichment
     */
    var DataEnrichment = exports.DataEnrichment = {
        /**
         * enriches marker data with all needed data
         * @function
         * @memberof module:DataEnrichment
         * @param  {object} data - specified data for marker
         * @return {object} enriched marker data
         */

        marker: function marker(data) {

            var enrichedData = [];

            _Helper.Helper.forEach(data, function(entry) {
                entry = Object.assign({}, DataEnrichment.DATA_MARKER, entry);

                var offset = new _Point.Point(entry.offset.x, entry.offset.y),
                    latlng = new _LatLng.LatLng(entry.position.lat, entry.position.lng),
                    size = new _Point.Point(entry.size.width, entry.size.height);

                enrichedData.push({
                    offset: offset,
                    latlng: latlng,
                    size: size,
                    hover: entry.hover,
                    icon: entry.icon,
                    content: entry.content
                });
            });

            return enrichedData;
        },
        label: function label(data) {
            var enrichedData = [];

            _Helper.Helper.forEach(data, function(entry) {
                entry = Object.assign({}, DataEnrichment.DATA_LABEL, entry);

                if (entry.text) entry.text = Object.assign({}, DataEnrichment.DATA_LABEL_TEXT, entry.text);
                if (entry.icon) entry.icon = Object.assign({}, DataEnrichment.DATA_LABEL_ICON, entry.icon);

                entry.position = new _LatLng.LatLng(entry.position[0], entry.position[1]);
                if (entry.text) entry.text.offset = new _Point.Point(entry.text.offset[0], entry.text.offset[1]);

                enrichedData.push(entry);
            });

            return enrichedData;
        },

        /**
         * enriches map data with all needed data
         * @function
         * @memberof module:DataEnrichment
         * @param  {object} data - specified data for mapsettings
         * @return {object} enriched mapsettings data
         */
        mapSettings: function mapSettings(data) {
            var enrichedData = Object.assign({}, DataEnrichment.MAP_SETTINGS, data),
                bounds = new _Bounds.Bounds(new _LatLng.LatLng(enrichedData.bounds.northWest[0], enrichedData.bounds.northWest[1]), new _LatLng.LatLng(enrichedData.bounds.southEast[0], enrichedData.bounds.southEast[1])),
                center = new _LatLng.LatLng(enrichedData.center.lat, enrichedData.center.lng);

            if (!enrichedData.limitToBounds) {
                enrichedData.limitToBounds = bounds;
            } else {
                if (!(enrichedData.limitToBounds instanceof _Bounds.Bounds)) {
                    enrichedData.limitToBounds = new _Bounds.Bounds(new _LatLng.LatLng(enrichedData.limitToBounds.northWest[0], enrichedData.limitToBounds.northWest[1]), new _LatLng.LatLng(enrichedData.limitToBounds.southEast[0], enrichedData.limitToBounds.southEast[1]));
                }
            }

            enrichedData.bounds = bounds;
            enrichedData.center = center;

            return enrichedData;
        },
        tooltip: function tooltip(data) {
            return Object.assign({}, DataEnrichment.TOOLTIP, data);
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
        },
        content: []
    };
    /**
     * Default initial values for a Map
     * @type {Object}
     */
    DataEnrichment.MAP_SETTINGS = {
        level: 0,
        center: {
            "lat": 0,
            "lng": 0
        },
        bounds: {
            "northWest": [90, -180],
            "southEast": [-90, 180]
        },
        controls: {
            zoom: false,
            home: false,
            position: "bottom-right",
            theme: "dark"
        }
    };
    DataEnrichment.DATA_LABEL = {
        "position": [0, 0]
    };
    DataEnrichment.DATA_LABEL_TEXT = {
        "content": "",
        "color": "#333333",
        "shadow": {
            "color": "#f7f7f7",
            "blur": 2
        },
        "offset": [0, 0],
        "align": "center",
        "baseline": "hanging",
        "font": "10pt Arial"
    };
    DataEnrichment.DATA_LABEL_ICON = {
        "type": "circle",
        "size": 2,
        "color": "#333333",
        "shadow": {
            "color": "#f7f7f7",
            "blur": 2
        }
    };
    DataEnrichment.TOOLTIP = {
        image: "/plugin/hbs/image.hbs",
        text: "/plugin/hbs/text.hbs",
        headline: "/plugin/hbs/headline.hbs",
        crossheading: "/plugin/hbs/crossheading.hbs",
        iframe: "/plugin/hbs/iframe.hbs"
    };
});
