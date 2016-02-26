var $ = require('jquery');

export const ReadyState = {
    STARTING: {value: 0, description: 'Starting'},
    INITIALIZED: {value: 1, description: 'Initialized'},
    LOADED: {value: 2, description: 'Loaded'},
    DRAWN: {value: 3, description: 'Drawn'}
};

export class Tile {

    constructor({path=null, _mapController}) {
        this.state = ReadyState.STARTING;

        if (!path || typeof path !== "string" || path.length === 0) {
            throw new Error(`Path {path} needs to be of type string and should not be empty`);
        }
        this.path = path;

        this._mapController = _mapController;

        this.initialize();
    }

    initialize() {
        this.state = ReadyState.INITIALIZED;

        let _this = this;
        this.loadImage(function() {
            _this.state = ReadyState.LOADED;
            //this._mapController.notify("loaded");
        });
    }

    loadImage(cb) {
        let img = new Image();
        img.src = this.path;
        img.onLoad = function() {
            cb();
        };
    }

    toString() {
        return `Tile({path})`;
    }

}
