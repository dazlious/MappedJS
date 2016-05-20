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


            /**
             * checks if all templates were loaded
             * @return {boolean} wheter true if all templates were loaded or false
             */
            get: function get() {
                return this.loadedTemplates === Object.keys(this.templates).length;
            }

            /**
             *
             * @constructor
             * @param  {string|object} container - Container, either string, jQuery-object or dom-object
             * @param  {object} templates - defined templates
             * @return {ToolTip} instance of ToolTip for chaining
             */

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

        /**
         * register helpers for handlebars
         * @return {ToolTip} instance of ToolTip for chaining
         */


        _createClass(ToolTip, [{
            key: 'registerHandlebarHelpers',
            value: function registerHandlebarHelpers() {
                if (_Handlebars2.default) {
                    _Handlebars2.default.registerHelper('getRatio', function(w, h) {
                        return h / w * 100 + "%";
                    });
                }
                return this;
            }

            /**
             * initialize all templates
             * @param  {object} templates = {} - all specified templates
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }, {
            key: 'initializeTemplates',
            value: function initializeTemplates(templates) {
                this.templates = templates;
                this.loadedTemplates = 0;
                this.compileTemplates();
                return this;
            }

            /**
             * bind all events
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                var _this = this;

                (0, _jQuery2.default)(window).on(_Events.Events.Handling.RESIZE, function() {
                    _this.resizeHandler();
                });
                this.eventManager.subscribe(_Events.Events.ToolTip.OPEN, this.open.bind(this));
                this.eventManager.subscribe(_Events.Events.ToolTip.CLOSE, function() {
                    _this.close();
                });
                this.$close.on(_Events.Events.Handling.CLICK, function() {
                    _this.close();
                });
                return this;
            }

            /**
             * on resize check if tooltip is bottom or left position
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }, {
            key: 'resizeHandler',
            value: function resizeHandler() {
                this.setPosition();
                return this;
            }

            /**
             * inserts content to ToolTip instance container
             * @param  {object} content = {} - content object
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }, {
            key: 'insertContent',
            value: function insertContent() {
                var _this2 = this;

                var content = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                this.$content.html("");
                _Helper.Helper.forEach(content, function(data) {
                    if (_this2.templates[data.type]) {
                        var html = _this2.templates[data.type](data.content);
                        _this2.$content.append(html);
                    }
                });
                return this;
            }

            /**
             * opens a tooltip
             * @param  {object} data - content object
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }, {
            key: 'open',
            value: function open(data) {
                if (data) this.insertContent(data);
                if (this.$container.hasClass(_Events.Events.ToolTip.CLOSE)) {
                    this.setPosition();
                    this.$container.removeClass(_Events.Events.ToolTip.CLOSE).addClass(_Events.Events.ToolTip.OPEN);
                    this.eventManager.publish(_Events.Events.TileMap.RESIZE);
                }
                return this;
            }

            /**
             * closes a tooltip
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }, {
            key: 'close',
            value: function close() {
                if (this.$container.hasClass(_Events.Events.ToolTip.OPEN)) {
                    this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
                    this.setPosition();
                    this.$container.removeClass(_Events.Events.ToolTip.OPEN).addClass(_Events.Events.ToolTip.CLOSE);
                    this.eventManager.publish(_Events.Events.TileMap.RESIZE);
                }
                return this;
            }

            /**
             * sets position of tooltip to left or bottom
             * @return {ToolTip} instance of ToolTip for chaining
             */

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

            /**
             * precompiles all Handlebars templates
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }, {
            key: 'compileTemplates',
            value: function compileTemplates() {
                var _this3 = this;

                _Helper.Helper.forEach(this.templates, function(template, type) {
                    _Helper.Helper.getFile(template, function(html) {
                        _this3.templates[type] = _Handlebars2.default.compile(html);
                        _this3.loadedTemplates++;
                        if (_this3.allTemplatesLoaded) _this3.$container.append(_this3.$popup);
                    });
                });
                return this;
            }
        }]);

        return ToolTip;
    }();
});
