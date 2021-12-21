import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import items from "./initialCards.js";

import headerLogo from "../images/header-logo.svg";
import profilePhoto from "../images/profile-photo.png";

const logo = document.querySelector(".header__logo");
logo.src = headerLogo;
const userpic = document.querySelector(".profile__photo");
userpic.src = profilePhoto;

const editUserPopup = new PopupWithForm(
  "#edit-popup-id",
  ".profile__edit-button",
  (event) => {
    event.preventDefault();

    const nameInput = editUserPopup._element.querySelector("#name-id");
    const jobInput = editUserPopup._element.querySelector("#description-id");

    editUserPopup.user.setUserInfo(nameInput.value, jobInput.value);

    editUserPopup.close();
  }
);
editUserPopup.user = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__description",
});
editUserPopup.fillOutForm = () => {
  const { userName, userInfo } = editUserPopup.user.getUserInfo();
  editUserPopup._element.querySelector("#name-id").value = userName;
  editUserPopup._element.querySelector("#description-id").value = userInfo;
};
editUserPopup.resetForm = () => {
  editUserPopup._element.querySelector("#profile-form-id").reset();
};
editUserPopup.setEventListeners();

// Adding cards
const addCardPopup = new PopupWithForm(
  "#add-popup-id",
  ".profile__add-button",
  (event) => {
    event.preventDefault();

    addCardPopup.updateInputValues();
    section.addItem(...addCardPopup.inputValues);

    addCardPopup.close();
    const submitBtn = event.target.querySelector(".popup__submit");
    submitBtn.classList.add("popup__submit_disabled");
  }
);
addCardPopup.resetForm = () => {
  addCardPopup._element.querySelector("#card-form-id").reset();
};
addCardPopup.setEventListeners();

// Setting up a Section
items.reverse();

const section = new Section(
  {
    items,
    renderer(name, link, container) {
      const card = new Card(name, link, (popup) => {
        popup.open();
      });
      card.render(container);
    },
  },
  ".places__list"
);
section.render();
