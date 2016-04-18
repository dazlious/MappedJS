import $ from 'jquery';
import {Point} from './Point.js';
import {LatLng} from './LatLng.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Tile} from './Tile.js';
import {Marker} from './Marker.js';
import {Helper} from './Helper.js';
import {DataEnrichment} from './DataEnrichment.js';

export class View {

    /**
     * Returns current distortionFactor
     * @return {number} returns current distortionFactor of latitude
     */
    get distortionFactor() {
        return (Math.cos(Helper.toRadians(this.center.lat)));
    }

    /**
     * Returns the current equalized viewport
     */
    get offsetToCenter() {
        return (this.viewport.width - this.viewport.width * this.distortionFactor) / 2;
    }

    get currentView() {
        return this.mapView;
    }

    /**
     * get all visible tiles
     * @return {array} all tiles that are currently visible
     */
    get visibleTiles() {
        return this.tiles.filter(function(t) {
            const newTile = t.clone.scale(this.zoomFactor.x, this.zoomFactor.y).getDistortedRect(this.distortionFactor).translate(this.currentView.x * this.distortionFactor + this.offsetToCenter, this.currentView.y);
            return this.viewport.intersects(newTile);
        }, this);
    }

    get pixelPerLatLng() {
        return new Point(this.currentView.width / this.bounds.width, this.currentView.height / this.bounds.height);
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
        this.originalMapView = mapView.clone;
        this.viewport = viewport;
        this.bounds = bounds;
        this.center = center;
        this.zoomFactor = 1;

        const newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
        this.currentView.position(newCenter.x, newCenter.y);

        this.tiles = [];
        this.data = data;
        this.context = context;
        this.markers = [];

        this.initializeTiles().loadThumb().initializeMarkers(markerData, $container);

        return this;
    }

    /**
     * loads thumbnail of view
     * @return {View} instance of View for chaining
     */
    loadThumb() {
        Helper.loadImage(this.data.thumb, function(img) {
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
        return new LatLng(this.bounds.nw.lat - point.y, point.x + this.bounds.nw.lng).multiply(-1);
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

    zoom(direction, scale) {
        this.zoomFactor += direction * scale;
        if (this.zoomFactor <= 0.1) {
            this.zoomFactor = 0.1;
        }
        const newSize = this.originalMapView.clone.scale(this.zoomFactor);
        this.currentView.size(this.currentView.x, this.currentView.y, newSize.width, newSize.height);
    }

    /**
     * moves the view's current position by pos
     * @param  {Point} pos - specified additional offset
     * @return {View} instance of View for chaining
     */
    moveView(pos) {
        pos.divide(this.distortionFactor, 1);
        const equalizedMap = this.currentView.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter + pos.x, pos.y);
        if (!equalizedMap.containsRect(this.viewport)) {
            if (equalizedMap.width >= this.viewport.width) {
                if (equalizedMap.left - this.viewport.left > 0) {
                    pos.x -= (equalizedMap.left - this.viewport.left);
                }
                if (equalizedMap.right - this.viewport.right < 0) {
                    pos.x -= (equalizedMap.right - this.viewport.right);
                }
            } else {
                this.currentView.setCenterX(this.viewport.center.x);
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
                this.currentView.setCenterY(this.viewport.center.y);
                pos.y = 0;
            }
        }

        this.currentView.translate(pos.x, pos.y);

        const newCenter = this.viewport.center.substract(this.currentView.topLeft);
        this.center = this.convertPointToLatLng(newCenter);

        return this;
    }

    /**
     * Handles draw of visible elements
     * @return {View} instance of View
     */
    draw() {
        this.drawThumbnail();
        this.drawVisibleTiles();
        this.repositionMarkers();
        return this;
    }

    drawVisibleTiles() {
        Helper.forEach(this.visibleTiles, function(tile) {
            tile.draw();
        }.bind(this));
    }

    drawThumbnail() {
        const rect = this.currentView.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
        this.context.drawImage(this.thumb, 0, 0, this.thumb.width, this.thumb.height, rect.x, rect.y, rect.width, rect.height);
    }

    /**
     * initializes tiles
     * @return {View} instance of View
     */
    initializeTiles() {
        const currentLevel = this.data.tiles;
        Helper.forEach(currentLevel, function(currentTileData) {
            const currentTile = new Tile(currentTileData, this);
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
                const m = new Marker(currentData, this);
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
