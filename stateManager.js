import STATE from './state.js';
import MENU from './menu.js';
import ChallengePhase from './challengePhase.js';
import GuessPhase from './guessPhase.js';
import INFO from './info.js';


export default class StateManager {
  constructor() {
    this.sequence = [];
    this.guessPhase = new GuessPhase();
    this.challengePhase = new ChallengePhase();
    this.soundtrack = document.getElementById('sound-track');
  }

  handle(state) {
    switch(state) {
      case 'idle':
        this.idle();
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
        break;
      default:
        break;
    }
  }

  idle() {
  }


  challenge() {
    this.soundtrack.play();
    MENU.toggle('off');
    INFO.toggle('on', 'Memorize');
    let newNumber = Math.floor(Math.random() * Math.floor(4));
    this.sequence.push(newNumber);
    this.challengePhase.playSequence(this.sequence);
  }

  guessing() {
    this.guessPhase.start(this.sequence);
  }
  
  roundwin() {
    INFO.toggle('on', `round win, score: ${this.sequence.length}`);
    setTimeout(() => {
      INFO.toggle('off')
      STATE.set('challenge');
    }, 1500);
  }

  handoff() {
    INFO.toggle('on', 'Guess');
    setTimeout(() => {
      INFO.toggle('off')
      STATE.set('guessing');
    }, 1000);
  }

  gameover() {
    this.soundtrack.load();
    INFO.toggle('on', `Game Over, Score: ${this.sequence.length - 1}`);
    MENU.toggle('on');
    this.sequence = [];
  }
}