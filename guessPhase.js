import { playColor } from './playColor.js'
import STATE from './state.js';
import INFO from './info.js';

export default class GuessPhase {
  constructor() {
    this.red = document.getElementById('red');
    this.yellow = document.getElementById('yellow');
    this.blue = document.getElementById('blue');
    this.green = document.getElementById('green');

    this.challengeSequence = [];
    this.guessSequence = [];
    this.countDown;
    this.setup();
  }  

  start(sequence) {
    this.addGuessListeners();
    this.guessSequence = [];
    this.challengeSequence = sequence;
    this.startCountDown();
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

  startCountDown() {
    clearInterval(this.countDown);
    let counter = 5 + this.challengeSequence.length;
    this.countDown = setInterval(() => {
      INFO.toggle('on', counter)
      counter--;
      if (counter === 0) {
        INFO.toggle('off', counter);
        STATE.set('gameover');
        this.removeGuessListeners();
        clearInterval(this.countDown);
      }
    }, 1000);
  }

  evaluateSequence() {
    let guess = true;
    for (let i = 0; i < this.guessSequence.length; i++) {
      if (this.guessSequence[i] != this.challengeSequence[i]) {
        guess = false;
      }
    }

    if (guess) {
      if (this.guessSequence.length === this.challengeSequence.length) {
       console.log('you guessed the whole sequence');
       this.guessSequence = [];
       clearInterval(this.countDown);
       STATE.set('roundwin');
       this.removeGuessListeners();
      } else {
        INFO.toggle('on', 'good')
        setTimeout(() => {
          INFO.toggle('off')
        }, 500)
      }
    } else {
      STATE.set('gameover');
      clearInterval(this.countDown);
      this.removeGuessListeners();
    }
    return guess;
  }
}  