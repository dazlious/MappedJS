import $ from 'jquery';
import {Point} from './Point.js';
import {LatLng} from './LatLng.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Tile} from './Tile.js';
import {Marker} from './Marker.js';
import {Publisher} from './Publisher.js';
import {Helper} from './Helper.js';
import {DataEnrichment} from './DataEnrichment.js';

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

export class View {

    /**
     * Returns current distortionFactor
     * @return {number} returns current distortionFactor of latitude
     */
    get distortionFactor() {
        return (Math.cos(Helper.toRadians(this.center.lat)));
    }

    get getDistortionCalculation() {
        return function() {
            return (Math.cos(Helper.toRadians(this.center.lat)));
        }.bind(this);
    }

    /**
     * Returns the current equalized viewport
     */
    get viewportOffset() {
        return (this.viewport.width - this.viewport.width * this.distortionFactor) / 2;
    }

    get viewportOffsetCalculation() {
        return function() {
            return (this.viewport.width - this.viewport.width * this.distortionFactor) / 2;
        }.bind(this);
    }

    get viewOffsetCalculation() {
        return function() {
            return new Point(this.mapView.x, this.mapView.y);
        }.bind(this);
    }

    get calculateLatLngToPoint() {
        return this.convertLatLngToPoint.bind(this);
    }

    get calculatePointToLatLng() {
        return this.convertPointToLatLng.bind(this);
    }

    /**
     * get all visible tiles
     * @return {array} all tiles that are currently visible
     */
    get visibleTiles() {
        return this.tiles.filter(function(t) {
            const newTile = t.getDistortedRect(this.distortionFactor).translate(this.mapView.x * this.distortionFactor + this.viewportOffset, this.mapView.y);
            return this.viewport.intersects(newTile);
        }, this);
    }

    get pixelPerLatLng() {
        return new Point(this.mapView.width / this.bounds.width, this.mapView.height / this.bounds.height);
    }

    /**
     * Constructor
     * @param  {Object} settings - the settings Object
     * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
     * @param  {Rectangle} mapView = new Rectangle() - current representation of map
     * @param  {Bounds} bounds = new Bounds() - current bounds of map
     * @param  {LatLng} center = new LatLng() - current center of map
     * @param  {Object} data = {} - data of current map
     * @return {View} Instance of View
     */
    constructor({
        viewport = new Rectangle(),
        mapView = new Rectangle(),
        bounds = new Bounds(),
        center = new LatLng(),
        data = {},
        markerData = null,
        $container = null,
        context = null
        }) {

        this.mapView = mapView;
        this.viewport = viewport;
        this.bounds = bounds;
        this.center = center;
        this.zoomFactor = new Point(1, 1);

        const newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
        this.mapView.position(newCenter.x, newCenter.y);

        this.tiles = [];
        this.data = data;
        this.context = context;
        this.markers = [];

        this.bindEvents().initializeTiles().loadThumb().initializeMarkers(markerData, $container);

        return this;
    }

    /**
     * loads thumbnail of view
     * @return {View} instance of View for chaining
     */
    loadThumb() {
        Helper.loadImage(this.data.thumb, function(img) {
            this.thumbScale = img.width / this.mapView.width;
            this.thumb = img;
            this.draw();
        }.bind(this));
        return this;
    }

    /**
     * converts a Point to LatLng in view
     * @param  {Point} point - specified point to be converted
     * @return {LatLng} presentation of point in lat-lng system
     */
    convertPointToLatLng(point) {
        point.divide(this.pixelPerLatLng.x, this.pixelPerLatLng.y);
        return new LatLng(point.y, point.x).substract(this.bounds.nw);
    }

    /**
     * converts a LatLng to Point in view
     * @param  {LatLng} latlng - specified latlng to be converted
     * @return {Point} presentation of point in pixel system
     */
    convertLatLngToPoint(latlng) {
        const relativePosition = this.bounds.nw.clone.substract(latlng);
        relativePosition.multiply(this.pixelPerLatLng.y, this.pixelPerLatLng.x);
        return new Point(relativePosition.lng, relativePosition.lat).abs;
    }

    drawHandler(o) {
        o.handleDraw(this.mapView.x, this.mapView.y, this.distortionFactor, this.viewportOffset, this.zoomFactor);
        return this;
    }

