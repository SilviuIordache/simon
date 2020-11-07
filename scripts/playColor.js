import SOUND from './sound.js';

export function playColor(color) {
  switch (color) {
    case 0:
      flashSquare(red);
      SOUND.playSound('red');
      break;
    case 1:
      flashSquare(yellow);
      SOUND.playSound('yellow');
      break;
    case 2:
      flashSquare(blue);
      SOUND.playSound('blue');
      break;
    case 3:
      flashSquare(green);
      SOUND.playSound('green');
      break;
    default:
      break;
  }
}


function flashSquare(square) {
  square.classList.remove('flash');
  setTimeout(() => { square.classList.add('flash')}, 300);
}