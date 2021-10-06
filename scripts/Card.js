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

  renderCard() {
    const element = this._getTemplate();
    /*super._setEventListeners();*/

    const cardElementImage = element.querySelector('.places__image');
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;
    element.querySelector('.places__name').textContent = this._name;

    return element;
  }
}

