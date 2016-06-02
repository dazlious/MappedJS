(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Events.js', './Helper.js', './LatLng.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Events.js'), require('./Helper.js'), require('./LatLng.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Events, global.Helper, global.LatLng);
        global.Label = mod.exports;
    }
})(this, function(exports, _Events, _Helper, _LatLng) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Label = undefined;

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

    var Label = exports.Label = function() {
        _createClass(Label, [{
            key: 'position',
            get: function get() {
                return this.instance.view.convertLatLngToPoint(this.nearestPositionToCenter).translate(this.instance.view.currentView.x, this.instance.view.currentView.y).multiply(this.instance.view.distortionFactor, 1).translate(this.instance.view.offsetToCenter, 0);
            }
        }, {
            key: 'nearestPositionToCenter',
            get: function get() {
                return this.latlng instanceof _LatLng.LatLng ? this.latlng : this.getNearestPositionToCenter();
            }

            /**
             * @constructor
             * @return {Label} instance of Label for chaining
             */

        }]);

        function Label(_ref) {
            var settings = _ref.settings;
            var instance = _ref.instance;
            var context = _ref.context;

            _classCallCheck(this, Label);

            this.instance = instance;
            this.context = context;

            this.latlng = settings.position;
            this.text = settings.text;
            this.icon = settings.icon;

            return this;
        }

        _createClass(Label, [{
            key: 'getNearestPositionToCenter',
            value: function getNearestPositionToCenter() {
                var _this = this;

                this.latlng = this.latlng.sort(function(a, b) {
                    var center = _this.instance.view.center.clone.multiply(-1);
                    return center.distance(a) - center.distance(b);
                });
                return this.latlng[0];
            }
        }, {
            key: 'draw',
            value: function draw() {
                var pos = this.position;
                var textPos = pos.clone.add(this.text.offset);

                this.context.beginPath();

                if (this.text) this.drawText(textPos);
                if (this.icon) this.drawIcon(pos);

                this.context.closePath();

                return this;
            }
        }, {
            key: 'drawText',
            value: function drawText(pos) {
                this.context.shadowColor = this.text.shadow.color;
                this.context.shadowBlur = this.text.shadow.blur;
                this.context.textAlign = this.text.align;
                this.context.textBaseline = this.text.baseline;
                this.context.font = this.text.font;
                this.context.fillText(this.text.content, pos.x, pos.y);
            }
        }, {
            key: 'drawIcon',
            value: function drawIcon(pos) {
                this.context.shadowColor = this.icon.shadow.color;
                this.context.shadowBlur = this.icon.shadow.blur;
                this.context.fillStyle = this.icon.color;
                if (this.icon.type === "circle") this.context.arc(pos.x, pos.y, this.icon.size, 0, 2 * Math.PI, false);
                if (this.icon.type === "square") this.context.rect(pos.x, pos.y, this.icon.size, this.icon.size);
                this.context.fill();
            }
        }]);

        return Label;
    }();
});
