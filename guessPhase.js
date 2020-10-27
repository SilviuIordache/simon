import { playColor } from './playColor.js'
import STATE from './state.js';

export default class GuessPhase {
  constructor() {
    this.red = document.getElementById('red');
    this.yellow = document.getElementById('yellow');
    this.blue = document.getElementById('blue');
    this.green = document.getElementById('green');

    this.challengeSequence;
    this.guessSequence = [];

    this.setup();
  }  

  start(sequence) {
    this.addGuessListeners();
    this.challengeSequence = sequence;
  }

  setup() {
    this.redListener = this.redListener.bind(this);
    this.yellowListener = this.yellowListener.bind(this);
    this.blueListener = this.blueListener.bind(this);
    this.greenListener = this.greenListener.bind(this);
  }

  redListener() {
    playColor(0);
    this.guessSequence.push(0);
    this.evaluateSequence();
  }
  
  yellowListener() {
    playColor(1);
    this.guessSequence.push(1);
    this.evaluateSequence();
  }
  
  blueListener() {
    playColor(2);
    this.guessSequence.push(2);
    this.evaluateSequence();
  }
  
  greenListener() {
    playColor(3);
    this.guessSequence.push(3);
    this.evaluateSequence();
  }

  addGuessListeners() {
    red.addEventListener('click', this.redListener);
    yellow.addEventListener('click', this.yellowListener);
    blue.addEventListener('click', this.blueListener);
    green.addEventListener('click', this.greenListener);
  }

  removeGuessListeners() {
    red.removeEventListener('click', this.redListener);
    yellow.removeEventListener('click', this.yellowListener);
    blue.removeEventListener('click', this.blueListener);
    green.removeEventListener('click', this.greenListener);
  }

  evaluateSequence() {
    let guess = true;
    for (let i = 0; i < this.guessSequence.length; i++) {
      if (this.guessSequence[i] != this.challengeSequence[i]) {
        guess = false;
      }
    }

    if (guess) {
      console.log('good')
      if (this.guessSequence.length === this.challengeSequence.length) {
       console.log('you guessed the whole sequence');
       this.guessSequence = [];
       STATE.set('roundwin');
       this.removeGuessListeners();
      }
    } else {
      STATE.set('gameover');
      this.removeGuessListeners();
    }
    return guess;
  }
}  