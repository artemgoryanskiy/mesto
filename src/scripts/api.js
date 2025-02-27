export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'abcc240c-363b-4bdb-bb89-1350ab9a4d25'
    },
    currentUserId: null,
}

export function getUser(baseUrl = config.baseUrl, headers = config.headers) {
    return fetch(`${baseUrl}/users/me`, {headers})
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error("Ошибка:", err);
            throw err;
        });
}

export function updateUserProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .catch((err) => {
            console.error('Ошибка обновления профиля:', err);
            throw err;
        });
}

function isValidImageUrl(url) {
    return fetch(url, {method: 'HEAD'})
        .then((res) => {
            if (!res.ok) {
                console.log(`Ошибка проверки URL: статус ${res.status}`
                );
                return false;
            }
            const contentType = res.headers.get('content-type');
            return contentType && contentType.includes('image');
        })
        .catch((err) => {
            console.log(`Ошибка проверки URL: статус ${err}`);
            return false;
        });
}

export function updateUserAvatar(avatar) {
    return isValidImageUrl(avatar)
        .then((isImage) => {
            if (!isImage) {
                return Promise.reject(
                    'Ошибка: указанный URL недействителен или не является изображением.'
                );
            }
            return fetch(`${config.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: config.headers,
                body: JSON.stringify({
                    avatar: avatar,
                }),
            });
        })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
            return response.json();
        })
        .catch((err) => {
            console.error(`Ошибка при обновлении аватара: ${err}`);
            throw err;
        });
}

export function getCards(baseUrl = config.baseUrl, headers = config.headers) {
    return fetch(`${baseUrl}/cards`, {headers})
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .catch(err => {
            console.log(err)
            throw err;
        })
}

export function addCard(data) {
    console.log(data);
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link,
        }),
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(res.status);
            }
            return res.json();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(res.status);
            }
            return res.json();
        });
}

export function dislikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(res.status);
            }
            return res.json();
        });
}