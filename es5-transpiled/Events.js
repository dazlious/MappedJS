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
    /**
     * @author Michael Duve <mduve@designmail.net>
     * @file Helper for naming events
     * @copyright Michael Duve 2016
     * @namespace Events
     */
    var Events = exports.Events = {
        /**
         * Eventnames for ToolTip class
         * @type {Object}
         * @memberof Events
         * @property {object} OPEN - when a tooltip should be openend
         * @property {object} CLOSE - when a tooltip should be closed
         */
        ToolTip: {
            OPEN: "tooltip-open",
            CLOSE: "tooltip-close"
        },
        /**
         * Eventnames for Marker class
         * @type {Object}
         * @memberof Events
         * @property {object} DEACTIVATE - when a Marker should be in deactived state
         */
        Marker: {
            DEACTIVATE: "deactivate-marker"
        },
        /**
         * Eventnames for Publisher class
         * @type {Object}
         * @memberof Events
         * @property {object} PUBLISH - notifies all subscribers
         * @property {object} SUBSCRIBE - subscribes to a topic
         * @property {object} UNSUBSCRIBE - unsubscribes from a topic
         */
        Publisher: {
            PUBLISH: "publish",
            SUBSCRIBE: "subscribe",
            UNSUBSCRIBE: "unsubscribe"
        },
        /**
         * Eventnames for TileMap class
         * @type {Object}
         * @memberof Events
         * @property {object} IMG_DATA_NAME - notifies all subscribers
         * @property {object} MARKER_DATA_NAME - subscribes to a topic
         * @property {object} NEXT_LEVEL - next level of view
         * @property {object} PREVIOUS_LEVEL - previous level of view
         * @property {object} RESIZE - resize of view needed
         * @property {object} ZOOM_TO_BOUNDS - zoom to bounds
         */
        TileMap: {
            IMG_DATA_NAME: "img_data",
            MARKER_DATA_NAME: "marker",
            NEXT_LEVEL: "next-level",
            PREVIOUS_LEVEL: "previous-level",
            RESIZE: "resize",
            ZOOM_TO_BOUNDS: "zoom-to-bounds",
            DRAW: "draw"
        },
        /**
         * Eventnames for Handling in all classes
         * @type {Object}
         * @memberof Events
         * @property {object} RESIZE - resize of window happened needed
         * @property {object} CLICK - click occured
         * @property {object} TOUCHSTART - Touch started
         * @property {object} TOUCHEND - Touch ended
         * @property {object} MOUSEDOWN - Mouse started
         * @property {object} MOUSEUP - Mouse ended
         * @property {object} KEYDOWN - key pressed
         * @property {object} KEYUP - key released
         */
        Handling: {
            RESIZE: "resize orientationchange",
            CLICK: "click",
            TOUCHSTART: "touchstart",
            MOUSEDOWN: "mousedown",
            TOUCHEND: "touchend",
            MOUSEUP: "mouseup",
            KEYDOWN: "keydown",
            KEYUP: "keyup"
        },
        /**
         * Eventnames for View class
         * @type {Object}
         * @memberof Events
         * @property {object} DRAW - draw is needed
         * @property {object} THUMB_LOADED - thumbnail was loaded
         */
        View: {
            THUMB_LOADED: "thumb-loaded"
        },
        /**
         * Eventnames for MarkerClusterer class
         * @type {Object}
         * @memberof Events
         * @property {object} CLUSTERIZE - create cluster
         * @property {object} UNCLUSTERIZE - destroy cluster
         */
        MarkerClusterer: {
            CLUSTERIZE: "clusterize",
            UNCLUSTERIZE: "unclusterize"

        }
    };
});
