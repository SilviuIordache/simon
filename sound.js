class Sound {
  constructor() {
    this._volume = 0.05;
    this.soundVolume = document.getElementById('sound-volume');

    this.trackChallenge = document.getElementById('soundtrack-challenge');
    this.trackMenu = document.getElementById('soundtrack-menu');
    this.setup();
  }

  get volume() {
    return this._volume;
  }

  set volume(value) {
    this._volume = value;
  }

  setup() {
    // set tracks to the default volume value
    this.trackChallenge.volume = this.volume;
    this.trackMenu.volume = this.volume;

    // set slider value to a default value
    this.soundVolume.value = this.volume;

    // listen for user input and modify audio volume
    this.soundVolume.oninput = (event) => {
      let userInputVolume = event.target.value

      this.trackMenu.volume = userInputVolume;
      this.trackChallenge.volume = userInputVolume;
    }
  }

  playMusic(track) {
    switch(track) {
      case 'menu':
        this.trackMenu.play();
        this.trackChallenge.pause();
        break;
      case 'challenge':
        this.trackChallenge.play();
        this.trackMenu.pause();
        break;
      case 'none':
        this.trackMenu.pause();
        this.trackChallenge.pause();
      default:
        break;
    }
  }
}

let SOUND = new Sound();
export default SOUND;