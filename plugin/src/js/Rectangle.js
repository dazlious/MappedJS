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
     * Returns right position of Rectangle
     * @return {number} right position
     */
    get right() {
        return this.x + this.width;
    }

    /**
     * Returns left position of Rectangle
     * @return {number} left position
     */
    get left() {
        return this.x;
    }

    /**
     * Returns top position of Rectangle
     * @return {number} top position
     */
    get top() {
        return this.y;
    }

    /**
     * Returns bottom position of Rectangle
     * @return {number} bottom position
     */
    get bottom() {
        return this.y + this.height;
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
     * Checks whether Rectangle intersects with specified Rectangle
     * @param  {Rectangle} rect - the specified rectangle to check against
     * @return {Boolean} true if containment is entirely
     */
    intersects(rect) {
        return !(rect.left > this.right || rect.right < this.left || rect.top > this.bottom || rect.bottom < this.top);
    }

    /**
     * Checks whether Rectangle entirely contains the Rectangle or Point
     * @param  {Rectangle|Point} rectOrPoint - the specified point or rectangle to check against
     * @return {Boolean} true if containment is entirely
     */
    contains(rectOrPoint) {
        return (rectOrPoint instanceof Rectangle) ? this.containsRect(rectOrPoint) : (rectOrPoint instanceof Point) ? this.containsPoint(rectOrPoint) : false;
    }

    /**
     * Checks whether Rectangle entirely contains the Point
     * @param  {Point} point - the specified point to check against
     * @return {Boolean} true if containment is entirely
     */
    containsPoint(point) {
        return (point instanceof Point) ? point.x >= this.left && point.y >= this.top && point.x <= this.right && point.y <= this.bottom : false;
    }

    /**
     * Checks whether Rectangle entirely contains the Rectangle
     * @param  {Rectangle} rect - the specified rectangle to check against
     * @return {Boolean} true if containment is entirely
     */
    containsRect(rect) {
        return (rect instanceof Rectangle) ? rect.left >= this.left && rect.top >= this.top && rect.right <= this.right && rect.bottom <= this.bottom : false;
    }

    /**
     * distort rectangle by factor
     * @param  {number} factor - the specified factor of distortion
     * @return {Rectangle} a new instance of Rectangle
     */
    getDistortedRect(factor) {
        return new Rectangle(this.x * factor, this.y, this.width * factor, this.height);
    }

    /**
     * check if rectangles are equal
     * @param  {Rectangle} rectangle - the specified rectangle to check against this
     * @return {Boolean} is true, if x, y, width and height are the same
     */
    equals(rectangle) {
        return (rectangle instanceof Rectangle) ? this.x === rectangle.x && this.y === rectangle.y && this.width === rectangle.width && this.height === rectangle.height : false;
    }

    /**
     * representation of a Rectangle as String
     * @return {String} representation of this Rectangle
     */
    toString() {
        return `(${this.x},${this.y},${this.width},${this.height})`;
    }

}