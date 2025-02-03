// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import {initialCards} from './cards.js';
import '../pages/index.css'

function deleteCard(cardElement) {
  cardElement.remove();
}

function createCard(cardData, onDeleteCard) {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");

  image.src = cardData.link;
  image.alt = `Фотография места: ${cardData.name}`;
  title.textContent = cardData.name;
  
  deleteButton.addEventListener("click", () => {
    onDeleteCard(card);
  });

  return card;
}

initialCards.forEach((card) =>
  document.querySelector(".places__list").append(createCard(card, deleteCard))
);
