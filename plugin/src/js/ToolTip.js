import $ from 'jQuery';
import Handlebars from 'Handlebars';
import {Events} from './Events.js';
import {Helper} from './Helper.js';
import {Publisher} from './Publisher.js';

/**
 * @author Michael Duve <mduve@designmail.net>
 * @file represents an overlay showing detailed contents
 * @copyright Michael Duve 2016
 */
export class ToolTip {

    /**
     * checks if all templates were loaded
     * @return {boolean} wheter true if all templates were loaded or false
     */
    get allTemplatesLoaded() {
        return this.loadedTemplates === Object.keys(this.templates).length;
    }

    /**
     *
     * @constructor
     * @param  {string|object} container - Container, either string, jQuery-object or dom-object
     * @param  {object} templates - defined templates
     * @return {ToolTip} instance of ToolTip for chaining
     */
    constructor({container, templates}) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) throw new Error("Container " + container + " not found");

        this.$container.addClass(Events.ToolTip.CLOSE);

        this.$close = $(`<span class='close-button' />`);
        this.$content = $(`<div class='tooltip-content' />`);
        this.$popup = $(`<div class='tooltip-container' />`).append(this.$close)
                                                            .append(this.$content);
        this.eventManager = new Publisher();

        this.bindEvents();
        this.registerHandlebarHelpers();

        return this.setPosition().initializeTemplates(templates);
    }

    /**
     * register helpers for handlebars
     * @return {ToolTip} instance of ToolTip for chaining
     */
    registerHandlebarHelpers() {
        if (Handlebars) {
            Handlebars.registerHelper('getRatio', (w, h) => (h/w * 100 + "%"));
        }
        return this;
    }

    /**
     * initialize all templates
     * @param  {object} templates = {} - all specified templates
     * @return {ToolTip} instance of ToolTip for chaining
     */
    initializeTemplates(templates = {}) {
        this.templates = Object.assign(this.getDefaultTemplates(), templates);
        this.loadedTemplates = 0;
        this.compileTemplates();
        return this;
    }

    /**
     * // TODO: move to DataEnrichment
     * returns paths to default templates
     * @return {object} default templates
     */
    getDefaultTemplates() {
        return {
            image: "/plugin/src/hbs/image.hbs",
            text: "/plugin/src/hbs/text.hbs",
            headline: "/plugin/src/hbs/headline.hbs",
            crossheading: "/plugin/src/hbs/crossheading.hbs",
            iframe: "/plugin/src/hbs/iframe.hbs"
        };
    }

    /**
     * bind all events
     * @return {ToolTip} instance of ToolTip for chaining
     */
    bindEvents() {
        $(window).on("resize orientationchange", () => { this.resizeHandler(); });
        this.eventManager.subscribe(Events.ToolTip.OPEN, this.open.bind(this));
        this.eventManager.subscribe(Events.ToolTip.CLOSE, () => { this.close(); });
        this.$close.on("click", () => { this.close(); });
        return this;
    }

    /**
     * on resize check if tooltip is bottom or left position
     * @return {ToolTip} instance of ToolTip for chaining
     */
    resizeHandler() {
        this.setPosition();
        return this;
    }

    /**
     * inserts content to ToolTip instance container
     * @param  {object} content = {} - content object
     * @return {ToolTip} instance of ToolTip for chaining
     */
    insertContent(content = {}) {
        this.$content.html("");
        Helper.forEach(content, (data) => {
            if (this.templates[data.type]) {
                const html = this.templates[data.type](data.content);
                this.$content.append(html);
            }
        });
        return this;
    }

    /**
     * opens a tooltip
     * @param  {object} data - content object
     * @return {ToolTip} instance of ToolTip for chaining
     */
    open(data) {
        if (data) this.insertContent(data);
        if (this.$container.hasClass(Events.ToolTip.CLOSE)) {
            this.setPosition();
            this.$container.removeClass(Events.ToolTip.CLOSE).addClass(Events.ToolTip.OPEN);
            this.eventManager.publish("resize");
        }
        return this;
    }

    /**
     * closes a tooltip
     * @return {ToolTip} instance of ToolTip for chaining
     */
    close() {
        if (this.$container.hasClass(Events.ToolTip.OPEN)) {
            this.eventManager.publish(Events.Marker.DEACTIVATE);
            this.setPosition();
            this.$container.removeClass(Events.ToolTip.OPEN).addClass(Events.ToolTip.CLOSE);
            this.eventManager.publish("resize");
        }
        return this;
    }

    /**
     * sets position of tooltip to left or bottom
     * @return {ToolTip} instance of ToolTip for chaining
     */
    setPosition() {
        if (this.$container.innerWidth() > this.$container.innerHeight()) {
            this.$container.addClass("left").removeClass("bottom");
        } else {
            this.$container.addClass("bottom").removeClass("left");
        }
        return this;
    }

    /**
     * precompiles all Handlebars templates
     * @return {ToolTip} instance of ToolTip for chaining
     */
    compileTemplates() {
        Helper.forEach(this.templates, (template, type) => {
            this.getTemplateFromFile(template, (compiledTemplate) => {
                this.templates[type] = compiledTemplate;
                this.loadedTemplates++;
                if (this.allTemplatesLoaded) this.$container.prepend(this.$popup);
            });
        });
        return this;
    }

    // TODO: move to Helper
    getTemplateFromFile(url, cb) {
        $.get(url, function (data) {
            cb(Handlebars.compile(data));
        }, 'html');
        return this;
    }

}
