export class FormValidator {
  constructor(validationConfig, formElement) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
  }

  // Проверка на наличие хотя бы одного невалидного поля ввода в форме
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  disabledButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  enabledButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this.disabledButton();
    } else {
      this.enabledButton();
    }
  }

  // Показать ошибку ввода в поле
  _showInputError = (inputElement, errorMessage) => {
    this._inputName = inputElement.getAttribute('name');
    this._errorPlace = document.getElementById(`${this._inputName}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorPlace.textContent = errorMessage;
    this._errorPlace.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    this._inputName = inputElement.getAttribute('name');
    this._errorPlace = document.getElementById(`${this._inputName}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorPlace.textContent = '';
    this._errorPlace.classList.remove(this._errorClass);
  };

  // Проверка на валидность введенных данных
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleSubmitButton();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButton();
      })
    })
  }

  enabledValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });
    this._setEventListeners()
  }
}
