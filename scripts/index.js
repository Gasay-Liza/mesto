// popups
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popupTitleImage = popupImage.querySelector('.popup__title-image');
const imageOfPopupImage = popupImage.querySelector('.popup__image');
// popup close buttons
const popupCloseEditButton = popupEditProfile.querySelector('.popup__close-icon');
const popupCloseAddButton = popupAddCard.querySelector('.popup__close-icon');
const popupCloseImage = popupImage.querySelector('.popup__close-icon');

// popup open buttons
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupOpenAddButton = document.querySelector('.profile__add-button');

const photoCardsList = document.querySelector('.photo-cards__list');
const formEditElement = document.querySelector('.popup__edit-form');
const formAddElement = document.querySelector('.popup__add-form');
const nameInput = popupEditProfile.querySelector('.popup__input_field_name');
const jobInput = popupEditProfile.querySelector('.popup__input_field_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const cardImage = popupAddCard.querySelector('.popup__input_field_card-image');
const cardTitle = popupAddCard.querySelector('.popup__input_field_card-name');

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// функция закрытия попапа на клик overlay
const closePopupByClickOnOverlay = (evt, popup) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
};

// функция закрытия попапа нажатие клавиши Escape
const closePopupByEsc = (evt) => {
  const popup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

// закрытие попапа из-за клика на overlay
popupEditProfile.addEventListener('click', (evt) => {
  closePopupByClickOnOverlay(evt, popupEditProfile);
});

popupAddCard.addEventListener('click', (evt) => {
  closePopupByClickOnOverlay(evt, popupAddCard);
});

popupImage.addEventListener('click', (evt) => {
  closePopupByClickOnOverlay(evt, popupImage);
});

// открытие попапа редактирования профиля при нажатии по кнопке редактирования профиля
popupOpenEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

// открытие попапа добавления картинки-карточки по кнопке "+"
popupOpenAddButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// закрытие popup-ов из-за клика по иконке-крестику
popupCloseEditButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

popupCloseAddButton.addEventListener('click', function () {
  closePopup(popupAddCard);
});

popupCloseImage.addEventListener('click', function () {
  closePopup(popupImage);
  popupImage.removeEventListener('click', closePopupByClickOnOverlay);
});

function submitAddCardForm(evt) {
  evt.preventDefault();
  addCard(cardImage.value, cardTitle.value);
  cardImage.value = '';
  cardTitle.value = '';
  closePopup(popupAddCard);
}

formAddElement.addEventListener('submit', submitAddCardForm);

function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formEditElement.addEventListener('submit', submitEditProfileForm);

// функция лайка
const toggleCardLike = function (evt) {
  evt.target.classList.toggle('photo-card__like_active');
};

// функция удаления карточки
const deleteCard = function (evt) {
  evt.target.closest('.photo-card').remove();
};

// попап-карточки
function addImagePopup(imageValue, titleValue) {
  popupTitleImage.textContent = titleValue;
  imageOfPopupImage.src = imageValue;
  imageOfPopupImage.alt = `Фотография: ${titleValue}`;
  openPopup(popupImage);
}

// функция создания карточки
function createCard(imageValue, titleValue) {
  const templateCard = document.querySelector('#card-template').content;
  const cardElement = templateCard.querySelector('.photo-card').cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-card__image');
  const cardLike = cardElement.querySelector('.photo-card__like');
  const cardTrash = cardElement.querySelector('.photo-card__trash');
  cardImage.src = imageValue;
  cardImage.alt = `Фотография: ${titleValue}`;
  cardElement.querySelector('.photo-card__name').textContent = titleValue;
  cardLike.addEventListener('click', toggleCardLike);
  cardImage.addEventListener('click', () => {
    addImagePopup(imageValue, titleValue)
  });
  cardTrash.addEventListener('click', deleteCard);
  return cardElement;
}

// добавление карточки через окно добавления карточки
function addCard(imageValue, titleValue) {
  photoCardsList.prepend(createCard(imageValue, titleValue));
}

// добавление начальных карточек
initialCards.forEach(function (item) {
  photoCardsList.append(createCard(item.link, item.name));
});

