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
    {value: 0, description: 'Starting'},
    {value: 1, description: 'Loaded'}
];

/**
 * Name of event fired, when marker is loaded
 * @type {String}
 */
const EVENT_MARKER_LOADED = "marker-loaded";

export class Marker {

    constructor(position = new Point(), imgPath = null, offset = new Point()) {
        if (!imgPath) {
            console.error("Can not initialize Marker", imgPath);
        }

        this.position = position;
        this.offset = offset;
        this.path = imgPath;

        this.stateHandler = new StateHandler(STATES);

        Helper.loadImage(this.path, function(img) {
            this.onImageLoad(img);
        }.bind(this));
    }

    onImageLoad(img) {
        this.img = img;
        this.offset.add(new Point(-(this.img.width/2), -this.img.height));
        this.icon = new Rectangle(this.position.x, this.position.y, this.img.width, this.img.height);
        this.stateHandler.next();
    }

    draw(x, y, scaleX, offsetX, context) {
        if (this.stateHandler.current.value === 1) {
            const p = new Point((this.icon.x + x) * scaleX + offsetX, this.icon.y + y);
            p.add(this.offset);
            context.drawImage(this.img, p.x, p.y, this.icon.width, this.icon.height);
        }
    }

}
