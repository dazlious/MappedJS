"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var State = exports.State = function() {

    /**
     * Constructor
     * @param  {Array} states_array=[] - [description]
     * @return {State} instance of State
     */

    function State() {
        var states_array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, State);

        this.STATES = states_array;
        this.i = 0;
        this.state = this.getState();
        return this;
    }

    /**
     * get current state
     * @return {Object} a state from STATES-array
     */


    _createClass(State, [{
        key: "getState",
        value: function getState() {
            return this.STATES[this.i];
        }

        /**
         * get the next element
         * @return {State} instance of State
         */

    }, {
        key: "next",
        value: function next() {
            if (this.hasNext()) {
                this.i++;
            }
            this.state = this.getState();
            return this;
        }

        /**
         * checks if there is a next element
         * @return {Boolean} wheter there is a next state or not
         */

    }, {
        key: "hasNext",
        value: function hasNext() {
            return this.i < this.STATES.length;
        }
    }]);

    return State;
}();
