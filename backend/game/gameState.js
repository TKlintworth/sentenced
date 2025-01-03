// Store game state 

import { writable } from 'svelte/store';

export const gameState = writable({
    game: {
        id: 0,
        name: 'Game',
        description: 'Game description',
        status: 'waiting', // make an enum
        players: [],
        maxPlayers: 2,
        minPlayers: 2,
        currentPlayer: 0,
        winner: null
    },
    players: [],
    currentPlayer: 0,
    winner: null
});