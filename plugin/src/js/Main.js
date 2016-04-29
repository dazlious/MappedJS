import $ from 'jQuery';
import {TileMap} from './TileMap.js';
import {DataEnrichment} from './DataEnrichment.js';
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
     * @return {MappedJS} instance of MappedJS for chaining
     */
    constructor({container=".mjs", mapData={}, mapSettings={}, events={loaded:"mjs-loaded"}, debug = false}) {
        this.initializeSettings(container, events, mapSettings);

        this.initializeData(mapData, function() {
            this.initializeMap();
            this.addControls();
            this.bindEvents();
            this.loadingFinished();
        }.bind(this));

        this.momentum = null;
        this.keyTicks = 0;

        this.debug = debug;

        return this;
    }

    addControls() {
        if (this.mapSettings.controls) {
            this.$controls = $(`<div class="control-container ${this.mapSettings.controls.theme} ${this.mapSettings.controls.position}" />`);
            this.$zoomIn = $("<div class='control zoom-in' />");
            this.$zoomOut = $("<div class='control zoom-out' />");
            this.$home = $("<div class='control home' />");
            this.$controls.append(this.$home).append(this.$zoomIn).append(this.$zoomOut);
            this.$container.append(this.$controls);
        }
    }

    /**
     * initializes the settings and handles errors
     * @param  {string|Object} container - Container, either string, jQuery-object or dom-object
     * @param  {object} events - List of events
     * @return {MappedJS} instance of MappedJS for chaining
     */
    initializeSettings(container, events, settings) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) {
            throw new Error("Container " + container + " not found");
        }
        this.$container.addClass("mappedJS");

        this.mapSettings = DataEnrichment.mapSettings(settings);

        this.events = events;

        return this;
    }

    /**
     * initializes the data, asynchronous
     * @param  {Object} mapData - data of map tiles, can be json or path to file
     * @param  {Function} cb - called, when data is received
     * @return {MappedJS} instance of MappedJS for chaining
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
     * @return {MappedJS} instance of MappedJS for chaining
     */
    initializeMap() {
        this.tileMap = new TileMap({
            container: this.$container,
            tilesData: this.mapData,
            settings: this.mapSettings,
            debug: this.debug
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
     * binds all events to handlers
     * @return {MappedJS} instance of MappedJS for chaining
     */
    bindEvents() {
        this.interact = new Interact({
            container: this.$container,
            autoFireHold: 300,
            overwriteViewportSettings: true,
            callbacks: {
                pan: function(data) {
                    if ($(data.target).hasClass("control")) {
                        return false;
                    }
                    const change = data.last.position.clone.substract(data.position.move);
                    this.tileMap.view.moveView(this.getAbsolutePosition(change).multiply(-1, -1));
                    this.tileMap.view.drawIsNeeded = true;
                }.bind(this),
                wheel: function(data) {
                    const factor = data.zoom / 10;
                    this.zoom(factor, this.getAbsolutePosition(data.position.start));
                }.bind(this),
                pinch: function(data) {
                    this.zoom(data.difference * 3, this.getAbsolutePosition(data.position.move));
                }.bind(this),
                doubletap: function(data) {
                    if ($(data.target).hasClass("control")) {
                        return false;
                    }
                    this.zoom(0.2, this.getAbsolutePosition(data.position.start));
                }.bind(this),
                flick: function(data) {
                    const direction = new Point(data.directions[0], data.directions[1]),
                          velocity = direction.clone.divide(data.speed).multiply(20);
                    this.momentumAccerlation(velocity);

                }.bind(this)
            }
        });

        $(window).on("resize orientationchange", this.resizeHandler.bind(this));

        $(document).on("keydown", this.keyPress.bind(this));
        $(document).on("keyup", this.keyRelease.bind(this));

        this.$zoomIn.on("click", this.zoomInToCenter.bind(this));
        this.$zoomOut.on("click", this.zoomOutToCenter.bind(this));
        this.$home.on("click", this.resetToInitialState.bind(this));

        return this;
    }

    resetToInitialState() {
        this.tileMap.view.reset();
        this.tileMap.view.drawIsNeeded = true;
    }

    zoomInToCenter() {
        this.zoom(0.1, this.tileMap.view.viewport.center);
    }

    zoomOutToCenter() {
        this.zoom(-0.1, this.tileMap.view.viewport.center);
    }

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
                this.zoomInToCenter();
                break;
            case 189: // minus
                this.zoomOutToCenter();
                break;
            case 72: // home
                this.resetToInitialState();
                break;
            default:
                break;
        }
        this.tileMap.view.drawIsNeeded = true;
    }

    handleMovementByKeys(direction) {
        this.keyTicks++;
        this.tileMap.view.moveView(direction.multiply(this.keyTicks));
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
        this.momentum = setTimeout(function() {
            steps--;
            const delta = Helper.easeOutQuadratic((this.maxMomentumSteps - steps) * timing, change, change.clone.multiply(-1), timing * this.maxMomentumSteps);
            this.moveViewByMomentum(delta);
            if (steps >= 0) {
                this.triggerMomentum(steps, timing, change);
            }
        }.bind(this), timing);
        return this;
    }

    /**
     * move by delta momentum
     * @param  {Point} delta - delta of x/y
     * @return {MappedJS} instance of MappedJS for chaining
     */
    moveViewByMomentum(delta) {
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
