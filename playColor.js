import SOUND from './sound.js';

const redAudio = new Audio('./audio/red.mp3');
const yellowAudio = new Audio('./audio/yellow.mp3');
const blueAudio = new Audio('./audio/blue.mp3');
const greenAudio = new Audio('./audio/green.mp3');

export function playColor(color) {
  switch (color) {
    case 0:
      flashSquare(red);
      redAudio.volume = SOUND.volume;
      redAudio.play();
      break;
    case 1:
      flashSquare(yellow);
      yellowAudio.volume = SOUND.volume;
      yellowAudio.play();
      break;
    case 2:
      flashSquare(blue);
      blueAudio.volume  = SOUND.volume;
      blueAudio.play();
      break;
    case 3:
      flashSquare(green);
      greenAudio.volume = SOUND.volume;
      greenAudio.play();
      break;
    default:
      break;
  }
}


function flashSquare(square) {
  square.classList.remove('flash');
  setTimeout(() => { square.classList.add('flash')}, 300);
}