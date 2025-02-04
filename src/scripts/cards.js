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

function createCard(cardData, onDeleteCard, onLikeCard) {
    const template = document.querySelector("#card-template").content;
    const card = template.querySelector(".card").cloneNode(true);
    const deleteButton = card.querySelector(".card__delete-button");
    const likeButton = card.querySelector(".card__like-button");
    const image = card.querySelector(".card__image");
    const title = card.querySelector(".card__title");

    image.src = cardData.link;
    image.alt = `Фотография места: ${cardData.name}`;
    title.textContent = cardData.name;

    deleteButton.addEventListener("click", () => {
        onDeleteCard(card);
    });

    likeButton.addEventListener("click", () => {
        onLikeCard(likeButton);
    })

    return card;
}

export {deleteCard, createCard, likeCard};