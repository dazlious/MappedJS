
export class Point {

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
    sub(point) {
        return new Point(this.x - point.x, this.y - point.y);
    }

    /**
     * adds 2 points
     * @param  {Point} point - the point to add to this
     * @return {Point} addition of this point and parameter point
     */
    add(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }

}

Point.createFromPoint = (point) => new Point(point.x, point.y);
