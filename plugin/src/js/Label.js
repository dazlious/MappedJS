import {Events} from './Events.js';
import {Helper} from './Helper.js';
import {LatLng} from './LatLng.js';
import {MapInformation} from './MapInformation.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file shows an icon and/or a text at given position
 * @copyright Michael Duve 2016
 */
export class Label {

    get position() {
        return this.info.convertLatLngToPoint(this.nearestPositionToCenter)
            .translate(this.view.x, this.view.y)
            .multiply(this.distortionFactor, 1)
            .translate(this.offsetToCenter, 0);
    }

    get nearestPositionToCenter() {
        return (this.latlng instanceof LatLng) ? this.latlng : this.getNearestPositionToCenter();
    }

    get view() {
        return this.info.get().view;
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

    /**
     * @constructor
     * @return {Label} instance of Label for chaining
     */
    constructor({settings, context, id}) {
        this.id = id;
        this.info = new MapInformation(this.id);

        this.context = context;

        this.latlng = settings.position;
        this.text = settings.text;
        this.icon = settings.icon;

        if (this.icon && this.icon.type === "circle") this.drawIconType = this.drawCircleIcon(this.icon.size);
        else if (this.icon && this.icon.type === "square") this.drawIconType = this.drawSquareIcon(this.icon.size);
        else if (this.icon && this.icon.type === "image") {
            this.drawIconType = () => {};
            Helper.loadImage(this.icon.url, (img) => {
                this.drawIconType = this.drawImageIcon(img, this.icon.size, this.icon.offset);
            });

        }
        this.drawElements = this.decideWhatToDraw(this.text, this.icon);

        return this;
    }

    getNearestPositionToCenter() {
        const center = this.center.clone.multiply(-1);
        this.latlng = this.latlng.sort((a, b) => center.distance(a) - center.distance(b));
        return this.latlng[0];
    }

    draw() {
        const pos = this.position;
        const textPos = pos.clone.add(this.text.offset);

        this.context.beginPath();
        this.drawElements(pos, textPos);
        this.context.closePath();

        return this;
    }

    decideWhatToDraw(text, icon) {
        if (text && icon) {
            return (pos, textPos) => {
                this.drawText(textPos);
                this.drawIcon(pos);
            };
        } else if (icon) {
            return (pos) => this.drawIcon(pos);
        } else if (text) {
            return (pos, textPos) => this.drawText(textPos);
        }

    }

    drawText(pos) {
        this.context.shadowColor = this.text.shadow.color;
        this.context.shadowBlur = this.text.shadow.blur;
        this.context.textAlign = this.text.align;
        this.context.textBaseline = this.text.baseline;
        this.context.font = this.text.font;
        this.context.fillStyle = this.text.color;
        this.context.fillText(this.text.content, pos.x, pos.y);
    }

    drawIcon(pos) {
        this.context.shadowColor = this.icon.shadow.color;
        this.context.shadowBlur = this.icon.shadow.blur;
        this.context.fillStyle = this.icon.color;
        this.drawIconType(pos);
        this.context.fill();
    }

    drawCircleIcon(size) {
        return (pos) => this.context.arc(pos.x, pos.y, size, 0, 2 * Math.PI, false);
    }

    drawSquareIcon(size) {
        return (pos) => this.context.rect(pos.x, pos.y, size, size);
    }

    drawImageIcon(image, size, offset) {
        return (pos) => this.context.drawImage(image, pos.x + offset.x, pos.y + offset.y, size.x, size.y);
    }

}
