import {Publisher} from "../plugin/src/js/Publisher.js";

describe('Publisher', function() {
    "use strict";

    var Pub_Instance = null;

    it("is a singleton", function() {
        expect(new Publisher()).toBe(new Publisher());
    });

    it("is an instance of Publisher", function() {
        var temp_instance = new Publisher();
        expect(temp_instance instanceof Publisher).toEqual(true);
    });

    it("destroy method is working", function() {
        var temp_instance = new Publisher();
        expect(temp_instance).toBe(new Publisher());
        temp_instance.destroy();
        expect(temp_instance).not.toBe(new Publisher());
    });

    it("subscribe with no parameters", function() {
        Pub_Instance = new Publisher();
        expect(Pub_Instance.subscribers.any).toBeUndefined();
        Pub_Instance.subscribe();
        expect(Pub_Instance.subscribers.any).not.toBeUndefined();
        expect(Pub_Instance.subscribers.any.length).toEqual(1);
        Pub_Instance.destroy();
    });

    it("subscribes to a topic", function() {
        Pub_Instance = new Publisher();
        expect(Pub_Instance.subscribers.topic).toBeUndefined();
        Pub_Instance.subscribe("topic", function() {});
        expect(Pub_Instance.subscribers.topic).not.toBeUndefined();
        Pub_Instance.destroy();
    });

    it("publishes a single argument to a topic", function() {
        var test_str = "text";
        Pub_Instance = new Publisher();
        Pub_Instance.subscribe("topic", function(a) {
            expect(a).toEqual(test_str);
        });
        Pub_Instance.publish("topic", test_str);
        Pub_Instance.destroy();
    });

    it("publishes an array of arguments to a topic", function() {
        var test_str = "text";
        Pub_Instance = new Publisher();
        Pub_Instance.subscribe("topic", function(a) {
            expect(a instanceof Array).toEqual(true);
            expect(a.length).toEqual(3);
        });
        Pub_Instance.publish("topic", [test_str, test_str, test_str]);
        Pub_Instance.destroy();
    });

});
