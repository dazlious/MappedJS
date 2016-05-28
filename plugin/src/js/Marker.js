import $ from 'jQuery';
import {Events} from './Events.js';
import {Helper} from './Helper.js';
import {Point} from './Point.js';
import {Rectangle} from './Rectangle.js';
import {Publisher} from './Publisher.js';
import {DataEnrichment} from './DataEnrichment.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file represents a marker with an image, a position and content
 * @copyright Michael Duve 2016
 */
export class Marker {

    get boundingBox() {
        const bBox = this.icon.getBoundingClientRect();
        return new Rectangle(bBox.left, bBox.top, bBox.width, bBox.height).scaleCenter(1.2);
    }

    /**
     * @constructor
     * @param  {Object} data = DataEnrichment.DATA_MARKER - enriched data
     * @param  {View} _instance = parent instance - instance of parent view
     * @return {Marker} - instance of Marker for chaining
     */
    constructor({data = DataEnrichment.DATA_MARKER, _instance = null, id}) {

        if(!_instance) throw new Error(`Tile needs an instance`);
        this.instance = _instance;

        this.eventID = id;

        this.id = Marker.count;
        Marker.count++;

        this.size = data.size;

        this.hover = data.hover;
        if (this.hover) this.size.divide(2, 1);

        this.img = data.icon;
        this.offset = data.offset.add(new Point(-(this.size.x/2), -this.size.y));
        this.latlng = data.latlng;

        this.content = data.content;
        this.$icon = this.addMarkerToDOM(this.instance.$markerContainer);
        this.icon = this.$icon[0];

        return this.bindEvents().positionMarker();
    }

    /**
     * binds all events
     * @return {Marker} instance of Marker for chaining
     */
    bindEvents() {
        this.eventManager = new Publisher(this.eventID);

        if (this.content.length) {
            this.$icon.data("mjs-action", this.action.bind(this));
            this.eventManager.subscribe(Events.Marker.DEACTIVATE, () => {
                this.$icon.removeClass("active");
            });
        }

        return this;
    }

    action() {
        this.eventManager.publish(Events.ToolTip.OPEN, this.content);
        this.eventManager.publish(Events.Marker.DEACTIVATE);
        this.$icon.addClass("active");
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
        this.position = this.instance.view.convertLatLngToPoint(this.latlng);
        const p = this.position.clone.divide(this.instance.view.currentView.width, this.instance.view.currentView.height).multiply(100);
        if (this.$icon) {
            this.$icon.css({
                "left": `${p.x}%`,
                "top": `${p.y}%`
            }).show();
        }
        return this;
    }

}

Marker.count = 0;
