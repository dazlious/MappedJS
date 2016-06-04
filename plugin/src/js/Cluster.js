import $ from 'jQuery';
import {Events} from './Events.js';
import {Publisher} from './Publisher.js';
import {Point} from './Point.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file represents a cluster of markers
 * @copyright Michael Duve 2016
 */
export class Cluster {
    /**
     * @constructor
     * @return {Cluster} instance of Cluster for chaining
     */
    constructor({$container = null, id}) {
        this.markers = [];
        this.id = id;
        this.$container = $container;
        this.eventManager = new Publisher(this.id);
        return this;
    }

    init() {
        if (this.markers.length === 1) {
            this.markers[0].$icon.show();
        } else {
            this.createClusterMarker();
        }
    }

    createClusterMarker() {
        let p;
        for (const marker of this.markers) {
            marker.$icon.hide();
            const currentPos = new Point(parseFloat(marker.icon.style.left), parseFloat(marker.icon.style.top));
            p = (!p) ? currentPos : p.add(currentPos);
        }
        p.divide(this.markers.length);

        this.$cluster = $("<div class='cluster'>"+this.markers.length+"</div>").css({
            "left": `${p.x}%`,
            "top": `${p.y}%`,
            "transform": `translateZ(0)`
        });
        this.$container.append(this.$cluster);
        this.bindEvents();
    }

    bindEvents() {
        this.$cluster.data("mjs-action", this.action.bind(this));
    }

    action() {
        this.eventManager.publish(Events.TileMap.ZOOM_TO_BOUNDS, this.boundingBox);
    }

    addMarker(marker) {
        this.markers.push(marker);
        this.boundingBox = (!this.boundingBox) ? marker.boundingBox : this.boundingBox.extend(marker.boundingBox);
    }

    removeFromDOM() {
        if (this.markers.length > 1) {
            for (const marker of this.markers) {
                marker.$icon.show();
            }
            this.$cluster.remove();
        }
    }

}
