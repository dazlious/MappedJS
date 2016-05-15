import {LatLng} from './LatLng.js';

export class Bounds {

    /**
     * get width of boundaries
     * @return {number} width of boundaries
     */
    get width() {
        return Math.abs(this.so.lng - this.nw.lng);
    }

    /**
     * get height of boundaries
     * @return {number} height of boundaries
     */
    get height() {
        return Math.abs(this.so.lat - this.nw.lat);
    }

    /**
     * get size
     * @return {Point} calculated Size of boundaries
     */
    get range() {
        return this.nw.clone.substract(this.so);
    }

    /**
     * Constructor
     * @param  {number} northWest = new LatLng() - representation of northWest boundary
     * @param  {number} southEast = new LatLng() - representation of southEast boundary
     * @return {Bounds} instance of Bounds for chaining
     */
    constructor(northWest = new LatLng(), southEast = new LatLng()) {
        if (northWest.lat < southEast.lat || northWest.lng > southEast.lng) throw new Error(`${northWest} needs to be top-right corner and ${southEast} bottom-left`);
        this.nw = northWest;
        this.so = southEast;
        return this;
    }

}
