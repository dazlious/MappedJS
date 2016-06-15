import "../../../node_modules/babel-polyfill/node_modules/core-js/es5/index.js";
import "../../../node_modules/babel-polyfill/node_modules/core-js/es6/object.js";
import "../../../node_modules/babel-polyfill/node_modules/core-js/es6/array.js";
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
        this.polyfill();

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
            this.controls.classList.add("control-container");
            this.controls.classList.add(this.mapSettings.controls.theme);
            this.controls.classList.add(this.mapSettings.controls.position);
            this.zoomIn = document.createElement("div");
            this.zoomIn.classList.add("control");
            this.zoomIn.classList.add("zoom-in");
            this.zoomOut = document.createElement("div");
            this.zoomOut.classList.add("control");
            this.zoomOut.classList.add("zoom-out");
            this.home = document.createElement("div");
            this.home.classList.add("control");
            this.home.classList.add("home");
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
        this.container = (typeof container === "string") ? Helper.find(container) : container;
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
                    const pos = this.getAbsolutePosition(data.positionStart);
                    this.tileMap.velocity = new Point();
                    const id = data.target.getAttribute("data-id");
                    if (id) this.eventManager.publish(id, pos);
                },
                doubletap: (data) => {
                    this.tileMap.velocity = new Point();
                    this.tileMap.zoom(0.2, this.getAbsolutePosition(data.positionStart));
                },
                pan: (data) => {
                    if (data.target.classList.contains("control")) return false;
                    const change = data.positionLast.clone.substract(data.positionMove);
                    this.tileMap.velocity = new Point();
                    this.tileMap.moveView(this.getAbsolutePosition(change).multiply(-1, -1));
                },
                wheel: (data) => {
                    const factor = data.delta / 4;
                    this.tileMap.velocity = new Point();
                    this.tileMap.zoom(factor, this.getAbsolutePosition(data.positionStart));
                },
                pinch: (data) => {
                    this.tileMap.velocity = new Point();
                    this.tileMap.zoom(data.difference * 3, this.getAbsolutePosition(data.positionMove));
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

        Helper.addListener(window, Events.Handling.RESIZE, this.resizeHandler.bind(this));

        Helper.addListener(document, Events.Handling.KEYDOWN, this.keyPress.bind(this));
        Helper.addListener(document, Events.Handling.KEYUP, this.keyRelease.bind(this));

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

    polyfill() {
        /*
        polyfill from eligrey for element.class | Listhttps://github.com/eligrey/classList.js/
         */
        /* jshint ignore:start */
        if("document"in self){if(!("classList"in document.createElement("_"))||document.createElementNS&&!("classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))){(function(t){if(!("Element"in t))return;var e="classList",i="prototype",n=t.Element[i],s=Object,r=String[i].trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array[i].indexOf||function(t){var e=0,i=this.length;for(;e<i;e++){if(e in this&&this[e]===t){return e}}return-1},o=function(t,e){this.name=t;this.code=DOMException[t];this.message=e},l=function(t,e){if(e===""){throw new o("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(e)){throw new o("INVALID_CHARACTER_ERR","String contains an invalid character")}return a.call(t,e)},c=function(t){var e=r.call(t.getAttribute("class")||""),i=e?e.split(/\s+/):[],n=0,s=i.length;for(;n<s;n++){this.push(i[n])}this._updateClassName=function(){t.setAttribute("class",this.toString())}},u=c[i]=[],f=function(){return new c(this)};o[i]=Error[i];u.item=function(t){return this[t]||null};u.contains=function(t){t+="";return l(this,t)!==-1};u.add=function(){var t=arguments,e=0,i=t.length,n,s=false;do{n=t[e]+"";if(l(this,n)===-1){this.push(n);s=true}}while(++e<i);if(s){this._updateClassName()}};u.remove=function(){var t=arguments,e=0,i=t.length,n,s=false,r;do{n=t[e]+"";r=l(this,n);while(r!==-1){this.splice(r,1);s=true;r=l(this,n)}}while(++e<i);if(s){this._updateClassName()}};u.toggle=function(t,e){t+="";var i=this.contains(t),n=i?e!==true&&"remove":e!==false&&"add";if(n){this[n](t)}if(e===true||e===false){return e}else{return!i}};u.toString=function(){return this.join(" ")};if(s.defineProperty){var h={get:f,enumerable:true,configurable:true};try{s.defineProperty(n,e,h)}catch(d){if(d.number===-2146823252){h.enumerable=false;s.defineProperty(n,e,h)}}}else if(s[i].__defineGetter__){n.__defineGetter__(e,f)}})(self)}else{(function(){var t=document.createElement("_");t.classList.add("c1","c2");if(!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var i,n=arguments.length;for(i=0;i<n;i++){t=arguments[i];e.call(this,t)}}};e("add");e("remove")}t.classList.toggle("c3",false);if(t.classList.contains("c3")){var i=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){if(1 in arguments&&!this.contains(t)===!e){return e}else{return i.call(this,t)}}}t=null})()}};
        /* jshint ignore:end */
    }

}
