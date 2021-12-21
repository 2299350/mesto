import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(elementSelector, openBtnSelector) {
    super(elementSelector, openBtnSelector);
  }

  open() {
    super.open();

    const popupImg = this._element.querySelector(".popup__image");
    const popupCaption = this._element.querySelector(".popup__caption");

    popupImg.src = this._popup._link;
    popupImg.alt = popupCaption.textContent = this._popup._name;
  }
}
