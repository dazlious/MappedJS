import $ from 'jquery';
import {Point} from './Point.js';
import {LatLng} from './LatLng.js';
import {Helper} from './Helper.js';

export var DataEnrichment = {
    marker: function(data, cb) {

        const enrichedData = [];

        Helper.forEach(data, function(entry) {

            entry = $.extend(true, DataEnrichment.DATA_MARKER, entry);

            const offset = new Point(entry.offset.x, entry.offset.y);
            const latlng = new LatLng(entry.position.lat, entry.position.lng);
            const size = new Point(entry.size.width, entry.size.height);

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
