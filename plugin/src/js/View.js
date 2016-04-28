import $ from 'jQuery';
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
        return this.getDistortionFactorForLatitude(this.center);
    }

    /**
     * Returns the current distorted viewport
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
            const newTile = t.clone.scale(this.zoomFactor, this.zoomFactor).getDistortedRect(this.distortionFactor).translate(this.currentView.x * this.distortionFactor + this.offsetToCenter, this.currentView.y);
            return this.viewport.intersects(newTile);
        }, this);
    }

    /**
     * how many pixels per lat and lng
     * @return {Point} pixels per lat/lng
     */
    get pixelPerLatLng() {
        return new Point(this.currentView.width / this.bounds.width, this.currentView.height / this.bounds.height);
    }

    /**
     * Constructor
     * @param  {Rectangle} viewport = new Rectangle() - current representation of viewport
     * @param  {Rectangle} mapView = new Rectangle() - current representation of map
     * @param  {Bounds} bounds = new Bounds() - current bounds of map
     * @param  {LatLng} center = new LatLng() - current center of map
     * @param  {Object} data = {} - tile data of current map
     * @param  {Object} markerData = {} - marker data of current map
     * @param  {Object} $container = null - parent container for markers
     * @param  {Object} context = null - canvas context for drawing
     * @param  {number} maxZoom = 1.5 - maximal zoom of view
     * @param  {number} minZoom = 0.8 - minimal zoom of view
     * @param  {Boolean} debug=false - Option for enabling debug-mode
     * @return {View} instance of View for chaining
     */
    constructor({
        viewport = new Rectangle(),
        mapView = new Rectangle(),
        bounds = new Bounds(),
        center = new LatLng(),
        data = {},
        markerData = null,
        $container = null,
        context = null,
        maxZoom = 1.5,
        minZoom = 0.8,
        debug = false
        }) {

        this.mapView = mapView;
        this.originalMapView = mapView.clone;
        this.viewport = viewport;
        this.bounds = bounds;
        this.center = center;
        this.zoomFactor = 1;
        this.maxZoom = maxZoom;
        this.minZoom = minZoom;
        this.origin = new Point(0,0);
        this.debug = debug;
        this.lastDraw = new Date();

        if (this.debug) {
            this.$debugContainer = $("<div class='debug'></div>");
            this.$debugContainer.css({
                "position": "absolute",
                "width": "100%",
                "height": "20px",
                "top": 0,
                "right": 0,
                "background": "rgba(0,0,0,.6)",
                "color": "#fff",
                "text-align": "right",
                "padding-right": "10px"
            });
            $container.prepend(this.$debugContainer);
        }

        const newCenter = this.viewport.center.substract(this.convertLatLngToPoint(center));
        this.currentView.position(newCenter.x, newCenter.y);

        this.tiles = [];
        this.data = data;
        this.context = context;
        this.markers = [];

        this.initial = {
            position: this.center,
            zoom: this.zoomFactor
        };

        this.drawIsNeeded = true;

        this.initializeTiles().loadThumb().initializeMarkers(markerData, $container);

        return this;
    }

    // TODO: Reset function not working properly
    reset() {
        this.setLatLngToPosition(this.initial.position, this.viewport.center);
        const delta = this.initial.zoom - this.zoomFactor;
        this.zoom(delta, this.viewport.center);
    }

    /**
     * main draw call
     */
    mainLoop() {
        if (this.debug && this.drawIsNeeded) {
            const now = new Date();
            const fps = (1000 / (now - this.lastDraw)).toFixed(2);
            this.lastDraw = now;
            this.$debugContainer.text(`FPS: ${fps}`);
        }

        if (this.drawIsNeeded) {
            this.drawIsNeeded = false;
            this.context.clearRect(0, 0, this.viewport.width, this.viewport.height);
            this.draw();
        }

        window.requestAnimFrame(this.mainLoop.bind(this));
    }

    /**
     * loads thumbnail of view
     * @return {View} instance of View for chaining
     */
    loadThumb() {
        Helper.loadImage(this.data.thumb, function(img) {
            this.thumb = img;
            window.requestAnimFrame(this.mainLoop.bind(this));
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
        const diffToCenter = pos.clone.substract(this.viewport.center);
        const distanceToCenter = (diffToCenter.x / this.viewport.center.x);
        const delta = distanceToCenter * this.offsetToCenter;
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
        this.moveView(new Point());
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

        this.calculateNewCenter();

        return this;
    }

    /**
     * Handles draw of visible elements
     * @return {View} instance of View for chaining
     */
    draw() {
        this.drawThumbnail();
        this.repositionMarkerContainer();
        this.drawVisibleTiles();
        return this;
    }

    /**
     * draws all visible tiles
     * @return {View} instance of View for chaining
     */
    drawVisibleTiles() {
        Helper.forEach(this.visibleTiles, function(tile) {
            tile.draw();
        }.bind(this));
        return this;
    }

    /**
     * draws the thumbnail
     * @return {View} instance of View for chaining
     */
    drawThumbnail() {
        const rect = this.currentView.getDistortedRect(this.distortionFactor).translate(this.offsetToCenter, 0);
        this.context.drawImage(this.thumb, 0, 0, this.thumb.width, this.thumb.height, rect.x, rect.y, rect.width, rect.height);
        return this;
    }

    /**
     * initializes tiles
     * @return {View} instance of View for chaining
     */
    initializeTiles() {
        const currentLevel = this.data.tiles;
        Helper.forEach(currentLevel, function(currentTileData) {
            const currentTile = new Tile(currentTileData, this);
            this.tiles.push(currentTile);
        }.bind(this));
        return this;
    }

    /**
     * append marker container to DOM
     * @param  {Object} $container - jQuery-selector
     * @return {View} instance of View for chaining
     */
    appendMarkerContainerToDom($container) {
        this.$markerContainer = $("<div class='marker-container' />");
        $container.append(this.$markerContainer);
        return this;
    }

    /**
     * enrich marker data
     * @param  {Object} markerData - data of markers
     * @param  {Object} $container - jQuery-selector
     * @return {Object} enriched marker data
     */
    enrichMarkerData(markerData, $container) {
        DataEnrichment.marker(markerData, function(enrichedMarkerData) {
            this.appendMarkerContainerToDom($container);
            markerData = enrichedMarkerData;
        }.bind(this));
        return markerData;
    }

    /**
     * initializes all markers
     * @param  {Object} markerData - data of all markers
     * @param  {Object} $container - jQuery-selector
     * @return {View} instance of View for chaining
     */
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

    /**
     * reposition marker container
     * @return {View} instance of View for chaining
     */
    repositionMarkerContainer() {
       const newSize = this.currentView.getDistortedRect(this.distortionFactor);
       this.$markerContainer.css({
          "width": `${newSize.width}px`,
          "height": `${newSize.height}px`,
          "left": `${newSize.left + this.offsetToCenter}px`,
          "top": `${newSize.top}px`
       });
       return this;
    }

}

/**
 * request animation frame browser polyfill
 * @return {Function} supported requestAnimationFrame-function
 */
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function( callback ){
             window.setTimeout(callback, 1000 / 60);
         };
})();
