// utils/validation.js
export function validateUsername(username) {
    if (typeof username !== 'string' || username.length < 3 || username.length > 20) {
        throw new Error('Username must be between 3 and 20 characters');
    }
}

export function validateLobbyId(lobbyId) {
    if (typeof lobbyId !== 'string' || lobbyId.length !== 11) {
        throw new Error('Invalid lobby ID');
    }
}

// Add more validation functions as needed