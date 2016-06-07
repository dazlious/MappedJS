import "babel-polyfill";
import {Helper} from './Helper.js';
import {Events} from './Events.js';
import {Publisher} from './Publisher.js';
import {TileMap} from './TileMap.js';
import {DataEnrichment} from './DataEnrichment.js';
import {Interact} from './Interact.js';
import {Point} from './Point.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file application initializes all instances and objects
 * @copyright Michael Duve 2016
 */
export class MappedJS {

    /**
     * @constructor
     * @param  {string|Object} container=".mjs" - Container, either string or dom-object
     * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
     * @param  {string|Object} markerData={} - data of markers, can be json or path to file
     * @param  {Object} mapSettings={} - settings for map, must be json
     * @param  {Object} events={loaded: "mjs-loaded"} - List of events
     * @return {MappedJS} instance of MappedJS for chaining
     */
    constructor({container=".mjs", mapData={}, markerData={}, labelData={}, mapSettings={}, events={loaded:"mjs-loaded"}} = {}) {
        this.initializeSettings(container, events, mapSettings);

        this.id = this.generateUniqueID();

        this.eventManager = new Publisher(this.id);
        this.initializeData(mapData, (loadedMapData) => {
            this.mapData = loadedMapData;
            this.initializeData(markerData, (loadedMarkerData) => {
                this.mapData = Object.assign(this.mapData, loadedMarkerData);
                this.initializeData(labelData, (loadedLabelData) => {
                    this.mapData = Object.assign(this.mapData, loadedLabelData);
                    this.initializeMap();
                    this.addControls();
                    this.bindEvents();
                    this.loadingFinished();
                });
            });
        });

        this.keyTicks = 0;

        return this;
    }

    generateUniqueID() {
        return parseInt(Date.now() * (Math.random() * 10), 10);
    }

    /**
     * add controls (zoom, home) to DOM
     */
    addControls() {
        if (this.mapSettings.controls) {
            this.controls = document.createElement("div");
            this.controls.classList.add("control-container", this.mapSettings.controls.theme, this.mapSettings.controls.position);
            this.zoomIn = document.createElement("div");
            this.zoomIn.classList.add("control", "zoom-in");
            this.zoomOut = document.createElement("div");
            this.zoomOut.classList.add("control", "zoom-out");
            this.home = document.createElement("div");
            this.home.classList.add("control", "home");
            this.controls.appendChild(this.home);
            this.controls.appendChild(this.zoomIn);
            this.controls.appendChild(this.zoomOut);
            this.content.appendChild(this.controls);
        }
    }

    /**
     * initializes the settings and handles errors
     * @param  {string|Object} container - Container, either string or dom-object
     * @param  {object} events - List of events
     * @param  {object} settings - List of settings
     * @return {MappedJS} instance of MappedJS for chaining
     */
    initializeSettings(container, events = {}, settings = {}) {
        this.container = (typeof container === "string") ? document.querySelectorAll(container)[0] : container;
        this.container.classList.add("mappedJS");
        this.content = document.createElement("div");
        this.content.classList.add("map-content");
        this.container.appendChild(this.content);

        this.mapSettings = DataEnrichment.mapSettings(settings);
        this.events = events;

        return this;
    }

    /**
     * initializes the data, asynchronous
     * @param  {Object} mapData - data of map tiles, can be json or path to file
     * @param  {Helper~requestJSONCallback} cb - called, when data is received
     * @return {MappedJS} instance of MappedJS for chaining
     */
    initializeData(mapData, cb) {
        if (typeof mapData === "string") {
            Helper.requestJSON(mapData, (data) => {
                cb(data);
            });
        } else {
            cb((typeof mapData === "object") ? mapData : null);
        }
        return this;
    }

    /**
     * initializes Map module
     * @return {MappedJS} instance of MappedJS for chaining
     */
    initializeMap() {
        this.tileMap = new TileMap({
            container: this.content,
            tilesData: this.mapData,
            id: this.id,
            settings: this.mapSettings
        });
        return this;
    }

    /**
     * get absolute position of a point
     * @param  {Point} point - specified relative position
     * @return {Point} absolute position to viewport
     */
    getAbsolutePosition(point) {
        return point.clone.multiply(this.tileMap.width, this.tileMap.height);
    }

