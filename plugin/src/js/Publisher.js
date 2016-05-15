/**
 * singleton instance
 * @type {Publisher}
 */
let instance = null;

export class Publisher {

    /**
     * Constructor
     * @return {Publisher} instance of Publisher
     */
    constructor() {
        if(!instance) {
            this.subscribers = {};
            instance = this;
        }
        return instance;
    }

    /**
     * subscribe to a topic
     * @param  {string} type="any" - a topic
     * @param  {Function} fn=function(){} - a function to callback
     * @return {Publisher} instance of Publisher
     */
    subscribe(type = "any", fn = function() {}) {
        if (!this.subscribers[type]) this.subscribers[type] = [];
        this.subscribers[type].push(fn);
        return this;
    }

    /**
     * unsubscribe from a topic
     * @param  {string} type="any" - a topic
     * @param  {Function} fn=function(){} - a function to callback
     * @return {Publisher} instance of Publisher
     */
    unsubscribe(type = "any", fn = function() {}) {
        return this.handle(Publisher.UNSUBSCRIBE, type, fn);
    }

    /**
     * publish to a topic
     * @param  {string} type="any" - a topic
     * @param  {Function} arg=[] - list of parameters
     * @return {Publisher} instance of Publisher
     */
    publish(type = "any", arg = []) {
        return this.handle(Publisher.PUBLISH, type, arg);
    }

    /**
     * handle subscribe to a topic
     * @param  {string} action - eventname
     * @param  {string} type="any" - a topic
     * @param  {Object} a function to callback or arguments
     * @return {Publisher} instance of Publisher
     */
    handle(action, type, data) {
        const subs = (this.subscribers[type]) ? this.subscribers[type]: [];
        for (const [i, fn] of subs.entries()) {
            if (action === Publisher.PUBLISH) {
                fn(data);
            } else {
                if (fn === data) subs.splice(i,1);
            }
        }
        return this;
    }

    /**
     * destroys singleton instance
     */
    destroy() {
        instance = null;
    }

}

/**
 * Eventname for publishing
 * @type {String}
 */
Publisher.PUBLISH = "publish";

/**
 * Eventname for unsubscribing
 * @type {String}
 */
Publisher.UNSUBSCRIBE = "unsubscribe";
