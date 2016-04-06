import {Rectangle} from './Rectangle.js';
import {LatLng} from './LatLng.js';
import {StateHandler} from './StateHandler.js';
import {Point} from './Point.js';

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

        this.stateHandler = new StateHandler(STATES);

        this.img = new Image();
        this.img.src = imgPath;
        this.img.onload = this.onImageLoad.bind(this);

    }

    onImageLoad() {
        this.offset.add(new Point(-(this.img.width/2), -this.img.height));
        this.icon = new Rectangle(this.position.x, this.position.y, this.img.width, this.img.height);
        this.stateHandler.next();
    }

    draw(x, y, scaleX, offsetX, context) {
        if (this.stateHandler.current.value === 1) {
            let p = new Point((this.icon.x + x) * scaleX + offsetX, this.icon.y + y);
            p.add(this.offset);
            context.drawImage(this.img, p.x, p.y, this.icon.width, this.icon.height);
        }
    }

}
