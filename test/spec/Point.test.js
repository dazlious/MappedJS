/*global Point,Bounds,LatLng,Rectangle*/

describe('Point', function() {
    "use strict";

    it("is an instanceof Point", function() {
        expect(new Point.Point() instanceof Point.Point).toEqual(true);
    });

    it("initializes with zeros", function() {
        var p = new Point.Point();
        expect(p.x).toEqual(0);
        expect(p.y).toEqual(0);
    });

    it("initializes correctly with parameters", function() {
        var p = new Point.Point(1, 12);
        expect(p.x).toEqual(1);
        expect(p.y).toEqual(12);
    });

    it("equals works as expected", function() {
        var p1 = new Point.Point(1, 12),
            p2 = new Point.Point(2, 2),
            p3 = new Point.Point(),
            p4 = new Point.Point(2, 2);
        expect(p2.equals(p4)).toEqual(true);
        expect(p1.equals(p3)).toEqual(false);
        expect(p3.equals(p4)).toEqual(false);
    });

    it("length works as expected", function() {
        var p1 = new Point.Point(3, 3),
            p2 = new Point.Point(2, 2);
        expect(p1.length).toEqual(Math.sqrt(18));
        expect(p2.length).toEqual(Math.sqrt(8));
    });


    it("substraction works as expected", function() {
        var p1 = new Point.Point(2, 2),
            p2 = new Point.Point(2, 2),
            p3 = new Point.Point();
        expect(p1.substract(p2)).toEqual(p3);
        expect(p3.substract(p2)).toEqual(new Point.Point(-2, -2));
    });

    it("clone works as expected", function() {
        var p1 = new Point.Point(2, 2);
        expect(p1.clone).toEqual(p1);
        expect(p1.clone).not.toBe(p1);
    });

    it("addition works as expected", function() {
        var p1 = new Point.Point(2, 2),
            p2 = new Point.Point(2, 2),
            p3 = new Point.Point();
        expect(p1.add(p2)).toEqual(new Point.Point(4, 4));
        expect(p3.add(p2)).toEqual(p2);
    });

    it("multiplication works as expected", function() {
        var p1 = new Point.Point(2, 2);
        expect(p1.multiply(2)).toEqual(new Point.Point(4, 4));
        expect(p1.multiply(2, 3)).toEqual(new Point.Point(8, 12));
        expect(p1.multiply(0)).toEqual(new Point.Point(0, 0));
    });

    it("division works as expected", function() {
        var p1 = new Point.Point(10, 30);
        expect(p1.divide(2)).toEqual(new Point.Point(5, 15));
        expect(p1.divide(1, 5)).toEqual(new Point.Point(5, 3));
    });

    it("translate works as expected", function() {
        var p1 = new Point.Point(2, 2);
        expect(p1.translate(-2, -2)).toEqual(new Point.Point());
        expect(p1.translate(2, 2)).toEqual(new Point.Point(2, 2));
    });

    it("position works as expected", function() {
        var p1 = new Point.Point(2, 2);
        expect(p1.position(-2, -2)).toEqual(new Point.Point(-2, -2));
        expect(p1.position(1, 1)).toEqual(new Point.Point(1, 1));
    });

    it("distance works as expected", function() {
        var p1 = new Point.Point(2, 2),
            p2 = new Point.Point(2, 2),
            p3 = new Point.Point(4, 2),
            p4 = new Point.Point(4, 3);

        expect(p1.distance(p2)).toEqual(0);
        expect(p1.distance(p3)).toEqual(2);
        expect(p4.distance(p2)).toEqual(2.23606797749979);
    });

});
