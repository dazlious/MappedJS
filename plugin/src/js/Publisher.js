let instance = null;

export class Publisher {

    constructor() {
        if(!instance) {
            this.subscribers = {
                any: []
            };
            instance = this;
        }

        return instance;
    }

    subscribe(type = "any", fn = function() {}) {
        if (!this.subscribers[type]) {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
        return this;
    }

    unsubscribe(type = "any", fn = function() {}) {
        this.handle(Publisher.UNSUBSCRIBE, type, fn);
        return this;
    }

    publish(type = "any", arg = []) {
        this.handle(Publisher.PUBLISH, type, arg);
        return this;
    }

    handle(action, type, data) {
        let subs = (this.subscribers[type]) ? this.subscribers[type]: [];
        for (let i = 0; i < subs.length; i++) {
            if (action === Publisher.PUBLISH) {
                subs[i](data);
            } else {
                if (subs[i] === data) {
                    subs.splice(i,1);
                }
            }
        }
        return this;
    }

}

Publisher.PUBLISH = "publish";
Publisher.UNSUBSCRIBE = "unsubscribe";
