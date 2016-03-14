/*jshint -W067*/
(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.Publisher = mod.exports;
    }
})(this, function(exports) {
    "use strict";

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

    /**
     * singleton instance
     * @type {Publisher}
     */
    var instance = null;

    var Publisher = exports.Publisher = function() {

        /**
         * Constructor
         * @return {Publisher} instance of Publisher
         */

        function Publisher() {
            /*jshint -W067*/
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
         * @return {Publisher} instance of Publisher
         */


        _createClass(Publisher, [{
            key: "subscribe",
            value: function subscribe() {
                /*jshint -W067*/
                var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
                /*jshint -W067*/
                var fn = arguments.length <= 1 || arguments[1] === undefined ? function() {} : arguments[1];

                if (!this.subscribers[type]) {
                    this.subscribers[type] = [];
                }
                this.subscribers[type].push(fn);
                return this;
            }

            /**
             * unsubscribe from a topic
             * @param  {string} type="any" - a topic
             * @param  {Function} fn=function(){} - a function to callback
             * @return {Publisher} instance of Publisher
             */

        }, {
            key: "unsubscribe",
            value: function unsubscribe() {
                /*jshint -W067*/
                var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
                /*jshint -W067*/
                var fn = arguments.length <= 1 || arguments[1] === undefined ? function() {} : arguments[1];

                this.handle(Publisher.UNSUBSCRIBE, type, fn);
                return this;
            }

            /**
             * publish to a topic
             * @param  {string} type="any" - a topic
             * @param  {Function} arg=[] - list of parameters
             * @return {Publisher} instance of Publisher
             */

        }, {
            key: "publish",
            value: function publish() {
                /*jshint -W067*/
                var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
                /*jshint -W067*/
                var arg = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

                this.handle(Publisher.PUBLISH, type, arg);
                return this;
            }

            /**
             * handle subscribe to a topic
             * @param  {string} action - eventname
             * @param  {string} type="any" - a topic
             * @param  {Object} a function to callback or arguments
             * @return {Publisher} instance of Publisher
             */

        }, {
            key: "handle",
            value: function handle(action, type, data) {
                var subs = this.subscribers[type] ? this.subscribers[type] : [];
                for (var i = 0; i < subs.length; i++) {
                    if (action === Publisher.PUBLISH) {
                        subs[i](data);
                    } else {
                        if (subs[i] === data) {
                            subs.splice(i, 1);
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

    /**
     * Eventname for publishing
     * @type {String}
     */
    Publisher.PUBLISH = "publish";

    /**
     * Eventname for unsubscribing
     * @type {String}
     */
    Publisher.UNSUBSCRIBE = "unsubscribe";
});
