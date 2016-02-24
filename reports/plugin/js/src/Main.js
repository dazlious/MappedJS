'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var MapController = require('./MapController.js').MapController;
var $ = require('jquery');

var MappedJS = exports.MappedJS = function() {
    function MappedJS(_ref) {
        var _ref$container = _ref.container;
        var container = _ref$container === undefined ? ".mjs" : _ref$container;

        _classCallCheck(this, MappedJS);

        this.initializeApi();

        this.initializeSettings(container);

        this.initializeMap();
    }

    _createClass(MappedJS, [{
        key: 'initializeSettings',
        value: function initializeSettings(container) {
            this.$container = typeof container === "string" ? $(container) : (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === "object" && container instanceof jQuery ? container : $(container);
            if (!(this.$container instanceof jQuery)) {
                throw new Error("Container " + container + " not found");
            }
            this.$container.addClass("mappedJS");
        }
    }, {
        key: 'initializeMap',
        value: function initializeMap() {
            this.$canvas = new MapController({
                container: this.$container
            });
        }
    }, {
        key: 'initializeApi',
        value: function initializeApi() {
            this.api = {
                MapController: MapController
            };
        }
    }]);

    return MappedJS;
}();
