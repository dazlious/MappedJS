/*global DataEnrichment,Point,LatLng*/
describe('DataEnrichment', function() {
    "use strict";

    it("Empty input returns empty data", function() {
        DataEnrichment.DataEnrichment.marker([], function(data) {
            expect(data.length).toEqual(0);
        });
    });


    it("Empty data in input returns default object", function() {
        DataEnrichment.DataEnrichment.marker([{}], function(data) {
            expect(data.length).toEqual(1);
            expect(data[0].offset instanceof Point.Point).toEqual(true);
            expect(data[0].latlng instanceof LatLng.LatLng).toEqual(true);
            expect(data[0].size instanceof Point.Point).toEqual(true);
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
        DataEnrichment.DataEnrichment.marker([item], function(data) {
            expect(data[0].offset.equals(new Point.Point(0, 0))).toEqual(true);
            expect(data[0].latlng.equals(new LatLng.LatLng(-60, 60))).toEqual(true);
            expect(data[0].size.equals(new Point.Point(64,32))).toEqual(true);
            expect(data[0].hover).toEqual(true);
            expect(data[0].icon).toEqual(item.icon);
        });
    });

});
