/*global Helper,Point*/
describe('Helper', function() {
    "use strict";

    it("valid JSON could be requested", function(done) {
        Helper.Helper.requestJSON("base/assets/test.json", function(data) {
            expect(Object.keys(data).length).not.toBe(0);
            expect(data).toEqual(jasmine.objectContaining({
                    "foo": "bar",
                    "bar": {
                        "test": 123
                    }
                })
            );
            done();
        });
    });

    it("loading of image is working", function(done) {
        var filepath = "base/assets/image.png";
        Helper.Helper.loadImage(filepath, function(img) {
            expect(img instanceof HTMLImageElement).toBe(true);
            expect(img.src.indexOf(filepath)).toBeGreaterThan(-1);
            expect(img.width).toEqual(jasmine.any(Number));
            expect(img.height).toEqual(jasmine.any(Number));
            done();
        });
    });

    it("forEach Helper keeps helping", function() {
        var items = [1, 2, 3, 4, 5];
        var newItems = [];
        Helper.Helper.forEach(items, function(item, i) {
            expect(item).toEqual(items[i]);
            newItems.push(item);
        });
        expect(items).toEqual(newItems);
    });


    it("toRadians calculates correctly", function() {
        expect(Helper.Helper.toRadians(180)).toEqual(Math.PI);
        expect(Helper.Helper.toRadians(0)).toEqual(0);
        expect(Helper.Helper.toRadians(360)).toEqual(2 * Math.PI);
    });

    it("cubic ease out function generates correct values", function() {
        var start = 0,
            timeSteps = 10,
            moveBy = new Point.Point(100, 100),
            duration = 100;
        var lastValue;
        for (var i = 0; i <= 100; i += 10) {
            var newValue = Helper.Helper.linearEase(start + i, moveBy, moveBy.clone.multiply(-1), duration);
            if (i === 0) {
                expect(newValue.equals(moveBy)).toBe(true);
            }
            if (!lastValue) {
                lastValue = newValue;
            } else {
                expect(newValue.x).toBeLessThan(lastValue.x);
                expect(newValue.y).toBeLessThan(lastValue.y);
            }
            if (i === duration) {
                expect(newValue.equals(new Point.Point())).toBe(true);
            }
        }
    });
});
