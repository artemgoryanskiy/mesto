export const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
	headers: {
		'Content-Type': 'application/json',
		authorization: 'abcc240c-363b-4bdb-bb89-1350ab9a4d25'
	},
	currentUserId: null,
};

const API_PATHS = {
	users: '/users/me',
	userAvatar: '/users/me/avatar',
	cards: '/cards',
	cardLikes: (cardId) => `/cards/likes/${cardId}`,
	card: (cardId) => `/cards/${cardId}`,
};

function apiRequest(path, options = {}) {
	return fetch(`${config.baseUrl}${path}`, {
		headers: config.headers,
		...options,
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
			}
			return res.json();
		})
		.catch((err) => {
			console.error(`Ошибка API: ${err.message}`);
			throw err;
		});
}

export function getUser() {
	return apiRequest(API_PATHS.users);
}

export function updateUserProfile(name, about) {
	return apiRequest(API_PATHS.users, {
		method: 'PATCH',
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	});
}

function isValidImageUrl(url) {
	return fetch(url, {method: 'HEAD'})
		.then((res) => res.ok && res.headers.get('content-type')?.includes('image'))
		.catch(() => false);
}

export function updateUserAvatar(avatarUrl) {
	return isValidImageUrl(avatarUrl)
		.then((isValid) => {
			if (!isValid) {
				throw new Error('Указанный URL недействителен или не является изображением.');
			}
			return apiRequest(API_PATHS.userAvatar, {
				method: 'PATCH',
				body: JSON.stringify({
					avatar: avatarUrl,
				}),
			});
		});
}

export function getCards() {
	return apiRequest(API_PATHS.cards);
}

export function addCard(cardData) {
	return apiRequest(API_PATHS.cards, {
		method: 'POST',
		body: JSON.stringify({
			name: cardData.name,
			link: cardData.link,
		}),
	});
}

export function likeCard(cardId) {
	return apiRequest(API_PATHS.cardLikes(cardId), {
		method: 'PUT',
	});
}

export function dislikeCard(cardId) {
	return apiRequest(API_PATHS.cardLikes(cardId), {
		method: 'DELETE',
	});
}

export function deleteCard(cardId) {
	return apiRequest(API_PATHS.card(cardId), {
		method: 'DELETE',
	});
}