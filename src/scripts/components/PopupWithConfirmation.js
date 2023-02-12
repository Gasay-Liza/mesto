import Popup from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  submitCallback(removingCard) {
    this._handleSubmit = removingCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
