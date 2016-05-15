(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "./Events.js"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./Events.js"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Events);
        global.Publisher = mod.exports;
    }
})(this, function(exports, _Events) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Publisher = undefined;

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

    /**
     * singleton instance
     * @type {Publisher}
     */
    var instance = null;

    /**
     * @author Michael Duve <mduve@designmail.net>
     * @file Publish/Subscribe pattern
     * @copyright Michael Duve 2016
     */

    var Publisher = exports.Publisher = function() {

        /**
         * @constructor
         * @return {Publisher} singleton instance of Publisher for chaining
         */

        function Publisher() {
            _classCallCheck(this, Publisher);

            if (!instance) {
                this.subscribers = {};
                instance = this;
            }
            return instance;
        }

        /**
         * subscribe to a topic
         * @param  {string} type="any" - a topic
         * @param  {Function} fn=function(){} - a function to callback
         * @return {Publisher} instance of Publisher for chaining
         */


        _createClass(Publisher, [{
            key: "subscribe",
            value: function subscribe() {
                var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
                var fn = arguments.length <= 1 || arguments[1] === undefined ? function() {} : arguments[1];

                if (!this.subscribers[type]) this.subscribers[type] = [];
                this.subscribers[type].push(fn);
                return this;
            }

            /**
             * unsubscribe from a topic
             * @param  {string} type="any" - a topic
             * @param  {Function} fn=function(){} - a function to callback
             * @return {Publisher} instance of Publisher for chaining
             */

        }, {
            key: "unsubscribe",
            value: function unsubscribe() {
                var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
                var fn = arguments.length <= 1 || arguments[1] === undefined ? function() {} : arguments[1];

                return this.handle(_Events.Events.Publisher.UNSUBSCRIBE, type, fn);
            }

            /**
             * publish to a topic
             * @param  {string} type="any" - a topic
             * @param  {Function} arg=[] - list of parameters
             * @return {Publisher} instance of Publisher for chaining
             */

        }, {
            key: "publish",
            value: function publish() {
                var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
                var arg = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

                return this.handle(_Events.Events.Publisher.PUBLISH, type, arg);
            }

            /**
             * handle subscribe to a topic
             * @param  {string} action - eventname
             * @param  {string} type="any" - a topic
             * @param  {Object} a function to callback or arguments
             * @return {Publisher} instance of Publisher for chaining
             */

        }, {
            key: "handle",
            value: function handle(action, type, data) {
                var subs = this.subscribers[type] ? this.subscribers[type] : [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = subs.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var i = _step$value[0];
                        var fn = _step$value[1];

                        if (action === _Events.Events.Publisher.PUBLISH) {
                            fn(data);
                        } else {
                            if (fn === data) subs.splice(i, 1);
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
             * destroys singleton instance
             */

        }, {
            key: "destroy",
            value: function destroy() {
                instance = null;
            }
        }]);

        return Publisher;
    }();
});
