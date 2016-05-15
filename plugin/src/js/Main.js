import $ from 'jQuery';
import {Helper} from './Helper.js';
import {Events} from './Events.js';
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
     * @param  {string|Object} container=".mjs" - Container, either string, jQuery-object or dom-object
     * @param  {string|Object} mapData={} - data of map tiles, can be json or path to file
     * @param  {string|Object} markerData={} - data of markers, can be json or path to file
     * @param  {Object} mapSettings={} - settings for map, must be json
     * @param  {Object} events={loaded: "mjs-loaded"} - List of events
     * @return {MappedJS} instance of MappedJS for chaining
     */
    constructor({container=".mjs", mapData={}, markerData={}, mapSettings={}, events={loaded:"mjs-loaded"}} = {}) {
        this.initializeSettings(container, events, mapSettings);

        this.initializeData(mapData, (loadedMapData) => {
            this.mapData = loadedMapData;
            this.initializeData(markerData, (loadedMarkerData) => {
                this.mapData = Object.assign(this.mapData, loadedMarkerData);
                this.initializeMap();
                this.addControls();
                this.bindEvents();
                this.loadingFinished();
            });
        });

        this.momentum = null;
        this.keyTicks = 0;

        return this;
    }

    /**
     * add controls (zoom, home) to DOM
     */
    addControls() {
        if (this.mapSettings.controls) {
            this.$controls = $(`<div class="control-container ${this.mapSettings.controls.theme} ${this.mapSettings.controls.position}" />`);
            this.$zoomIn = $("<div class='control zoom-in' />");
            this.$zoomOut = $("<div class='control zoom-out' />");
            this.$home = $("<div class='control home' />");
            this.$controls.append(this.$home).append(this.$zoomIn).append(this.$zoomOut);
            this.$content.append(this.$controls);
        }
    }

    /**
     * initializes the settings and handles errors
     * @param  {string|Object} container - Container, either string, jQuery-object or dom-object
     * @param  {object} events - List of events
     * @param  {object} settings - List of settings
     * @return {MappedJS} instance of MappedJS for chaining
     */
    initializeSettings(container, events = {}, settings = {}) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) throw new Error("Container " + container + " not found");

        this.$container.addClass("mappedJS");
        this.$content = $("<div class='map-content' />");
        this.$container.append(this.$content);

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
            container: this.$content,
            tilesData: this.mapData,
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
        return point.clone.multiply(this.tileMap.view.viewport.width, this.tileMap.view.viewport.height);
    }

    /**
     * initializes interaction
     * @return {MappedJS} instance of MappedJS for chaining
     */
    initializeInteractForMap() {
        this.tooltipState = false;
        this.interact = new Interact({
            container: this.$content,
            autoFireHold: 300,
            overwriteViewportSettings: true,
            callbacks: {
                pan: (data) => {
                    if ($(data.target).hasClass("control")) {
                        return false;
                    }
                    const change = data.last.position.clone.substract(data.position.move);
                    this.moveView(this.getAbsolutePosition(change).multiply(-1, -1));
                },
                wheel: (data) => {
                    const factor = data.delta / 4;
                    this.zoom(factor, this.getAbsolutePosition(data.position.start));
                },
                pinch: (data) => {
                    this.zoom(data.difference * 3, this.getAbsolutePosition(data.position.move));
                },
                doubletap: (data) => {
                    if (!$(data.target).hasClass("marker-container")) {
                        return false;
                    }
                    this.zoom(0.2, this.getAbsolutePosition(data.position.start));
                },
                flick: (data) => {
                    const direction = new Point(data.directions[0], data.directions[1]),
                          velocity = direction.clone.divide(data.speed).multiply(20);
                    this.momentumAccerlation(velocity);

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

        $(window).on(Events.Handling.RESIZE, this.resizeHandler.bind(this));

        $(document).on(Events.Handling.KEYDOWN, this.keyPress.bind(this));
        $(document).on(Events.Handling.KEYUP, this.keyRelease.bind(this));

        const gesture = Helper.isTouch() ? Events.Handling.TOUCHSTART: Events.Handling.CLICK;

        this.$zoomIn.on(gesture, this.zoomInToCenter.bind(this));
        this.$zoomOut.on(gesture, this.zoomOutToCenter.bind(this));
        this.$home.on(gesture, this.resetToInitialState.bind(this));

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
        this.zoom(0.1, this.tileMap.view.viewport.center);
        return this;
    }

    /**
     * zooms out of center of map
     * @return {MappedJS} instance of MappedJS for chaining
     */
    zoomOutToCenter() {
        this.zoom(-0.1, this.tileMap.view.viewport.center);
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
            case 72: // home
                this.resetToInitialState();
                break;
            default:
                break;
        }
        this.tileMap.view.drawIsNeeded = true;
        return this;
    }

    /**
     * handles the translation of the map by keypress
     * @param  {Point} direction - x,y point where to translate to
     * @return {MappedJS} instance of MappedJS for chaining
     */
    handleMovementByKeys(direction) {
        this.keyTicks++;
        this.tileMap.view.moveView(direction.multiply(this.keyTicks));
        return this;
    }

    keyRelease() {
        this.keyTicks = 0;
    }

    /**
     * momentum flicking
     * @param  {number} velocity - speed
     * @return {MappedJS} instance of MappedJS for chaining
     */
    momentumAccerlation(velocity) {
        this.maxMomentumSteps = 30;
        this.triggerMomentum(this.maxMomentumSteps, 10, velocity.multiply(-1));
        return this;
    }

    /**
     * recursive momentum handler
     * @param  {number} steps - current step (decreasing)
     * @param  {number} timing - time for step
     * @param  {Point} change - distance
     * @return {MappedJS} instance of MappedJS for chaining
     */
    triggerMomentum(steps, timing, change) {
        this.momentum = setTimeout(() => {
            steps--;
            const delta = Helper.easeOutQuadratic((this.maxMomentumSteps - steps) * timing, change, change.clone.multiply(-1), timing * this.maxMomentumSteps);
            this.moveView(delta);
            if (steps >= 0) this.triggerMomentum(steps, timing, change);
        }, timing);
        return this;
    }

    /**
     * move by delta momentum
     * @param  {Point} delta - delta of x/y
     * @return {MappedJS} instance of MappedJS for chaining
     */
    moveView(delta) {
        this.tileMap.view.moveView(delta);
        this.tileMap.view.drawIsNeeded = true;
        return this;
    }

    /**
     * handles zoom by factor and position
     * @param  {number} factor - difference in zoom scale
     * @param  {Point} position - position to zoom to
     * @return {MappedJS} instance of MappedJS for chaining
     */
    zoom(factor, position) {
        if (factor !== 0) {
            this.tileMap.view.zoom(factor, position);
            this.tileMap.view.drawIsNeeded = true;
        }
        return this;
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
        this.$container.trigger(this.events.loaded);
        return this;
    }

}
