// Функция, проверяющая поле на валидность
function validateInput(inputElement, settings) {
	const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/; // Допустимые символы: латиница, кириллица, пробелы, дефисы

	// Получаем кастомное сообщение об ошибке из data-error атрибута
	const customErrorMessage = inputElement.dataset.error;

	// Если поле «Имя» или «Название» имеет недопустимые символы
	if ((inputElement.id === 'name' || inputElement.id === 'description') && !regex.test(inputElement.value)) {
		inputElement.setCustomValidity(customErrorMessage); // Устанавливаем кастомное сообщение
	} else {
		inputElement.setCustomValidity(''); // Сбрасываем сообщение, если данные валидны
	}

	// Отображаем ошибки в интерфейсе
	showInputError(inputElement, settings);
}

// Функция для отображения ошибок
function showInputError(inputElement, settings) {
	const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`); // Находим span ошибки
	errorElement.textContent = inputElement.validationMessage; // Заполняем текст ошибки

	if (inputElement.validationMessage) {
		inputElement.classList.add(settings.inputErrorClass); // Добавляем класс ошибки для поля
		errorElement.classList.add(settings.errorClass); // Добавляем класс ошибки для текста
	} else {
		inputElement.classList.remove(settings.inputErrorClass); // Убираем класс ошибки у поля
		errorElement.classList.remove(settings.errorClass); // Убираем класс ошибки у текста
	}
}

// Функция для скрытия ошибок
function hideInputError(inputElement, settings) {
	const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`); // Находим span ошибки
	errorElement.textContent = ''; // Сбрасываем текст ошибки
	inputElement.classList.remove(settings.inputErrorClass); // Убираем класс ошибки на поле
	errorElement.classList.remove(settings.errorClass); // Убираем класс ошибки у текста
}

// Функция для обновления состояния кнопки "Сохранить"
function toggleButtonState(inputList, buttonElement, settings) {
	const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid); // Проверяем, есть ли невалидные поля

	if (hasInvalidInput) {
		buttonElement.classList.add(settings.inactiveButtonClass); // Делаем кнопку неактивной
		buttonElement.disabled = true;
	} else {
		buttonElement.classList.remove(settings.inactiveButtonClass); // Активируем кнопку
		buttonElement.disabled = false;
	}
}

// Функция для установки слушателей на поля ввода
function setEventListeners(formElement, settings) {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); // Все input в форме
	const buttonElement = formElement.querySelector(settings.submitButtonSelector); // Кнопка отправки

	// Первичное переключение состояния кнопки
	toggleButtonState(inputList, buttonElement, settings);

	inputList.forEach((inputElement) => {
		// Отслеживаем ввод в поле
		inputElement.addEventListener('input', () => {
			validateInput(inputElement, settings); // Проверяем валидность поля
			toggleButtonState(inputList, buttonElement, settings); // Обновляем состояние кнопки
		});
	});
}

// Функция для сброса всех ошибок на форме
function clearValidation(formElement, settings) {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); // Все input в форме
	const buttonElement = formElement.querySelector(settings.submitButtonSelector); // Кнопка отправки

	inputList.forEach((inputElement) => {
		hideInputError(inputElement, settings); // Скрываем ошибки
		inputElement.setCustomValidity(''); // Сбрасываем кастомные ошибки
	});

	toggleButtonState(inputList, buttonElement, settings); // Обновляем состояние кнопки
}

// Функция для подключения валидации форм
function enableValidation(settings) {
	const formList = Array.from(document.querySelectorAll(settings.formSelector)); // Все формы на странице

	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault(); // Отменяем стандартное поведение отправки формы
		});

		// Устанавливаем обработчики событий на каждую форму
		setEventListeners(formElement, settings);
	});
}

// Экспортируем функции
export {enableValidation, clearValidation};