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

// Создаем карточки из массива
function renderCards(cards = initialCards) {
  cards.reverse().forEach(function (element) {
    addCard(createCard(element.name, element.link));
  })
}

renderCards();

// Создаем отдельную карточку
function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.places__image').src = link;
  cardElement.querySelector('.places__image').alt = name;
  cardElement.querySelector('.places__name').textContent = name;

  initCard(cardElement.querySelector('.places__item'));
  return cardElement;
}

// Добавляем отдельную карточку
function addCard(cardElement) {
  placesList.prepend(cardElement);
}

//Лисенеры для карточек
function initCard(el) {
  const placesLike = el.querySelector('.places__like');
  const placesRemove = el.querySelector('.places__remove');
  const placesImage = el.querySelector('.popup__image-button');

  placesRemove.addEventListener("click", function() {
    el.remove();
  });

  placesLike.addEventListener("click", likeDislike);

  function likeDislike() {
    this.classList.toggle('places__like_active');
  }

  placesImage.addEventListener("click", () => imagePopupOpenHandler(el));
}

// Открытие попапа
function popupOpener(popup) {
  popup.classList.add('popup_shown');
}

// Закрытие попапа
function popupCloser(popup) {
  popup.classList.remove('popup_shown');
}

// Закрытие попапа по Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    popupCloser(addPopup);
    popupCloser(imagePopup);
    popupCloser(editPopup);
  }
});

// Закрытие попапа по клику вне области
document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup__flex')) {
    const currentPopup = evt.target.closest('.popup');
    popupCloser(currentPopup);
  }
});

//Обработка Edit popup
const nameInput = editPopupForm.querySelector('#name-id');
const jobInput = editPopupForm.querySelector('#description-id');

const nameField = pageBody.querySelector('.profile__name');
const jobField = pageBody.querySelector('.profile__description');

function editPopupOpenHandler() {
  popupOpener(editPopup);

  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
}


function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  popupCloser(editPopup);
}

editPopupForm.addEventListener('submit', editFormSubmitHandler);
openEditPopup.addEventListener('click', editPopupOpenHandler);
closeEditPopup.addEventListener('click', () => popupCloser(editPopup));


//Обработка Add popup
const placeInput = addPopupForm.querySelector('#place-id');
const urlInput = addPopupForm.querySelector('#url-id');

const placeField = pageBody.querySelector('.places__name');
const urlField = pageBody.querySelector('.places__image');

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  addCard(createCard(placeInput.value, urlInput.value));

  popupCloser(addPopup);
}

addPopupForm.addEventListener('submit', addFormSubmitHandler);
openAddPopup.addEventListener('click', () => popupOpener(addPopup));
closeAddPopup.addEventListener('click', () => popupCloser(addPopup));


// Обработка Image popup
function imagePopupOpenHandler(el) {
  popupOpener(imagePopup);
  popupImg.src = el.querySelector(".places__image").src;
  popupCaption.textContent = el.querySelector(".places__name").textContent;
  popupImg.alt = el.querySelector(".places__name").textContent;
}

closeImagePopup.addEventListener('click', () => popupCloser(imagePopup));
