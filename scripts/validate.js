const showInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);

  } else {
    hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const toggleButtonState = () => {

};

const setEventListeners = (formElement, inputErrorClass, errorClass, inputSelector) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  console.log(inputList);
  console.log(inputSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      console.log(inputElement);
      toggleButtonState();
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  console.log(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, config.inputErrorClass, config.errorClass, config.inputSelector);
    console.log(formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
