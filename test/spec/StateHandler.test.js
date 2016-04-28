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

    it("length is working", function() {
        expect(new StateHandler.StateHandler().length).toEqual(1);
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

    it("hasPrevious is false if initial state is assigned", function() {
        var state_instance = new StateHandler.StateHandler();
        expect(state_instance.hasPrevious()).toEqual(false);
    });

    it("changeTo returns same state, if it is out of range", function() {
        var state_instance = new StateHandler.StateHandler(STATES);
        expect(state_instance.changeTo(-1).current).toEqual(STATES[0]);
        expect(state_instance.changeTo(STATES.length).current).toEqual(STATES[0]);
        expect(state_instance.changeTo(2).current).toEqual(STATES[2]);
    });

    it("changeTo works", function() {
        var state_instance = new StateHandler.StateHandler(STATES);
        expect(state_instance.changeTo(2).current).toEqual(STATES[2]);
        expect(state_instance.changeTo(0).current).toEqual(STATES[0]);
    });

    it("previous if multiple states", function() {
        var state_instance = new StateHandler.StateHandler(STATES);
        expect(state_instance.changeTo(2).current).toEqual(STATES[2]);
        state_instance.previous();
        expect(state_instance.current).toEqual(STATES[1]);
        state_instance.previous();
        expect(state_instance.current).toEqual(STATES[0]);
        state_instance.previous();
        expect(state_instance.current).toEqual(STATES[0]);
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
