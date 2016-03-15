/*global Rectangle,Point*/

describe('Rectangle', function() {
    "use strict";

    it("is an instanceof Rectangle", function() {
        expect(new Rectangle.Rectangle() instanceof Rectangle.Rectangle).toEqual(true);
    });

    it("initializes with zeros", function() {
        var rect = new Rectangle.Rectangle();
        expect(rect.x).toEqual(0);
        expect(rect.y).toEqual(0);
        expect(rect.width).toEqual(0);
        expect(rect.height).toEqual(0);
    });

    it("initializes correctly with parameters", function() {
        var rect = new Rectangle.Rectangle(50, 60, 70, 80);
        expect(rect.x).toEqual(50);
        expect(rect.y).toEqual(60);
        expect(rect.width).toEqual(70);
        expect(rect.height).toEqual(80);
    });

    it("center is set correctly", function() {
        var rect = new Rectangle.Rectangle(-50, -50, 100, 100);
        expect(rect.center).toEqual(new Point.Point(0, 0));
        rect.x = 0;
        rect.y = 0;
        expect(rect.center).toEqual(new Point.Point(50, 50));
    });

    it("top-left-position is set correctly", function() {
        var rect = new Rectangle.Rectangle(-50, -50, 100, 100);
        expect(rect.topLeft).toEqual(new Point.Point(-50, -50));
        rect.x = 0;
        rect.y = 0;
        expect(rect.topLeft).toEqual(new Point.Point(0, 0));
    });

    it("top-right-position is set correctly", function() {
        var rect = new Rectangle.Rectangle(-50, -50, 100, 100);
        expect(rect.topRight).toEqual(new Point.Point(50, -50));
        rect.x = 0;
        rect.y = 0;
        expect(rect.topRight).toEqual(new Point.Point(100, 0));
    });

    it("bottom-left-position is set correctly", function() {
        var rect = new Rectangle.Rectangle(-50, -50, 100, 100);
        expect(rect.bottomLeft).toEqual(new Point.Point(-50, 50));
        rect.x = 0;
        rect.y = 0;
        expect(rect.bottomLeft).toEqual(new Point.Point(0, 100));
    });

    it("bottom-right-position is set correctly", function() {
        var rect = new Rectangle.Rectangle(-50, -50, 100, 100);
        expect(rect.bottomRight).toEqual(new Point.Point(50, 50));
        rect.x = 0;
        rect.y = 0;
        expect(rect.bottomRight).toEqual(new Point.Point(100, 100));
    });

    it("equals works fine", function() {
        var rect1 = new Rectangle.Rectangle(0, 0, 100, 100),
            rect2 = new Rectangle.Rectangle(1, 0, 100, 100),
            rect3 = new Rectangle.Rectangle(0, 1, 100, 100),
            rect4 = new Rectangle.Rectangle(0, 0, 101, 100),
            rect5 = new Rectangle.Rectangle(0, 0, 100, 101),
            rect6 = new Rectangle.Rectangle(0, 0, 100, 100);
        expect(rect1.equals(rect2)).toBe(false);
        expect(rect1.equals(rect3)).toBe(false);
        expect(rect1.equals(rect4)).toBe(false);
        expect(rect1.equals(rect5)).toBe(false);
        expect(rect1.equals(rect6)).toBe(true);
    });

    it("containsPoint works fine", function() {
        var rect = new Rectangle.Rectangle(0, 0, 100, 100),
            p1 = new Point.Point(0, 0),
            p2 = new Point.Point(-1, 0),
            p3 = new Point.Point(1, -1);
        expect(rect.containsPoint(p1)).toBe(true);
        expect(rect.containsPoint(p2)).toBe(false);
        expect(rect.containsPoint(p3)).toBe(false);
    });

    it("containsRect works fine", function() {
        var rect1 = new Rectangle.Rectangle(0, 0, 50, 50),
            rect2 = new Rectangle.Rectangle(0, 0, 100, 100);
        expect(rect1.containsRect(rect1)).toBe(true);
        expect(rect1.containsRect(rect2)).toBe(false);
        expect(rect2.containsRect(rect1)).toBe(true);
    });

    it("contains works fine", function() {
        var rect1 = new Rectangle.Rectangle(0, 0, 50, 50),
            rect2 = new Rectangle.Rectangle(0, 0, 100, 100),
            rect3 = new Rectangle.Rectangle(0, 0, 100, 100),
            p1 = new Point.Point(0, 0),
            p2 = new Point.Point(-1, 0),
            p3 = new Point.Point(1, -1);
        expect(rect1.contains(rect1)).toBe(true);
        expect(rect1.contains(rect2)).toBe(false);
        expect(rect2.contains(rect1)).toBe(true);
        expect(rect3.contains(p1)).toBe(true);
        expect(rect3.contains(p2)).toBe(false);
        expect(rect3.contains(p3)).toBe(false);
    });

    it("translate works fine", function() {
        var rect1 = new Rectangle.Rectangle(0, 0, 0, 0);
        expect(rect1.translate(0, 0)).toEqual(new Rectangle.Rectangle(0, 0, 0, 0));
        expect(rect1.translate(-100, -100)).toEqual(new Rectangle.Rectangle(-100, -100, 0, 0));
        expect(rect1.translate(200, 600)).toEqual(new Rectangle.Rectangle(100, 500, 0, 0));
    });

    it("transform works fine", function() {
        var rect1 = new Rectangle.Rectangle(0, 0, 0, 0);
        expect(rect1.transform(0, 0, 100, 100)).toEqual(new Rectangle.Rectangle(0, 0, 100, 100));
        expect(rect1.transform(-100, -100, -200, -300)).toEqual(new Rectangle.Rectangle(-100, -100, -100, -200));
        expect(rect1.transform(200, 600, 200, 700)).toEqual(new Rectangle.Rectangle(100, 500, 100, 500));
    });

});
