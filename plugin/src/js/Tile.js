import $ from 'jquery';
import {State} from './State.js';
import {Rectangle} from './Rectangle.js';
import {Publisher} from './Publisher.js';
import {Helper} from './Helper.js';

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

/**
 * States of a tile
 * @type {Array}
 */
const STATES = [
    {value: 0, description: 'Starting'},
    {value: 1, description: 'Initialized'},
    {value: 2, description: 'Loaded'},
    {value: 3, description: 'Drawn'}
];

/**
 * Name of event fired, when tile is loaded
 * @type {String}
 */
const EVENT_TILE_LOADED = "tile-loaded";

/**
 * Name of event fired, when tile is not found on loading
 * @type {String}
 */
const EVENT_TILE_FAILED = "tile-failed";

export class Tile extends Rectangle {

    /**
     * Return the Publisher
     */
    get Publisher() {
        return PUBLISHER;
    }

    /**
     * Constructor
     * @param  {string} path=null - path to image
     * @param  {number} x=0 - position x of tile
     * @param  {number} y=0 - position y of tile
     * @param  {number} w=0 - tile width
     * @param  {number} h=0 - tile height
     * @return {Tile} instance of Tile
     */
    constructor({path, x = 0, y = 0, w = 0, h = 0} = {}) {
        super(x, y, w, h);
        this.state = new State(STATES);
        if (!path || typeof path !== "string" || path.length === 0) {
            throw new TypeError(`Path ${path} needs to be of type string and should not be empty`);
        }
        this.path = path;
        return this;
    }

    /**
     * initializes tile and starts loading image
     * @return {Tile} instance of Tile
     */
    initialize() {
        this.state.next();
        Helper.loadImage(this.path, function(img) {
            this.img = img;
            this.state.next();
            PUBLISHER.publish(EVENT_TILE_LOADED, this);
        }.bind(this));

        return this;
    }

    /**
     * check if tiles are equal
     * @param  {Tile} tile - the specified tile to check against this
     * @return {Boolean} is true, if x, y, width and height and path are the same
     */
    equals(tile) {
        return (tile instanceof Tile) ? super.equals(tile) && this.path === tile.path : false;
    }

}
