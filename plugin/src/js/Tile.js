var $ = require('jquery');
var State = require('./State').State;
var Publisher = require("./Publisher.js").Publisher;

const PUBLISHER = new Publisher();

export class Tile {

    constructor({path=null, x = 0, y = 0, w = 0, h = 0}) {
        this.state = new State(Tile.STATES);

        if (!path || typeof path !== "string" || path.length === 0) {
            throw new Error(`Path {path} needs to be of type string and should not be empty`);
        }
        this.path = path;

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.initialize();
    }

    initialize() {
        this.state.next();

        let _this = this;
        this.loadImage(function(img) {
            _this.img = img;
            _this.state.next();
            PUBLISHER.publish("tile-loaded", _this);
        });
    }

    loadImage(cb) {
        let img = new Image();
        img.src = this.path;
        img.onload = function() {
            cb(img);
        };
    }

    toString() {
        return `Tile({path})`;
    }

}

Tile.STATES = [
    {value: 0, description: 'Starting'},
    {value: 1, description: 'Initialized'},
    {value: 2, description: 'Loaded'},
    {value: 3, description: 'Drawn'}
];
