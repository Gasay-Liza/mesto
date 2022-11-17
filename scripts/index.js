//объявление переменных для popup
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let nameInput = popupElement.querySelector('.popup__name-field');
let jobInput = popupElement.querySelector('.popup__job-field');

// Функции открытия/закрытия popup по клику
const openPopup = function (){
  popupElement.classList.add('popup_is-opened');
  nameInput.value = 'Жак-Ив Кусто';
  jobInput.value ='Исследователь океана';
  console.log('popup is opened');
}
const closePopup = function (){
  popupElement.classList.remove('popup_is-opened');
  console.log('popup is closed');
}
// Функции закрытия popup по клику за область popup
const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget){
    return;
  }
  closePopup()
}
// Открытие/закрытие popup по клику(EventListener)
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// Закрытие popup по клику(EventListener) за область popup

popupElement.addEventListener('click', closePopupByClickOnOverlay);

// Реализация кнопки сохранить в popup
let formElement = document.querySelector('.popup__edit-form');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  }

formElement.addEventListener('submit', formSubmitHandler);
