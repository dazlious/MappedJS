(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.Events = mod.exports;
    }
})(this, function(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Events = exports.Events = {
        ToolTip: {
            OPEN: "tooltip-open",
            CLOSE: "tooltip-close"
        },
        Marker: {
            DEACTIVATE: "deactivate-marker"
        }
    };
});
