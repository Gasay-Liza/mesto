import './index.css';
import {
  validationConfig,
  popupEditProfile,
  popupAddCard,
  popupEditAvatar,
  buttonEditProfile,
  buttonAddCard,
  buttonEditAvatar,
} from "../scripts/utils/utils.js";
import {Api} from "../scripts/components/Api.js";
import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {PopupWithConfirmation} from "../scripts/components/PopupWithConfirmation.js";
import {UserInfo} from "../scripts/components/UserInfo.js";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '386600a6-5fa2-49f8-ad0a-ec20da52d25b',
    'Content-Type': 'application/json'
  },
});

let userId;

//Загрузка данных с сервера
Promise.all([api.getCards(), api.getUserInfo()])
  .then(res => {
    const [dataCards, dataUser] = res;
    // Загружаем текстовые данные профиля с сервера и устанавливаем на страницу
    profile.setUserInfo({
      info: dataUser.about,
      username: dataUser.name,
    });
    // Загружаем аватар и устанавливаем на страницу
    profile.setUserAvatar({
      avatar: dataUser.avatar
    });
    userId = dataUser._id;
    cardList.renderItems(dataCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

// Валидация форм
const profilePopupValidator = new FormValidator(validationConfig, popupEditProfile);
profilePopupValidator.enabledValidation();

const addCardPopupValidator = new FormValidator(validationConfig, popupAddCard);
addCardPopupValidator.enabledValidation();

const editAvatarValidator = new FormValidator(validationConfig, popupEditAvatar);
editAvatarValidator.enabledValidation();


//Экземпляр профиля юзера
const profile = new UserInfo({
  selectorUsername: '.profile__name',
  selectorInfo: '.profile__info',
  selectorAvatar: '.profile__avatar'
})

//Экземпляр формы редактирования профиля
const popupEditProfileForm = new PopupWithForm(
  '.popup_type_edit-profile',
  {
    handleSubmitForm: (formData) => {
      popupEditProfileForm.loading(true);
      api.setUserInfo(formData)
        .then(res => {
          profile.setUserInfo(formData);
          popupEditProfileForm.closePopup()
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          popupEditProfileForm.loading(false);
        });
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

// Экземпляр формы изменения аватара
const popupEditAvatarForm = new PopupWithForm(
  '.popup_type_update-avatar',
  {
    handleSubmitForm: (formData) => {
      popupEditAvatarForm.loading(true);
      api.editAvatar(formData)
        .then(data => {
          profile.setUserAvatar(data);
          popupEditAvatarForm.closePopup()
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          popupEditAvatarForm.loading(false);
        });
    }
  })
popupEditAvatarForm.setEventListeners();

//Открытие формы редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
  const avatarData = profile.getUserAvatar();
  //Заполнение инпутов по умолчанию
  popupEditAvatarForm.setInputValues(avatarData);
  popupEditAvatarForm.openPopup();
});

// Создание карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupZoomImage.openPopup(data);
    },
    handleDeleteClick: () => {
      popupConfirmDeleteCard.openPopup();
      popupConfirmDeleteCard.submitCallback(() => {
        api.deleteCard(data._id)
          .then(() => {
            popupConfirmDeleteCard.closePopup();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      })

    },
    handleLikeClick: () => {
      if (card.isLiked()) {
        api.deleteLike(data._id)
          .then(dataCard => {
            card.toggleLike(dataCard)
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api.setLike(data._id)
          .then(dataCard => {
            card.toggleLike(dataCard);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    },
  }, '#card-template', userId)
  const cardElement = card.getCardElement();
  return cardElement;
}

//Экемпляр зума картинки
const popupZoomImage = new PopupWithImage('.popup_type_image');

//Экемпляр списка
const cardList = new Section({
    items: [],
    renderer: (initialCard) => {
      cardList.addItem(createCard(initialCard));
    }
  },
  '.photo-cards__list');

// Создаем попап подтверждения карточки
const popupConfirmDeleteCard = new PopupWithConfirmation('.popup_type_confirm');
popupConfirmDeleteCard.setEventListeners();

// Экземпляр формы добавления карточки
const popupAddCardForm = new PopupWithForm(
  '.popup_type_add-card',
  {
    handleSubmitForm: (formData) => {
      api.createCard(formData)
        .then(res => {
          cardList.addItem(createCard(res), true);
          popupAddCardForm.closePopup();
          addCardPopupValidator.disabledButton();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  })

popupAddCardForm.setEventListeners();
popupZoomImage.setEventListeners();

//Открытие формы добавление новой карточки
buttonAddCard.addEventListener('click', () => {
  popupAddCardForm.openPopup();
});


