var $ = require('jquery');

export class MapController {

    constructor({container}) {
        if (!container) {
            throw Error("You must define a container to initialize a map");
        }

        this.$container = container;
        this.initialize();
    }

    initialize() {
        this.$canvas = $("<canvas class='mjs-canvas' />");
        this.canvas = this.$canvas[0];

        this.$container.append(this.$canvas);

        this.canvasContext = this.canvas.getContext("2d");
        this.resize();
    }

    resize() {
        this.canvasWidth = this.$container.innerWidth();
        this.canvasHeight = this.$container.innerHeight();

        this.canvasContext.canvas.width = this.canvasWidth;
        this.canvasContext.canvas.height = this.canvasHeight;
    }
}
