
export class State {

    /**
     * Constructor
     * @param  {Array} states_array=[] - [description]
     * @return {State} instance of State
     */
    constructor(states_array = []) {
        this.STATES = states_array;
        this.i = 0;
        this.state = this.getState();
        return this;
    }

    /**
     * get current state
     * @return {Object} a state from STATES-array
     */
    getState() {
        return this.STATES[this.i];
    }

    /**
     * get the next element
     * @return {State} instance of State
     */
    next() {
        if (this.hasNext()) {
            this.i++;
        }
        this.state = this.getState();
        return this;
    }

    /**
     * checks if there is a next element
     * @return {Boolean} wheter there is a next state or not
     */
    hasNext() {
        return this.i < this.STATES.length;
    }

}
