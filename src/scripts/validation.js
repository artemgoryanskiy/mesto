function validateInput(inputElement, settings) {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;
    const urlRegex = /^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/;

    const customErrorMessage = inputElement.dataset.error;

    const validationRules = {
        'name': regex,
        'description': regex,
        'link': urlRegex,
        'place-name': regex,
    };

    if (validationRules[inputElement.id] && !validationRules[inputElement.id].test(inputElement.value)) {
        inputElement.setCustomValidity(customErrorMessage);
        console.log(inputElement.id);
        console.log(customErrorMessage);
        console.log(inputElement.value);
    } else {
        inputElement.setCustomValidity('');
    }

    showInputError(inputElement, settings);
}

function showInputError(inputElement, settings) {
    const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;

    if (inputElement.validationMessage) {
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.classList.add(settings.errorClass);
    } else {
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.classList.remove(settings.errorClass);
    }
}

function hideInputError(inputElement, settings) {
    const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
}

function toggleButtonState(inputList, buttonElement, settings) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);

    if (hasInvalidInput) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
}

function clearValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(inputElement, settings);
        inputElement.setCustomValidity('');
    });

    toggleButtonState(inputList, buttonElement, settings);
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
}

export {enableValidation, clearValidation};