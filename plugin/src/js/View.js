import {Helper} from './Helper.js';
import {Events} from './Events.js';
import {Point} from './Point.js';
import {LatLng} from './LatLng.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Tile} from './Tile.js';
import {Publisher} from './Publisher.js';
import {MarkerClusterer} from './MarkerClusterer.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file represents a level of zoom
 * @copyright Michael Duve 2016
 */
export class View {

    /**
     * Returns current distortionFactor
     * @return {number} returns current distortionFactor of latitude
     */
    get distortionFactor() {
        return this.getDistortionFactorForLatitude(this.center);
    }

    /**
     * Returns the current distorted viewport
     */
    get offsetToCenter() {
        return (this.viewport.width - this.viewport.width * this.distortionFactor) / 2;
    }

    /**
     * get all visible tiles
     * @return {array} all tiles that are currently visible
     */
    get visibleTiles() {
        return this.tiles.filter((t) => {
            const newTile = t.clone.scale(this.zoomFactor, this.zoomFactor).getDistortedRect(this.distortionFactor).translate(this.currentView.x * this.distortionFactor + this.offsetToCenter, this.currentView.y);
            return this.viewport.intersects(newTile);
        });
    }

    /**
     * how many pixels per lat and lng
     * @return {Point} pixels per lat/lng
     */
    get pixelPerLatLng() {
        return new Point(this.currentView.width / this.bounds.width, this.currentView.height / this.bounds.height);
    }

    /**
     * @constructor
     * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
     * @param  {Rectangle} currentView = new Rectangle() - current representation of map
     * @param  {Bounds} bounds = new Bounds() - current bounds of map
     * @param  {LatLng} center = new LatLng() - current center of map
     * @param  {LatLng} initialCenter = new LatLng() - initial center of view
     * @param  {Object} data = {} - tile data of current map
     * @param  {Object} $container = null - parent container for markers
     * @param  {Object} context = null - canvas context for drawing
     * @param  {number} maxZoom = 1.5 - maximal zoom of view
     * @param  {number} currentZoom = 1 - initial zoom of view
     * @param  {number} minZoom = 0.8 - minimal zoom of view
     * @param  {object} $container = null - jQuery-selector of container class
     * @param  {number} limitToBounds - where to limit panning
     * @return {View} instance of View for chaining
     */
    constructor({
        viewport = new Rectangle(),
        currentView = new Rectangle(),
        bounds = new Bounds(),
        center = new LatLng(),
        initialCenter = new LatLng(),
        data = {},
        $container = null,
        context = null,
        maxZoom = 1.5,
        currentZoom = 1,
        minZoom = 0.8,
        centerSmallMap = false,
        limitToBounds,
        id
    }) {

        this.currentView = currentView;
        this.originalMapView = currentView.clone;
        this.viewport = viewport;
        this.bounds = bounds;
        this.center = center;
        this.zoomFactor = currentZoom;
        this.maxZoom = maxZoom;
        this.minZoom = minZoom;
        this.origin = new Point();
        this.id = id;
        this.eventManager = new Publisher(this.id);
        this.limitToBounds = limitToBounds || bounds;
        this.isInitialized = false;
        this.centerSmallMap = centerSmallMap;
        const newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
        this.currentView.position(newCenter.x, newCenter.y);
        this.tiles = [];
        this.data = data;
        this.context = context;

        this.initial = {
            position: initialCenter,
            zoom: this.zoomFactor
        };

        return this.zoom(0, this.viewport.center).loadThumb();
    }

    init() {
        this.initializeTiles();
        this.isInitialized = true;
        return this;
    }

    /**
     * resets current View to its initial position
     */
    reset() {
        this.setLatLngToPosition(this.initial.position, this.viewport.center);
        const delta = this.initial.zoom - this.zoomFactor;
        this.zoom(delta, this.viewport.center);
    }

    checkBoundaries() {
        const nw = this.convertLatLngToPoint(this.limitToBounds.nw),
              se = this.convertLatLngToPoint(this.limitToBounds.se),
              limit = new Rectangle(nw.x + this.currentView.x, nw.y + this.currentView.y, se.x - nw.x, se.y - nw.y);

        const offset = new Point();
        const equalizedMap = limit.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
        if (!equalizedMap.containsRect(this.viewport)) {

            const distanceLeft = equalizedMap.left - this.viewport.left,
                  distanceRight = equalizedMap.right - this.viewport.right,
                  distanceTop = equalizedMap.top - this.viewport.top,
                  distanceBottom = equalizedMap.bottom - this.viewport.bottom;

            offset.x = this.checkX(distanceLeft, distanceRight, equalizedMap.width, this.viewport.width);
            offset.y = this.checkX(distanceTop, distanceBottom, equalizedMap.height, this.viewport.height);
        }
        offset.multiply(1/this.distortionFactor, 1);
        this.currentView.translate(offset.x, offset.y);
    }

