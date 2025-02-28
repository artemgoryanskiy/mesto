import '../pages/index.css';
import {createCard, handleLikeToggle} from './card.js';
import {closeModal, openModal} from './modal.js';
import {clearValidation, enableValidation} from './validation.js';
import {addCard, config, deleteCard, getCards, getUser, updateUserAvatar, updateUserProfile} from './api';

const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const newCardPopup = document.querySelector('.popup_type_new-card');
const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const confirmDeleteButton = deleteCardPopup.querySelector('.popup__button');
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

let cardToDelete = null;

function resetPopupForm(formElement, validation) {
	clearValidation(formElement, validation);
	formElement.reset();
}

function updateSubmitButtonState(submitButton, isLoading) {
	submitButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

function handleProfileEditClick() {
	resetPopupForm(editProfileFormElement, validationConfig);
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;
	openModal(profileEditPopup);
}

function handleAddCardClick() {
	resetPopupForm(newCardFormElement, validationConfig);
	openModal(newCardPopup);
}

function handleAvatarClick() {
	resetPopupForm(updateAvatarFormElement, validationConfig);
	openModal(updateAvatarPopup);
}

function openCardImage(imageData) {
	elementImage.src = imageData.link;
	elementCaption.textContent = imageData.name;
	openModal(popupTypeImage);
}

function onDeletePopup(cardData, cardElement) {
	cardToDelete = {cardData, cardElement};
	openModal(deleteCardPopup);
}

function handleEditProfile(evt) {
	evt.preventDefault();
	const submitButton = evt.target.querySelector('.popup__button');
	updateSubmitButtonState(submitButton, true);
	updateUserProfile(nameInput.value, jobInput.value)
		.then((updatedUser) => {
			profileTitle.textContent = updatedUser.name;
			profileDescription.textContent = updatedUser.about;
			closeModal(profileEditPopup);
		})
		.catch(err => console.error('Ошибка при обновлении профиля:', err
		))
		.finally(() => {
			updateSubmitButtonState(submitButton, false);
		});
}

function handleNewCardSubmit(evt) {
	evt.preventDefault();
	const submitButton = evt.target.querySelector('.popup__button');
	updateSubmitButtonState(submitButton, true);

	const newCardData = {
		name: newCardFormElement['place-name'].value,
		link: newCardFormElement['link'].value
	};

	addCard(newCardData)
		.then(newCard => {
			placesList.prepend(createCard(newCard, onDeletePopup, handleLikeToggle, openCardImage));
			closeModal(newCardPopup);
		})
		.catch(err => console.error('Ошибка при добавлении карточки:', err
		))
		.finally(() => {
			updateSubmitButtonState(submitButton, false);
		});
}

function handleAvatarSubmit(evt) {
	evt.preventDefault();
	const submitButton = evt.target.querySelector('.popup__button');
	const avatarUrl = updateAvatarFormElement.avatar.value;
	updateSubmitButtonState(submitButton, true);
	updateUserAvatar(avatarUrl)
		.then(updatedUser => {
			profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
			closeModal(updateAvatarPopup);
		})
		.catch(err => console.error('Ошибка при обновлении аватара:', err
		))
		.finally(() => {
			updateSubmitButtonState(submitButton, false);
		});
}

function handleConfirmDelete() {
	if (!cardToDelete || !cardToDelete.cardData) {
		console.error('Ошибка: данных для удаления нет.'
		);
		return;
	}
	deleteCard(cardToDelete.cardData._id)
		.then(() => {
			cardToDelete.cardElement.remove();
			cardToDelete = null;
			closeModal(deleteCardPopup);
		})
		.catch(err => console.error('Ошибка при удалении карточки:', err
		));
}

Promise.all([getUser(), getCards()])
	.then(([user, cards]) => {
		const {name, about, avatar, _id} = user;
		config.currentUserId = _id;
		profileTitle.textContent = name;
		profileDescription.textContent = about;
		profileImage.style.backgroundImage = `url(${avatar})`;

		cards.forEach((card) => {
			placesList.append(createCard(card, onDeletePopup, handleLikeToggle, openCardImage));
		});

	})
	.catch((err) => {
		console.error(`Ошибка при загрузке данных: ${err}`);
	});

enableValidation(validationConfig);
profileEditButton.addEventListener('click', handleProfileEditClick);
profileAddButton.addEventListener('click', handleAddCardClick);
profileImage.addEventListener('click', handleAvatarClick);
confirmDeleteButton.addEventListener('click', handleConfirmDelete);
editProfileFormElement.addEventListener('submit', handleEditProfile);
newCardFormElement.addEventListener('submit', handleNewCardSubmit);
updateAvatarFormElement.addEventListener('submit', handleAvatarSubmit);

popups.forEach((popup) => {
	const closeButton = popup.querySelector('.popup__close');
	closeButton.addEventListener('click', () => {
		closeModal(popup);
	});
});
