import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card.js';
import {closeModal, openModal} from './modal.js';
import {initialCards} from './cards';
import {clearValidation, enableValidation} from './validation.js';

const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');

const editProfileFormElement = document.forms['edit-profile'];
const nameInput = editProfileFormElement.querySelector('input[name="name"]');
const jobInput = editProfileFormElement.querySelector('input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newCardFormElement = document.forms['new-place'];
const placeNameInput = newCardFormElement.querySelector('input[name="place-name"]');
const linkInput = newCardFormElement.querySelector('input[name="link"]');

const popupTypeImage = document.querySelector('.popup_type_image');

const elementImage = document.querySelector('.popup__image');
const elementCaption = document.querySelector('.popup__caption');

initialCards.forEach((card) => placesList.append(createCard(card, deleteCard, likeCard, openCardImage)));

profileEditButton.addEventListener('click', () => {
    openModal(profileEditPopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editProfileFormElement, validationConfig);
});
profileAddButton.addEventListener('click', () => {
    openModal(newCardPopup);
    clearValidation(newCardFormElement, validationConfig);
    newCardFormElement.reset();
});

popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closeModal(popup);
    });
});

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profileEditPopup);
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardElement = {
        name: placeNameInput.value,
        link: linkInput.value
    };
    const cardElement = createCard(newCardElement, deleteCard, likeCard, openCardImage);
    document.querySelector('.places__list').prepend(cardElement);
    closeModal(newCardPopup);
}

editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

function openCardImage(imageData) {
    elementImage.src = imageData.link;
    elementCaption.textContent = imageData.name;
    openModal(popupTypeImage);
}
