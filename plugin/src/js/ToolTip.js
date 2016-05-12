import $ from 'jQuery';
import Handlebars from 'Handlebars';
import {Helper} from './Helper.js';
import {Publisher} from './Publisher.js';


export class ToolTip {

    get allTemplatesLoaded() {
        return this.loadedTemplates === Object.keys(this.templates).length;
    }

    constructor({container, templates}) {
        this.$container = (typeof container === "string") ? $(container) : ((typeof container === "object" && container instanceof jQuery) ? container : $(container));
        if (!(this.$container instanceof jQuery)) {
            throw new Error("Container " + container + " not found");
        }
        this.$container.addClass(ToolTip.EVENT.CLOSE);

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
        Handlebars.registerHelper('getRatio', function(w, h) {
            return h/w * 100 + "%";
        });
    }

    initializeTemplates(templates) {
        this.templates = this.getDefaultTemplates();
        $.extend(true, this.templates, templates);
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
        $(window).on("resize orientationchange", this.resizeHandler.bind(this));
        this.eventManager.subscribe(ToolTip.EVENT.OPEN, this.open.bind(this));
        this.eventManager.subscribe(ToolTip.EVENT.CLOSE, this.close.bind(this));
        this.$close.on("click", function() {
            this.close();
        }.bind(this));

    }

    resizeHandler() {
        this.setPosition();
    }

    insertContent(content) {
        this.$content.html("");
        Helper.forEach(content, function(data) {
            if (this.templates[data.type]) {
                const html = this.templates[data.type](data.content);
                this.$content.append(html);
            }
        }.bind(this));
    }

    open(data) {
        if (data) {
            this.insertContent(data);
        }
        if (this.$container.hasClass(ToolTip.EVENT.CLOSE)) {
            this.setPosition();
            this.$container.removeClass(ToolTip.EVENT.CLOSE).addClass(ToolTip.EVENT.OPEN);
            this.eventManager.publish("resize");
        }
        return this;
    }

    close() {
        if (this.$container.hasClass(ToolTip.EVENT.OPEN)) {
            this.setPosition();
            this.$container.removeClass(ToolTip.EVENT.OPEN).addClass(ToolTip.EVENT.CLOSE);
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
        Helper.forEach(this.templates, function(template, type) {
            this.getTemplateFromFile(template, function(compiledTemplate) {
                this.templates[type] = compiledTemplate;
                this.loadedTemplates++;
                if (this.allTemplatesLoaded) {
                    this.initialize();
                }
            }.bind(this));
        }.bind(this));
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

ToolTip.EVENT = {
    OPEN: "tooltip-open",
    CLOSE: "tooltip-close"
};
