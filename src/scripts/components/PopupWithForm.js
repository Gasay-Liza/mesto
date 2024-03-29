import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, {handleSubmitForm}) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submitBtn = this._popupForm.querySelector('.popup__submit-btn');
    this._originBtnText = this._submitBtn.textContent;
  }

  // Возвращаем данные формы
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }

  // Устанавливаем значения input в форме
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = this._originBtnText;
    }
    console.log(this._submitBtn.textContent)
    console.log(this._submitBtn)
  }

}
