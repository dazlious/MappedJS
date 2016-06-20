import {Events} from './Events.js';
import {Helper} from './Helper.js';
import {Drawable} from './Drawable.js';
import {LatLng} from './LatLng.js';
import {Point} from './Point.js';
import {Rectangle} from './Rectangle.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file shows an icon and/or a text at given position
 * @copyright Michael Duve 2016
 */
export class Label extends Drawable {

    get position() {
        return this.info.convertLatLngToPoint(this.nearestPositionToCenter)
            .translate(this.view.x, this.view.y)
            .multiply(this.distortionFactor, 1)
            .translate(this.offsetToCenter, 0);
    }

    get nearestPositionToCenter() {
        return (this.latlng instanceof LatLng) ? this.latlng : this.getNearestPositionToCenter();
    }

    get boundingBox() {
        const x = this.position.x + this.offset.x;
        const y = this.position.y + this.offset.y;
        const sizeX = this.icon.size.x || this.icon.size;
        const sizeY = this.icon.size.y || this.icon.size;

        return new Rectangle(x, y, sizeX, sizeY).scaleCenter(2);
    }

    /**
     * @constructor
     * @return {Label} instance of Label for chaining
     */
    constructor({settings, context, id}) {
        super(id);

        this.context = context;

        this.latlng = settings.position;
        this.text = settings.text;
        this.icon = settings.icon;
        this.content = settings.content;
        this.visibility = settings.visibility;
        this.offset = new Point();

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
        this.latlng = this.latlng.sort((a, b) => this.centerPosition.distance(a) - this.centerPosition.distance(b));
        return this.latlng[0];
    }

    openToolTip() {
        this.eventManager.publish(Events.ToolTip.OPEN, this.content);
    }

    draw() {
        if (this.level >= this.visibility.min && this.level <= this.visibility.max) {
            const pos = this.position;
            const textPos = pos.clone.add(this.text.offset);

            this.context.beginPath();
            this.drawElements(pos, textPos);
            this.context.closePath();
        }
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
        this.context.textAlign = this.text.align;
        this.context.textBaseline = this.text.baseline;
        this.context.font = this.text.font;
        this.context.fillStyle = this.text.color;
        this.context.fillText(this.text.content, pos.x, pos.y);
    }

    drawIcon(pos) {
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
        this.offset = offset;
        return (pos) => this.context.drawImage(image, pos.x + offset.x, pos.y + offset.y, size.x, size.y);
    }

    hit(point) {
        return this.boundingBox.containsPoint(point);
    }

}
