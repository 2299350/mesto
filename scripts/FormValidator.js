export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._formElement.addEventListener('open', (event) => {
      inputList.forEach(inputElement => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        this._hideInputError(inputElement, errorElement, this._inputErrorClass, this._errorClass);
      });
      this._toggleButtonState(this._formElement, inputList, this._submitButtonSelector, this._inactiveButtonClass);
    });

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement, this._inputErrorClass, this._errorClass);
        this._toggleButtonState(this._formElement, inputList, this._submitButtonSelector, this._inactiveButtonClass);
      });
    });
  }

  _showInputError(inputElement, errorElement, inputErrorClass, errorClass) {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputErrorClass, errorClass);

    } else {
      this._hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  _disableSubmitButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  };

  _enableSubmitButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  };

  _toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass) {
    const buttonElement = formElement.querySelector(submitButtonSelector);

    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
      this._enableSubmitButton(buttonElement, inactiveButtonClass);
    }
  };

  enableValidation() {
    this._setEventListeners();
  };
}

