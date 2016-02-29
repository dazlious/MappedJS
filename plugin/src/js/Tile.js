var $ = require('jquery');
var State = require('./State').State;
var Publisher = require("./Publisher.js").Publisher;

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

export class Tile {

    /**
     * Constructor
     * @param  {string} path=null - path to image
     * @param  {number} x=0 - position x of tile
     * @param  {number} y=0 - position y of tile
     * @param  {number} w=0 - tile width
     * @param  {number} h=0 - tile height
     * @return {Tile} instance of Tile
     */
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

        return this;
    }

    /**
     * initializes tile and starts loading image
     * @return {Tile} instance of Tile
     */
    initialize() {
        this.state.next();

        let _this = this;
        this.loadImage(function(img) {
            _this.img = img;
            _this.state.next();
            PUBLISHER.publish("tile-loaded", _this);
        });
        return this;
    }

    /**
     * image loader, asynchronous
     * @param  {Function} cb - callback after loading image
     * @return {Tile} instance of Tile
     */
    loadImage(cb) {
        let img = new Image();
        img.src = this.path;
        img.onload = function() {
            cb(img);
        };
        return this;
    }

}

/**
 * States of a tile
 * @type {Array}
 */
Tile.STATES = [
    {value: 0, description: 'Starting'},
    {value: 1, description: 'Initialized'},
    {value: 2, description: 'Loaded'},
    {value: 3, description: 'Drawn'}
];