    checkX(left, right, mapWidth, viewWidth) {
        let x = 0;
        if (mapWidth >= viewWidth) {
            if (left > 0) {
                x -= left;
            } else if (right < 0) {
                x -= right;
            }
        } else {
            if (!this.centerSmallMap) {
                if (left < 0 && right < 0) {
                    x -= left;
                } else if (right > 0 && left > 0) {
                    x -= right;
                }
            } else {
                this.currentView.setCenterX(this.viewport.center.x);
            }
        }
        return x;
    }

    checkY(top, bottom, mapHeight, viewHeight) {
        let y = 0;
        if (mapHeight >= viewHeight) {
            if (top > 0) {
                y -= top;
            } else if (bottom < 0) {
                y -= bottom;
            }
        } else {
            if (!this.centerSmallMap) {
                if (top < 0 && bottom < 0) {
                    y -= top;
                } else if (bottom > 0 && top > 0) {
                    y -= bottom;
                }
            } else {
                this.currentView.setCenterX(this.viewport.center.x);
            }
        }
        return y;
    }

    /**
     * loads thumbnail of view
     * @return {View} instance of View for chaining
     */
    loadThumb() {
        Helper.loadImage(this.data.thumb, (img) => {
            this.thumb = img;
            this.eventManager.publish(Events.View.THUMB_LOADED);
        });
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
     * set specified lat/lng to position x/y
     * @param {LatLng} latlng - specified latlng to be set Point to
     * @param {Point} position - specified position to set LatLng to
     * @return {View} instance of View for chaining
     */
    setLatLngToPosition(latlng, position) {
        const currentPosition = this.currentView.topLeft.substract(position).multiply(-1),
              diff = currentPosition.substract(this.convertLatLngToPoint(latlng));

        this.currentView.translate(0, diff.y);
        this.calculateNewCenter();
        this.currentView.translate(diff.x + this.getDeltaXToCenter(position), 0);
        return this;
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

    /**
     * receive relative Position to center of viewport
     * @param  {Point} pos - specified position
     * @return {number} delta of point to center of viewport
     */
    getDeltaXToCenter(pos) {
        const diffToCenter = pos.clone.substract(this.viewport.center),
              distanceToCenter = (diffToCenter.x / this.viewport.center.x),
              delta = distanceToCenter * this.offsetToCenter;
        return delta / this.distortionFactor;
    }

    /**
     * zooming handler
     * @param  {number} factor - increase/decrease factor
     * @param  {Point} pos - Position to zoom to
     * @return {View} instance of View for chaining
     */
    zoom(factor, pos) {
        this.zoomFactor = Math.max(Math.min(this.zoomFactor + factor, this.maxZoom), this.minZoom);

        const mapPosition = this.currentView.topLeft.substract(pos).multiply(-1);
        mapPosition.x += this.getDeltaXToCenter(pos);
        const latlngPosition = this.convertPointToLatLng(mapPosition).multiply(-1);

        const newSize = this.originalMapView.clone.scale(this.zoomFactor);
        this.currentView.setSize(newSize.width, newSize.height);

        this.setLatLngToPosition(latlngPosition, pos);

        if (this.zoomFactor >= this.maxZoom && factor > 0) {
            this.eventManager.publish(Events.TileMap.NEXT_LEVEL);
        } else if (this.zoomFactor <= this.minZoom && factor < 0) {
            this.eventManager.publish(Events.TileMap.PREVIOUS_LEVEL);
        }

        return this;
    }

    /**
     * get distortion factor for specified latitude
     * @param  {LatLng} latlng - lat/lng position
     * @return {number} distortion factor
     */
    getDistortionFactorForLatitude(latlng) {
         return (Math.cos(Helper.toRadians(latlng.lat)));
    }

    /**
     * update center position of view
     * @return {View} instance of View for chaining
     */
    calculateNewCenter() {
        const newCenter = this.viewport.center.substract(this.currentView.topLeft);
        this.center = this.convertPointToLatLng(newCenter);
        return this;
    }

    /**
     * moves the view's current position by pos
     * @param  {Point} pos - specified additional offset
     * @return {View} instance of View for chaining
     */
    moveView(pos) {
        this.currentView.translate(0, pos.y);
        this.calculateNewCenter();
        this.currentView.translate(pos.x * (1/this.distortionFactor), 0);
        return this;
    }

    /**
     * Handles draw of visible elements
     * @return {View} instance of View for chaining
     */
    draw() {
        return this.drawThumbnail()
                   .drawVisibleTiles();
    }

    /**
     * draws all visible tiles
     * @return {View} instance of View for chaining
     */
    drawVisibleTiles() {
        Helper.forEach(this.visibleTiles, (tile) => tile.draw());
        return this;
    }

    /**
     * draws the thumbnail
     * @return {View} instance of View for chaining
     */
    drawThumbnail() {
        if (this.thumb) {
            const rect = this.currentView.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
            this.context.drawImage(this.thumb, 0, 0, this.thumb.width, this.thumb.height, rect.x, rect.y, rect.width, rect.height);
        }
        return this;
    }

    /**
     * initializes tiles
     * @return {View} instance of View for chaining
     */
    initializeTiles() {
        const currentLevel = this.data.tiles;
        Helper.forEach(currentLevel, (currentTileData) => {
            this.tiles.push(new Tile(currentTileData, this, this.id));
        });
        return this;
    }



}
