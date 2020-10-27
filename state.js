import StateManager from './stateManager.js';

class State {
  constructor (storage) {
    this.stateManager = new StateManager();
    this.FIELDNAME = 'simonState';
    this.STATES = {
      idle: 'idle',
      challenge: 'challenge',
      handoff: 'handoff',
      guessing: 'guessing',
      roundwin: 'roundwin',
      gameover: 'gameover'
    };
    this.storage = storage;
  }

  get() {
    return this.storage.getItem(this.FIELDNAME) || this.STATES.idle;
  }

  set(state) {
    this.storage.setItem(this.FIELDNAME, state || this.STATES.idle);
    console.log(`state: ${state}`);
    this.stateManager.handle(state);
  }
}
const STATE = new State(localStorage);
export default STATE;
