const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'abcc240c-363b-4bdb-bb89-1350ab9a4d25'
    }
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
                throw new Error(`Ошибка: ${res.status}`);
            }
            return res.json(); // Возвращаем данные ответа от сервера, если запрос успешен
        })
        .catch((err) => {
            console.error('Ошибка обновления профиля:', err);
            throw err; // Генерируем ошибку для обработки наверху
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