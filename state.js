class State {
  constructor (storage) {
    this.FIELDNAME = 'simonState';
    this.STATES = {
      idle: 'idle',
      start: 'start',
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
    console.log(`state: ${state}`)
  }

  isIdle() {
    return this.get() === this.STATES.idle;
  }

  isGuessing() {
    return this.get() === this.STATES.guessing;
  }

  isChallenge() {
    return this.get() === this.STATES.challenge;
  }

  isStart() {
    return this.get() === this.STATES.start;
  }

  isHandoff() {
    return this.get() === this.STATES.handoff;
  }

  isGameOver() {
    return this.get() === this.STATES.gameover;
  }
}
const STATE = new State(sessionStorage);
export default STATE;
