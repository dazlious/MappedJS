var Point = require('./Point.js');

export class MappedJS {

    constructor() {
        this.initializeApi();
    }

    initializeApi() {
        this.api = {
            Point: Point
        };
    }

}
