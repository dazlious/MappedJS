
export class State {

    constructor(states_array = []) {
        this.STATES = states_array;
        this.i = 0;
        this.state = this.getState();
    }

    getState() {
        return this.STATES[this.i];
    }

    next() {
        if (this.hasNext()) {
            this.i++;
        }
        this.state = this.getState();
        return this;
    }

    hasNext() {
        return this.i < this.STATES.length;
    }
    
}
