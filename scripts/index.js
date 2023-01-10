import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards} from "./constants.js";

// popups
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupImage = document.querySelector('.popup_type_image');
export const titleOfPopupImage = popupImage.querySelector('.popup__title-image');
export const imageOfPopupImage = popupImage.querySelector('.popup__image');
// popup close buttons
const popupCloseEditButton = popupEditProfile.querySelector('.popup__close-icon');
const popupCloseAddButton = popupAddCard.querySelector('.popup__close-icon');
const popupCloseImage = popupImage.querySelector('.popup__close-icon');

// popup open buttons
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const photoCardsList = document.querySelector('.photo-cards__list');
const formEditElement = document.querySelector('.popup__edit-form');
const formAddElement = document.querySelector('.popup__add-form');
const nameInput = popupEditProfile.querySelector('.popup__input_field_name');
const jobInput = popupEditProfile.querySelector('.popup__input_field_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const cardImage = popupAddCard.querySelector('.popup__input_field_card-image');
const cardTitle = popupAddCard.querySelector('.popup__input_field_card-name');
// const submitAddCard = popupAddCard.querySelector('.popup__add-button');
// const submitEditProfile = popupEditProfile.querySelector('.popup__edit-button');
const inputListFromEditForm = Array.from(popupEditProfile.querySelectorAll('.popup__input'));

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// валидация форм
const profilePopupValidator = new FormValidator(validationConfig, popupEditProfile);
profilePopupValidator.enabledValidation();

const addCardPopupValidator = new FormValidator(validationConfig, popupAddCard);
addCardPopupValidator.enabledValidation();


export const openPopup = (popup) => {
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
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
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
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile);
  inputListFromEditForm.forEach(inputElement => {
    popupEditProfile.hideInputError(inputElement);
  })
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popupEditProfile.enabledButton();
});

// открытие попапа добавления картинки-карточки по кнопке "+"
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
  popupAddCard.disabledButton();
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

// добавление карточки
const submitAddCardForm = (evt) => {
  evt.preventDefault();
  photoCardsList.prepend(new Card({name: cardTitle.value, link: cardImage.value}, '#card-template').getCardElement())
  cardImage.value = '';
  cardTitle.value = '';
  closePopup(popupAddCard);
}

formAddElement.addEventListener('submit', submitAddCardForm);

// редактирование профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formEditElement.addEventListener('submit', submitEditProfileForm);


// добавление начальных карточек
const renderInitialСards = () => {
  initialCards.forEach((card) => {
    photoCardsList.append(new Card(card, '#card-template').getCardElement());
  });
}

renderInitialСards();

