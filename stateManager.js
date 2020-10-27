import ChallengePhase from './challengePhase.js';
import GuessPhase from './guessPhase.js';
import InfoPanel from './info.js';
import STATE from './state.js';

export default class StateManager {
  constructor() {
    this.sequence = [];
    this.guessPhase = new GuessPhase();
    this.challengePhase = new ChallengePhase();
    this.info = new InfoPanel();
  }

  handle(state) {
    switch(state) {
      case 'idle':
        this.idle();
        break;
      case 'gameover':
        this.gameover();
        break;
      case 'challenge':
        this.challenge();
        break;
      case 'handoff':
        this.handoff();
        break;
      case 'guessing':
        this.guessing();
        break;
      case 'roundwin':
        this.roundwin();
        break;
      case 'gameover':
        this.gameover();
      default:
        break;
    }
  }

  idle() {
    this.info.toggle('on', 'Click anywhere to start');
    this.addStartGameListener();
  }

  addStartGameListener() {
    document.addEventListener('click', this.gameInitiator);
  }

  removeStartGameListener() {
    document.removeEventListener('click', this.gameInitiator);
  }

  gameInitiator() {
    STATE.set('challenge');
  }

  challenge() {
    this.removeStartGameListener();
    this.info.toggle('on', 'Memorize');
    let newNumber = Math.floor(Math.random() * Math.floor(4));
    this.sequence.push(newNumber);
    this.challengePhase.playSequence(this.sequence);
  }

  guessing() {
    this.guessPhase.start(this.sequence);
  }
  
  roundwin() {
    this.info.toggle('on', `Round win, score: ${this.sequence.length}`);
    setTimeout(() => {
      this.info.toggle('off')
      STATE.set('challenge');
    }, 1500);
  }

  handoff() {
    this.info.toggle('on', 'Guess the correct order');
    setTimeout(() => {
      this.info.toggle('off')
      STATE.set('guessing');
    }, 1000);
  }

  gameover() {
    this.sequence = [];
    this.info.toggle('on', 'Game over, click anywhere to restart');
    setTimeout(() => {
      this.addStartGameListener();
    }, 0);
  }
}