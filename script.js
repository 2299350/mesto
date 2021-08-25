let pageBody = document.querySelector('.page-body');

let editPopup = pageBody.querySelector('.edit-popup');
let editPopupForm = pageBody.querySelector('.edit-popup__form');
let shaddow = pageBody.querySelector('.page-shadow');

let nameInput = editPopupForm.querySelector('#name-id');
let jobInput = editPopupForm.querySelector('#description-id');

let nameField = pageBody.querySelector('.profile__name');
let jobField = pageBody.querySelector('.profile__description');

let openPopup = pageBody.querySelector('.profile__edit-button');
let closePopup = pageBody.querySelector('.edit-popup__close');

console.log(pageBody);

function popupOpenCloseHandler() {
  shaddow.classList.toggle('states_action-hidden');
  editPopup.classList.toggle('states_action-hidden');
  pageBody.classList.toggle('states_action-overflow-hidden');

  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;

    popupOpenCloseHandler()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editPopupForm.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', popupOpenCloseHandler);
closePopup.addEventListener('click', popupOpenCloseHandler);
