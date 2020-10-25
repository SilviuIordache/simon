import { playColor } from './playColor.js'
import STATE from './state.js';


export default class ChallengePhase {
  constructor(sequence) {
    this.sequence = sequence;
  }

  playSequence() {
    console.log(this.sequence)
    let index = 0;
    let interval = setInterval( () => {
      playColor(this.sequence[index]);
      index++;
      if(index === this.sequence.length) {
        clearInterval(interval);
  
        // go back to idle 1 sec after last one plays
        setTimeout(() => {
          STATE.set('handoff');
        }, 1000);
      }
    }, 1000);
  }

}
