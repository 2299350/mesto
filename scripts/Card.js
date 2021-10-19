
import {imagePopupOpenHandler} from './index.js';

export default class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector('.places__item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const placesLike = this._element.querySelector('.places__like');
    const placesRemove = this._element.querySelector('.places__remove');
    const placesImage = this._element.querySelector('.popup__image-button');

    placesLike.addEventListener("click", (event) => {
      event.target.classList.toggle('places__like_active');
    });

    placesImage.addEventListener("click", () => {
      imagePopupOpenHandler(this._element);
    });

    placesRemove.addEventListener("click", () => {
      this._element.remove();
    });
  }

  renderCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const cardElementImage = this._element.querySelector('.places__image');
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;
    this._element.querySelector('.places__name').textContent = this._name;

    return this._element;
  }
}

