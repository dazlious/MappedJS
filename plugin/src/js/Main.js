import $ from 'jquery';
import {TileMap} from './TileMap.js';
import {Helper} from './Helper.js';
import {Interact} from './Interact.js';
import {LatLng} from './LatLng.js';
import {Point} from './Point.js';

export class MappedJS {

    /**
     * Constructor
     * @param  {string|Object} container=".mjs" - Container, either string, jQuery-object or dom-object
     * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
     * @param  {Object} mapSettings={} - settings for map, must be json
     * @param  {Object} events={loaded: "mjs-loaded"} - List of events
     * @param  {Boolean} jasmine=false - Option for jasmine tests
     * @return {MappedJS} instance of MappedJS
     */
    constructor({container=".mjs", mapData={}, mapSettings={}, events={loaded:"mjs-loaded"}}) {
        this.initializeSettings(container, events, mapSettings);

        this.initializeData(mapData, function() {
            this.initializeMap();
            this.bindEvents();
            this.loadingFinished();
        }.bind(this));

        return this;
    }

    /**
     * initializes the settings and handles errors
     * @param  {string|Object} container - Container, either string, jQuery-object or dom-object
     * @param  {object} events - List of events
     * @return {MappedJS} instance of MappedJS
     */
    initializeSettings(container, events, mapSettings) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) {
            throw new Error("Container " + container + " not found");
        }
        this.$container.addClass("mappedJS");

        this.mapSettings = {
            level: mapSettings.level || 0,
            center: mapSettings.center || {"lat": 0, "lng": 0},
            bounds: mapSettings.bounds || {
                "top": 90,
                "left": -180,
                "width": 360,
                "height": 180
            }
        };

        this.events = events;

        return this;
    }

    /**
     * initializes the data, asynchronous
     * @param  {Object} mapData - data of map tiles, can be json or path to file
     * @param  {Function} cb - called, when data is received
     * @return {MappedJS} instance of MappedJS
     */
    initializeData(mapData, cb) {
        const _this = this;
        if (typeof mapData === "string") {
            Helper.requestJSON(mapData, function(data) {
                _this.mapData = data;
                cb();
            });
        } else {
            this.mapData = (typeof mapData === "object") ? mapData : null;
            cb();
        }
        return this;
    }

    /**
     * initializes Map module
     * @return {MappedJS} instance of MappedJS
     */
    initializeMap() {
        this.tileMap = new TileMap({
            container: this.$container,
            tilesData: this.mapData,
            settings: this.mapSettings
        });
        return this;
    }

    getAbsolutePosition(point) {
        return point.clone.multiply(this.tileMap.view.viewport.width, this.tileMap.view.viewport.height);
    }

    /**
     * binds all events to handlers
     * @return {MappedJS} instance of MappedJS
     */
    bindEvents() {
        this.interact = new Interact({
            container: this.$container,
            autoFireHold: 300,
            overwriteViewportSettings: true,
            callbacks: {
                tap: function(data) {
                    console.log(data.position.start);
                }.bind(this),
                pan: function(data) {
                    const change = data.last.position.substract(data.position.move);
                    this.tileMap.view.moveView(this.getAbsolutePosition(change).multiply(-1, -1));
                    this.tileMap.view.drawIsNeeded = true;
                }.bind(this),
                flick: function(data) {
                }.bind(this),
                zoom: function(data) {
                }.bind(this),
                hold: function(data) {
                    this.zoom(-0.4, this.getAbsolutePosition(data.position.start));
                }.bind(this),
                wheel: function(data) {
                    const factor = (data.zoom === 1) ? 0.1 : -0.1;
                    this.zoom(factor, this.getAbsolutePosition(data.position.start));
                }.bind(this),
                pinch: function(data) {
                    this.zoom(-1 * data.difference, this.getAbsolutePosition(data.position.start));
                }.bind(this),
                doubletap: function(data) {
                    this.zoom(0.4, this.getAbsolutePosition(data.position.start));
                }.bind(this)
            }
        });

        $(window).on("resize orientationchange", this.resizeHandler.bind(this));

        return this;
    }

    zoom(factor, position) {
        this.tileMap.view.zoom(factor, position);
        this.tileMap.view.drawIsNeeded = true;
    }

    /**
     * handles resizing of window
     * @return {MappedJS} instance of MappedJS
     */
    resizeHandler() {
        this.tileMap.resize();
        return this;
    }

    /**
     * called when loading and initialization is finished
     * @return {MappedJS} instance of MappedJS
     */
    loadingFinished() {
        this.$container.trigger(this.events.loaded);
        return this;
    }

}
