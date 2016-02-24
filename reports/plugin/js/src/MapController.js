"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var $ = require('jquery');

var MapController = exports.MapController = function() {
    function MapController(_ref) {
        var container = _ref.container;

        _classCallCheck(this, MapController);

        if (!container) {
            throw Error("You must define a container to initialize a map");
        }

        this.$container = container;
        this.initialize();
    }

    _createClass(MapController, [{
        key: "initialize",
        value: function initialize() {
            this.$canvas = $("<canvas class='mjs-canvas' />");
            this.canvas = this.$canvas[0];

            this.$container.append(this.$canvas);

            this.canvasContext = this.canvas.getContext("2d");
            this.resize();
        }
    }, {
        key: "resize",
        value: function resize() {
            this.canvasWidth = this.$container.innerWidth();
            this.canvasHeight = this.$container.innerHeight();

            this.canvasContext.canvas.width = this.canvasWidth;
            this.canvasContext.canvas.height = this.canvasHeight;
        }
    }]);

    return MapController;
}();
