class Sound {
  constructor() {
    this._volume = 0.2;

    this.musicVolume = document.getElementById('music-volume');
    this.cuesVolume = document.getElementById('cues-volume');

    this.musicNoSound =  document.getElementById('music-no-sound');
    this.cuesNoSound =  document.getElementById('cues-no-sound');


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
    this.audioVolumeHandler();
  }

  audioVolumeHandler() {
    this.musicVolumeHandler();
    this.cuesVolumeHandler()
  }

  musicVolumeHandler() {
    this.musicVolume.value = this.volume;

    this.musicVolume.oninput = (event) => {
      let vol = event.target.value;

      if (vol == 0) {
        this.musicNoSound.classList.remove('hide');
      } else {
        this.musicNoSound.classList.add('hide');
      }

      this.trackMenu.volume = vol;
      this.trackChallenge.volume = vol;
    }
  }

  cuesVolumeHandler() {
    this.cuesVolume.value = this.volume;

    this.cuesVolume.oninput = (event) => {
      let vol = event.target.value

      if (vol == 0) {
        this.cuesNoSound.classList.remove('hide');
      } else {
        this.cuesNoSound.classList.add('hide');
      }

      this.redAudio.volume = vol;
      this.yellowAudio.volume = vol;
      this.blueAudio.volume = vol;
      this.greenAudio.volume  = vol;
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

  reset() {
    this.trackChallenge.currentTime = 0;
    this.trackMenu.currentTime = 0;
    this.playMusic('none');
  }
}

let SOUND = new Sound();
export default SOUND;