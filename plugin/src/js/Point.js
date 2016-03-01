
export class Point {

    constructor(x , y) {
        this.x = x;
        this.y = y;
    }

    sub(point) {
        return new Point(this.x - point.x, this.y - point.y);
    }

    add(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }

}
