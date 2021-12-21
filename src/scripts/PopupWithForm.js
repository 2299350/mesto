import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(elementSelector, openBtnSelector, formSubmitCb) {
    super(elementSelector, openBtnSelector);
    this._formSubmitCb = formSubmitCb;
    this.inputValues = [];
  }

  // Private methods
  _getInputValues() {
    const inputs = this._element.querySelectorAll(".popup__input");
    for (const input of inputs) {
      this.inputValues.push(input.value);
    }
  }

  updateInputValues() {
    this.inputValues.length = 0;
    this._getInputValues();
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", this._formSubmitCb);
  }

  open() {
    super.open();
    if (this.fillOutForm) {
      this.fillOutForm();
    }
    const popupForm = this._element.querySelector(".popup__form");
  }

  close() {
    super.close();
    this.resetForm();
  }
}
