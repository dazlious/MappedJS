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

    get allTemplatesLoaded() {
        return this.loadedTemplates === Object.keys(this.templates).length;
    }

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

    registerHandlebarHelpers() {
        if (Handlebars) {
            Handlebars.registerHelper('getRatio', (w, h) => (h/w * 100 + "%"));
        }
    }

    initializeTemplates(templates) {
        this.templates = this.getDefaultTemplates();
        Object.assign(this.templates, templates);
        this.loadedTemplates = 0;
        this.compileTemplates();
        return this;
    }

    getDefaultTemplates() {
        return {
            image: "/plugin/src/hbs/image.hbs",
            text: "/plugin/src/hbs/text.hbs",
            headline: "/plugin/src/hbs/headline.hbs",
            crossheading: "/plugin/src/hbs/crossheading.hbs",
            iframe: "/plugin/src/hbs/iframe.hbs"
        };
    }

    bindEvents() {
        $(window).on("resize orientationchange", () => { this.resizeHandler(); });
        this.eventManager.subscribe(Events.ToolTip.OPEN, this.open.bind(this));
        this.eventManager.subscribe(Events.ToolTip.CLOSE, () => { this.close(); });
        this.$close.on("click", () => { this.close(); });
    }

    resizeHandler() {
        this.setPosition();
    }

    insertContent(content) {
        this.$content.html("");
        Helper.forEach(content, (data) => {
            if (this.templates[data.type]) {
                const html = this.templates[data.type](data.content);
                this.$content.append(html);
            }
        });
    }

    open(data) {
        if (data) this.insertContent(data);
        if (this.$container.hasClass(Events.ToolTip.CLOSE)) {
            this.setPosition();
            this.$container.removeClass(Events.ToolTip.CLOSE).addClass(Events.ToolTip.OPEN);
            this.eventManager.publish("resize");
        }
        return this;
    }

    close() {
        if (this.$container.hasClass(Events.ToolTip.OPEN)) {
            this.eventManager.publish(Events.Marker.DEACTIVATE);
            this.setPosition();
            this.$container.removeClass(Events.ToolTip.OPEN).addClass(Events.ToolTip.CLOSE);
            this.eventManager.publish("resize");
        }
        return this;
    }

    setPosition() {
        if (this.$container.innerWidth() > this.$container.innerHeight()) {
            this.$container.addClass("left").removeClass("bottom");
        } else {
            this.$container.addClass("bottom").removeClass("left");
        }
        return this;
    }

    compileTemplates() {
        Helper.forEach(this.templates, (template, type) => {
            this.getTemplateFromFile(template, (compiledTemplate) => {
                this.templates[type] = compiledTemplate;
                this.loadedTemplates++;
                if (this.allTemplatesLoaded) this.initialize();
            });
        });
    }

    getTemplateFromFile(url, cb) {
        $.get(url, function (data) {
            cb(Handlebars.compile(data));
        }, 'html');
    }

    initialize() {
        this.$container.prepend(this.$popup);
    }

}
