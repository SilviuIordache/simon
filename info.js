export default class InfoPanel {
  constructor() {
    this.infoPanel = document.getElementById('info-panel');
  }

  toggle(state, text) {
    if (state === 'on') {
      this.infoPanel.classList.remove('hide');
      this.infoPanel.innerHTML = text;
    } else if (state === 'off') {
      this.infoPanel.classList.add('hide');
    }
  }
}