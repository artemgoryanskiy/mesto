export function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
}

function hideModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
}

export function closeModal(modalElement) {
    const closeButton = modalElement.querySelector('.popup__close');

    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            hideModal(modalElement);
        }
    }

    function handleCloseBtnClick(event) {
        if (event.target === closeButton) {
            hideModal(modalElement);
        }
    }

    function handleClickOverlay(event) {
        if (event.target === event.currentTarget) {
            hideModal(modalElement);
        }
    }

    function handleSubmit(event) {
        if (event.type === 'submit') {
            hideModal(modalElement);
        }
    }

    if (modalElement) {
        document.addEventListener('keydown', handleEscapeKey);
        closeButton.addEventListener('click', handleCloseBtnClick);
        modalElement.addEventListener('click', handleClickOverlay);
        modalElement.addEventListener('submit', handleSubmit);
    }
}

