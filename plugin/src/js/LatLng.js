import {Point} from './Point.js';

export class LatLng {

    /**
     * length of a latlng
     * @return {number} length of a latlng
     */
    get length() {
        return Math.sqrt(Math.pow(this.lat, 2) + Math.pow(this.lng, 2));
    }

    /**
     * gets a clone of this latlng
     * @return {LatLng} new instance equals this latlng
     */
    get clone() {
        return LatLng.createFromLatLng(this);
    }

    /**
     * Constructor
     * @param  {number} lat = 0 - representation of latitude
     * @param  {number} lng = 0 - representation of longitude
     * @param  {Boolean} isDistance = false - if LatLng should be checked against bounds
     * @return {LatLng} new instance of LatLng
     */
    constructor(lat = 0, lng = 0, isDistance = false) {
        this.lat = lat % 90;
        this.lat = (this.lat === -0) ? 0 : this.lat;
        this.lng = lng % 180;
        this.lng = (this.lng === -0) ? 0 : this.lng;
        return this;
    }

    /**
     * substract specified coord from this coordinate
     * @param  {LatLng} coord - specified coordinate to substract from this coord
     * @return {LatLng} the new calculated LatLng
     */
    substract(coord) {
        this.lat -= coord.lat;
        this.lng -= coord.lng;
        return this;
    }

    /**
     * add specified coord to this coordinate
     * @param  {LatLng} coord - specified coordinate to add to this coord
     * @return {LatLng} the new calculated LatLng
     */
    add(coord) {
        this.lat += coord.lat;
        this.lng += coord.lng;
        return this;
    }

    /**
    * divides a latlng with a given factor
    * @param  {number} factorLat - factor to divide lat with
    * @param  {number} factorLng = factorLat - factor to divide lng with
     * @return {LatLng} Returns instance for chaining
     */
    divide(factorLat, factorLng = factorLat) {
        this.lat /= factorLat;
        this.lng /= factorLng;
        return this;
    }

    /**
     * multiplicates a latlng with a given factor
     * @param  {number} factorLat - factor to multiplicate lat with
     * @param  {number} factorLng = factorLat - factor to multiplicate lng with
     * @return {LatLng} Returns instance for chaining
     */
    multiply(factorLat, factorLng = factorLat) {
        this.lat *= factorLat;
        this.lng *= factorLng;
        return this;
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

/**
 * Creates a LatLng from specified LatLng
 * @param  {LatLng} LatLng - specified LatLng
 * @return {LatLng} the LatLng specified
 */
LatLng.createFromLatLng = (latlng) => new LatLng(latlng.lat, latlng.lng);
