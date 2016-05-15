import {Helper} from './Helper.js';
import {StateHandler} from './StateHandler.js';
import {Rectangle} from './Rectangle.js';

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
 * @author Michael Duve <mduve@designmail.net>
 * @file Represents a part of the background map
 * @extends Rectangle
 * @copyright Michael Duve 2016
 */
export class Tile extends Rectangle {

    /**
     * @constructor
     * @param  {string} path = null - path to image
     * @param  {number} x = 0 - position x of tile
     * @param  {number} y = 0 - position y of tile
     * @param  {number} w = 0 - tile width
     * @param  {number} h = 0 - tile height
     * @param  {View} _instance = null - instance of parent View
     * @return {Tile} instance of Tile for chaining
     */
    constructor({path = null, x = 0, y = 0, w = 0, h = 0} = {}, _instance = null) {
        super(x, y, w, h);

        if (!path || typeof path !== "string" || path.length === 0) throw new TypeError(`Path ${path} needs to be of type string and should not be empty`);
        else if(!_instance) throw new Error(`Tile needs an instance`);

        this.state = new StateHandler(STATES);
        this.instance = _instance;
        this.context = this.instance.context;
        this.path = path;

        return this;
    }

    /**
     * initializes tile and starts loading image
     * @return {Tile} instance of Tile for chaining
     */
    initialize() {
        this.state.next();
        Helper.loadImage(this.path, (img) => {
            this.img = img;
            this.state.next();
            this.draw();
        });
        return this;
    }

    /**
     * draws image data of tile on context
     * @return {Tile} instance of Tile for chaining
     */
    draw() {
        const distortedTile = this.clone.scale(this.instance.zoomFactor)
                                        .translate(this.instance.currentView.x, this.instance.currentView.y)
                                        .scaleX(this.instance.distortionFactor)
                                        .translate(this.instance.offsetToCenter, 0);
        if (this.state.current.value >= 2) {
            if (!this.context) {
                console.error("context not specified", this);
                return false;
            }
            this.state.next();
            this.context.drawImage(this.img, distortedTile.x, distortedTile.y, distortedTile.width, distortedTile.height);
        } else if (this.state.current.value === 0) {
            this.initialize();
        }
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
