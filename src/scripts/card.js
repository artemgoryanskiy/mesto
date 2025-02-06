function deleteCard(cardElement) {
    cardElement.remove();
}

function likeCard(element) {
    element.classList.toggle('card__like-button_is-active');
}

function createCard(cardData, onDeleteCard, onLikeCard, onOpenCardImage) {
    const template = document.querySelector('#card-template').content;
    const card = template.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const image = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');


    image.src = cardData.link;
    image.alt = `Фотография места: ${cardData.name}`;
    title.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        onDeleteCard(card);
    });

    likeButton.addEventListener('click', () => {
        onLikeCard(likeButton);
    });

    image.addEventListener('click', () => {
        onOpenCardImage(cardData);
    });

    return card;
}

export {deleteCard, createCard, likeCard};