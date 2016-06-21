import {Helper} from './Helper.js';
import {Events} from './Events.js';
import {Point} from './Point.js';
import {LatLng} from './LatLng.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Tile} from './Tile.js';
import {Drawable} from './Drawable.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file represents a level of zoom
 * @copyright Michael Duve 2016
 */
export class View extends Drawable {

    /**
     * get all visible tiles
     * @return {array} all tiles that are currently visible
     */
    get visibleTiles() {
        return this.tiles.filter((t) => {
            const newTile = t.clone.scale(this.zoomFactor).getDistortedRect(this.distortionFactor).translate(this.view.x * this.distortionFactor + this.offsetToCenter, this.view.y);
            return this.viewport.intersects(newTile);
        });
    }

    /**
     * @constructor
     * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
     * @param  {Rectangle} currentView = new Rectangle() - current representation of map
     * @param  {Bounds} bounds = new Bounds() - current bounds of map
     * @param  {LatLng} center = new LatLng() - current center of map
     * @param  {LatLng} initialCenter = new LatLng() - initial center of view
     * @param  {Object} data = {} - tile data of current map
     * @param  {Object} context = null - canvas context for drawing
     * @param  {number} maxZoom = 1.5 - maximal zoom of view
     * @param  {number} currentZoom = 1 - initial zoom of view
     * @param  {number} minZoom = 0.8 - minimal zoom of view
     * @param  {number} limitToBounds - where to limit panning
     * @return {View} instance of View for chaining
     */
    constructor({
        view = new Rectangle(),
        initialCenter = new LatLng(),
        data = {},
        context = null,
        maxZoom = 1.5,
        minZoom = 0.8,
        centerSmallMap = false,
        limitToBounds,
        id
    }) {
        super(id);

        this.maxZoom = maxZoom;
        this.minZoom = minZoom;
        this.limitToBounds = limitToBounds;
        this.isInitialized = false;
        this.centerSmallMap = centerSmallMap;

        this.originalMapView = view.clone;

        this.eventManager.publish(Events.MapInformation.UPDATE, {
            view: view
        });

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
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            view: this.originalMapView.clone
        });
        this.view.translate(0 - this.offsetToCenter, 0);
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
        this.zoom(delta, this.view.center);
    }

    getDistortedView() {
        const nw = this.info.convertLatLngToPoint(this.limitToBounds.nw),
              se = this.info.convertLatLngToPoint(this.limitToBounds.se),
              limit = new Rectangle(nw.x + this.view.x, nw.y + this.view.y, se.x - nw.x, se.y - nw.y);
        return limit.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
    }

    checkBoundaries() {
        const offset = new Point();
        const equalizedMap = this.getDistortedView();
        if (!equalizedMap.containsRect(this.viewport)) {
            const distanceLeft = equalizedMap.left - this.viewport.left,
                  distanceRight = equalizedMap.right - this.viewport.right,
                  distanceTop = equalizedMap.top - this.viewport.top,
                  distanceBottom = equalizedMap.bottom - this.viewport.bottom;

            offset.x = this.checkX(distanceLeft, distanceRight, equalizedMap.width, this.viewport.width);
            offset.y = this.checkX(distanceTop, distanceBottom, equalizedMap.height, this.viewport.height);
        }
        offset.multiply(1/this.distortionFactor, 1);
        this.view.translate(offset.x, offset.y);
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            view: this.view
        });

        if (this.viewportIsSmallerThanView(equalizedMap)) {
            const diffInHeight = (1 - (equalizedMap.height / this.viewport.height));
            const diffInWidth = (1 - (equalizedMap.width / this.viewport.width));
            const diff = Helper.clamp(Math.max(diffInHeight, diffInWidth), 0, Number.MAX_VALUE);
            this.zoom(diff, this.viewport.center, true);
        }
    }

    viewportIsSmallerThanView(view) {
        return this.viewport.width > view.width || this.viewport.height > view.height;
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
                this.view.setCenterX(this.viewport.center.x);
                this.eventManager.publish(Events.MapInformation.UPDATE, {
                    view: this.view
                });
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
                this.view.setCenterX(this.viewport.center.x);
                this.eventManager.publish(Events.MapInformation.UPDATE, {
                    view: this.view
                });
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
     * set specified lat/lng to position x/y
     * @param {LatLng} latlng - specified latlng to be set Point to
     * @param {Point} position - specified position to set LatLng to
     * @return {View} instance of View for chaining
     */
    setLatLngToPosition(latlng, position) {
        const currentPosition = this.view.topLeft.substract(position).multiply(-1),
              diff = currentPosition.substract(this.info.convertLatLngToPoint(latlng));

        this.view.translate(0, diff.y);
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            view: this.view
        });
        this.calculateNewCenter();
        this.view.translate(diff.x + this.getDeltaXToCenter(position), 0);
        this.calculateNewCenter();
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            view: this.view
        });
        return this;
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
    zoom(factor, pos, automatic = false) {
        const equalizedMap = this.getDistortedView();
        const viewportIsSmaller = this.viewportIsSmallerThanView(equalizedMap);

        if (factor < 0 && (viewportIsSmaller || this.wasSmallerLastTime)) {
            this.wasSmallerLastTime = true;
            return false;
        } else if (!automatic) {
            this.wasSmallerLastTime = false;
        } else if (automatic) {
            this.wasSmallerLastTime = viewportIsSmaller;
        }

        const newZoom = Helper.clamp(this.zoomFactor + factor, this.minZoom, this.maxZoom);

        const mapPosition = this.view.topLeft.substract(pos).multiply(-1);
        mapPosition.x += this.getDeltaXToCenter(pos);
        const latlngPosition = this.info.convertPointToLatLng(mapPosition);

        const newSize = this.originalMapView.clone.scale(newZoom);
        this.view.setSize(newSize.width, newSize.height);
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            zoomFactor: newZoom,
            view: this.view
        });

        this.setLatLngToPosition(latlngPosition, pos);
        this.changeZoomLevelIfNecessary(factor, viewportIsSmaller);

        return this;
    }

    changeZoomLevelIfNecessary(factor, viewportIsSmaller) {
        if (this.zoomFactor >= this.maxZoom && factor > 0) {
            this.eventManager.publish(Events.TileMap.NEXT_LEVEL);
        } else if (this.zoomFactor <= this.minZoom && factor < 0 && !viewportIsSmaller) {
            this.eventManager.publish(Events.TileMap.PREVIOUS_LEVEL);
        }
    }

    /**
     * update center position of view
     * @return {View} instance of View for chaining
     */
    calculateNewCenter() {
        const newCenter = this.info.convertPointToLatLng(this.viewport.center.substract(this.view.topLeft));
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            center: newCenter
        });
        return this;
    }

    /**
     * moves the view's current position by pos
     * @param  {Point} pos - specified additional offset
     * @return {View} instance of View for chaining
     */
    moveView(pos) {
        this.view.translate(0, pos.y);
        this.calculateNewCenter();
        this.view.translate(pos.x * (1/this.distortionFactor), 0);
        this.eventManager.publish(Events.MapInformation.UPDATE, {
            view: this.view
        });
        return this;
    }

    /**
     * Handles draw of visible elements
     * @return {View} instance of View for chaining
     */
    draw() {
        return this.drawThumbnail().drawVisibleTiles();
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
            const rect = this.view.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
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
            this.tiles.push(new Tile(currentTileData, this.context, this.id));
        });
        return this;
    }

}
