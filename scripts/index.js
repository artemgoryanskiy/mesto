// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function deleteCard(index) {
  initialCards.splice(index, 1);
}

function createCard(cardData, deleteHandler) {
  const template = document.querySelector('#card-template').content;

  const card = template.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__title').textContent = cardData.name;

  const cardDeleteButton = card.querySelector('.card__delete-button');

  cardDeleteButton.addEventListener('click', () => {
    deleteHandler();
    cardDeleteButton.parentElement.remove();
  })

  return card;
}

initialCards.map((card, index) => document.querySelector('.places__list').append(createCard(card, () => deleteCard(index))))



