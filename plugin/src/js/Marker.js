import {Rectangle} from './Rectangle.js';
import {LatLng} from './LatLng.js';
import {StateHandler} from './StateHandler.js';
import {Point} from './Point.js';
import {Helper} from './Helper.js';
import $ from 'jquery';

/**
 * States of a marker
 * @type {Array}
 */
const STATES = [
    {value: 0, description: 'Loading'},
    {value: 0, description: 'Initialized'},
    {value: 1, description: 'Ready'}
];

export class Marker {

    get scaleX() {
        return this.distortionFactor();
    }

    get viewOffset() {
        return this.mapOffset();
    }

    get xOffset() {
        return this.xOffsetToCenter();
    }

    constructor(data = null, $container=null, distortionFactor = function(){return 1;}, mapOffset = function(){return new Point();}, xOffsetToCenter = function() {return 0;}, calculateLatLngToPoint = function() {return new Point();}) {
        if (!data) {
            console.error("Can not initialize Marker", data);
        }

        this.stateHandler = new StateHandler(STATES);

        this.calculateLatLngToPoint = calculateLatLngToPoint;
        this.distortionFactor = distortionFactor;
        this.mapOffset = mapOffset;
        this.xOffsetToCenter = xOffsetToCenter;

        this.size = data.size;
        this.hover = data.hover;
        if (this.hover) {
            this.size.divide(2, 1);
        }
        this.img = data.icon;
        this.offset = data.offset;
        this.offset.add(new Point(-(this.size.x/2), -this.size.y));
        this.latlng = data.latlng;

        this.position = this.calculateLatLngToPoint(this.latlng);

        this.icon = this.addMarkerToDOM($container);

        this.moveMarker();
    }

    addMarkerToDOM($container) {
        const icon = $("<div class='marker' />").css({
            "width": `${this.size.x}px`,
            "height": `${this.size.y}px`,
            "margin-left": `${this.offset.x}px`,
            "margin-top": `${this.offset.y}px`,
            "background-image": `url(${this.img})`,
            "background-size": `${(this.hover) ? this.size.x*2 : this.size.x}px ${this.size.y}px`
        });
        if ($container) {
            $container.append(icon);
            this.stateHandler.next();
        }
        return icon;
    }

    moveMarker() {
        const p = new Point((this.position.x + this.viewOffset.x) * this.scaleX + this.xOffset, this.position.y + this.viewOffset.y);
        if (this.icon) {
            this.icon.css({
                transform: `translate3d(${p.x}px, ${p.y}px, 0)`
            });
        }
    }

}
