import '../pages/index.css';
import pencil from '../images/pencil.svg';
import {createCard, deleteCard, toggleLike} from './card.js';
import {closeModal, openModal} from './modal.js';
import {clearValidation, enableValidation} from './validation.js';
import {addCard, config, getCards, getUser, likeCard, updateUserAvatar, updateUserProfile} from './api';

const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const newCardPopup = document.querySelector('.popup_type_new-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');

const editProfileFormElement = document.forms['edit-profile'];
const nameInput = editProfileFormElement.querySelector('input[name="name"]');
const jobInput = editProfileFormElement.querySelector('input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const newCardFormElement = document.forms['new-place'];
const placeNameInput = newCardFormElement.querySelector('input[name="place-name"]');
const linkInput = newCardFormElement.querySelector('input[name="link"]');

const updateAvatarFormElement = document.forms['update-avatar'];

const popupTypeImage = document.querySelector('.popup_type_image');

const elementImage = document.querySelector('.popup__image');
const elementCaption = document.querySelector('.popup__caption');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
        const {name, about, avatar, _id} = user;
        config.currentUserId = _id;
        profileTitle.textContent = name;
        profileDescription.textContent = about;
        profileImage.style.backgroundImage = `url(${avatar})`;

        profileImage.addEventListener('mousemove', () => {
            profileImage.innerHTML = `
                <img src='${pencil}' alt='avatar'>`;

        });
        profileImage.addEventListener('mouseleave', () => {
            profileImage.innerHTML = '';
        });
        cards.forEach((card) => {
            const {name, link, _id, owner, likes} = card;
            placesList.append(createCard(card, deleteCard, toggleLike, openCardImage));
        });
});

enableValidation(validationConfig);

profileEditButton.addEventListener('click', () => {
    openModal(profileEditPopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editProfileFormElement, validationConfig);
});

profileImage.addEventListener('click', () => {
    openModal(updateAvatarPopup);
    clearValidation(updateAvatarFormElement, validationConfig);
    updateAvatarFormElement.reset();
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

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    updateUserProfile(nameInput.value, jobInput.value)
        .then((updatedUser) => {
            profileTitle.textContent = updatedUser.name;
            profileDescription.textContent = updatedUser.about;
            closeModal(profileEditPopup);
        })
        .catch((err) => {
            console.error('Ошибка при обновлении профиля:', err);
        });
}

function handleUpdateAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatar = updateAvatarFormElement.querySelector('input[name="avatar"]').value;
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохраняем...';
    updateUserAvatar(avatar)
        .then((updatedUser) => {
            profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
            closeModal(updateAvatarPopup);

            submitButton.textContent = 'Сохранить';
        })
        .catch((err) => {
            console.log(err);
            submitButton.textContent = 'Сохранить';
        });
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardElement = {
        name: placeNameInput.value,
        link: linkInput.value
    };
    addCard(newCardElement)
        .then((newCard) => {
            console.log(newCard);
            const cardElement = createCard(newCard, deleteCard, likeCard, openCardImage);
            document.querySelector('.places__list').prepend(cardElement);
            closeModal(newCardPopup);
        });
}

editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);
updateAvatarFormElement.addEventListener('submit', handleUpdateAvatarFormSubmit);

function openCardImage(imageData) {
    elementImage.src = imageData.link;
    elementCaption.textContent = imageData.name;
    openModal(popupTypeImage);
}
