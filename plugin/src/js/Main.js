var MapController = require('./MapController.js').MapController;
var $ = require('jquery');
var Helper = require('./Helper.js').Helper;

export class MappedJS {

    /**
     * Constructor
     * @param  {string|Object} container=".mjs" - Container, either string, jQuery-object or dom-object
     * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
     * @param  {Object} events={loaded: "mjs-loaded"}} - List of events
     */
    constructor({container=".mjs", mapData={}, events={loaded:"mjs-loaded"}}) {
        this.initializeApi();
        this.initializeSettings(container, events);

        let _this = this;
        this.initializeData(mapData, function() {
            _this.initializeMap();
            _this.bindEvents();
            _this.loadingFinished();
        });

    }

    /**
     * initializes the settings and handles errors
     * @param  {string|Object} container - Container, either string, jQuery-object or dom-object
     * @param  {object} events - List of events
     */
    initializeSettings(container, events) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) {
            throw new Error("Container " + container + " not found");
        }
        this.$container.addClass("mappedJS");

        this.events = events;
    }

    /**
     * initializes the data, asynchronous
     * @param  {Object} mapData - data of map tiles, can be json or path to file
     * @param  {Function} cb - called, when data is received
     */
    initializeData(mapData, cb) {
        let _this = this;
        if (typeof mapData === "string") {
            Helper.requestJSON(mapData, function(data) {
                _this.mapData = data;
                cb();
            });
        } else {
            this.mapData = (typeof mapData === "object") ? mapData : null;
            cb();
        }
    }

    /**
     * initializes Map module
     */
    initializeMap() {
        this.$canvas = new MapController({
            container: this.$container,
            tilesData: this.mapData
        });
    }

    /**
     * initializes the public Api
     */
    initializeApi() {
        this.api = {
            MapController: MapController,
            Helper: Helper
        };
    }

    /**
     * binds all events to handlers
     */
    bindEvents() {
        $(window).on("resize orientationchange", this.resizeHandler.bind(this));
    }

    /**
     * handles resizing of window
     */
    resizeHandler() {
        this.$canvas.resize();
    }

    /**
     * called when loading and initialization is finisehd
     */
    loadingFinished() {
        this.$container.trigger(this.events.loaded);
    }

}
