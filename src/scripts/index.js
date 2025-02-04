import '../pages/index.css';
import {createCard, deleteCard, initialCards, likeCard} from './cards.js';
import {openModal, closeModal} from './modal.js';
import {
    editProfileFormElement,
    handleNewCardFormSubmit,
    handleProfileFormSubmit,
    newCardFormElement
} from "./forms.js";

const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');


initialCards.forEach((card) => document.querySelector('.places__list').append(createCard(card, deleteCard, likeCard)));

profileEditButton.addEventListener('click', (e) => {
    openModal(profileEditPopup);
});

profileAddButton.addEventListener('click', (e) => {
    openModal(newCardPopup);
});

closeModal(profileEditPopup);
closeModal(newCardPopup);

editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

