export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  closePopup() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }


  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-icon')) {
        this.closePopup()
      }
    });
  }
}
