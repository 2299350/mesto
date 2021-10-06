const cardTemplate = document.querySelector('#card-template').content;

import {exportFunction} from './script.js';

exportFunction();



export default class Card {
  constructor(name, link) { /*cardTemplate передать в конструктор*/
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const placesLike = this._element.querySelector('.places__like');
    placesLike.addEventListener("click", (event) => {
      event.target.classList.toggle('places__like_active');
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

