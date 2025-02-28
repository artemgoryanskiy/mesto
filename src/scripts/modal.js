function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    modalElement.classList.remove('popup_is-animated');
    document.addEventListener('keydown', handleEscapeKey);
    modalElement.addEventListener('click', handleClickOverlay);
}

function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    modalElement.classList.add('popup_is-animated');
    document.removeEventListener('keydown', handleEscapeKey);
    modalElement.removeEventListener('click', handleClickOverlay);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function handleClickOverlay(event) {
    if (event.target === event.currentTarget) {
        closeModal(event.target);
    }
}

export {openModal, closeModal};
