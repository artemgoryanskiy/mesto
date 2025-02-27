import {config, dislikeCard, likeCard} from './api';

function deleteCard(cardElement) {
    cardElement.remove();
}

function toggleLike(cardData, likeButton, likeCount) {
    const cardId = cardData._id;
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeAction = isLiked ? dislikeCard(cardId) : likeCard(cardId);
    likeAction
        .then((updatedCard) => {
            cardData.likes = updatedCard.likes;
            likeCount.textContent = cardData.likes.length || '';
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(`Ошибка при обновлении лайка: ${err}`);
        });
}

function createCard(cardData, onDeleteCard, onLikeCard, onOpenCardImage) {
    const template = document.querySelector('#card-template').content;
    const card = template.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const likeCount = card.querySelector('.card__like-counter');
    const image = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');


    image.src = cardData.link;
    image.alt = `Фотография места: ${cardData.name}`;
    title.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length || '';

    if (cardData.likes.some(like => like._id === config.currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (cardData.owner._id !== config.currentUserId) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => {
            onDeleteCard(card);
        });
    }

    likeButton.addEventListener('click', () => {
        onLikeCard(cardData, likeButton, likeCount);
    });

    image.addEventListener('click', () => {
        onOpenCardImage(cardData);
    });

    return card;
}

export {deleteCard, createCard, toggleLike};