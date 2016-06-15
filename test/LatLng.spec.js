import {LatLng} from "../plugin/src/js/LatLng.js";

describe('LatLng', function() {
    "use strict";

    it("is an instanceof LatLng", function() {
        expect(new LatLng() instanceof LatLng).toEqual(true);
    });

    it("initializes with zeros", function() {
        var latlng = new LatLng();
        expect(latlng.lat).toEqual(0);
        expect(latlng.lng).toEqual(0);
    });

    it("substraction works", function() {
        var coord1 = new LatLng(30, 30),
            coord2 = new LatLng(30, -30),
            coord3 = new LatLng(-30, 30),
            coord4 = new LatLng(-30, -30);
        expect(coord1.substract(coord2)).toEqual(new LatLng(0, 60));
        expect(coord2.substract(coord1)).toEqual(new LatLng(30, -90));
        expect(coord3.substract(coord4)).toEqual(new LatLng(0, 60));
    });

    it("length works as expected", function() {
        var c1 = new LatLng(3, -3),
            c2 = new LatLng(-8, 9);
        expect(c1.length).toEqual(Math.sqrt(18));
        expect(c2.length).toEqual(Math.sqrt(145));
    });

    it("clone works as expected", function() {
        var c1 = new LatLng(2, 2);
        expect(c1.clone).toEqual(c1);
        expect(c1.clone).not.toBe(c1);
    });

    it("addition works", function() {
        var coord1 = new LatLng(30, 30),
            coord2 = new LatLng(30, -30),
            coord3 = new LatLng(-30, 30),
            coord4 = new LatLng(-30, -30);
        expect(coord1.add(coord2)).toEqual(new LatLng(60, 0));
        expect(coord3.add(coord4)).toEqual(new LatLng(-60, 0));
        expect(coord2.add(coord4)).toEqual(new LatLng(0, -60));
    });

    it("equals works", function() {
        var coord1 = new LatLng(50, 50),
            coord2 = new LatLng(50, -50),
            coord3 = new LatLng(-50, 50),
            coord4 = new LatLng(-50, -50),
            coord5 = new LatLng(50, 50);

        expect(coord1.equals(coord1)).toEqual(true);
        expect(coord1.equals(coord5)).toEqual(true);

        expect(coord1.equals(coord2)).toEqual(false);
        expect(coord3.equals(coord4)).toEqual(false);

    });

});
