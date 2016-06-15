import {Publisher} from './Publisher.js';
import {MapInformation} from './MapInformation.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file
 * @copyright Michael Duve 2016
 */
export class Drawable {

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

    get center() {
        return this.info.get().center;
    }

    get zoomFactor() {
        return this.info.get().zoomFactor;
    }

    get bounds() {
        return this.info.get().bounds;
    }

    constructor({id}) {
        this.id = id;
        this.info = new MapInformation(this.id);
        this.eventManager = new Publisher(this.id);
        return this;
    }

    draw() {
        return this;
    }

}
