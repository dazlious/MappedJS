import {Publisher} from './Publisher.js';
import {MapInformation} from './MapInformation.js';
import {Rectangle} from './Rectangle.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file
 * @copyright Michael Duve 2016
 */
export class Drawable extends Rectangle {

    get view() {
        return this.info.get().view;
    }

    get level() {
        return this.info.get().level;
    }

    get viewport() {
        return this.info.get().viewport;
    }

    get distortionFactor() {
        return this.info.get().distortionFactor;
    }

    get offsetToCenter() {
        return this.info.get().offsetToCenter;
    }

    get centerPosition() {
        return this.info.get().center;
    }

    get zoomFactor() {
        return this.info.get().zoomFactor;
    }

    get bounds() {
        return this.info.get().bounds;
    }

    constructor(id = 0, x = 0, y = 0, w = 0, h = 0) {
        super(x, y, w, h);
        this.id = id;
        this.info = new MapInformation(this.id);
        this.eventManager = new Publisher(this.id);
        return this;
    }

    draw() {
        return this;
    }

}
