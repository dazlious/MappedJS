
export class StateHandler {

    /**
     * get current state
     * @return {Object} current state from STATES-array
     */
    get current() {
        return this.states[this.i];
    }

    /**
     * get number of states
     * @return {number} number of states
     */
    get length() {
        return this.states.length;
    }

    /**
     * Constructor
     * @param  {Array} states_array=[{value: 0, description: 'Default'}] - [description]
     * @return {StateHandler} instance of StateHandler
     */
    constructor(states_array=[{value: 0, description: 'Default'}]) {
        this.states = states_array;
        this.i = 0;
        this.lastState = this.current;
        return this;
    }

    /**
     * get the next element
     * @return {StateHandler} instance of StateHandler
     */
    next() {
        this.lastState = this.current;
        if (this.hasNext()) {
            this.i++;
        }
        return this;
    }

    /**
     * get the previous element
     * @return {StateHandler} instance of StateHandler
     */
    previous() {
        this.lastState = this.current;
        if (this.hasPrevious()) {
            this.i--;
        }
        return this;
    }

    /**
     * change the state to specified state
     * @param {number} state - index of state in array
     * @return {StateHandler} instance of StateHandler
     */
    changeTo(state) {
        if (state >= 0 && state < this.length) {
            this.i = state;
        }
        return this;
    }

    /**
     * change the state to specified value of specified property
     * @param {number} state - index of state in array
     * @return {StateHandler} instance of StateHandler
     */
    changeToValue(prop, value) {
        for (var i = 0; i < this.length; i++) {
            if (this.states[i] && value === this.states[i][prop]) {
                this.i = i;
            }
        }
        return this;
    }

    /**
     * checks if there is a next element
     * @return {Boolean} wheter there is a next state or not
     */
    hasNext() {
        return this.i < this.length-1;
    }

    /**
     * checks if there is a previous element
     * @return {Boolean} wheter there is a previous state or not
     */
    hasPrevious() {
        return this.i > 0;
    }


}
