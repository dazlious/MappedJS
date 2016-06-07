(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Events.js', './Helper.js', './Publisher.js', './MapInformation.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Events.js'), require('./Helper.js'), require('./Publisher.js'), require('./MapInformation.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Events, global.Helper, global.Publisher, global.MapInformation);
        global.Drawable = mod.exports;
    }
})(this, function(exports, _Events, _Helper, _Publisher, _MapInformation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Drawable = undefined;

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

    var Drawable = exports.Drawable = function() {
        _createClass(Drawable, [{
            key: 'view',
            get: function get() {
                return this.info.get().view;
            }
        }, {
            key: 'viewport',
            get: function get() {
                return this.info.get().viewport;
            }
        }, {
            key: 'distortionFactor',
            get: function get() {
                return this.info.get().distortionFactor;
            }
        }, {
            key: 'offsetToCenter',
            get: function get() {
                return this.info.get().offsetToCenter;
            }
        }, {
            key: 'center',
            get: function get() {
                return this.info.get().center;
            }
        }, {
            key: 'zoomFactor',
            get: function get() {
                return this.info.get().zoomFactor;
            }
        }, {
            key: 'bounds',
            get: function get() {
                return this.info.get().bounds;
            }
        }]);

        function Drawable(_ref) {
            var id = _ref.id;

            _classCallCheck(this, Drawable);

            this.id = id;
            this.info = new _MapInformation.MapInformation(this.id);
            this.eventManager = new _Publisher.Publisher(this.id);
            return this;
        }

        _createClass(Drawable, [{
            key: 'draw',
            value: function draw() {
                return this;
            }
        }]);

        return Drawable;
    }();
});
