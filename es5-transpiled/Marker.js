(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Events.js', './Helper.js', './Point.js', './Rectangle.js', './Publisher.js', './DataEnrichment.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Events.js'), require('./Helper.js'), require('./Point.js'), require('./Rectangle.js'), require('./Publisher.js'), require('./DataEnrichment.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Events, global.Helper, global.Point, global.Rectangle, global.Publisher, global.DataEnrichment);
        global.Marker = mod.exports;
    }
})(this, function(exports, _jQuery, _Events, _Helper, _Point, _Rectangle, _Publisher, _DataEnrichment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Marker = undefined;

    var _jQuery2 = _interopRequireDefault(_jQuery);

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

    var Marker = exports.Marker = function() {
        _createClass(Marker, [{
            key: 'boundingBox',
            get: function get() {
                var bBox = this.icon.getBoundingClientRect();
                return new _Rectangle.Rectangle(bBox.left, bBox.top, bBox.width, bBox.height).scaleCenter(1.2);
            }

            /**
             * @constructor
             * @param  {Object} data = DataEnrichment.DATA_MARKER - enriched data
             * @param  {View} _instance = parent instance - instance of parent view
             * @return {Marker} - instance of Marker for chaining
             */

        }]);

        function Marker() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? _DataEnrichment.DataEnrichment.DATA_MARKER : arguments[0];

            var _instance = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            _classCallCheck(this, Marker);

            if (!_instance) throw new Error('Tile needs an instance');
            this.instance = _instance;

            this.id = Marker.count;
            Marker.count++;

            this.size = data.size;

            this.hover = data.hover;
            if (this.hover) this.size.divide(2, 1);

            this.img = data.icon;
            this.offset = data.offset.add(new _Point.Point(-(this.size.x / 2), -this.size.y));
            this.latlng = data.latlng;

            this.content = data.content;
            this.$icon = this.addMarkerToDOM(this.instance.$markerContainer);
            this.icon = this.$icon[0];

            return this.bindEvents().positionMarker();
        }

        /**
         * binds all events
         * @return {Marker} instance of Marker for chaining
         */


        _createClass(Marker, [{
            key: 'bindEvents',
            value: function bindEvents() {
                var _this = this;

                this.eventManager = new _Publisher.Publisher();

                if (this.content.length) {
                    this.$icon.data("mjs-action", this.action.bind(this));
                    this.eventManager.subscribe(_Events.Events.Marker.DEACTIVATE, function() {
                        _this.$icon.removeClass("active");
                    });
                }

                return this;
            }
        }, {
            key: 'action',
            value: function action() {
                this.eventManager.publish(_Events.Events.ToolTip.OPEN, this.content);
                this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
                this.$icon.addClass("active");
            }

            /**
             * adds a marker to the DOM
             * @param {Object} $container - container to append to (jQuery selector)
             * @returns {Object} jQuery-selector of append markup
             */

        }, {
            key: 'addMarkerToDOM',
            value: function addMarkerToDOM($container) {
                var icon = (0, _jQuery2.default)("<div class='marker' />").css({
                    "width": this.size.x + 'px',
                    "height": this.size.y + 'px',
                    "margin-left": this.offset.x + 'px',
                    "margin-top": this.offset.y + 'px',
                    "background-image": 'url(' + this.img + ')',
                    "background-size": (this.hover ? this.size.x * 2 : this.size.x) + 'px ' + this.size.y + 'px'
                });
                if ($container) {
                    icon.hide();
                    $container.append(icon);
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
                this.position = this.instance.view.convertLatLngToPoint(this.latlng);
                if (this.$icon) {
                    this.$icon.css({
                        "left": this.position.x / this.instance.view.currentView.width * 100 + '%',
                        "top": this.position.y / this.instance.view.currentView.height * 100 + '%'
                    }).show();
                }
                return this;
            }
        }]);

        return Marker;
    }();

    Marker.count = 0;
});
