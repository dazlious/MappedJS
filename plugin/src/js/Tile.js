import $ from 'jquery';
import {StateHandler} from './StateHandler.js';
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
 * Name of event fired, when tile is initialized
 * @type {String}
 */
const EVENT_TILE_INITIALIZED = "tile-initialized";


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
    constructor({path, x = 0, y = 0, w = 0, h = 0, context = null} = {}) {
        super(x, y, w, h);
        this.state = new StateHandler(STATES);
        if (!path || typeof path !== "string" || path.length === 0) {
            throw new TypeError(`Path ${path} needs to be of type string and should not be empty`);
        }
        this.context = context;
        this.path = path;
        return this;
    }

    /**
     * initializes tile and starts loading image
     * @return {Tile} instance of Tile for chaining
     */
    initialize() {
        this.state.next();
        PUBLISHER.publish(EVENT_TILE_INITIALIZED, this);
        Helper.loadImage(this.path, function(img) {
            this.img = img;
            this.state.next();
            PUBLISHER.publish(EVENT_TILE_LOADED, this);
        }.bind(this));

        return this;
    }

    /**
     * handles draw of a tile in each state
     * @param  {number} x - x-position of tile
     * @param  {number} y - y-position of tile
     * @param  {number} scaleX - scale x of tile
     * @param  {number} offsetX - offset x for centering
     * @param  {object} thumb - img-data of thumbnail
     * @param  {number} thumbScale - thumbnail scale, relative to full image
     * @return {Tile} instance of Tile for chaining
     */
    handleDraw(x, y, scaleX, offsetX, thumb, thumbScale) {
        let distortedTile = this.clone.translate(x, y).scaleX(scaleX).translate(offsetX, 0);
        if (this.state.current.value >= 2) {
            this.draw(this.img, distortedTile);
            this.state.next();
        } else if (this.state.current.value === 1 && thumb && thumbScale) {
            let thumbTile = this.clone.scale(thumbScale);
            this.draw(thumb, thumbTile, distortedTile);
        } else if (this.state.current.value === 0) {
            this.initialize();
        }
        return this;
    }

    /**
     * draws image data of tile on context
     * @param  {object} img - img-data to draw
     * @param  {Rectangle} source - specified source sizes
     * @param  {Rectangle} destination = null - specified destination sizes
     * @return {Tile} instance of Tile for chaining
     */
    draw(img, source, destination = null) {
        if (!this.context) {
            console.error("context not specified", this);
            return false;
        }
        if (!destination) {
            this.context.drawImage(img, source.x, source.y, source.width, source.height);
        } else {
            this.context.drawImage(img, source.x, source.y, source.width, source.height, destination.x, destination.y, destination.width, destination.height);
        }
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
