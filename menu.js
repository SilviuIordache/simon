import STATE from './state.js';
class Menu {
  constructor() {
    this.menu = document.getElementById('menu');
    this.startButton = document.getElementById('start-button');
    this.soundVolume = document.getElementById('sound-volume');
    this.soundtrackMenu = document.getElementById('soundtrack-menu');
    this.setup();
  }

  setup() {
    this.startButton.onclick = function() {
      STATE.set('challenge')
    }

    this.soundVolume.oninput = (event) => {
      let userInputVolume = event.target.value
      this.soundtrackMenu.volume = userInputVolume;
      console.log(userInputVolume);
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