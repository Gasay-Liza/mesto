const obj = {
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
const toggleSubmitButton = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const submitButton = formElement.querySelector(submitButtonSelector)
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled',true);
  } else{
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}
// Показать ошибку ввода в поле
const showInputError = (inputElement, errorClass, errorMessage, inputErrorClass) => {
  const inputName = inputElement.getAttribute('name');
  const errorPlace = document.getElementById(`${inputName}-error`);
  inputElement.classList.add(inputErrorClass);
  errorPlace.textContent = errorMessage;
  errorPlace.classList.add(errorClass);
};

// Скрыть ошибку ввода в поле
const hideInputError = (inputElement, errorClass, inputErrorClass) => {
  const inputName = inputElement.getAttribute('name');
  const errorPlace = document.getElementById(`${inputName}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorPlace.textContent = '';
  errorPlace.classList.remove(errorClass);
};

// Проверка на валидность введенных данных
const checkInputValidity = (inputElement, errorClass, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorClass, inputElement.validationMessage, inputErrorClass);
  } else {
    hideInputError(inputElement, errorClass, inputErrorClass);
  }
};

// Запуск процесс наложения валидации
const enabledValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault())
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, errorClass, inputErrorClass);
        toggleSubmitButton(formElement, inputList, submitButtonSelector, inactiveButtonClass);
      })
    })
  })
}
enabledValidation(obj);
