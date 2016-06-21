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
    constructor({markers = [], container = null, id = 0}) {
        this.markers = markers;
        this.id = id;
        this.container = container;
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
        for (const marker of this.markers) {
            const hits = [];
            for (const cluster of this.clusters) {
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
        for (const cluster of this.clusters) {
            cluster.init();
        }
    }

    findNearestHit(marker, hits) {
        let lastDistance,
            minimalHit;
        for (const hit of hits) {
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
            container: this.container,
            id: this.id
        });
        newCluster.addMarker(marker);
        return newCluster;
    }

    deleteAllClusters() {
        for (const cluster of this.clusters) {
            cluster.removeFromDOM();
        }
        this.clusters = [];
        Cluster.count = 0;
    }

}
