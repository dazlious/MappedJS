import {Point} from './Point.js';
import {LatLng} from './LatLng.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';

export class View {

    /**
     * Returns the offset of the center
     */
    get offset() {
        let center = this.center.toPoint(this.bounds, this.mapView);
        let newCenter = this.viewport.center.sub(center);
        return newCenter;
    }

    /**
     * Returns the offset of the map
     * @param {number} distortion - the current latitude distortion
     * @return {number} calculated offset
     */
    getMapOffset(distortion) {
        return this.offset.x + ((this.mapView.width - (this.mapView.width * distortion)) / 2);
    }

    /**
     * Constructor
     * @param  {Object} settings - the settings Object
     * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
     * @param  {Rectangle} mapView = new Rectangle() - current representation of map
     * @param  {Bounds} bounds = new Bounds() - current bounds of map
     * @param  {LatLng} center = new LatLng() - current center of map
     * @return {View} Instance of View
     */
    constructor({viewport = new Rectangle(), mapView = new Rectangle(),bounds = new Bounds(), center = new LatLng()}) {
        this.mapView = mapView;
        this.viewport = viewport;
        this.bounds = bounds;
        this.center = center;
        return this;
    }

}
