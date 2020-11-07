import STATE from './state.js';
import SOUND from './sound.js'
class Menu {
  constructor() {
    this.menu = document.getElementById('menu');
    this.startButton = document.getElementById('start-button');
   
    this.setup();
  }

  setup() {
    this.startButton.onclick = function() {
      SOUND.playMusic('none');
      STATE.set('challenge')
    }

  }

  toggle(state) {
    if (state === 'on') {
      this.menu.classList.remove('hide');
    } else if (state === 'off') {
      this.menu.classList.add('hide');
    }
  }
}

let MENU = new Menu();
export default MENU;