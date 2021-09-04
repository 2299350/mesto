let pageBody = document.querySelector('.page-body');


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

  debugger
  initCard(cardElement.querySelector('.places__item'));
  placesList.prepend(cardElement);
}

renderCards();

//Лайки
/*let placesLike = document.querySelectorAll(".places__like");

function likeToggle() {
  placesLike.forEach(like => {
    like.addEventListener("click", likeDislike, false);
  });

  function likeDislike() {
    this.classList.toggle('places__like_active');
  }
}

likeToggle();*/

//Удаление карточки
let placesRemove = pageBody.querySelectorAll(".places__remove");

function placeRemove() {
  let placesList = pageBody.querySelectorAll(".places__item");

  for (let i = 0; i < placesRemove.length; i++) {
    placesRemove[i].addEventListener("click", function () {
      placesList[i].remove();
    });
  }
}

placeRemove();

//Обработка Edit popup
let editPopup = pageBody.querySelector('#edit-popup-id');
let editPopupForm = editPopup.querySelector('#profile-form-id');

let openEditPopup = pageBody.querySelector('.profile__edit-button');
let closeEditPopup = editPopup.querySelector('.popup__close-button');

let nameInput = editPopupForm.querySelector('#name-id');
let jobInput = editPopupForm.querySelector('#description-id');

let nameField = pageBody.querySelector('.profile__name');
let jobField = pageBody.querySelector('.profile__description');

function editPopupOpenHandler() {
  editPopup.classList.toggle('popup_shown');

  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
}

function editPopupCloseHandler() {
  editPopup.classList.toggle('popup_shown');
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  editPopupCloseHandler()
}

editPopupForm.addEventListener('submit', editFormSubmitHandler);
openEditPopup.addEventListener('click', editPopupOpenHandler);
closeEditPopup.addEventListener('click', editPopupCloseHandler);

//Обработка Add popup
let addPopup = pageBody.querySelector('#add-popup-id');
let addPopupForm = addPopup.querySelector('#card-form-id');

let openAddPopup = pageBody.querySelector('.profile__add-button');
let closeAddPopup = addPopup.querySelector('.popup__close-button');

let placeInput = addPopupForm.querySelector('#place-id');
let urlInput = addPopupForm.querySelector('#url-id');

let placeField = pageBody.querySelector('.places__name');
let urlField = pageBody.querySelector('.places__image');

function addPopupOpenHandler() {
  addPopup.classList.toggle('popup_shown');
}

function addPopupCloseHandler() {
  addPopup.classList.toggle('popup_shown');
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  addCard(placeInput.value, urlInput.value);

  addPopupCloseHandler();
}

addPopupForm.addEventListener('submit', addFormSubmitHandler);
openAddPopup.addEventListener('click', addPopupOpenHandler);
closeEditPopup.addEventListener('click', addPopupCloseHandler);

///
let items = document.querySelectorAll(".places__item");
items.forEach(item => {
  initCard(item);
});

function initCard(el) {
  let placesLike = el.querySelectorAll(".places__like");

  placesLike.forEach(like => {
    like.addEventListener("click", likeDislike, false);
  });

  function likeDislike() {
    this.classList.toggle('places__like_active');
  }
}
