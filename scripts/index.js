
// popup редактирования профиля
const popupElementEditProfile = document.querySelector('.popup_type_edit-profile');
const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupCloseEditButtonElement = popupElementEditProfile.querySelector('.popup__close-icon');
const popupElementAddCard = document.querySelector('.popup_type_add-card');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const popupCloseAddButtonElement = popupElementAddCard.querySelector('.popup__close-icon');
const photoCardsList = document.querySelector('.photo-cards__list');
const imagePopup = document.querySelector('.popup_type_image');
const formEditElement = document.querySelector('.popup__edit-form');
const formAddElement = document.querySelector('.popup__add-form');
let nameInput = popupElementEditProfile.querySelector('.popup__input_field_name');
let jobInput = popupElementEditProfile.querySelector('.popup__input_field_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

const openEditProfilePopup = function (){
  popupElementEditProfile.classList.add('popup_is-opened');
}
const closeEditProfilePopup = function (){
  popupElementEditProfile.classList.remove('popup_is-opened');
}

popupOpenEditButtonElement.addEventListener('click', openEditProfilePopup);
popupCloseEditButtonElement.addEventListener('click', closeEditProfilePopup);

// popup добавления карточки

const openAddCardPopup = function (){
  popupElementAddCard.classList.add('popup_is-opened');
}
const closeAddCardPopup = function (){
  popupElementAddCard.classList.remove('popup_is-opened');
}

popupOpenAddButtonElement.addEventListener('click', openAddCardPopup);
popupCloseAddButtonElement.addEventListener('click', closeAddCardPopup);

const openImagePopup = function (){
  imagePopup.classList.add('popup_is-opened');
}

const closeImagePopup = function (){
  imagePopup.classList.remove('popup_is-opened');
}


formAddElement.addEventListener('submit', function (evt) {

  evt.preventDefault();
  const image = popupElementAddCard.querySelector('.popup__input_field_card-image');
  const title = popupElementAddCard.querySelector('.popup__input_field_card-name');

  addCard(image.value, title.value);

  image.value = '';
  title.value = '';

  closeAddCardPopup()
});

function submitFormHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeEditProfilePopup()
}

formEditElement.addEventListener('submit', submitFormHandler);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// функция лайка
const like = function (evt) {
  evt.target.classList.toggle('photo-card__like_active');
}
// функция удаления карточки
const deleteCard = function (evt) {
  evt.target.closest('.photo-card').remove();
}

function addImagePopup(imageValue, titleValue) {
  imagePopup.querySelector('.popup__title-image').textContent = titleValue;
  imagePopup.querySelector('.popup__image').src = imageValue;
  imagePopup.querySelector('.popup__image').alt = `Фотография: ${titleValue}`;
  openImagePopup()
}


// добавление 6-ти начальных карточек
initialCards.forEach(function (item){
  const templateCard = document.querySelector('#card-template').content;
  const cardElement = templateCard.querySelector('.photo-card').cloneNode(true);
  cardElement.querySelector('.photo-card__image').src = item.link;
  cardElement.querySelector('.photo-card__image').alt = `Фотография: ${item.link}`;
  cardElement.querySelector('.photo-card__name').textContent = item.name;
  cardElement.querySelector('.photo-card__like').addEventListener('click', like);
  cardElement.querySelector('.photo-card__trash').addEventListener('click', deleteCard);
  imagePopup.querySelector('.popup__close-icon').addEventListener('click', closeImagePopup);
  photoCardsList.prepend(cardElement);
})

// добавление карточки через окно добавления карточки
function addCard(imageValue, titleValue) {
  const templateCard = document.querySelector('#card-template').content;
  const cardElement = templateCard.querySelector('.photo-card').cloneNode(true);

  cardElement.querySelector('.photo-card__image').src = imageValue;
  cardElement.querySelector('.photo-card__image').alt = `Фотография: ${titleValue}`;
  cardElement.querySelector('.photo-card__name').textContent = titleValue;
  cardElement.querySelector('.photo-card__like').addEventListener('click', like);
  photoCardsList.prepend(cardElement);
}


// удаление карточки, которые были добавлены не через js
document.querySelectorAll('.photo-card__trash').forEach(function (item){
  item.addEventListener('click', deleteCard)
});
// добавление лайка для карточки, которая добавлена не через js
document.querySelectorAll('.photo-card__like').forEach(function (item){
  item.addEventListener('click', like)
});
// открытие карточки, которая добавлена не через js
document.querySelectorAll('.photo-card').forEach(function (item){
  const imageElement = item.querySelector('.photo-card__image');
  const imageValue = imageElement.src;
  const titleValue = item.querySelector('.photo-card__name').textContent
  imageElement.addEventListener('click', () => addImagePopup(imageValue,titleValue))
});
