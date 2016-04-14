(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Rectangle.js', './LatLng.js', './StateHandler.js', './Point.js', 'jquery'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Rectangle.js'), require('./LatLng.js'), require('./StateHandler.js'), require('./Point.js'), require('jquery'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Rectangle, global.LatLng, global.StateHandler, global.Point, global.jquery);
        global.Marker = mod.exports;
    }
})(this, function(exports, _Rectangle, _LatLng, _StateHandler, _Point, _jquery) {
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
        description: 'Starting'
    }, {
        value: 1,
        description: 'Loaded'
    }];

    /**
     * Name of event fired, when marker is loaded
     * @type {String}
     */
    var EVENT_MARKER_LOADED = "marker-loaded";

    var Marker = exports.Marker = function() {
        function Marker() {
            var position = arguments.length <= 0 || arguments[0] === undefined ? new _Point.Point() : arguments[0];
            var imgPath = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var offset = arguments.length <= 2 || arguments[2] === undefined ? new _Point.Point() : arguments[2];

            _classCallCheck(this, Marker);

            if (!imgPath) {
                console.error("Can not initialize Marker", imgPath);
            }

            this.position = position;
            this.offset = offset;

            this.stateHandler = new _StateHandler.StateHandler(STATES);

            this.img = new Image();
            this.img.src = imgPath;
            this.img.onload = this.onImageLoad.bind(this);
        }

        _createClass(Marker, [{
            key: 'onImageLoad',
            value: function onImageLoad() {
                this.offset.add(new _Point.Point(-(this.img.width / 2), -this.img.height));
                this.icon = new _Rectangle.Rectangle(this.position.x, this.position.y, this.img.width, this.img.height);
                this.stateHandler.next();
            }
        }, {
            key: 'draw',
            value: function draw(x, y, scaleX, offsetX, context) {
                if (this.stateHandler.current.value === 1) {
                    var p = new _Point.Point((this.icon.x + x) * scaleX + offsetX, this.icon.y + y);
                    p.add(this.offset);
                    context.drawImage(this.img, p.x, p.y, this.icon.width, this.icon.height);
                }
            }
        }]);

        return Marker;
    }();
});
