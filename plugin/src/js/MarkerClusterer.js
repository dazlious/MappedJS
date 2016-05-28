import {Events} from './Events.js';
import {Publisher} from './Publisher.js';
import {Cluster} from './Cluster.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file represents a class which helps clustering overlapping markers
 * @copyright Michael Duve 2016
 */
export class MarkerClusterer {
    /**
     * @constructor
     * @return {MarkerClusterer} instance of MarkerClusterer for chaining
     */
    constructor({markers = [], $container = null, id}) {
        this.markers = markers;
        this.id = id;
        this.$container = $container;
        this.clusters = [];
        this.eventManager = new Publisher(this.id);
        this.bindEvents();
        this.clusterize();
        return this;
    }

    bindEvents() {
        this.eventManager.subscribe(Events.MarkerClusterer.CLUSTERIZE, () => {
            this.clusterize();
        });
        this.eventManager.subscribe(Events.MarkerClusterer.UNCLUSTERIZE, () => {
            this.deleteAllClusters();
        });
    }

    clusterize() {
        this.deleteAllClusters();
        for (const [i, marker] of this.markers.entries()) {
            const hits = [];
            for (const [j, cluster] of this.clusters.entries()) {
                if (marker.boundingBox.intersects(cluster.boundingBox)) {
                    hits.push(cluster);
                }
            }
            if (!hits.length) {
                const newCluster = this.createCluster(marker);
                this.clusters.push(newCluster);
            } else {
                const nearestCluster = this.findNearestHit(marker, hits);
                nearestCluster.addMarker(marker);
            }
        }
        for (const [i, cluster] of this.clusters.entries()) {
            cluster.init();
        }
    }

    findNearestHit(marker, hits) {
        let lastDistance,
            minimalHit;
        for (const [i, hit] of hits.entries()) {
            if (!lastDistance) {
                lastDistance = this.getDistance(marker, hit);
                minimalHit = hit;
            } else {
                const currentDistance = this.getDistance(marker, hit);
                if (currentDistance < lastDistance) {
                    lastDistance = currentDistance;
                    minimalHit = hit;
                }
            }
        }
        return minimalHit;
    }

    getDistance(marker, cluster) {
        return marker.boundingBox.center.distance(cluster.boundingBox.center);
    }

    createCluster(marker) {
        const newCluster = new Cluster({
            $container: this.$container,
            id: this.id
        });
        newCluster.addMarker(marker);
        return newCluster;
    }

    deleteAllClusters() {
        for (const [i, cluster] of this.clusters.entries()) {
            cluster.removeFromDOM();
        }
        this.clusters = [];
    }

}
