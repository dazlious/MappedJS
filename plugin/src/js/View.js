import $ from 'jquery';
import {Rectangle} from './Rectangle.js';

export class View extends Rectangle {

    /**
     * Constructor
     * @param  {number} x=0 - x-position of specified view
     * @param  {number} y=0 - y-position of specified view
     * @param  {number} width=0 - width of specified view
     * @param  {number} height=0 - height of specified view
     * @param  {Rectangle} bounds = new Rectangle() - bounding box of currentView
     * @return {View} new instance of View
     */
    constructor({x, y, width, height, bounds = new Rectangle()}) {
        super(x, y, width, height);
        this.bounds = bounds;
        return this;
    }

    /**
     * representation of a Rectangle as String
     * @return {String} representation of this Rectangle
     */
    toString() {
        return `(${this.x},${this.y},${this.width},${this.height},(${this.bounds}))`;
    }
}
