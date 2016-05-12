(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jQuery', 'Handlebars', './Helper.js', './Publisher.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jQuery'), require('Handlebars'), require('./Helper.js'), require('./Publisher.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Handlebars, global.Helper, global.Publisher);
        global.ToolTip = mod.exports;
    }
})(this, function(exports, _jQuery, _Handlebars, _Helper, _Publisher) {
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
            if (!(this.$container instanceof jQuery)) {
                throw new Error("Container " + container + " not found");
            }
            this.$container.addClass(ToolTip.EVENT.CLOSE);

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
                _Handlebars2.default.registerHelper('getRatio', function(w, h) {
                    return h / w * 100 + "%";
                });
            }
        }, {
            key: 'initializeTemplates',
            value: function initializeTemplates(templates) {
                this.templates = this.getDefaultTemplates();
                _jQuery2.default.extend(true, this.templates, templates);
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
                (0, _jQuery2.default)(window).on("resize orientationchange", this.resizeHandler.bind(this));
                this.eventManager.subscribe(ToolTip.EVENT.OPEN, this.open.bind(this));
                this.eventManager.subscribe(ToolTip.EVENT.CLOSE, this.close.bind(this));
                this.$close.on("click", function() {
                    this.close();
                }.bind(this));
            }
        }, {
            key: 'resizeHandler',
            value: function resizeHandler() {
                this.setPosition();
            }
        }, {
            key: 'insertContent',
            value: function insertContent(content) {
                this.$content.html("");
                _Helper.Helper.forEach(content, function(data) {
                    if (this.templates[data.type]) {
                        var html = this.templates[data.type](data.content);
                        this.$content.append(html);
                    }
                }.bind(this));
            }
        }, {
            key: 'open',
            value: function open(data) {
                if (data) {
                    this.insertContent(data);
                }
                if (this.$container.hasClass(ToolTip.EVENT.CLOSE)) {
                    this.setPosition();
                    this.$container.removeClass(ToolTip.EVENT.CLOSE).addClass(ToolTip.EVENT.OPEN);
                    this.eventManager.publish("resize");
                }
                return this;
            }
        }, {
            key: 'close',
            value: function close() {
                if (this.$container.hasClass(ToolTip.EVENT.OPEN)) {
                    this.setPosition();
                    this.$container.removeClass(ToolTip.EVENT.OPEN).addClass(ToolTip.EVENT.CLOSE);
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
                _Helper.Helper.forEach(this.templates, function(template, type) {
                    this.getTemplateFromFile(template, function(compiledTemplate) {
                        this.templates[type] = compiledTemplate;
                        this.loadedTemplates++;
                        if (this.allTemplatesLoaded) {
                            this.initialize();
                        }
                    }.bind(this));
                }.bind(this));
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

    ToolTip.EVENT = {
        OPEN: "tooltip-open",
        CLOSE: "tooltip-close"
    };
});
