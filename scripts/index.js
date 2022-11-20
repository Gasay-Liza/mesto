//объявление переменных для popup
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let nameInput = popupElement.querySelector('.popup__input_field_name');
let jobInput = popupElement.querySelector('.popup__input_field_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__form');

// Функции открытия/закрытия popup по клику
const openPopup = function (){
  popupElement.classList.add('popup_is-opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}
const closePopup = function (){
  popupElement.classList.remove('popup_is-opened');
}
// Функции закрытия popup по клику за область popup
// const closePopupByClickOnOverlay = function(event) {
//   if (event.target !== event.currentTarget){
//     return;
//   }
//   closePopup()
// }


// Закрытие popup по клику(EventListener) за область popup
// popupElement.addEventListener('click', closePopupByClickOnOverlay);

// Реализация кнопки сохранить в popup


function submitFormHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup()
  }

// Открытие/закрытие popup по клику(EventListener)
popupOpenButtonElement.addEventListener('click', openPopup);
// Кнопка сохранить по клику на кнопку @сохранить(EventListener)

formElement.addEventListener('submit', submitFormHandler);
// Кнопка закрыть по клику на иконку крестика(EventListener)
popupCloseButtonElement.addEventListener('click', closePopup);
