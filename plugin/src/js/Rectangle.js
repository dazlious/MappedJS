import {Point} from './Point.js';

export class Rectangle extends Point {

    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.center = new Point(y + (height / 2), x + (width / 2));
    }

    getDifferenceBetweenCenter(rectangle) {
        return this.center.sub(rectangle.center);
    }

}
