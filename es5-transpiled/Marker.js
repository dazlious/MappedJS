(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Rectangle.js', './LatLng.js', './StateHandler.js', './Point.js', './Helper.js', 'jquery'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Rectangle.js'), require('./LatLng.js'), require('./StateHandler.js'), require('./Point.js'), require('./Helper.js'), require('jquery'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Rectangle, global.LatLng, global.StateHandler, global.Point, global.Helper, global.jquery);
        global.Marker = mod.exports;
    }
})(this, function(exports, _Rectangle, _LatLng, _StateHandler, _Point, _Helper, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Marker = undefined;

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
        _createClass(Marker, [{
            key: 'scaleX',
            get: function get() {
                return this.distortionFactor();
            }
        }, {
            key: 'viewOffset',
            get: function get() {
                return this.mapOffset();
            }
        }, {
            key: 'xOffset',
            get: function get() {
                return this.xOffsetToCenter();
            }
        }]);

        function Marker() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var $container = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var distortionFactor = arguments.length <= 2 || arguments[2] === undefined ? function() {
                return 1;
            } : arguments[2];
            var mapOffset = arguments.length <= 3 || arguments[3] === undefined ? function() {
                return new _Point.Point();
            } : arguments[3];
            var xOffsetToCenter = arguments.length <= 4 || arguments[4] === undefined ? function() {
                return 0;
            } : arguments[4];
            var calculateLatLngToPoint = arguments.length <= 5 || arguments[5] === undefined ? function() {
                return new _Point.Point();
            } : arguments[5];

            _classCallCheck(this, Marker);

            if (!data) {
                console.error("Can not initialize Marker", data);
            }

            this.stateHandler = new _StateHandler.StateHandler(STATES);

            this.calculateLatLngToPoint = calculateLatLngToPoint;
            this.distortionFactor = distortionFactor;
            this.mapOffset = mapOffset;
            this.xOffsetToCenter = xOffsetToCenter;

            this.size = data.size;
            this.img = data.icon;
            this.offset = data.offset;
            this.offset.add(new _Point.Point(-(this.size.x / 2), -this.size.y));
            this.latlng = data.latlng;

            this.position = this.calculateLatLngToPoint(this.latlng);

            this.icon = this.addMarkerToDOM($container);

            this.moveMarker();
        }

        _createClass(Marker, [{
            key: 'addMarkerToDOM',
            value: function addMarkerToDOM($container) {
                var icon = (0, _jquery2.default)("<div class='marker' />").css({
                    "width": this.size.x + 'px',
                    "height": this.size.y + 'px',
                    "margin-left": this.offset.x + 'px',
                    "margin-top": this.offset.y + 'px',
                    "background-image": 'url(' + this.img + ')',
                    "background-size": 2 * this.size.x + 'px ' + this.size.y + 'px'
                });
                if ($container) {
                    $container.append(icon);
                    this.stateHandler.next();
                }
                return icon;
            }
        }, {
            key: 'moveMarker',
            value: function moveMarker() {
                var p = new _Point.Point((this.position.x + this.viewOffset.x) * this.scaleX + this.xOffset, this.position.y + this.viewOffset.y);
                if (this.icon) {
                    this.icon.css({
                        transform: 'translate3d(' + p.x + 'px, ' + p.y + 'px, 0)'
                    });
                }
            }
        }]);

        return Marker;
    }();
});
