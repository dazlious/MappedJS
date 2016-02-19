class Point {

    /**
     * Initializes a Point
     * @param  {Number} x =             0 x-coordinate
     * @param  {Number} y =             0 y-coordinat
     * @return {Point}   Representation of a Point (x, y)
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y
    }

    toString() {
        return `({this.x}, {this.y})`
    }
}
