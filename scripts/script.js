let pageBody = document.querySelector('.page-body');

let popup = pageBody.querySelector('.popup');
let popupForm = pageBody.querySelector('.popup__form');


let nameInput = popupForm.querySelector('#name-id');
let jobInput = popupForm.querySelector('#description-id');

let nameField = pageBody.querySelector('.profile__name');
let jobField = pageBody.querySelector('.profile__description');

let openPopup = pageBody.querySelector('.profile__edit-button');
let closePopup = pageBody.querySelector('.popup__close-button');

function popupOpenHandler() {
  popup.classList.toggle('popup_shown');

  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
}

function popupCloseHandler() {
  popup.classList.toggle('popup_shown');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;

    popupCloseHandler()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', popupOpenHandler);
closePopup.addEventListener('click', popupCloseHandler);

// Добавление карточек на страницу


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
console.log(cardTemplate);

function renderCards(cards = initialCards) {

  cards.forEach(function (element) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.places__image').src = element.link;
    cardElement.querySelector('.places__image').alt = element.name;
    cardElement.querySelector('.places__name').textContent = element.name;

    placesList.append(cardElement);
  })
}

function addCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.places__image').src = link;
  cardElement.querySelector('.places__image').alt = name;
  cardElement.querySelector('.places__name').textContent = name;

  placesList.prepend(cardElement);
}

renderCards();
addCard('Камчатка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');

