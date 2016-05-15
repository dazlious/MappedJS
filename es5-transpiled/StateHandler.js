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

    var _slicedToArray = function() {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function(arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

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
             * @constructor
             * @param  {Array} states_array=[{value: 0, description: 'Default'}] - [description]
             * @return {StateHandler} instance of StateHandler for chaining
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
            this.lastState = this.current;
            return this;
        }

        /**
         * get the next element
         * @return {StateHandler} instance of StateHandler for chaining
         */


        _createClass(StateHandler, [{
            key: 'next',
            value: function next() {
                this.lastState = this.current;
                if (this.hasNext()) this.i++;
                return this;
            }

            /**
             * get the previous element
             * @return {StateHandler} instance of StateHandler for chaining
             */

        }, {
            key: 'previous',
            value: function previous() {
                this.lastState = this.current;
                if (this.hasPrevious()) this.i--;
                return this;
            }

            /**
             * change the state to specified state
             * @param {number} state - index of state in array
             * @return {StateHandler} instance of StateHandler for chaining
             */

        }, {
            key: 'changeTo',
            value: function changeTo(state) {
                if (state >= 0 && state < this.length) this.i = state;
                return this;
            }

            /**
             * change the state to specified value of specified property
             * @param {object} prop - specified property to be changed
             * @param {object} value - specified value that should be changed to
             * @return {StateHandler} instance of StateHandler for chaining
             */

        }, {
            key: 'changeToValue',
            value: function changeToValue(prop, value) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var i = _step$value[0];
                        var element = _step$value[1];

                        if (value === element[prop]) {
                            this.i = i;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
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
