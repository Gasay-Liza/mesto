import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, {handleSubmitForm}) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;

  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popupForm.querySelectorAll('.popup__input');

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

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}
