/*global Point*/

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

    it("toString works as expected", function() {
        var p1 = new Point.Point(1, 12);
        expect(p1.toString()).toEqual("(1,12)");
    });

    it("substraction works as expected", function() {
        var p1 = new Point.Point(2, 2),
            p2 = new Point.Point(2, 2),
            p3 = new Point.Point();
        expect(p1.sub(p2)).toEqual(p3);
        expect(p3.sub(p2)).toEqual(new Point.Point(-2, -2));
    });

    it("addition works as expected", function() {
        var p1 = new Point.Point(2, 2),
            p2 = new Point.Point(2, 2),
            p3 = new Point.Point();
        expect(p1.add(p2)).toEqual(new Point.Point(4, 4));
        expect(p3.add(p2)).toEqual(p2);
    });

    it("translate works as expected", function() {
        var p1 = new Point.Point(2, 2);
        expect(p1.translate(-2, -2)).toEqual(new Point.Point());
        expect(p1.translate(2, 2)).toEqual(new Point.Point(2, 2));
    });

    it("difference works as expected", function() {
        var p1 = new Point.Point(2, 2),
            p2 = new Point.Point(2, 2),
            p3 = new Point.Point(4, 2),
            p4 = new Point.Point(4, 3);

        expect(p1.difference(p2)).toEqual(new Point.Point());
        expect(p4.difference(p2)).toEqual(new Point.Point(2, 1));
    });

    it("difference works as expected", function() {
        var p1 = new Point.Point(2, 2),
            p2 = new Point.Point(2, 2),
            p3 = new Point.Point(4, 2),
            p4 = new Point.Point(4, 3);

        expect(p1.distance(p2)).toEqual(0);
        expect(p1.distance(p3)).toEqual(2);
        expect(p4.distance(p2)).toEqual(2.23606797749979);
    });


});
