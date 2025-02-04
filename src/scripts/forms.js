import {createCard, deleteCard, likeCard} from "./cards.js";

const editProfileFormElement = document.forms['edit-profile'];
const nameInput = editProfileFormElement.querySelector('input[name="name"]');
const jobInput = editProfileFormElement.querySelector('input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
nameInput.value = profileTitle.textContent
jobInput.value = profileDescription.textContent

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

const newCardFormElement = document.forms['new-place'];
const placeNameInput = newCardFormElement.querySelector('input[name="place-name"]');
const linkInput = newCardFormElement.querySelector('input[name="link"]');

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardElement = {
        name: placeNameInput.value,
        link: linkInput.value
    };
    evt.target.reset();
    document.querySelector('.places__list').prepend(createCard(newCardElement, deleteCard, likeCard))
}

export {editProfileFormElement, handleProfileFormSubmit, newCardFormElement, handleNewCardFormSubmit}