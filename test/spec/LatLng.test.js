/*global LatLng*/

describe('LatLng', function() {
    "use strict";

    it("is an instanceof LatLng", function() {
        expect(new LatLng.LatLng() instanceof LatLng.LatLng).toEqual(true);
    });

    it("initializes with zeros", function() {
        var latlng = new LatLng.LatLng();
        expect(latlng.lat).toEqual(0);
        expect(latlng.lng).toEqual(0);
    });

});
