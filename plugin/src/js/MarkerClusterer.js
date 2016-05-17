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
    constructor({markers = [], $container = null, view = null}) {
        this.markers = markers;
        this.$container = $container;
        this.view = view;
        this.clusters = [];
        this.clusterize();
        return this;
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
            view: this.view
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
