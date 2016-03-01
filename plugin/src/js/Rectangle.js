var Point = require("./Point.js").Point;

export class Rectangle {

    constructor(top, left, width, height) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.topLeft = new Point(top, left);
        this.topRight = new Point(top, left + width);
        this.bottomLeft = new Point(top + height, left);
        this.bottomRight = new Point(top + height, left + width);
        this.center = new Point(top + (height / 2), left + (width / 2));
    }

    getDifferenceBetweenCenter(rectangle) {
        return this.center.sub(rectangle.center);
    }

}
