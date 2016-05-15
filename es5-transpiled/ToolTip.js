(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', 'Handlebars', './Events.js', './Helper.js', './Publisher.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('Handlebars'), require('./Events.js'), require('./Helper.js'), require('./Publisher.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Handlebars, global.Events, global.Helper, global.Publisher);
        global.ToolTip = mod.exports;
    }
})(this, function(exports, _jQuery, _Handlebars, _Events, _Helper, _Publisher) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ToolTip = undefined;

    var _jQuery2 = _interopRequireDefault(_jQuery);

    var _Handlebars2 = _interopRequireDefault(_Handlebars);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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

    var ToolTip = exports.ToolTip = function() {
        _createClass(ToolTip, [{
            key: 'allTemplatesLoaded',
            get: function get() {
                return this.loadedTemplates === Object.keys(this.templates).length;
            }
        }]);

        function ToolTip(_ref) {
            var container = _ref.container;
            var templates = _ref.templates;

            _classCallCheck(this, ToolTip);

            this.$container = typeof container === "string" ? (0, _jQuery2.default)(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : (0, _jQuery2.default)(container);
            if (!(this.$container instanceof jQuery)) throw new Error("Container " + container + " not found");

            this.$container.addClass(_Events.Events.ToolTip.CLOSE);

            this.$close = (0, _jQuery2.default)('<span class=\'close-button\' />');
            this.$content = (0, _jQuery2.default)('<div class=\'tooltip-content\' />');
            this.$popup = (0, _jQuery2.default)('<div class=\'tooltip-container\' />').append(this.$close).append(this.$content);
            this.eventManager = new _Publisher.Publisher();

            this.bindEvents();
            this.registerHandlebarHelpers();

            return this.setPosition().initializeTemplates(templates);
        }

        _createClass(ToolTip, [{
            key: 'registerHandlebarHelpers',
            value: function registerHandlebarHelpers() {
                if (_Handlebars2.default) {
                    _Handlebars2.default.registerHelper('getRatio', function(w, h) {
                        return h / w * 100 + "%";
                    });
                }
            }
        }, {
            key: 'initializeTemplates',
            value: function initializeTemplates(templates) {
                this.templates = this.getDefaultTemplates();
                Object.assign(this.templates, templates);
                this.loadedTemplates = 0;
                this.compileTemplates();
                return this;
            }
        }, {
            key: 'getDefaultTemplates',
            value: function getDefaultTemplates() {
                return {
                    image: "/plugin/src/hbs/image.hbs",
                    text: "/plugin/src/hbs/text.hbs",
                    headline: "/plugin/src/hbs/headline.hbs",
                    crossheading: "/plugin/src/hbs/crossheading.hbs",
                    iframe: "/plugin/src/hbs/iframe.hbs"
                };
            }
        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                var _this = this;

                (0, _jQuery2.default)(window).on("resize orientationchange", function() {
                    _this.resizeHandler();
                });
                this.eventManager.subscribe(_Events.Events.ToolTip.OPEN, this.open.bind(this));
                this.eventManager.subscribe(_Events.Events.ToolTip.CLOSE, function() {
                    _this.close();
                });
                this.$close.on("click", function() {
                    _this.close();
                });
            }
        }, {
            key: 'resizeHandler',
            value: function resizeHandler() {
                this.setPosition();
            }
        }, {
            key: 'insertContent',
            value: function insertContent(content) {
                var _this2 = this;

                this.$content.html("");
                _Helper.Helper.forEach(content, function(data) {
                    if (_this2.templates[data.type]) {
                        var html = _this2.templates[data.type](data.content);
                        _this2.$content.append(html);
                    }
                });
            }
        }, {
            key: 'open',
            value: function open(data) {
                if (data) this.insertContent(data);
                if (this.$container.hasClass(_Events.Events.ToolTip.CLOSE)) {
                    this.setPosition();
                    this.$container.removeClass(_Events.Events.ToolTip.CLOSE).addClass(_Events.Events.ToolTip.OPEN);
                    this.eventManager.publish("resize");
                }
                return this;
            }
        }, {
            key: 'close',
            value: function close() {
                if (this.$container.hasClass(_Events.Events.ToolTip.OPEN)) {
                    this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
                    this.setPosition();
                    this.$container.removeClass(_Events.Events.ToolTip.OPEN).addClass(_Events.Events.ToolTip.CLOSE);
                    this.eventManager.publish("resize");
                }
                return this;
            }
        }, {
            key: 'setPosition',
            value: function setPosition() {
                if (this.$container.innerWidth() > this.$container.innerHeight()) {
                    this.$container.addClass("left").removeClass("bottom");
                } else {
                    this.$container.addClass("bottom").removeClass("left");
                }
                return this;
            }
        }, {
            key: 'compileTemplates',
            value: function compileTemplates() {
                var _this3 = this;

                _Helper.Helper.forEach(this.templates, function(template, type) {
                    _this3.getTemplateFromFile(template, function(compiledTemplate) {
                        _this3.templates[type] = compiledTemplate;
                        _this3.loadedTemplates++;
                        if (_this3.allTemplatesLoaded) _this3.initialize();
                    });
                });
            }
        }, {
            key: 'getTemplateFromFile',
            value: function getTemplateFromFile(url, cb) {
                _jQuery2.default.get(url, function(data) {
                    cb(_Handlebars2.default.compile(data));
                }, 'html');
            }
        }, {
            key: 'initialize',
            value: function initialize() {
                this.$container.prepend(this.$popup);
            }
        }]);

        return ToolTip;
    }();
});
