import {Point} from './Point.js';

export class Rectangle extends Point {

    /**
     * get center-position of rectangle
     * @return {Point} center point
     */
    get center() {
        return new Point(this.x + (this.width / 2), this.y + (this.height / 2));
    }

    /**
     * get top-left-position of rectangle
     * @return {Point} top-left point
     */
    get topLeft() {
        return new Point(this.x, this.y);
    }

    /**
     * get top-right-position of rectangle
     * @return {Point} top-right point
     */
    get topRight() {
        return new Point(this.x + this.width, this.y);
    }

    /**
     * get bottom-left-position of rectangle
     * @return {Point} bottom-left point
     */
    get bottomLeft() {
        return new Point(this.x, this.y + this.height);
    }

    /**
     * get bottom-right-position of rectangle
     * @return {Point} bottom-right point
     */
    get bottomRight() {
        return new Point(this.x + this.width, this.y + this.height);
    }

    /**
     * Constructor
     * @param  {number} x=0 - x-position of specified rectangle
     * @param  {number} y=0 - y-position of specified rectangle
     * @param  {number} width=0 - width of specified rectangle
     * @param  {number} height=0 - height of specified rectangle
     * @return {Rectangle} new instance of Rectangle
     */
    constructor(x=0, y=0, width=0, height=0) {
        super(x, y);
        this.width = width;
        this.height = height;
        return this;
    }

    /**
     * check if rectangles are equal
     * @param  {Rectangle} rectangle - the specified rectangle to check against this
     * @return {Boolean} is true, if x, y, width and height are the same
     */
    equals(rectangle) {
        return this.x === rectangle.x && this.y === rectangle.y && this.width === rectangle.width && this.height === rectangle.height;
    }

    /**
     * representation of a Rectangle as String
     * @return {String} representation of this Rectangle
     */
    toString() {
        return `(${super.toString()},${this.width},${this.height})`;
    }

}
