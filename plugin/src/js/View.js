import {LatLng} from './LatLng.js';
import {Point} from './Point.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Tile} from './Tile.js';
import {Publisher} from './Publisher.js';
import {Helper} from './Helper.js';
import {Marker} from './Marker.js';

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

export class View {

    /**
     * Returns current equalizationFactor
     * @return {number} returns current equalizationFactor of latitude
     */
    get equalizationFactor() {
        return (Math.cos(Helper.toRadians(this.center.lat)));
    }

    /**
     * Returns the current equalized viewport
     */
    get viewportOffset() {
        return (this.viewport.width - this.viewport.width * this.equalizationFactor) / 2;
    }

    /**
     * get all visible tiles
     * @return {array} all tiles that are currently visible
     */
    get visibleTiles() {
        return this.tiles.filter(function(t, i, a) {
            let newTile = t.getDistortedRect(this.equalizationFactor).translate(this.mapView.x * this.equalizationFactor + this.viewportOffset, this.mapView.y);
            return this.viewport.intersects(newTile);
        }, this);
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
        markerData = [],
        context = null
    }) {
        this.mapView = mapView;
        this.viewport = viewport;
        this.bounds = bounds;
        this.center = center;

        this.CONVERSION_RATIO = new Point(this.mapView.width / this.bounds.width, this.mapView.height / this.bounds.height);

        var newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
        this.mapView.position(newCenter.x, newCenter.y);

        this.tiles = [];
        this.markers = [];
        this.data = data;
        this.context = context;

        this.bindEvents().initializeTiles().loadThumb().initializeMarkers(markerData);

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
        point.divide(this.CONVERSION_RATIO.x, this.CONVERSION_RATIO.y);
        return new LatLng(point.y, point.x).substract(this.bounds.nw);
    }

    /**
     * converts a LatLng to Point in view
     * @param  {LatLng} latlng - specified latlng to be converted
     * @return {Point} presentation of point in pixel system
     */
    convertLatLngToPoint(latlng) {
        let relativePosition = this.bounds.nw.clone.substract(latlng);
        relativePosition.multiply(this.CONVERSION_RATIO.y, this.CONVERSION_RATIO.x);
        return new Point(relativePosition.lng, relativePosition.lat).abs;
    }

    drawHandler(o) {
        o.handleDraw(this.mapView.x, this.mapView.y, this.equalizationFactor, this.viewportOffset, this.thumb, this.thumbScale);
        this.drawMarkers();
        return this;
    }

    /**
     * moves the view's current position by pos
     * @param  {Point} pos - specified additional offset
     * @return {View} instance of View for chaining
     */
    moveView(pos) {
        pos.divide(this.equalizationFactor, 1);
        let equalizedMap = this.mapView.getDistortedRect(this.equalizationFactor).translate(this.viewportOffset + pos.x, pos.y);
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

        var newCenter = this.mapView.topLeft.substract(this.viewport.center).multiply(-1);
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
        let currentlyVisibleTiles = this.visibleTiles;
        for (let i in currentlyVisibleTiles) {
            this.drawHandler(currentlyVisibleTiles[i]);
        }
        this.drawMarkers();
        return this;
    }

    drawMarkers() {
        for (let i in this.markers) {
            let m = this.markers[i];
            m.draw(this.mapView.x, this.mapView.y, this.equalizationFactor, this.viewportOffset, this.context);
        }
        return this;
    }

    /**
     * initializes tiles
     * @return {View} instance of View
     */
    initializeTiles() {
        let currentLevel = this.data.tiles;
        for (let tile in currentLevel) {
            let currentTileData = currentLevel[tile];
            currentTileData["context"] = this.context;
            let currentTile = new Tile(currentTileData);
            this.tiles.push(currentTile);
        }
        return this;
    }

    initializeMarkers(markerData) {
        if (markerData) {
            for (let i in markerData) {
                let currentData = markerData[i],
                    offset = (currentData.offset) ? new Point(currentData.offset[0], currentData.offset[1]) : new Point(0, 0),
                    markerPixelPos = this.convertLatLngToPoint(new LatLng(currentData.position[0], currentData.position[1])),
                    m = new Marker(markerPixelPos, currentData.img, offset);
                this.markers.push(m);
            }
        }
        return this;
    }

}
