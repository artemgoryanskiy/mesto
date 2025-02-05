import '../pages/index.css';
import {createCard, deleteCard, initialCards, likeCard, openCardImage} from './cards.js';
import {openModal, closeModal} from './modal.js';

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

initialCards.forEach((card) => placesList.append(createCard(card, deleteCard, likeCard, openCardImage)));

profileEditButton.addEventListener('click', (e) => {
    openModal(profileEditPopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});
profileAddButton.addEventListener('click', (e) => {
    openModal(newCardPopup);
});

popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close")
    closeButton.addEventListener("click", () => {
        closeModal(popup);
    });
})

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









