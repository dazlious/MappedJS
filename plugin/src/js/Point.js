import {LatLng} from './LatLng.js';

export class Point {

    /**
     * length of a point
     * @return {number} length of a point
     */
    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     * gets a clone of this point
     * @return {Point} new instance equals this point
     */
    get clone() {
        return Point.createFromPoint(this);
    }

    /**
     * Constructor
     * @param  {number} x = 0 - representation of x coordinate
     * @param  {number} y = 0 - representation of y coordinate
     * @return {Point} new instance of point
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * substracts 2 points
     * @param  {Point} point - the point to substract from this
     * @return {Point} difference between this point and parameter point
     */
    substract(point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }

    /**
     * adds 2 points
     * @param  {Point} point - the point to add to this
     * @return {Point} addition of this point and parameter point
     */
    add(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    }

    /**
     * multiplicates a point with a given x and y
     * @param  {number} x - factor to multiplicate x with
     * @param  {number} y - factor to multiplicate y with
     * @return {Point} Returns a new instance
     */
    multiply(x, y = x) {
        this.x *= x;
        this.y *= y;
        return this;
    }

    /**
     * divide a point with a given x and y
     * @param  {number} x - factor to divide x with
     * @param  {number} y - factor to divide y with
     * @return {Point} Returns a new instance
     */
    divide(x, y = x) {
        this.x /= x;
        this.y /= y;
        return this;
    }

    /**
     * check if points are equal
     * @param  {Point} point - the point to check against this
     * @return {Boolean} is true, if x and y are the same
     */
    equals(point) {
        return this.x === point.x && this.y === point.y;
    }

    /**
     * Returns the distance from this Point to a specified Point
     * @param  {Point} point - the specified point to be measured against this Point
     * @return {Point} the distance between this Point and specified point
     */
    distance(point) {
        return this.clone.substract(point).length;
    }

    /**
     * translates a point by x and y
     * @param  {number} x - value to move x
     * @param  {number} y - value to move y
     * @return {Point} instance of Point
     */
    translate(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    /**
     * positions a point by x and y
     * @param  {number} x - value to position x
     * @param  {number} y - value to position y
     * @return {Point} instance of Point
     */
    position(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * translates a Point to an array
     * @return {Array} Returns Point as Array(x, y)
     */
    toArray() {
        return [this.x, this.y];
    }

}

/**
 * Creates a Point from specified point
 * @param  {Point} point - specified point
 * @return {Point} the point specified
 */
Point.createFromPoint = (point) => new Point(point.x, point.y);
