/*jshint -W067*/
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
        global.State = mod.exports;
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

    var STATES = new WeakMap();

    var _makePrivate = function _makePrivate(o) /*jshint -W067*/ {
        return STATES.set(o, {});
    };
    var _getPrivate = function _getPrivate(o) /*jshint -W067*/ {
        return STATES.get(o);
    };

    var State = exports.State = function() {

        /**
         * Constructor
         * @param  {Array} states_array=[{value: 0, description: 'Default'}] - [description]
         * @return {State} instance of State
         */

        function State() {
            /*jshint -W067*/
            var states_array = arguments.length <= 0 || arguments[0] === undefined ? [{
                value: 0,
                description: 'Default'
            }] : arguments[0];
            /*jshint -W067*/
            _classCallCheck(this, State);

            _makePrivate(this);
            _getPrivate(this).STATES = states_array;
            this.i = 0;
            return this;
        }

        /**
         * get current state
         * @return {Object} a state from STATES-array
         */


        _createClass(State, [{
            key: 'next',


            /**
             * get the next element
             * @return {State} instance of State
             */
            value: function next() {
                if (this.hasNext()) {
                    this.i++;
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
                return this.i < _getPrivate(this).STATES.length - 1;
            }
        }, {
            key: 'current',
            get: function get() {
                return _getPrivate(this).STATES[this.i];
            }
        }]);

        return State;
    }();
});
