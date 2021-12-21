import FormValidator from "./FormValidator.js";

export default class Popup {
  constructor(elementSelector, openBtnSelector) {
    this._element = document.querySelector(elementSelector);
    if (openBtnSelector) {
      this._openBtn = document.querySelector(openBtnSelector);
    } else {
      this._openBtn = this._element.querySelector(".popup__image");
    }

    const formValidator = new FormValidator(
      {
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__submit",
        inactiveButtonClass: "popup__submit_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible",
      },
      this._element
    );
    formValidator.enableValidation();
  }

  // Public methods
  open() {
    this._element.classList.add("popup_shown");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_shown");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._openBtn.addEventListener("click", () => {
      this.open();
    });

    const closeBtn = this._element.querySelector(".popup__close-button");
    closeBtn.addEventListener("click", () => this.close());

    this._element.addEventListener("click", (event) => {
      const isClickedOnOverlay = event.target.classList.contains("popup__flex");

      if (isClickedOnOverlay) {
        this.close();
      }
    });
  }

  // Private methods
  _handleEscClose = ({ key }) => {
    if (key !== "Escape") {
      return;
    }

    this.close();
  };
}
