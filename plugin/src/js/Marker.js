import $ from 'jquery';
import {Point} from './Point.js';
import {StateHandler} from './StateHandler.js';
import {DataEnrichment} from './DataEnrichment.js';

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

    /**
     * Constructor
     * @param  {Object} data = DataEnrichment.DATA_MARKER - enriched data
     * @param  {View} _instance = parent instance - instance of parent view
     * @return {Marker} - instance of Marker for chaining
     */
    constructor(data = DataEnrichment.DATA_MARKER, _instance = null) {

        this.stateHandler = new StateHandler(STATES);

        if(!_instance) {
            throw new Error(`Tile needs an instance`);
        }
        this.instance = _instance;

        this.size = data.size;
        this.hover = data.hover;
        if (this.hover) {
            this.size.divide(2, 1);
        }
        this.img = data.icon;
        this.offset = data.offset;
        this.offset.add(new Point(-(this.size.x/2), -this.size.y));
        this.latlng = data.latlng;

        this.position = this.instance.convertLatLngToPoint(this.latlng);

        this.icon = this.addMarkerToDOM(this.instance.$markerContainer);

        this.positionMarker();

        return this;
    }

    /**
     * adds a marker to the DOM
     * @param {Object} $container - container to append to (jQuery selector)
     * @returns {Object} jQuery-selector of append markup
     */
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

    /**
     * set initial position of this marker
     * @return {Marker} - instance of Marker for chaining
     */
    positionMarker() {
        this.position = this.instance.convertLatLngToPoint(this.latlng);
        //const p = new Point((this.position.x + this.instance.currentView.x) * this.instance.distortionFactor + this.instance.offsetToCenter, this.position.y + this.instance.currentView.y);
        if (this.icon) {
            this.icon.css({
                "left": `${this.position.x / this.instance.currentView.width * 100}%`,
                "top": `${this.position.y / this.instance.currentView.height * 100}%`
                //transform: `translate3d(${p.x}px, ${p.y}px, 0)`
            });
        }
        return this;
    }

}
