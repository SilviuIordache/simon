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
    this.trackChallenge = document.getElementById('soundtrack-challenge');
    this.trackMenu = document.getElementById('soundtrack-menu');
  }

  handle(state) {
    switch(state) {
      case 'idle':
        this.idle();
        break;
      case 'menu':
        this.menu();
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
    INFO.toggle('on', 'click anywhere to begin');
    document.addEventListener('click', this.goToMenu);
  }

  goToMenu() {
    STATE.set('menu');
  }

  menu() {
    document.removeEventListener('click', this.goToMenu);
    INFO.toggle('off');
    MENU.toggle('on');
    this.trackMenu.play();
  }


  challenge() {
    MENU.toggle('off');
    this.trackMenu.pause();
    this.trackChallenge.play();
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
    this.trackChallenge.load();
    INFO.toggle('on', `Game Over, Score: ${this.sequence.length - 1}`);
    MENU.toggle('on');
    this.sequence = [];
  }
}