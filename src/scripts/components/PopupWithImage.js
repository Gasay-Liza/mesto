import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popup = document.querySelector(this._selector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitleImage = this._popup.querySelector('.popup__title-image');
  }

  openPopup(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupTitleImage.textContent = data.name;
    super.openPopup();
  }
}
