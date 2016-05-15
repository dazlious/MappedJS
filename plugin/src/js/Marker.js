import $ from 'jQuery';
import {Events} from './Events.js';
import {Helper} from './Helper.js';
import {Point} from './Point.js';
import {Publisher} from './Publisher.js';
import {DataEnrichment} from './DataEnrichment.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file represents a marker with an image, a position and content
 * @copyright Michael Duve 2016
 */
export class Marker {

    /**
     * @constructor
     * @param  {Object} data = DataEnrichment.DATA_MARKER - enriched data
     * @param  {View} _instance = parent instance - instance of parent view
     * @return {Marker} - instance of Marker for chaining
     */
    constructor(data = DataEnrichment.DATA_MARKER, _instance = null) {

        if(!_instance) throw new Error(`Tile needs an instance`);
        this.instance = _instance;

        this.size = data.size;

        this.hover = data.hover;
        if (this.hover) this.size.divide(2, 1);

        this.img = data.icon;
        this.offset = data.offset.add(new Point(-(this.size.x/2), -this.size.y));
        this.latlng = data.latlng;

        this.content = data.content;
        this.position = this.instance.convertLatLngToPoint(this.latlng);
        this.$icon = this.addMarkerToDOM(this.instance.$markerContainer);

        return this.bindEvents().positionMarker();
    }

    /**
     * binds all events
     * @return {Marker} instance of Marker for chaining
     */
    bindEvents() {
        this.eventManager = new Publisher();

        const gesture = Helper.isTouch() ? Events.Handling.TOUCHSTART: Events.Handling.CLICK;

        this.$icon.on(gesture, () => {
            this.eventManager.publish(Events.ToolTip.OPEN, this.content);
            this.eventManager.publish(Events.Marker.DEACTIVATE);
            this.$icon.addClass("active");
        });

        this.eventManager.subscribe(Events.Marker.DEACTIVATE, () => {
            this.$icon.removeClass("active");
        });

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
            icon.hide();
            $container.append(icon);
        }
        return icon;
    }

    /**
     * set initial position of this marker
     * @return {Marker} instance of Marker for chaining
     */
    positionMarker() {
        this.position = this.instance.convertLatLngToPoint(this.latlng);
        if (this.$icon) {
            this.$icon.css({
                "left": `${this.position.x / this.instance.currentView.width * 100}%`,
                "top": `${this.position.y / this.instance.currentView.height * 100}%`
            }).show();
        }
        return this;
    }

}
