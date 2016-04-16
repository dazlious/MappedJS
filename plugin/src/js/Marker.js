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
    {value: 0, description: 'Initialized'},
    {value: 1, description: 'Loaded'}
];

export class Marker {

    get scaleX() {
        return this.distortionFactor();
    }

    get viewOffset() {
        return this.mapOffset();
    }

    get xOffset() {
        return this.xOffsetToCenter();
    }

    constructor(position = new Point(), imgPath = null, offset = new Point(), $container=null, distortionFactor = function(){return 1;}, mapOffset = function(){return new Point();}, xOffsetToCenter = function() {return 0;}) {
        if (!imgPath) {
            console.error("Can not initialize Marker", imgPath);
        }

        this.distortionFactor = distortionFactor;
        this.mapOffset = mapOffset;
        this.xOffsetToCenter = xOffsetToCenter;

        this.position = position;
        this.offset = offset;

        this.$container = $container;

        this.stateHandler = new StateHandler(STATES);

        Helper.loadImage(imgPath, function(img) {
            this.onImageLoad(img);
        }.bind(this));
    }

    onImageLoad(img) {
        this.img = img;
        this.offset.add(new Point(-(this.img.width/2), -this.img.height));
        this.addMarkerToDOM();
        this.stateHandler.next();
        this.moveMarker();
    }

    addMarkerToDOM() {
        this.icon = $(this.img).addClass("marker").css({
            "position": "absolute",
            "top": 0,
            "left": 0
        });
        if (this.$container) {
            this.$container.append(this.icon);
        }
    }

    moveMarker() {
        const p = new Point((this.position.x + this.viewOffset.x) * this.scaleX + this.xOffset, this.position.y + this.viewOffset.y);
        p.add(this.offset);
        this.icon.css({
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`
        });
    }

}
