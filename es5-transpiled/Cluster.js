(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Events.js', './Publisher.js', './Point.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Events.js'), require('./Publisher.js'), require('./Point.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Events, global.Publisher, global.Point);
        global.Cluster = mod.exports;
    }
})(this, function(exports, _jQuery, _Events, _Publisher, _Point) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Cluster = undefined;

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

    var Cluster = exports.Cluster = function() {
        /**
         * @constructor
         * @return {Cluster} instance of Cluster for chaining
         */

        function Cluster(_ref) {
            var _ref$$container = _ref.$container;
            var $container = _ref$$container === undefined ? null : _ref$$container;

            _classCallCheck(this, Cluster);

            this.markers = [];
            this.$container = $container;
            this.eventManager = new _Publisher.Publisher();
            return this;
        }

        _createClass(Cluster, [{
            key: 'init',
            value: function init() {
                if (this.markers.length === 1) {
                    this.markers[0].$icon.show();
                } else {
                    this.createClusterMarker();
                }
            }
        }, {
            key: 'createClusterMarker',
            value: function createClusterMarker() {
                var p = void 0;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.markers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var marker = _step.value;

                        marker.$icon.hide();
                        var currentPos = new _Point.Point(parseFloat(marker.icon.style.left), parseFloat(marker.icon.style.top));
                        p = !p ? currentPos : p.add(currentPos);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                p.divide(this.markers.length);

                this.$cluster = (0, _jQuery2.default)("<div class='cluster'>" + this.markers.length + "</div>").css({
                    "left": p.x + '%',
                    "top": p.y + '%'
                });
                this.$container.append(this.$cluster);
                this.bindEvents();
            }
        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                this.$cluster.data("mjs-action", this.action.bind(this));
            }
        }, {
            key: 'action',
            value: function action() {
                this.eventManager.publish(_Events.Events.TileMap.ZOOM_TO_BOUNDS, this.boundingBox);
            }
        }, {
            key: 'addMarker',
            value: function addMarker(marker) {
                this.markers.push(marker);
                this.boundingBox = !this.boundingBox ? marker.boundingBox : this.boundingBox.extend(marker.boundingBox);
            }
        }, {
            key: 'removeFromDOM',
            value: function removeFromDOM() {
                if (this.markers.length > 1) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.markers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var marker = _step2.value;

                            marker.$icon.show();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    this.$cluster.remove();
                }
            }
        }]);

        return Cluster;
    }();
});
