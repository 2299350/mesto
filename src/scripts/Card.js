import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor(name, link, handleCardClick) {
    this._name = name;
    this._link = link;
    this._container = null;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();

    // Setting up a popup with an image
    this._imagePopup = new PopupWithImage("#image-popup-id");
    this._imagePopup._popup = this;
    this._imagePopup.setEventListeners();
  }

  // Public methods
  render(container) {
    this._container = container;

    const picture = this._element.querySelector(".places__image");
    const caption = this._element.querySelector(".places__name");

    picture.src = this._link;
    picture.alt = caption.textContent = this._name;

    this._setEventListeners();
    this._container.prepend(this._element);
  }

  // Private methods
  _getTemplate() {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".places__item");

    return cardElement.cloneNode(true);
  }

  _setEventListeners() {
    const placesLike = this._element.querySelector(".places__like");
    const placesRemove = this._element.querySelector(".places__remove");
    const placesImage = this._element.querySelector(".popup__image-button");

    placesLike.addEventListener("click", (event) => {
      event.target.classList.toggle("places__like_active");
    });

    placesImage.addEventListener("click", () => {
      this._handleCardClick(this._imagePopup);
    });

    placesRemove.addEventListener("click", () => {
      this._element.remove();
    });
  }
}
