import ChallengePhase from './challengePhase.js';
import GuessPhase from './guessPhase.js';
import STATE from './state.js';
import MENU from './menu.js';
import INFO from './info.js';
import SOUND from './sound.js';


export default class StateManager {
  constructor() {
    this.sequence = [];
    this.guessPhase = new GuessPhase();
    this.challengePhase = new ChallengePhase();
  }

  handle(state) {
    switch(state) {
      case 'idle':
        this.idle();
        break;
      case 'pregame':
        this.pregame();
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
    document.addEventListener('click', this.goToPreGame);
    document.addEventListener('keyup', this.returnToIdle);
  }

  returnToIdle(e) {
    if (e.key == "Escape") {
      if (STATE.get() != 'pregame') {
        //STATE.set('pregame');
        location.reload();
      }
    }
  }

  goToPreGame() {
    STATE.set('pregame');
  }

  pregame() {
    document.removeEventListener('click', this.goToPreGame);
    INFO.toggle('off');
    MENU.toggle('on');
    SOUND.playMusic('menu');
  }


  challenge() {
    MENU.toggle('off');
    SOUND.playMusic('challenge');
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
    }, 2500);
  }

  handoff() {
    INFO.toggle('on', 'Guess');
    setTimeout(() => {
      INFO.toggle('off')
      STATE.set('guessing');
    }, 1000);
  }

  gameover() {
    SOUND.reset();
    INFO.toggle('on', `Game Over, Score: ${this.sequence.length - 1}`);
    MENU.toggle('on');
    this.sequence = [];
  }
}