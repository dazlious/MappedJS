(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.StateHandler = mod.exports;
    }
})(this, function(exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

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

    var StateHandler = exports.StateHandler = function() {
        _createClass(StateHandler, [{
            key: 'current',


            /**
             * get current state
             * @return {Object} current state from STATES-array
             */
            get: function get() {
                return this.states[this.i];
            }

            /**
             * get number of states
             * @return {number} number of states
             */

        }, {
            key: 'length',
            get: function get() {
                return this.states.length;
            }

            /**
             * Constructor
             * @param  {Array} states_array=[{value: 0, description: 'Default'}] - [description]
             * @return {StateHandler} instance of StateHandler
             */

        }]);

        function StateHandler() {
            var states_array = arguments.length <= 0 || arguments[0] === undefined ? [{
                value: 0,
                description: 'Default'
            }] : arguments[0];

            _classCallCheck(this, StateHandler);

            this.states = states_array;
            this.i = 0;
            return this;
        }

        /**
         * get the next element
         * @return {StateHandler} instance of StateHandler
         */


        _createClass(StateHandler, [{
            key: 'next',
            value: function next() {
                if (this.hasNext()) {
                    this.i++;
                }
                return this;
            }

            /**
             * get the previous element
             * @return {StateHandler} instance of StateHandler
             */

        }, {
            key: 'previous',
            value: function previous() {
                if (this.hasPrevious()) {
                    this.i--;
                }
                return this;
            }

            /**
             * change the state to specified state
             * @param {number} state -
             * @return {StateHandler} instance of StateHandler
             */

        }, {
            key: 'changeTo',
            value: function changeTo(state) {
                if (state >= 0 && state < this.length) {
                    this.i = state;
                }
                return this;
            }

            /**
             * checks if there is a next element
             * @return {Boolean} wheter there is a next state or not
             */

        }, {
            key: 'hasNext',
            value: function hasNext() {
                return this.i < this.length - 1;
            }

            /**
             * checks if there is a previous element
             * @return {Boolean} wheter there is a previous state or not
             */

        }, {
            key: 'hasPrevious',
            value: function hasPrevious() {
                return this.i > 0;
            }
        }]);

        return StateHandler;
    }();
});
