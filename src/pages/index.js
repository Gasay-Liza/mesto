import './index.css';
import {
  initialCards,
  validationConfig,
  popupEditProfile,
  popupAddCard,
  buttonEditProfile,
  buttonAddCard,
} from "../scripts/utils/utils.js";
import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {UserInfo} from "../scripts/components/UserInfo.js";

// валидация форм
const profilePopupValidator = new FormValidator(validationConfig, popupEditProfile);
profilePopupValidator.enabledValidation();

const addCardPopupValidator = new FormValidator(validationConfig, popupAddCard);
addCardPopupValidator.enabledValidation();

//Экемпляр профиля (информация)
const profile = new UserInfo({
  profileUserName: '.profile__name',
  profileInfo: '.profile__info'
})

const popupEditProfileForm = new PopupWithForm(
  '.popup_type_edit-profile',
  {
    handleSubmitForm: (formData) => {
      profile.setUserInfo(formData);

      popupEditProfileForm.closePopup()
    }
  })

popupEditProfileForm.setEventListeners();

//Открытие формы редактирования
buttonEditProfile.addEventListener('click', () => {
  const userData = profile.getUserInfo();
  //Заполнение инпутов по умолчанию
  popupEditProfileForm.setInputValues(userData);
  popupEditProfileForm.openPopup();

});

const renderCard = ({data, handleCardClick}, templateSelector) => {
  return new Card({data, handleCardClick}, templateSelector).getCardElement();
}
const popupZoomImage = new PopupWithImage('.popup_type_image');


//Экемпляр списка
const cardList = new Section({
    items: initialCards,
    renderer: (initialCard) => {
      const card = renderCard({
        data: initialCard,
        handleCardClick: (data) => {
          // popupZoomImage.setEventListeners();
          popupZoomImage.openPopup(data);
        }
      }, '#card-template')
      cardList.addItem(card);
    }
  },
  '.photo-cards__list');

cardList.renderItems()

// Экземпляр формы добавления карточки
const popupAddCardForm = new PopupWithForm(
  '.popup_type_add-card',
  {
    handleSubmitForm: (formData) => {
      const newCard = renderCard({
        data: formData,
        handleCardClick: (data) => {
          // popupZoomImage.setEventListeners();
          popupZoomImage.openPopup(data);
        }
      }, '#card-template')
      cardList.addItem(newCard);
      popupAddCardForm.closePopup();
      addCardPopupValidator.disabledButton();
    }
  })
popupAddCardForm.setEventListeners();
//
popupZoomImage.setEventListeners();
//Открытие формы редактирования
buttonAddCard.addEventListener('click', () => {
  popupAddCardForm.openPopup();
});
