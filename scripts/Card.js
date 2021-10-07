const cardTemplate = document.querySelector('#card-template').content;

import {imagePopupOpenHandler} from './script.js';

export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const placesLike = this._element.querySelector('.places__like');
    const placesRemove = this._element.querySelector('.places__remove');
    const placesImage = this._element.querySelector('.popup__image-button');

    console.log(this._element);

    placesLike.addEventListener("click", (event) => {
      event.target.classList.toggle('places__like_active');
    });

    /*placesImage.addEventListener("click", () => {
      debugger
      const v = this._element.querySelector('.places__item');
      imagePopupOpenHandler(v);
    });*/

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

