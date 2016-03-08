var STATES = new WeakMap();

var _makePrivate = o => STATES.set(o, {});
var _getPrivate = o => STATES.get(o);

export class State {

    /**
     * Constructor
     * @param  {Array} states_array=[{value: 0, description: 'Default'}] - [description]
     * @return {State} instance of State
     */
    constructor(states_array=[{value: 0, description: 'Default'}]) {
        _makePrivate(this);
        _getPrivate(this).STATES = states_array;
        this.i = 0;
        return this;
    }

    /**
     * get current state
     * @return {Object} a state from STATES-array
     */
    get current() {
        return _getPrivate(this).STATES[this.i];
    }

    /**
     * get the next element
     * @return {State} instance of State
     */
    next() {
        if (this.hasNext()) {
            this.i++;
        }
        return this;
    }

    /**
     * checks if there is a next element
     * @return {Boolean} wheter there is a next state or not
     */
    hasNext() {
        return this.i < _getPrivate(this).STATES.length-1;
    }

}
