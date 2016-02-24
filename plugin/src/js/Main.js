var Point = require('./Point.js');
var $ = require('jquery');

export class MappedJS {

    constructor({container=".mjs"}) {
        this.initializeApi();

        this.initializeSettings(container);
    }

    initializeSettings(container) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) {
            throw new Error("Container " + container + " not found");
        }

    }

    initializeApi() {
        this.api = {
            Point: Point
        };
    }

}
