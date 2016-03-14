/*global LatLng,Bounds,Rectangle,Point*/

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

    it("substraction works", function() {
        var coord1 = new LatLng.LatLng(30, 30),
            coord2 = new LatLng.LatLng(30, -30),
            coord3 = new LatLng.LatLng(-30, 30),
            coord4 = new LatLng.LatLng(-30, -30);
        expect(coord1.sub(coord2)).toEqual(new LatLng.LatLng(0, 60));
        expect(coord2.sub(coord1)).toEqual(new LatLng.LatLng(0, -60));
        expect(coord2.sub(coord1)).not.toEqual(coord1.sub(coord2));
        expect(coord3.sub(coord4)).toEqual(new LatLng.LatLng(0, 60));
        expect(coord2.sub(coord4)).toEqual(new LatLng.LatLng(60, 0));
    });

    it("addition works", function() {
        var coord1 = new LatLng.LatLng(30, 30),
            coord2 = new LatLng.LatLng(30, -30),
            coord3 = new LatLng.LatLng(-30, 30),
            coord4 = new LatLng.LatLng(-30, -30);
        expect(coord1.add(coord2)).toEqual(new LatLng.LatLng(60, 0));
        expect(coord2.add(coord1)).toEqual(new LatLng.LatLng(60, 0));
        expect(coord2.add(coord1)).toEqual(coord1.add(coord2));
        expect(coord3.add(coord4)).toEqual(new LatLng.LatLng(-60, 0));
        expect(coord2.add(coord4)).toEqual(new LatLng.LatLng(0, -60));
    });

    it("equals works", function() {
        var coord1 = new LatLng.LatLng(50, 50),
            coord2 = new LatLng.LatLng(50, -50),
            coord3 = new LatLng.LatLng(-50, 50),
            coord4 = new LatLng.LatLng(-50, -50),
            coord5 = new LatLng.LatLng(50, 50);

        expect(coord1.equals(coord1)).toEqual(true);
        expect(coord1.equals(coord5)).toEqual(true);

        expect(coord1.equals(coord2)).toEqual(false);
        expect(coord3.equals(coord4)).toEqual(false);

    });


    it("converts correctly", function() {
        var nw = new LatLng.LatLng(80, -170),
            so = new LatLng.LatLng(-80, 170);
        var bounds = new Bounds.Bounds(nw, so);

        var rect = new Rectangle.Rectangle(0, 0, 3400, 1600);

        var coord1 = new LatLng.LatLng(80, -170),
            coord2 = new LatLng.LatLng(79, -169),
            coord3 = new LatLng.LatLng(0, 0),
            coord4 = new LatLng.LatLng(-50, 50);

        var p1 = coord1.toPoint(bounds, rect),
            p2 = coord2.toPoint(bounds, rect),
            p3 = coord3.toPoint(bounds, rect),
            p4 = coord4.toPoint(bounds, rect);

        expect(p1).toEqual(new Point.Point(0, 0));
        expect(p2).toEqual(new Point.Point(10, 10));
        expect(p3).toEqual(new Point.Point(1700, 800));
        expect(p4).toEqual(new Point.Point(2200, 1300));
    });

});
