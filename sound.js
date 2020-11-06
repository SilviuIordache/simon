class Sound {
  constructor() {
    this._volume = 0.05;
    this.soundVolume = document.getElementById('sound-volume');


    this.trackChallenge = new Audio('./audio/soundtrack-challenge.mp3');
    this.trackMenu      = new Audio('./audio/soundtrack-menu.mp3');

    this.redAudio    = new Audio('./audio/red.mp3');
    this.yellowAudio = new Audio('./audio/yellow.mp3');
    this.blueAudio   = new Audio('./audio/blue.mp3');
    this.greenAudio  = new Audio('./audio/green.mp3');

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

    this.redAudio.volume = this.volume;
    this.yellowAudio.volume = this.volume;
    this.blueAudio.volume = this.volume;
    this.greenAudio.volume = this.volume;
    
    // set tracks to loop
    this.trackChallenge.loop = true;
    this.trackMenu.loop = true;

    // listen for user input and modify audio volume
    this.handleUserVolumeInput();
  }

  handleUserVolumeInput() {
    // set slider value to a default value
    this.soundVolume.value = this.volume;

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

  playSound(track) {
    switch(track) {
      case 'blue':
        this.blueAudio.play();
        break;
      case 'green':
        this.greenAudio.play();
        break;
      case 'red':
        this.redAudio.play();
        break;
      case 'yellow':
        this.yellowAudio.play();
        break;
      default:
        break;
    }
  }
}

let SOUND = new Sound();
export default SOUND;