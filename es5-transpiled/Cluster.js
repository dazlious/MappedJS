(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', './Point.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('./Point.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Point);
        global.Cluster = mod.exports;
    }
})(this, function(exports, _jQuery, _Point) {
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
            var _ref$view = _ref.view;
            var view = _ref$view === undefined ? null : _ref$view;

            _classCallCheck(this, Cluster);

            this.markers = [];
            this.$container = $container;
            this.view = view;
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
                    "top": p.y + '%',
                    "margin-left": '-16px',
                    "margin-top": '-16px'
                });
                this.$container.append(this.$cluster);
                this.bindEvents();
            }
        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                var _this = this;

                this.$cluster.on("mouseenter", function() {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = _this.markers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var marker = _step2.value;

                            marker.$icon.fadeIn(500);
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
                });

                this.$cluster.on("mouseleave", function() {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = _this.markers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var marker = _step3.value;

                            marker.$icon.fadeOut(500);
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                });
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
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = this.markers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var marker = _step4.value;

                            marker.$icon.show();
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
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
