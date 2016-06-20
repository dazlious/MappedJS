import {Events} from './Events.js';
import {Helper} from './Helper.js';
import {StateHandler} from './StateHandler.js';
import {Drawable} from './Drawable.js';

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
export class Tile extends Drawable {

    get distortedTile() {
        return this.clone.scale(this.zoomFactor)
                                        .translate(this.view.x, this.view.y)
                                        .scaleX(this.distortionFactor)
                                        .translate(this.offsetToCenter, 0);
    }

    /**
     * @constructor
     * @param  {string} path = null - path to image
     * @param  {number} x = 0 - position x of tile
     * @param  {number} y = 0 - position y of tile
     * @param  {number} w = 0 - tile width
     * @param  {number} h = 0 - tile height
     * @return {Tile} instance of Tile for chaining
     */
    constructor({path = null, x = 0, y = 0, w = 0, h = 0} = {}, context = null, id = undefined) {
        super(id, x, y, w, h);
        if (!path || typeof path !== "string" || path.length === 0) throw new TypeError(`Path ${path} needs to be of type string and should not be empty`);
        this.state = new StateHandler(STATES);
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
        Helper.loadImage(this.path, (img) => {
            this.img = img;
            this.state.next();
            this.eventManager.publish(Events.TileMap.DRAW);
        });
        return this;
    }

    /**
     * draws image data of tile on context
     * @return {Tile} instance of Tile for chaining
     */
    draw() {
        if (this.state.current.value >= 2) {
            const t = this.distortedTile;
            this.state.next();
            this.context.drawImage(this.img, t.x, t.y, t.width, t.height);
        } else if (this.state.current.value === 0) {
            this.initialize();
        }
        return this;
    }

}
