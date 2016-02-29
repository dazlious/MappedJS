/*global de*/
describe('Publisher', function () {
    "use strict";

    var api = (new de.MappedJS({
        jasmine:true
    })).api;

    var Publisher = new api.Publisher();

    it("Create a new instance and get singleton back", function() {
        var secondInstance = new api.Publisher();
        expect(Publisher).toEqual(secondInstance);
    });

    it("Subscribe to a topic", function() {
        var handle = function(array_args) {

        };
        Publisher.subscribe("topic", handle);
        expect(Publisher.subscribers.any.length).toEqual(0);
        expect(Publisher.subscribers.topic.length).toEqual(1);
        expect(Publisher.subscribers.any.length).toEqual(0);
    });

    it("Publish to a topic", function() {
        var testStr = "test";
        var handle = function(array_args) {
            expect(array_args).toEqual(testStr);
        };
        Publisher.subscribe("topic", handle).publish("topic", "test");
    });

    it("Publish with no parameters to empty", function() {
        var handle = function(array_args) {
            expect(array_args).toEqual([]);
        };
        Publisher.subscribe("empty", handle).publish("empty");
    });

    it("Unsubscribe from unsub", function() {
        var handle = function(array_args) {

        };
        expect(Publisher.subscribers.unsub).toEqual(undefined);
        Publisher.subscribe("unsub", handle);
        expect(Publisher.subscribers.unsub.length).toEqual(1);
        Publisher.unsubscribe("unsub", handle);
        expect(Publisher.subscribers.unsub.length).toEqual(0);

    });

});
