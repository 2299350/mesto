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
