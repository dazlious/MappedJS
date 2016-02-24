var MapController = require('./MapController.js').MapController;
var $ = require('jquery');

export class MappedJS {

    constructor({container=".mjs"}) {
        this.initializeApi();
        this.initializeSettings(container);

        this.initializeMap();

        this.bindEvents();
    }

    initializeSettings(container) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) {
            throw new Error("Container " + container + " not found");
        }
        this.$container.addClass("mappedJS");
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

}
