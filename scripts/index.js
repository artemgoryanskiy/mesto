// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function deleteCard(cardElement) {
  cardElement.remove();
}

function createCard(cardData) {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");

  card.querySelector(".card__image").src = cardData.link;
  card.querySelector(".card__image").alt = `Фотография места: ${cardData.name}`;
  card.querySelector(".card__title").textContent = cardData.name;
  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });

  return card;
}

initialCards.forEach((card) =>
  document.querySelector(".places__list").append(createCard(card))
);
