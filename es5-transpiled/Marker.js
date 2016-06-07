(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Events.js', './Helper.js', './Point.js', './Rectangle.js', './DataEnrichment.js', './Drawable.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Events.js'), require('./Helper.js'), require('./Point.js'), require('./Rectangle.js'), require('./DataEnrichment.js'), require('./Drawable.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Events, global.Helper, global.Point, global.Rectangle, global.DataEnrichment, global.Drawable);
        global.Marker = mod.exports;
    }
})(this, function(exports, _Events, _Helper, _Point, _Rectangle, _DataEnrichment, _Drawable2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Marker = undefined;

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

    var Marker = exports.Marker = function(_Drawable) {
        _inherits(Marker, _Drawable);

        _createClass(Marker, [{
            key: 'boundingBox',
            get: function get() {
                var bBox = this.icon.getBoundingClientRect();
                var parentBBox = this.container.getBoundingClientRect();
                return new _Rectangle.Rectangle(bBox.left - parentBBox.left, bBox.top - parentBBox.top, bBox.width, bBox.height).scaleCenter(1.2);
            }

            /**
             * @constructor
             * @param  {Object} data = DataEnrichment.DATA_MARKER - enriched data
             * @param  {View} _instance = parent instance - instance of parent view
             * @return {Marker} - instance of Marker for chaining
             */

        }]);

        function Marker(_ref) {
            var _ret;

            var _ref$data = _ref.data;
            var data = _ref$data === undefined ? _DataEnrichment.DataEnrichment.DATA_MARKER : _ref$data;
            var container = _ref.container;
            var id = _ref.id;

            _classCallCheck(this, Marker);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Marker).call(this, {
                id: id
            }));

            _this.container = container;

            _this.uniqueID = Marker.count;
            Marker.count++;

            _this.size = data.size;

            _this.hover = data.hover;
            if (_this.hover) _this.size.divide(2, 1);

            _this.img = data.icon;
            _this.offset = data.offset.add(new _Point.Point(-(_this.size.x / 2), -_this.size.y));
            _this.latlng = data.latlng;

            _this.content = data.content;
            _this.icon = _this.addMarkerToDOM(container);

            return _ret = _this.bindEvents().positionMarker(), _possibleConstructorReturn(_this, _ret);
        }

        /**
         * binds all events
         * @return {Marker} instance of Marker for chaining
         */


        _createClass(Marker, [{
            key: 'bindEvents',
            value: function bindEvents() {
                var _this2 = this;

                if (this.content.length) {
                    this.icon.setAttribute("data-id", 'marker-' + this.uniqueID);
                    this.eventManager.subscribe('marker-' + this.uniqueID, this.action.bind(this));
                    this.eventManager.subscribe(_Events.Events.Marker.DEACTIVATE, function() {
                        _this2.icon.classList.remove("active");
                    });
                }
                return this;
            }
        }, {
            key: 'action',
            value: function action() {
                this.eventManager.publish(_Events.Events.ToolTip.OPEN, this.content);
                this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
                this.icon.classList.add("active");
            }

            /**
             * adds a marker to the DOM
             * @param {Object} container - container to append to
             * @returns {Object} DOM-selector of append markup
             */

        }, {
            key: 'addMarkerToDOM',
            value: function addMarkerToDOM(container) {
                var icon = document.createElement("div");
                icon.classList.add("marker");
                _Helper.Helper.css(icon, {
                    "width": this.size.x + 'px',
                    "height": this.size.y + 'px',
                    "margin-left": this.offset.x + 'px',
                    "margin-top": this.offset.y + 'px',
                    "transform": 'translateZ(0)',
                    "background-image": 'url(' + this.img + ')',
                    "background-size": (this.hover ? this.size.x * 2 : this.size.x) + 'px ' + this.size.y + 'px'
                });
                if (container) {
                    _Helper.Helper.hide(icon);
                    container.appendChild(icon);
                }
                return icon;
            }

            /**
             * set initial position of this marker
             * @return {Marker} instance of Marker for chaining
             */

        }, {
            key: 'positionMarker',
            value: function positionMarker() {
                this.position = this.info.convertLatLngToPoint(this.latlng);
                var p = this.position.clone.divide(this.view.width, this.view.height).multiply(100);
                _Helper.Helper.css(this.icon, {
                    "left": p.x + '%',
                    "top": p.y + '%'
                });
                _Helper.Helper.show(this.icon);
                return this;
            }
        }]);

        return Marker;
    }(_Drawable2.Drawable);

    Marker.count = 0;
});
