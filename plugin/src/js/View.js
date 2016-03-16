import {LatLng} from './LatLng.js';
import {Bounds} from './Bounds.js';
import {Rectangle} from './Rectangle.js';
import {Tile} from './Tile.js';
import {Publisher} from './Publisher.js';

/**
 * Singleton instance of Publisher
 */
const PUBLISHER = new Publisher();

export class View {

    /**
     * Returns current distortion
     * @return {number} returns current distortion of latitude
     */
    get distortion() {
        return (Math.cos(this.center.lat));
    }

    /**
     * Returns the offset of the center
     */
    get offset() {
        let center = this.center.toPoint(this.bounds, this.mapView);
        return this.viewport.center.substract(center);
    }

    /**
     * Returns the offset of the map
     * @param {number} distortion - the current latitude distortion
     * @return {number} calculated offset
     */
    get mapOffset() {
        return this.offset.x + ((this.mapView.width - (this.mapView.width * this.distortion)) / 2);
    }

    /**
     * get all visible tiles
     * @return {array} all tiles that are currently visible
     */
    get visibleTiles() {
        return this.tiles.filter(function(t, i, a) {
            let newTile = t.getDistortedRect(this.distortion).translate(this.mapOffset, this.offset.y);
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
    constructor({viewport = new Rectangle(), mapView = new Rectangle(),bounds = new Bounds(), center = new LatLng(), data = {}, drawCb}) {
        this.mapView = mapView;
        this.viewport = viewport;
        this.bounds = bounds;
        this.center = center;
        this.tiles = [];
        this.data = data;
        this.draw = drawCb;
        this.bindEvents().initializeTiles();

        return this;
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
            if (this.draw && typeof this.draw === "function") {
                this.draw(tile.img, (tile.x * this.distortion) +  this.mapOffset, tile.y + this.offset.y, tile.width * this.distortion, tile.height);
            } else {
                console.error("Draw method is not defined or not a function");
            }
        } else if (tile.state.current.value === 0) {
            tile.initialize();
        }
        return this;
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
