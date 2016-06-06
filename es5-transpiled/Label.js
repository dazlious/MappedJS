(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Events.js', './Helper.js', './LatLng.js', './MapInformation.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Events.js'), require('./Helper.js'), require('./LatLng.js'), require('./MapInformation.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Events, global.Helper, global.LatLng, global.MapInformation);
        global.Label = mod.exports;
    }
})(this, function(exports, _Events, _Helper, _LatLng, _MapInformation) {
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
                return this.info.convertLatLngToPoint(this.nearestPositionToCenter).translate(this.view.x, this.view.y).multiply(this.distortionFactor, 1).translate(this.offsetToCenter, 0);
            }
        }, {
            key: 'nearestPositionToCenter',
            get: function get() {
                return this.latlng instanceof _LatLng.LatLng ? this.latlng : this.getNearestPositionToCenter();
            }
        }, {
            key: 'view',
            get: function get() {
                return this.info.get().view;
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

            /**
             * @constructor
             * @return {Label} instance of Label for chaining
             */

        }]);

        function Label(_ref) {
            var _this = this;

            var settings = _ref.settings;
            var context = _ref.context;
            var id = _ref.id;

            _classCallCheck(this, Label);

            this.id = id;
            this.info = new _MapInformation.MapInformation(this.id);

            this.context = context;

            this.latlng = settings.position;
            this.text = settings.text;
            this.icon = settings.icon;

            if (this.icon && this.icon.type === "circle") this.drawIconType = this.drawCircleIcon(this.icon.size);
            else if (this.icon && this.icon.type === "square") this.drawIconType = this.drawSquareIcon(this.icon.size);
            else if (this.icon && this.icon.type === "image") {
                this.drawIconType = function() {};
                _Helper.Helper.loadImage(this.icon.url, function(img) {
                    _this.drawIconType = _this.drawImageIcon(img, _this.icon.size, _this.icon.offset);
                });
            }
            this.drawElements = this.decideWhatToDraw(this.text, this.icon);

            return this;
        }

        _createClass(Label, [{
            key: 'getNearestPositionToCenter',
            value: function getNearestPositionToCenter() {
                var center = this.center.clone.multiply(-1);
                this.latlng = this.latlng.sort(function(a, b) {
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
                this.drawElements(pos, textPos);
                this.context.closePath();

                return this;
            }
        }, {
            key: 'decideWhatToDraw',
            value: function decideWhatToDraw(text, icon) {
                var _this2 = this;

                if (text && icon) {
                    return function(pos, textPos) {
                        _this2.drawText(textPos);
                        _this2.drawIcon(pos);
                    };
                } else if (icon) {
                    return function(pos) {
                        return _this2.drawIcon(pos);
                    };
                } else if (text) {
                    return function(pos, textPos) {
                        return _this2.drawText(textPos);
                    };
                }
            }
        }, {
            key: 'drawText',
            value: function drawText(pos) {
                this.context.textAlign = this.text.align;
                this.context.textBaseline = this.text.baseline;
                this.context.font = this.text.font;
                this.context.fillStyle = this.text.color;
                this.context.fillText(this.text.content, pos.x, pos.y);
            }
        }, {
            key: 'drawIcon',
            value: function drawIcon(pos) {
                this.context.fillStyle = this.icon.color;
                this.drawIconType(pos);
                this.context.fill();
            }
        }, {
            key: 'drawCircleIcon',
            value: function drawCircleIcon(size) {
                var _this3 = this;

                return function(pos) {
                    return _this3.context.arc(pos.x, pos.y, size, 0, 2 * Math.PI, false);
                };
            }
        }, {
            key: 'drawSquareIcon',
            value: function drawSquareIcon(size) {
                var _this4 = this;

                return function(pos) {
                    return _this4.context.rect(pos.x, pos.y, size, size);
                };
            }
        }, {
            key: 'drawImageIcon',
            value: function drawImageIcon(image, size, offset) {
                var _this5 = this;

                return function(pos) {
                    return _this5.context.drawImage(image, pos.x + offset.x, pos.y + offset.y, size.x, size.y);
                };
            }
        }]);

        return Label;
    }();
});
