import {LatLng} from './LatLng.js';
import {Point} from './Point.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Tile} from './Tile.js';
import {Publisher} from './Publisher.js';
import {Helper} from './Helper.js';


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
    constructor({viewport = new Rectangle(), mapView = new Rectangle(),bounds = new Bounds(), center = new LatLng(), data = {}, context = null}) {
        this.mapView = mapView;
        this.viewport = viewport;
        this.bounds = bounds;
        this.center = center;
        var newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
        this.mapView.position(newCenter.x, newCenter.y);
        this.tiles = [];
        this.data = data;
        this.context = context;
        this.bindEvents().initializeTiles();
        return this;
    }

    convertPointToLatLng(point) {
        let factorX = this.mapView.width / this.bounds.range.lng,
            factorY = this.mapView.height / this.bounds.range.lat;
        return new LatLng(point.y / factorY, point.x / factorX).substract(this.bounds.nw);
    }

    convertLatLngToPoint(latlng) {
        let relativePosition = this.bounds.nw.clone.substract(latlng),
            factorX = this.mapView.width / this.bounds.width,
            factorY = this.mapView.height / this.bounds.height;
        return new Point(Math.abs(relativePosition.lng * factorX), Math.abs(relativePosition.lat * factorY));
    }

    /**
     * handles on load of a tile
     * @param  {Tile} tile a tile of the TileMap
     * @return {TileMap} instance of TileMap
     */
    onTilesLoaded(tile) {
        this.drawTile(tile);
        tile.state.next();
        return this;
    }

    moveView(pos) {
        let old = this.mapView.clone,
            p = this.mapView.center.substract(pos);

        this.mapView.setCenter(p);

        let equalizedMap = this.mapView.getDistortedRect(this.equalizationFactor).translate(this.viewportOffset, 0);

        if (!equalizedMap.containsRect(this.viewport)) {

            if (equalizedMap.x > 0) {
                this.mapView.x = old.x;
            }
            if (equalizedMap.width + equalizedMap.x < this.viewport.width) {
                this.mapView.x = old.x;
            }

            if (equalizedMap.y > 0) {
                this.mapView.y = old.y;
            }
            if (equalizedMap.height + equalizedMap.y < this.viewport.height) {
                this.mapView.y = old.y;
            }

        }
        var newCenter = this.mapView.topLeft.multiply(-1, -1).add(this.viewport.center);
        this.center = this.convertPointToLatLng(newCenter);
        return this;
    }

    /**
     * Handles draw of TileMap
     * @return {TileMap} instance of TileMap
     */
    drawVisibleTiles() {
        for (var tile in this.visibleTiles) {
            this.drawTile(this.visibleTiles[tile]);
        }
        return this;
    }

    /**
     * draws tiles on canvas
     * @param  {Tile} tile a tile of the TileMap
     * @return {TileMap} instance of TileMap
     */
    drawTile(tile) {
        if (tile.state.current.value >= 2) {
            let x = (tile.x + this.mapView.x) * this.equalizationFactor + this.viewportOffset,
                y = tile.y + this.mapView.y,
                w = tile.width * this.equalizationFactor,
                h = tile.height;
            this.draw(tile.img, x, y, w, h);
        } else if (tile.state.current.value === 0) {
            tile.initialize();
        }
        return this;
    }

    draw(img, x, y, w, h) {
        this.context.drawImage(img, x, y, w, h);
    }

    /**
     * Handles all events for class
     * @return {TileMap} instance of TileMap
     */
    bindEvents() {
        PUBLISHER.subscribe("tile-loaded", this.onTilesLoaded.bind(this));
        return this;
    }

    /**
     * initializes tiles
     * @return {TileMap} instance of TileMap
     */
    initializeTiles() {
        let currentLevel = this.data.tiles;
        for (let tile in currentLevel) {
            let currentTileData = currentLevel[tile];
            let _tile = new Tile(currentTileData);
            this.tiles.push(_tile);
        }
        return this;
    }

}
