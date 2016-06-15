import {DataEnrichment} from "../plugin/src/js/DataEnrichment.js";
import {Point} from "../plugin/src/js/Point.js";
import {LatLng} from "../plugin/src/js/LatLng.js";

describe('DataEnrichment', function() {
    "use strict";

    it("Empty input returns empty data", function() {
        DataEnrichment.marker([], function(data) {
            expect(data.length).toEqual(0);
        });
    });


    it("Empty data in input returns default object", function() {
        DataEnrichment.marker([{}], function(data) {
            expect(data.length).toEqual(1);
            expect(data[0].offset instanceof Point).toEqual(true);
            expect(data[0].latlng instanceof LatLng).toEqual(true);
            expect(data[0].size instanceof Point).toEqual(true);
            expect(data[0].hover).toEqual(false);
            expect(data[0].icon).toBeNull();
        });
    });

    it("data in input returns correct object", function() {
        var item = {
            "icon": "img/icon.png",
            "hover": true,
            "position": {
                "lat": -60,
                "lng": 60
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "size": {
                "width": 64,
                "height": 32
            }
        };
        DataEnrichment.marker([item], function(data) {
            expect(data[0].offset.equals(new Point(0, 0))).toEqual(true);
            expect(data[0].latlng.equals(new LatLng(-60, 60))).toEqual(true);
            expect(data[0].size.equals(new Point(64,32))).toEqual(true);
            expect(data[0].hover).toEqual(true);
            expect(data[0].icon).toEqual(item.icon);
        });
    });

});
