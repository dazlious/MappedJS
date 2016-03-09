
export class LatLng {

    /**
     * Constructor
     * @param  {number} lat = 0 - representation of latitude
     * @param  {number} lng = 0 - representation of longitude
     * @return {LatLng} new instance of LatLng
     */
    constructor(lat = 0, lng = 0) {
        this.lat = lat;
        this.lng = lng;
        return this;
    }

    /**
     * representation of a LatLng as String
     * @return {String} representation of this LatLng
     */
    toString() {
        return `(${this.lat},${this.lng})`;
    }

}
