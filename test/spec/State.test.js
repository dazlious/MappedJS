/*global StateHandler*/

describe('StateHandler', function() {
    "use strict";

    var STATES = [{
        value: 0,
        description: 'StateHandler 1'
    }, {
        value: 1,
        description: 'StateHandler 2'
    }, {
        value: 2,
        description: 'StateHandler 3'
    }];

    it("is an instanceof StateHandler", function() {
        expect(new StateHandler.StateHandler() instanceof StateHandler.StateHandler).toEqual(true);
    });

    it("initializes empty zeros", function() {
        var state_instance = new StateHandler.StateHandler();
        expect(state_instance.current.value).toEqual(0);
        expect(state_instance.current.description).toEqual('Default');
    });

    it("next if one state", function() {
        var state_instance = new StateHandler.StateHandler();
        expect(state_instance.current.value).toEqual(0);
        expect(state_instance.current.description).toEqual('Default');
        state_instance.next();
        expect(state_instance.current.value).toEqual(0);
        expect(state_instance.current.description).toEqual('Default');
    });

    it("next if multiple states", function() {
        var state_instance = new StateHandler.StateHandler(STATES);
        expect(state_instance.current).toEqual(STATES[0]);
        state_instance.next();
        expect(state_instance.current).toEqual(STATES[1]);
        state_instance.next();
        expect(state_instance.current).toEqual(STATES[2]);
        state_instance.next();
        expect(state_instance.current).toEqual(STATES[2]);
    });

    it("hasNext if one states", function() {
        var state_instance = new StateHandler.StateHandler();
        expect(state_instance.hasNext()).toEqual(false);
    });

    it("hasNext if multiple states", function() {
        var state_instance = new StateHandler.StateHandler(STATES);
        expect(state_instance.hasNext()).toEqual(true);
        state_instance.next();
        expect(state_instance.hasNext()).toEqual(true);
        state_instance.next();
        expect(state_instance.hasNext()).toEqual(false);
    });


});