    zoom(direction, scale) {
        const ratio = this.mapView.width / this.mapView.height;
        const factorX = (direction * ratio * scale) / this.mapView.width;
        const factorY = (direction * scale) / this.mapView.height;
        this.zoomFactor.add(new Point(factorX, factorY));
        this.draw();
    }

    /**
     * moves the view's current position by pos
     * @param  {Point} pos - specified additional offset
     * @return {View} instance of View for chaining
     */
    moveView(pos) {
        pos.divide(this.distortionFactor, 1);
        const equalizedMap = this.mapView.getDistortedRect(this.distortionFactor).translate(this.viewportOffset + pos.x, pos.y);
        if (!equalizedMap.containsRect(this.viewport)) {
            if (equalizedMap.width >= this.viewport.width) {
                if (equalizedMap.left - this.viewport.left > 0) {
                    pos.x -= (equalizedMap.left - this.viewport.left);
                }
                if (equalizedMap.right - this.viewport.right < 0) {
                    pos.x -= (equalizedMap.right - this.viewport.right);
                }
            } else {
                this.mapView.setCenterX(this.viewport.center.x);
                pos.x = 0;
            }

            if (equalizedMap.height >= this.viewport.height) {
                if (equalizedMap.top - this.viewport.top > 0) {
                    pos.y -= (equalizedMap.top - this.viewport.top);
                }
                if (equalizedMap.bottom - this.viewport.bottom < 0) {
                    pos.y -= (equalizedMap.bottom - this.viewport.bottom);
                }
            } else {
                this.mapView.setCenterY(this.viewport.center.y);
                pos.y = 0;
            }

        }

        this.mapView.translate(pos.x, pos.y);

        const newCenter = this.mapView.topLeft.substract(this.viewport.center).multiply(-1);
        this.center = this.convertPointToLatLng(newCenter).multiply(-1);

        return this;
    }

    /**
     * Handles all events for class
     * @return {View} instance of View
     */
    bindEvents() {
        PUBLISHER.subscribe("tile-loaded", this.drawHandler.bind(this));
        PUBLISHER.subscribe("tile-initialized", this.drawHandler.bind(this));
        return this;
    }

    /**
     * Handles draw of visible elements
     * @return {View} instance of View
     */
    draw() {
        this.drawThumbnail();

        Helper.forEach(this.visibleTiles, function(tile) {
            this.drawHandler(tile);
        }.bind(this));

        this.repositionMarkers();

        return this;
    }

    drawThumbnail() {
        const rect = this.mapView.getDistortedRect(this.distortionFactor).translate(this.viewportOffset, 0);
        this.context.drawImage(this.thumb, 0, 0, this.thumb.width, this.thumb.height, rect.x, rect.y, rect.width, rect.height);
    }

    /**
     * initializes tiles
     * @return {View} instance of View
     */
    initializeTiles() {
        const currentLevel = this.data.tiles;
        Helper.forEach(currentLevel, function(currentTileData) {
            currentTileData["context"] = this.context;
            const currentTile = new Tile(currentTileData);
            this.tiles.push(currentTile);
        }.bind(this));
        return this;
    }

    appendMarkerContainerToDom($container) {
        this.$markerContainer = $("<div class='marker-container' />");
        $container.append(this.$markerContainer);
    }

    enrichMarkerData(markerData, $container) {
        DataEnrichment.marker(markerData, function(enrichedMarkerData) {
            this.appendMarkerContainerToDom($container);
            markerData = enrichedMarkerData;
        }.bind(this));
        return markerData;
    }

    initializeMarkers(markerData, $container) {
        if (markerData) {
            markerData = this.enrichMarkerData(markerData, $container);
            Helper.forEach(markerData, function(currentData) {
                const m = new Marker(currentData, this.$markerContainer, this.getDistortionCalculation, this.viewOffsetCalculation, this.viewportOffsetCalculation, this.calculateLatLngToPoint);
                this.markers.push(m);
            }.bind(this));
        }
        return this;
    }

    repositionMarkers() {
        Helper.forEach(this.markers, function(marker) {
            marker.moveMarker();
        }.bind(this));
    }

}
