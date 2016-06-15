import {Helper} from "../plugin/src/js/Helper.js";
import {Point} from "../plugin/src/js/Point.js";

describe('Helper', function() {
    "use strict";

    it("forEach Helper keeps helping", function() {
        var items = [1, 2, 3, 4, 5];
        var newItems = [];
        Helper.forEach(items, function(item, i) {
            expect(item).toEqual(items[i]);
            newItems.push(item);
        });
        expect(items).toEqual(newItems);
    });


    it("toRadians calculates correctly", function() {
        expect(Helper.toRadians(180)).toEqual(Math.PI);
        expect(Helper.toRadians(0)).toEqual(0);
        expect(Helper.toRadians(360)).toEqual(2 * Math.PI);
    });

    it("cubic ease out function generates correct values", function() {
        var start = 0,
            timeSteps = 10,
            moveBy = new Point(100, 100),
            duration = 100;
        var lastValue;
        for (var i = 0; i <= 100; i += 10) {
            var newValue = Helper.linearEase(start + i, moveBy, moveBy.clone.multiply(-1), duration);
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
                expect(newValue.equals(new Point())).toBe(true);
            }
        }
    });
});
