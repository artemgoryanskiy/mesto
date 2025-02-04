import {closeModal, openModal} from "./modal.js";

export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function deleteCard(cardElement) {
    cardElement.remove();
}

function likeCard(element) {
    element.classList.toggle("card__like-button_is-active");
}

function openCardImage(element) {
    const elementImage = document.querySelector(".popup__image");
    const elementCaption = document.querySelector(".popup__caption");
    elementImage.src = document.querySelector(".card__image").src;
    elementCaption.textContent = document.querySelector(".card__title").textContent;
    openModal(element);
    closeModal(element)
}

function createCard(cardData, onDeleteCard, onLikeCard, onOpenCardImage) {
    const template = document.querySelector("#card-template").content;
    const card = template.querySelector(".card").cloneNode(true);
    const deleteButton = card.querySelector(".card__delete-button");
    const likeButton = card.querySelector(".card__like-button");
    const image = card.querySelector(".card__image");
    const title = card.querySelector(".card__title");
    const popupTypeImage = document.querySelector(".popup_type_image");

    image.src = cardData.link;
    image.alt = `Фотография места: ${cardData.name}`;
    title.textContent = cardData.name;

    deleteButton.addEventListener("click", () => {
        onDeleteCard(card);
    });

    likeButton.addEventListener("click", () => {
        onLikeCard(likeButton);
    })

    image.addEventListener("click", () => {
        onOpenCardImage(popupTypeImage)
    })

    return card;
}

export {deleteCard, createCard, likeCard, openCardImage};