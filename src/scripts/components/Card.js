export class Card {
  constructor({data, handleCardClick, handleDeleteClick, handleLikeClick}, templateSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = userId;
    this._likes = data.likes;
    this._likesLenght = this._likes.length;
    this._owner = data.owner;
    this._ownerId = this._owner._id;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._element = this._getTemplate();

    this._photoCardLike = this._element.querySelector('.photo-card__like');
    this._likeCounter = this._element.querySelector('.photo-card__likes-counter');
    this._image = this._element.querySelector('.photo-card__image');
    this._cardName = this._element.querySelector('.photo-card__name');
    this._deleteButton = this._element.querySelector('.photo-card__trash');
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

  // проверка - есть ли лайк юзера профиля
  isLiked() {
    if (this._likes.some((like) => like._id === this._userId)) {
      this._photoCardLike.classList.add('photo-card__like_active');
      return true;
    }
  }

  // изменения при нажатии на лайк
  toggleLike(dataCard) {
    this._likes = dataCard.likes;
    this._likeCounter.textContent = this._likes.length;
    this._photoCardLike.classList.toggle('photo-card__like_active');
  }


  // Метод удаления карточки
  deleteCard() {
    if (this._ownerId === this._userId) {
      this._element.remove();
    }
  }

  // так как мы не можем удалить не свою карточку - удаляем кнопку удаления карточки у чужих карточек
  _hasDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
  }

  // Метод создания карточки
  getCardElement() {
    this._image.src = this._link;
    this._image.alt = `Фотография: ${this._name}`;
    this._cardName.textContent = this._name;
    this._likeCounter.textContent = this._likesLenght;
    this.isLiked();
    this._setEventListeners();
    this._hasDeleteButton();
    return this._element;
  }

  // Навешивание слушателей
  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link
    }));
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
  }
}
