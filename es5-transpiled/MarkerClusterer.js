(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Events.js', './Publisher.js', './Cluster.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Events.js'), require('./Publisher.js'), require('./Cluster.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Events, global.Publisher, global.Cluster);
        global.MarkerClusterer = mod.exports;
    }
})(this, function(exports, _Events, _Publisher, _Cluster) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MarkerClusterer = undefined;

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

    var MarkerClusterer = exports.MarkerClusterer = function() {
        /**
         * @constructor
         * @return {MarkerClusterer} instance of MarkerClusterer for chaining
         */

        function MarkerClusterer(_ref) {
            var _ref$markers = _ref.markers;
            var markers = _ref$markers === undefined ? [] : _ref$markers;
            var _ref$container = _ref.container;
            var container = _ref$container === undefined ? null : _ref$container;
            var id = _ref.id;

            _classCallCheck(this, MarkerClusterer);

            this.markers = markers;
            this.id = id;
            this.container = container;
            this.clusters = [];
            this.eventManager = new _Publisher.Publisher(this.id);
            this.bindEvents();
            this.clusterize();
            return this;
        }

        _createClass(MarkerClusterer, [{
            key: 'bindEvents',
            value: function bindEvents() {
                var _this = this;

                this.eventManager.subscribe(_Events.Events.MarkerClusterer.CLUSTERIZE, function() {
                    _this.clusterize();
                });
                this.eventManager.subscribe(_Events.Events.MarkerClusterer.UNCLUSTERIZE, function() {
                    _this.deleteAllClusters();
                });
            }
        }, {
            key: 'clusterize',
            value: function clusterize() {
                this.deleteAllClusters();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.markers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var marker = _step.value;

                        var hits = [];
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = this.clusters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var cluster = _step3.value;

                                if (marker.boundingBox.intersects(cluster.boundingBox)) {
                                    hits.push(cluster);
                                }
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

                        if (!hits.length) {
                            var newCluster = this.createCluster(marker);
                            this.clusters.push(newCluster);
                        } else {
                            var nearestCluster = this.findNearestHit(marker, hits);
                            nearestCluster.addMarker(marker);
                        }
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

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.clusters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _cluster = _step2.value;

                        _cluster.init();
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
            }
        }, {
            key: 'findNearestHit',
            value: function findNearestHit(marker, hits) {
                var lastDistance = void 0,
                    minimalHit = void 0;
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = hits[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var hit = _step4.value;

                        if (!lastDistance) {
                            lastDistance = this.getDistance(marker, hit);
                            minimalHit = hit;
                        } else {
                            var currentDistance = this.getDistance(marker, hit);
                            if (currentDistance < lastDistance) {
                                lastDistance = currentDistance;
                                minimalHit = hit;
                            }
                        }
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

                return minimalHit;
            }
        }, {
            key: 'getDistance',
            value: function getDistance(marker, cluster) {
                return marker.boundingBox.center.distance(cluster.boundingBox.center);
            }
        }, {
            key: 'createCluster',
            value: function createCluster(marker) {
                var newCluster = new _Cluster.Cluster({
                    container: this.container,
                    id: this.id
                });
                newCluster.addMarker(marker);
                return newCluster;
            }
        }, {
            key: 'deleteAllClusters',
            value: function deleteAllClusters() {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = this.clusters[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var cluster = _step5.value;

                        cluster.removeFromDOM();
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                this.clusters = [];
                _Cluster.Cluster.count = 0;
            }
        }]);

        return MarkerClusterer;
    }();
});
