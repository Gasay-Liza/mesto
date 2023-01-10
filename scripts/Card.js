import { openPopup, popupImage, imageOfPopupImage, titleOfPopupImage} from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.photo-card__image');
    this._trashButton = this._element.querySelector('.photo-card__trash');
    this._likeButton = this._element.querySelector('.photo-card__like');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true);

    return cardElement;
  }

  // Метод лайка
  _toggleCardLike = (evt) => {
    evt.target.classList.toggle('photo-card__like_active');
  };

  // Метод удаления карточки
  _deleteCard = (evt) => {
    evt.target.closest('.photo-card').remove();
  };

  // Метод зума карточки
  _getPopupImage() {
    imageOfPopupImage.src = this._link;
    imageOfPopupImage.alt = this._name;
    titleOfPopupImage.textContent = this._name;
    openPopup(popupImage);
  }

  // Метод создания карточки
  getCardElement() {
    this._image.src = this._link;
    this._image.alt = `Фотография: ${this._name}`;
    this._element.querySelector('.photo-card__name').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', evt =>  this._toggleCardLike(evt));
    this._trashButton.addEventListener('click', evt => this._deleteCard(evt));
    this._image.addEventListener('click', () => this._getPopupImage());
  }
}
