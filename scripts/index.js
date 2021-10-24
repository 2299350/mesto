import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const pageBody = document.querySelector('.page-body');

const editPopup = pageBody.querySelector('#edit-popup-id');
const addPopup = pageBody.querySelector('#add-popup-id');
const imagePopup = pageBody.querySelector('#image-popup-id');

const editPopupForm = editPopup.querySelector('#profile-form-id');
const addPopupForm = addPopup.querySelector('#card-form-id');

const openAddPopup = pageBody.querySelector('.profile__add-button');
const openEditPopup = pageBody.querySelector('.profile__edit-button');

const closeEditPopup = editPopup.querySelector('.popup__close-button');
const closeAddPopup = addPopup.querySelector('.popup__close-button');
const closeImagePopup = imagePopup.querySelector('.popup__close-button');

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const popupImg = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const nameInput = editPopupForm.querySelector('#name-id');
const jobInput = editPopupForm.querySelector('#description-id');

const nameField = pageBody.querySelector('.profile__name');
const jobField = pageBody.querySelector('.profile__description');

const placeInput = addPopupForm.querySelector('#place-id');
const urlInput = addPopupForm.querySelector('#url-id');

const placeField = pageBody.querySelector('.places__name');
const urlField = pageBody.querySelector('.places__image');

const popupConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Добавляем лисенеры на валидацию
const addFormValidator = new FormValidator(popupConfig, addPopupForm);
const editFormValidator = new FormValidator(popupConfig, editPopupForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

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

function createCard({name, link}) {
  const card = new Card(name, link, cardTemplate);
  return card.createDomElement();
}

// Создаем карточки из массива
function renderCards(cards = initialCards) {
  cards.reverse().forEach(function (element) {
    const cardElement = createCard(element);
    addCard(cardElement);
  })
}

renderCards();

// Добавляем отдельную карточку
function addCard(card) {
  placesList.prepend(card);
}

// Открытие попапа
function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEscape);
  popup.classList.add('popup_shown');
}

function openPopupForm(popup) {
  openPopup(popup);
  const popupForm = popup.querySelector('.popup__form');
  popupForm.dispatchEvent(new Event('open'));
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_shown');
  document.removeEventListener('keydown', closePopupByEscape);

}

// Закрытие попапа по Escape
function closePopupByEscape (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_shown');
    closePopup(openedPopup);
  }
}

// Закрытие попапа по клику вне области
document.addEventListener('click', function(evt) {
  const isClickedOnOverlay = evt.target.classList.contains('popup__flex');
  if (isClickedOnOverlay) {
    const currentPopup = evt.target.closest('.popup');
    closePopup(currentPopup);
  }
});

//Обработка Edit popup
function editPopupOpenHandler() {
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
  openPopupForm(editPopup);
}


function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  closePopup(editPopup);
}

editPopupForm.addEventListener('submit', editFormSubmitHandler);
openEditPopup.addEventListener('click', editPopupOpenHandler);
closeEditPopup.addEventListener('click', () => closePopup(editPopup));


//Обработка Add popup
function addPopupOpenHandler() {
  addPopupForm.reset();
  openPopupForm(addPopup);
}


function addFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(createCard({
    name: placeInput.value,
    link: urlInput.value,
  }));

  closePopup(addPopup);
  addPopupForm.reset();
}

addPopupForm.addEventListener('submit', addFormSubmitHandler);
openAddPopup.addEventListener('click', addPopupOpenHandler);
closeAddPopup.addEventListener('click', () => closePopup(addPopup));


// Обработка Image popup
export function imagePopupOpenHandler(el) {
  openPopup(imagePopup);
  popupImg.src = el.querySelector(".places__image").src;
  popupCaption.textContent = el.querySelector(".places__name").textContent;
  popupImg.alt = el.querySelector(".places__name").textContent;
}

closeImagePopup.addEventListener('click', () => closePopup(imagePopup));
