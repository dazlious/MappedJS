/*global Tile,Rectangle,Publisher*/

describe('Tile', function () {
    "use strict";

    it("is an instanceof Tile and initializes without Rectangle parameters", function() {
        expect(new Tile.Tile({path:"http://dummyimage.com/800x200/000/fff"}) instanceof Tile.Tile).toEqual(true);
    });

    it("can not initialize without correct path", function() {
        expect(function(){
            var t = new Tile.Tile();
        }).toThrowError(TypeError);
        expect(function(){
            var t = new Tile.Tile({path:""});
        }).toThrowError(TypeError);
        expect(function(){
            var t = new Tile.Tile({path:123});
        }).toThrowError(TypeError);
    });

    it("initializes without Rectangle parameters an Rectangle(0,0,0,0)", function() {
        var t = new Tile.Tile({path:"http://dummyimage.com/800x200/000/fff"});
        expect(t.toString()).toEqual(new Rectangle.Rectangle().toString());
    });

    it("initializes in correct state", function() {
        var t = new Tile.Tile({path:"http://dummyimage.com/800x200/000/fff"});
        expect(t.state.state.value).toEqual(0);
        t.initialize();
        expect(t.state.state.value).toEqual(1);
    });

    it("calls event after loading", function(done) {
        var t = new Tile.Tile({path:"http://dummyimage.com/800x200/000/fff"});
        t.Publisher.subscribe("tile-loaded", function(tile) {
            expect(t).toBe(tile);
            done();
        });
        expect(t.state.state.value).toEqual(0);
        t.initialize();
        expect(t.state.state.value).toEqual(1);
    });

    it("calls event after loading", function() {
        var t1 = new Tile.Tile({path:"http://dummyimage.com/800x200/000/fff"}),
            t2 = new Tile.Tile({path:"http://dummyimage.com/800x200/000/fff"}),
            t3 = new Tile.Tile({path:"http://dummyimage.com/800x200/000/ddd"});
        expect(t1.equals(t1)).toEqual(true);
        expect(t1.equals(t2)).toEqual(true);
        expect(t1.equals(t3)).toEqual(false);
    });

});