    /**
     * initializes interaction
     * @return {MappedJS} instance of MappedJS for chaining
     */
    initializeInteractForMap() {
        this.interact = new Interact({
            container: this.content,
            autoFireHold: 300,
            overwriteViewportSettings: true,
            callbacks: {
                tap: (data) => {
                    this.tileMap.velocity = new Point();
                    const id = data.target.getAttribute("data-id");
                    if (id) this.eventManager.publish(id);
                },
                doubletap: (data) => {
                    this.tileMap.velocity = new Point();
                    this.tileMap.zoom(0.2, this.getAbsolutePosition(data.position.start));
                },
                pan: (data) => {
                    if (data.target.classList.contains("control")) return false;
                    const change = data.last.position.clone.substract(data.position.move);
                    this.tileMap.velocity = new Point();
                    this.tileMap.moveView(this.getAbsolutePosition(change).multiply(-1, -1));
                },
                wheel: (data) => {
                    const factor = data.delta / 4;
                    this.tileMap.velocity = new Point();
                    this.tileMap.zoom(factor, this.getAbsolutePosition(data.position.start));
                },
                pinch: (data) => {
                    this.tileMap.velocity = new Point();
                    this.tileMap.zoom(data.difference * 3, this.getAbsolutePosition(data.position.move));
                },
                flick: (data) => {
                    this.tileMap.velocity = data.velocity.multiply(20);
                }
            }
        });
        return this;
    }

    /**
     * binds all events to handlers
     * @return {MappedJS} instance of MappedJS for chaining
     */
    bindEvents() {

        this.initializeInteractForMap();

        window.addEventListener("resize", this.resizeHandler.bind(this), false);
        window.addEventListener("orientationchange", this.resizeHandler.bind(this), false);

        document.addEventListener(Events.Handling.KEYDOWN, this.keyPress.bind(this), false);
        document.addEventListener(Events.Handling.KEYUP, this.keyRelease.bind(this), false);

        this.zoomIn.setAttribute("data-id", "zoom-button-plus");
        this.eventManager.subscribe("zoom-button-plus", this.zoomInToCenter.bind(this));

        this.zoomOut.setAttribute("data-id", "zoom-button-minus");
        this.eventManager.subscribe("zoom-button-minus", this.zoomOutToCenter.bind(this));

        this.home.setAttribute("data-id", "home-button");
        this.eventManager.subscribe("home-button", this.resetToInitialState.bind(this));

        return this;
    }

    /**
     * resets map to initial state
     * @return {MappedJS} instance of MappedJS for chaining
     */
    resetToInitialState() {
        this.tileMap.reset();
        return this;
    }

    /**
     * zooms into center of map
     * @return {MappedJS} instance of MappedJS for chaining
     */
    zoomInToCenter() {
        this.tileMap.zoom(0.2, this.tileMap.view.viewport.center);
        return this;
    }

    /**
     * zooms out of center of map
     * @return {MappedJS} instance of MappedJS for chaining
     */
    zoomOutToCenter() {
        this.tileMap.zoom(-0.2, this.tileMap.view.viewport.center);
        return this;
    }

    /**
     * Keypress handler
     * @param  {object} e VanillaJS-Event-Object
     * @return {MappedJS} instance of MappedJS for chaining
     */
    keyPress(e) {
        switch(e.keyCode) {
            case 38: // up
                this.handleMovementByKeys(new Point(0, 1));
                break;
            case 37: // left
                this.handleMovementByKeys(new Point(1, 0));
                break;
            case 39: // right
                this.handleMovementByKeys(new Point(-1, 0));
                break;
            case 40: // down
                this.handleMovementByKeys(new Point(0, -1));
                break;
            case 187: // plus
            case 107: // plus numpad
                this.zoomInToCenter();
                break;
            case 189: // minus
            case 109: // minus numpad
                this.zoomOutToCenter();
                break;
            case 72: // h
            case 27: // esc
                this.resetToInitialState();
                break;
            default:
                break;
        }
        this.eventManager.publish(Events.TileMap.DRAW);
        return this;
    }

    /**
     * handles the translation of the map by keypress
     * @param  {Point} direction - x,y point where to translate to
     * @return {MappedJS} instance of MappedJS for chaining
     */
    handleMovementByKeys(direction) {
        this.keyTicks++;
        this.tileMap.moveView(direction.multiply(this.keyTicks));
        return this;
    }

    keyRelease() {
        this.keyTicks = 0;
    }

    /**
     * handles resizing of window
     * @return {MappedJS} instance of MappedJS for chaining
     */
    resizeHandler() {
        this.tileMap.resize();
        return this;
    }

    /**
     * called when loading and initialization is finished
     * @return {MappedJS} instance of MappedJS for chaining
     */
    loadingFinished() {
        return this;
    }

}
