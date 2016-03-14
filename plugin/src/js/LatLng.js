import {Point} from './Point.js';
import {Rectangle} from './Rectangle.js';

export class LatLng {

    /**
     * Constructor
     * @param  {number} lat = 0 - representation of latitude
     * @param  {number} lng = 0 - representation of longitude
     * @param  {Boolean} isDistance = false - if LatLng should be checked against bounds
     * @return {LatLng} new instance of LatLng
     */
    constructor(lat = 0, lng = 0, isDistance = false) {
        if (!isDistance && (lat > 90 || lat < -90 || lng > 180 || lng < -180)) {
            throw new Error(`latitude(${lat}) is greater/smaller than +/-90 or longitude(${lng}) is greater/smaller than +/-180`);
        }
        this.lat = lat;
        this.lng = lng;
        return this;
    }

    /**
     * substract specified coord from this coordinate
     * @param  {LatLng} coord - specified coordinate to substract from this coord
     * @return {LatLng} the new calculated LatLng
     */
    sub(coord) {
        return new LatLng(this.lat - coord.lat, this.lng - coord.lng);
    }

    /**
     * substract specified coord from this coordinate
     * @param  {LatLng} coord - specified coordinate to substract from this coord
     * @return {LatLng} the new calculated LatLng
     */
    difference(coord) {
        return new LatLng(this.lat - coord.lat, this.lng - coord.lng, true);
    }

    /**
     * add specified coord to this coordinate
     * @param  {LatLng} coord - specified coordinate to add to this coord
     * @return {LatLng} the new calculated LatLng
     */
    add(coord) {
        return new LatLng(this.lat + coord.lat, this.lng + coord.lng);
    }

    /**
     * converts Latlng to a Point
     * @return {Point} Returns a Point representing LatLng in Pixels
     */
    toPoint(bounds, rect) {
        let relativePosition = bounds.nw.difference(this),
            factorX = rect.width / bounds.width,
            factorY = rect.height / bounds.height;
        return new Point(Math.abs(relativePosition.lng * factorX), Math.abs(relativePosition.lat * factorY));
    }

    /**
     * checks if specified coord equals this coord
     * @param  {LatLng} coord - specified coord to check against
     * @return {Boolean} Returns if specified coord equals this coord
     */
    equals(coord) {
        return this.lat === coord.lat && this.lng === coord.lng;
    }

}
