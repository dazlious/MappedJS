(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', './Publisher.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('./Publisher.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.Publisher);
        global.Interact = mod.exports;
    }
})(this, function(exports, _jquery, _Publisher) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Interact = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var Interact = exports.Interact = function() {
        _createClass(Interact, [{
            key: 'isIETouch',
            get: function get() {
                return navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
            }
        }, {
            key: 'isTouch',
            get: function get() {
                return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
            }
        }, {
            key: 'isMouse',
            get: function get() {
                return 'onmousedown' in window;
            }
        }, {
            key: 'scrollEventName',
            get: function get() {
                return "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
            }
        }]);

        function Interact() {
            var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            _classCallCheck(this, Interact);

            this.settings = {
                container: ".gesturizer",
                timing: {
                    tap: 200,
                    hold: 500,
                    swipe: 300,
                    flick: 25,
                    pinch: 50
                },
                cb: {
                    tap: false,
                    tapHold: false,
                    doubletap: false,
                    hold: false,
                    pan: false,
                    swipe: false,
                    flick: false,
                    zoom: false,
                    wheel: false,
                    pinch: false
                }
            };
            _jquery2.default.extend(true, this.settings, settings || {});
            return this;
        }

        _createClass(Interact, [{
            key: 'getEvent',
            value: function getEvent(e) {
                _jquery2.default.event.fix(e);
                if (e.originalEvent.touches && e.originalEvent.touches.length === 0) {
                    return e.originalEvent.changedTouches || e.originalEvent;
                }
                return e.originalEvent.touches || e.originalEvent.changedTouches || e.originalEvent;
            }
        }]);

        return Interact;
    }();
});
