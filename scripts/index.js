
// popups
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

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

const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: 'images/Saint-Petersburg.jpg'
  },
  {
    name: 'Внуково',
    link: 'images/Vnukovo.jpg'
  },
  {
    name: 'Красная поляна',
    link: 'images/Krasnodar-krai-Krasnaya-polyana.jpg'
  },
  {
    name: 'Карелия',
    link: 'images/Republic-of-Karelia.jpg'
  },
  {
    name: 'Эльбрус',
    link: 'images/Mount-Elbrus.jpg'
  },
  {
    name: 'Байкал',
    link: 'images/Baikal-Lake.jpg'
  }
];

const togglePopup = function (popup){
  popup.classList.toggle('popup_is-opened');
}

popupOpenEditButton.addEventListener('click', function (){
  togglePopup(popupEditProfile)
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

popupCloseEditButton.addEventListener('click', function (){
  togglePopup(popupEditProfile)
});

popupOpenAddButton.addEventListener('click', function (){
  togglePopup(popupAddCard)
});

popupCloseAddButton.addEventListener('click', function (){
  togglePopup(popupAddCard)
});

popupCloseImage.addEventListener('click', function (){
  togglePopup(popupImage)
});


function submitAddCardForm (evt) {
  evt.preventDefault();
  addCard(cardImage.value, cardTitle.value);
  cardImage.value = '';
  cardTitle.value = '';
  togglePopup(popupAddCard);
}

formAddElement.addEventListener('submit', submitAddCardForm);

function submitEditProfileForm (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  togglePopup(popupEditProfile);
}

formEditElement.addEventListener('submit', submitEditProfileForm);

// функция лайка
const toggleCardLike = function (evt) {
  evt.target.classList.toggle('photo-card__like_active');
}
// функция удаления карточки
const deleteCard = function (evt) {
  evt.target.closest('.photo-card').remove();
}

function addImagePopup(imageValue, titleValue) {
  popupImage.querySelector('.popup__title-image').textContent = titleValue;
  popupImage.querySelector('.popup__image').src = imageValue;
  popupImage.querySelector('.popup__image').alt = `Фотография: ${titleValue}`;
  togglePopup(popupImage);
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
  cardImage.addEventListener('click', () => addImagePopup(imageValue,titleValue))
  cardTrash.addEventListener('click', deleteCard);
  return cardElement;
}

// добавление карточки через окно добавления карточки
function addCard(imageValue, titleValue) {
  photoCardsList.prepend(createCard(imageValue, titleValue));
}

// добавление начальных карточек
initialCards.forEach(function (item){
  photoCardsList.append(createCard(item.link, item.name));
})
