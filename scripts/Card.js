const cardTemplate = document.querySelector('#card-template').content;

import {exportFunction} from './script.js';

exportFunction();



class Card {
  constructor(name, link) { /*cardTemplate передать в конструктор*/
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  }

  _generateCard() {
    const element = super._getTemplate();
    super._setEventListeners();

    const cardElementImage = this._element.querySelector('.places__image');
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;
    this._element.querySelector('.places__name').textContent = this._name;

    return element;
  }

  // Создаем отдельную карточку
  _createCard(name, link) {
    super._getTemplate
    const cardElementImage = cardElement.querySelector('.places__image');

    cardElementImage.src = link;
    cardElementImage.alt = name;
    cardElement.querySelector('.places__name').textContent = name;

    initCard(cardElement.querySelector('.places__item'));
    return cardElement;
  }
}

