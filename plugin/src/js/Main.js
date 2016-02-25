var MapController = require('./MapController.js').MapController;
var $ = require('jquery');
var Helper = require('./Helper.js').Helper;

export class MappedJS {

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

    initializeSettings(container, events) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) {
            throw new Error("Container " + container + " not found");
        }
        this.$container.addClass("mappedJS");

        this.events = events;
    }

    initializeData(mapData, cb) {
        let data;
        let _this = this;
        if (typeof mapData === "string") {
            Helper.request(mapData, function(data) {
                _this.mapData = data;
                cb();
            });
        } else {
            this.mapData = (typeof mapData === "object") ? mapData : null;
            cb();
        }
    }

    initializeMap() {
        this.$canvas = new MapController({
            container: this.$container
        });
    }

    initializeApi() {
        this.api = {
            MapController: MapController
        };
    }

    bindEvents() {
        $(window).on("resize orientationchange", this.resizeHandler.bind(this));
    }

    resizeHandler() {
        this.$canvas.resize();
    }

    loadingFinished() {
        this.$container.trigger(this.events.loaded);
    }

}
