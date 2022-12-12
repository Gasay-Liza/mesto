const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Проверка на наличие хотя бы одного невалидного поля ввода в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Переключение кнопки submit
const toggleSubmitButton = (submitButton, inputList, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

// Показать ошибку ввода в поле
const showInputError = (inputElement, errorMessage, validationConfig) => {
  const inputName = inputElement.getAttribute('name');
  const errorPlace = document.getElementById(`${inputName}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorPlace.textContent = errorMessage;
  errorPlace.classList.add(validationConfig.errorClass);
};

// Скрыть ошибку ввода в поле
const hideInputError = (inputElement, validationConfig) => {
  const inputName = inputElement.getAttribute('name');
  const errorPlace = document.getElementById(`${inputName}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorPlace.textContent = '';
  errorPlace.classList.remove(validationConfig.errorClass);
};

// Проверка на валидность введенных данных
const checkInputValidity = (inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(inputElement, validationConfig);
  }
};

// Запуск процесс наложения валидации
const enabledValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleSubmitButton(submitButton, inputList, validationConfig);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, validationConfig);
        toggleSubmitButton(submitButton, inputList, validationConfig);
      })
    })
  })
}

enabledValidation(validationConfig);
