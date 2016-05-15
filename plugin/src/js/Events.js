/**
 * @author Michael Duve <mduve@designmail.net>
 * @file Helper for naming events
 * @copyright Michael Duve 2016
 * @namespace Events
*/
export var Events = {
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
     */
    TileMap: {
        IMG_DATA_NAME: "img_data",
        MARKER_DATA_NAME: "marker"
    }
};
