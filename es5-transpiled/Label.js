(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Events.js', './Helper.js', './Drawable.js', './LatLng.js', './Point.js', './Rectangle.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Events.js'), require('./Helper.js'), require('./Drawable.js'), require('./LatLng.js'), require('./Point.js'), require('./Rectangle.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Events, global.Helper, global.Drawable, global.LatLng, global.Point, global.Rectangle);
        global.Label = mod.exports;
    }
})(this, function(exports, _Events, _Helper, _Drawable2, _LatLng, _Point, _Rectangle) {
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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Label = exports.Label = function(_Drawable) {
        _inherits(Label, _Drawable);

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
            key: 'boundingBox',
            get: function get() {
                var x = this.position.x + this.offset.x;
                var y = this.position.y + this.offset.y;
                var sizeX = this.icon.size.x || this.icon.size;
                var sizeY = this.icon.size.y || this.icon.size;

                return new _Rectangle.Rectangle(x, y, sizeX, sizeY).scaleCenter(2);
            }

            /**
             * @constructor
             * @return {Label} instance of Label for chaining
             */

        }]);

        function Label(_ref) {
            var _ret;

            var settings = _ref.settings;
            var context = _ref.context;
            var id = _ref.id;

            _classCallCheck(this, Label);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Label).call(this, {
                id: id
            }));

            _this.id = id;

            _this.context = context;

            _this.latlng = settings.position;
            _this.text = settings.text;
            _this.icon = settings.icon;
            _this.content = settings.content;
            _this.visibility = settings.visibility;
            _this.offset = new _Point.Point();

            if (_this.icon && _this.icon.type === "circle") _this.drawIconType = _this.drawCircleIcon(_this.icon.size);
            else if (_this.icon && _this.icon.type === "square") _this.drawIconType = _this.drawSquareIcon(_this.icon.size);
            else if (_this.icon && _this.icon.type === "image") {
                _this.drawIconType = function() {};
                _Helper.Helper.loadImage(_this.icon.url, function(img) {
                    _this.drawIconType = _this.drawImageIcon(img, _this.icon.size, _this.icon.offset);
                });
            }
            _this.drawElements = _this.decideWhatToDraw(_this.text, _this.icon);

            return _ret = _this, _possibleConstructorReturn(_this, _ret);
        }

        _createClass(Label, [{
            key: 'getNearestPositionToCenter',
            value: function getNearestPositionToCenter() {
                var _this2 = this;

                this.latlng = this.latlng.sort(function(a, b) {
                    return _this2.center.distance(a) - _this2.center.distance(b);
                });
                return this.latlng[0];
            }
        }, {
            key: 'openToolTip',
            value: function openToolTip() {
                this.eventManager.publish(_Events.Events.ToolTip.OPEN, this.content);
            }
        }, {
            key: 'draw',
            value: function draw() {
                if (this.level >= this.visibility.min && this.level <= this.visibility.max) {
                    var pos = this.position;
                    var textPos = pos.clone.add(this.text.offset);

                    this.context.beginPath();
                    this.drawElements(pos, textPos);
                    this.context.closePath();
                }
                return this;
            }
        }, {
            key: 'decideWhatToDraw',
            value: function decideWhatToDraw(text, icon) {
                var _this3 = this;

                if (text && icon) {
                    return function(pos, textPos) {
                        _this3.drawText(textPos);
                        _this3.drawIcon(pos);
                    };
                } else if (icon) {
                    return function(pos) {
                        return _this3.drawIcon(pos);
                    };
                } else if (text) {
                    return function(pos, textPos) {
                        return _this3.drawText(textPos);
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
                var _this4 = this;

                return function(pos) {
                    return _this4.context.arc(pos.x, pos.y, size, 0, 2 * Math.PI, false);
                };
            }
        }, {
            key: 'drawSquareIcon',
            value: function drawSquareIcon(size) {
                var _this5 = this;

                return function(pos) {
                    return _this5.context.rect(pos.x, pos.y, size, size);
                };
            }
        }, {
            key: 'drawImageIcon',
            value: function drawImageIcon(image, size, offset) {
                var _this6 = this;

                this.offset = offset;
                return function(pos) {
                    return _this6.context.drawImage(image, pos.x + offset.x, pos.y + offset.y, size.x, size.y);
                };
            }
        }, {
            key: 'hit',
            value: function hit(point) {
                return this.boundingBox.containsPoint(point);
            }
        }]);

        return Label;
    }(_Drawable2.Drawable);
});
