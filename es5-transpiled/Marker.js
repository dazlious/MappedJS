(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Point.js', './Publisher.js', './StateHandler.js', './DataEnrichment.js', './ToolTip.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Point.js'), require('./Publisher.js'), require('./StateHandler.js'), require('./DataEnrichment.js'), require('./ToolTip.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Point, global.Publisher, global.StateHandler, global.DataEnrichment, global.ToolTip);
        global.Marker = mod.exports;
    }
})(this, function(exports, _jQuery, _Point, _Publisher, _StateHandler, _DataEnrichment, _ToolTip) {
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

    /**
     * States of a marker
     * @type {Array}
     */
    var STATES = [{
        value: 0,
        description: 'Loading'
    }, {
        value: 0,
        description: 'Initialized'
    }, {
        value: 1,
        description: 'Ready'
    }];

    var Marker = exports.Marker = function() {

        /**
         * Constructor
         * @param  {Object} data = DataEnrichment.DATA_MARKER - enriched data
         * @param  {View} _instance = parent instance - instance of parent view
         * @return {Marker} - instance of Marker for chaining
         */

        function Marker() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? _DataEnrichment.DataEnrichment.DATA_MARKER : arguments[0];

            var _instance = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            _classCallCheck(this, Marker);

            this.stateHandler = new _StateHandler.StateHandler(STATES);

            if (!_instance) {
                throw new Error('Tile needs an instance');
            }
            this.instance = _instance;

            this.size = data.size;
            this.hover = data.hover;
            if (this.hover) {
                this.size.divide(2, 1);
            }
            this.img = data.icon;
            this.offset = data.offset;
            this.offset.add(new _Point.Point(-(this.size.x / 2), -this.size.y));
            this.latlng = data.latlng;

            this.content = data.content;
            this.position = this.instance.convertLatLngToPoint(this.latlng);

            this.$icon = this.addMarkerToDOM(this.instance.$markerContainer);

            this.bindEvents();

            this.positionMarker();

            return this;
        }

        _createClass(Marker, [{
            key: 'bindEvents',
            value: function bindEvents() {
                this.eventManager = new _Publisher.Publisher();
                this.$icon.on("click", function() {
                    this.eventManager.publish(_ToolTip.ToolTip.EVENT.OPEN, this.content);
                }.bind(this));
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
                    this.stateHandler.next();
                }
                return icon;
            }

            /**
             * set initial position of this marker
             * @return {Marker} - instance of Marker for chaining
             */

        }, {
            key: 'positionMarker',
            value: function positionMarker() {
                this.position = this.instance.convertLatLngToPoint(this.latlng);
                //const p = new Point((this.position.x + this.instance.currentView.x) * this.instance.distortionFactor + this.instance.offsetToCenter, this.position.y + this.instance.currentView.y);
                if (this.$icon) {
                    this.$icon.css({
                        "left": this.position.x / this.instance.currentView.width * 100 + '%',
                        "top": this.position.y / this.instance.currentView.height * 100 + '%'
                            //transform: `translate3d(${p.x}px, ${p.y}px, 0)`
                    });
                    this.$icon.show();
                }
                return this;
            }
        }]);

        return Marker;
    }();
});
