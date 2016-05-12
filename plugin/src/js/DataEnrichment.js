import $ from 'jQuery';
import {Point} from './Point.js';
import {LatLng} from './LatLng.js';
import {Bounds} from './Bounds.js';
import {Helper} from './Helper.js';

export var DataEnrichment = {
    /**
     * enriches marker data with all needed data
     * @param  {object} data - specified data for marker
     * @param  {Function} cb - callback function, when enrichment is done
     * @return {DataEnrichment} DataEnrichment object for chaining
     */
    marker: function(data) {

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
                icon: entry.icon,
                content: entry.content
            });
        });

        return enrichedData;
    },
    mapSettings: function(data) {

        const enrichedData = $.extend(true, DataEnrichment.MAP_SETTINGS, data);

        const bounds = new Bounds(new LatLng(enrichedData.bounds.northWest[0], enrichedData.bounds.northWest[1]), new LatLng(enrichedData.bounds.southEast[0], enrichedData.bounds.southEast[1]));
        const center = new LatLng(enrichedData.center.lat, enrichedData.center.lng);

        if (!enrichedData.limitToBounds) {
            enrichedData.limitToBounds = bounds;
        } else {
            enrichedData.limitToBounds =  new Bounds(new LatLng(enrichedData.limitToBounds.northWest[0], enrichedData.limitToBounds.northWest[1]), new LatLng(enrichedData.limitToBounds.southEast[0], enrichedData.limitToBounds.southEast[1]));
        }

        enrichedData.bounds = bounds;
        enrichedData.center = center;

        return enrichedData;
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

DataEnrichment.MAP_SETTINGS = {
    level: 0,
    center: {"lat": 0, "lng": 0},
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
