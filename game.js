
import ChallengePhase from './challengePhase.js'
import GuessPhase from './guessPhase.js';
import InfoPanel from './info.js'
import STATE from './state.js';

export default class GameLoop {
  constructor() {
    this.sequence = [];
    this.guessPhase = new GuessPhase();
    this.challengePhase = new ChallengePhase(this.sequence);
    this.info = new InfoPanel();

    this.setup();
  }

  setup() {
    STATE.set('idle');
    this.setupStartGameListener();
    this.attachLoop();
    startLoop();
  }

  attachLoop() {
    window.startLoop = () => {
      window.requestAnimationFrame( startLoop );
    
      if (STATE.isGameOver()) {
        this.info.toggle('on', 'Game over, click anywhere to start over');
      }
    
      if (STATE.isStart()) {
        this.info.toggle('off');
        this.increaseSequence();
        STATE.set('challenge');
        this.challengePhase.playSequence();
      }
    
      if (STATE.isHandoff()) {
        this.info.toggle('on', 'Guess the correct order');
        setTimeout(() => {
          if (!STATE.isGuessing()) {
            this.info.toggle('off')
            STATE.set('guessing');
          }
        }, 2000);
      }
    
      if (STATE.isGuessing()) {
        setTimeout(() => {
          this.info.toggle('off');
        }, 1000);
        this.guessPhase.start(this.sequence);
      }
    };
  }

  increaseSequence() {
    let newNumber = Math.floor(Math.random() * Math.floor(4));
    this.sequence.push(newNumber);
  }
  
  setupStartGameListener() {
    document.addEventListener('click', () => {
      if (STATE.isIdle()) {
        STATE.set('start')
      }
      if (STATE.isGameOver()) {
        STATE.set('idle')
      }
    });
  } 

}