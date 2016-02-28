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

var instance = null;

var Publisher = exports.Publisher = function() {
    function Publisher() {
        _classCallCheck(this, Publisher);

        if (!instance) {
            this.subscribers = {
                any: []
            };
            instance = this;
        }

        return instance;
    }

    _createClass(Publisher, [{
        key: "subscribe",
        value: function subscribe() {
            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
            var fn = arguments.length <= 1 || arguments[1] === undefined ? function() {} : arguments[1];

            if (!this.subscribers[type]) {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push(fn);
            return this;
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe() {
            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
            var fn = arguments.length <= 1 || arguments[1] === undefined ? function() {} : arguments[1];

            this.handle(Publisher.UNSUBSCRIBE, type, fn);
            return this;
        }
    }, {
        key: "publish",
        value: function publish() {
            var type = arguments.length <= 0 || arguments[0] === undefined ? "any" : arguments[0];
            var arg = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            this.handle(Publisher.PUBLISH, type, arg);
            return this;
        }
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
    }]);

    return Publisher;
}();

Publisher.PUBLISH = "publish";
Publisher.UNSUBSCRIBE = "unsubscribe";
