import {config, dislikeCard, likeCard} from './api';

function handleLikeToggle(cardData, likeButton, likeCounter) {
    const cardId = cardData._id;
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeAction = isLiked ? dislikeCard(cardId) : likeCard(cardId);

    likeAction
        .then((updatedCard) => {
            cardData.likes = updatedCard.likes;
            likeCounter.textContent = cardData.likes.length || '';
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(`Ошибка при обновлении лайка: ${err}`);
        });
}

function initializeLikeButton(cardData, likeButton, likeCounter, onLikeCard) {
    if (cardData.likes.some((like) => like._id === config.currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', () => {
        onLikeCard(cardData, likeButton, likeCounter);
    });
}

function createCard(cardData, onDeleteCard, onLikeCard, onOpenCardImage) {
    const template = document.querySelector('#card-template').content;
    const card = template.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-counter');
    const image = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');


    image.src = cardData.link;
    image.alt = `Фотография места: ${cardData.name}`;
    title.textContent = cardData.name;
    likeCounter.textContent = cardData.likes.length || '';

    initializeLikeButton(cardData, likeButton, likeCounter, onLikeCard);

    if (cardData.owner._id !== config.currentUserId) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => {
            onDeleteCard(cardData, card);
        })
    }

    image.addEventListener('click', () => {
        onOpenCardImage(cardData);
    });

    return card;
}

export {createCard, handleLikeToggle};