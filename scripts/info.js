class InfoPanel {
  constructor() {
    this.infoPanelContainer = document.getElementById('info-panel-container');
    this.infoPanel = document.getElementById('info-panel');
  }

  toggle(state, text) {
    if (state === 'on') {
      this.infoPanelContainer.classList.remove('hide');
      this.infoPanel.innerHTML = text;
    } else if (state === 'off') {
      this.infoPanelContainer.classList.add('hide');
    }
  }
}

let INFO = new InfoPanel();
export default INFO;