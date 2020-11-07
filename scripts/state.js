import StateManager from './stateManager.js';

class State {
  constructor (storage) {
    this.stateManager = new StateManager();
    this.FIELDNAME = 'simonState';
    this.storage = storage;
  }

  get() {
    return this.storage.getItem(this.FIELDNAME);
  }

  set(state) {
    this.storage.setItem(this.FIELDNAME, state);
    // console.log(`state: ${state}`);
    this.stateManager.handle(state);
  }
}
const STATE = new State(localStorage);
export default STATE;
