import {Events} from './Events.js';
import {Helper} from './Helper.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file shows an icon and/or a text at given position
 * @copyright Michael Duve 2016
 */
export class Label {

    get position() {
        return this.instance.view.convertLatLngToPoint(this.latlng)
            .translate(this.instance.view.currentView.x, this.instance.view.currentView.y)
            .multiply(this.instance.view.distortionFactor, 1)
            .translate(this.instance.view.offsetToCenter, 0);
    }

    /**
     * @constructor
     * @return {Label} instance of Label for chaining
     */
    constructor({settings, instance, context}) {
        this.instance = instance;
        this.context = context;

        this.latlng = settings.position;
        this.text = settings.text;
        this.icon = settings.icon;

        return this;
    }

    initialize() {

        return this;
    }

    draw() {
        const pos = this.position;
        const textPos = pos.clone.add(this.text.offset);

        this.context.beginPath();

        if (this.text) this.drawText(textPos);
        if (this.icon) this.drawIcon(pos);

        this.context.closePath();

        return this;
    }

    drawText(pos) {
        this.context.shadowColor = this.text.shadow.color;
        this.context.shadowBlur = this.text.shadow.blur;
        this.context.textAlign = this.text.align;
        this.context.textBaseline = this.text.baseline;
        this.context.font = this.text.font;
        this.context.fillText(this.text.content, pos.x, pos.y);
    }

    drawIcon(pos) {
        this.context.shadowColor = this.icon.shadow.color;
        this.context.shadowBlur = this.icon.shadow.blur;
        this.context.fillStyle = this.icon.color;
        if (this.icon.type === "circle") this.context.arc(pos.x, pos.y, this.icon.size, 0, 2 * Math.PI, false);
        if (this.icon.type === "square") this.context.rect(pos.x, pos.y, this.icon.size, this.icon.size);
        this.context.fill();
    }

}
