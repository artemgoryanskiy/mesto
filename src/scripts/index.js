import '../pages/index.css';
import {createCard, deleteCard, initialCards} from './cards.js';
import {openModal, closeModal} from './modal.js';

const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseClass = '.popup__close';

initialCards.forEach((card) => document.querySelector('.places__list').append(createCard(card, deleteCard)));

profileEditButton.addEventListener('click', (e) => {
    openModal(profileEditPopup);
});

profileAddButton.addEventListener('click', (e) => {
    openModal(newCardPopup);
});

closeModal(profileEditPopup);
closeModal(newCardPopup);

const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
nameInput.value = profileTitle.textContent
jobInput.value = profileDescription.textContent

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
