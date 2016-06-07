(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'Handlebars', './Events.js', './Helper.js', './Publisher.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('Handlebars'), require('./Events.js'), require('./Helper.js'), require('./Publisher.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Handlebars, global.Events, global.Helper, global.Publisher);
        global.ToolTip = mod.exports;
    }
})(this, function(exports, _Handlebars, _Events, _Helper, _Publisher) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ToolTip = undefined;

    var _Handlebars2 = _interopRequireDefault(_Handlebars);

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
             * @param  {string|object} container - Container, either string or dom-object
             * @param  {object} templates - defined templates
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }]);

        function ToolTip(_ref) {
            var container = _ref.container;
            var _ref$templates = _ref.templates;
            var templates = _ref$templates === undefined ? [] : _ref$templates;
            var id = _ref.id;

            _classCallCheck(this, ToolTip);

            this.container = container;
            this.id = id;
            this.container.classList.add(_Events.Events.ToolTip.CLOSE);

            this.close = document.createElement("div");
            this.close.classList.add("close-button");

            this.content = document.createElement("div");
            this.content.classList.add("tooltip-content");

            this.popup = document.createElement("div");
            this.popup.classList.add("tooltip-container");

            this.popup.appendChild(this.close);
            this.popup.appendChild(this.content);

            this.eventManager = new _Publisher.Publisher(this.id);
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

                window.addEventListener("resize", this.resizeHandler.bind(this), false);
                window.addEventListener("orientationchange", this.resizeHandler.bind(this), false);

                this.eventManager.subscribe(_Events.Events.ToolTip.OPEN, this.open.bind(this));
                this.eventManager.subscribe(_Events.Events.ToolTip.CLOSE, function() {
                    _this.closeTooltip();
                });
                this.close.addEventListener(_Events.Events.Handling.CLICK, function() {
                    _this.closeTooltip();
                }, false);
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

                this.content.innerHTML = "";
                _Helper.Helper.forEach(content, function(data) {
                    if (_this2.templates[data.type]) {
                        var html = _this2.templates[data.type](data.content);
                        _this2.content.innerHTML += html;
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
                if (this.container.classList.contains(_Events.Events.ToolTip.CLOSE)) {
                    this.setPosition();
                    this.container.classList.remove(_Events.Events.ToolTip.CLOSE);
                    this.container.classList.add(_Events.Events.ToolTip.OPEN);
                    this.eventManager.publish(_Events.Events.TileMap.RESIZE);
                }
                return this;
            }

            /**
             * closes a tooltip
             * @return {ToolTip} instance of ToolTip for chaining
             */

        }, {
            key: 'closeTooltip',
            value: function closeTooltip() {
                if (this.container.classList.contains(_Events.Events.ToolTip.OPEN)) {
                    this.eventManager.publish(_Events.Events.Marker.DEACTIVATE);
                    this.setPosition();
                    this.container.classList.remove(_Events.Events.ToolTip.OPEN);
                    this.container.classList.add(_Events.Events.ToolTip.CLOSE);
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
                if (this.container.clientWidth > this.container.clientHeight) {
                    this.container.classList.add("left");
                    this.container.classList.remove("bottom");
                } else {
                    this.container.classList.add("bottom");
                    this.container.classList.remove("left");
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
                        if (_this3.allTemplatesLoaded) _this3.container.appendChild(_this3.popup);
                    });
                });
                return this;
            }
        }]);

        return ToolTip;
    }();
});
