// models/GameState.js
export class GameState {
    constructor(lobbyId) {
        this.lobbyId = lobbyId;
        this.players = [];
        this.currentRound = 0;
        this.maxRounds = 10;
        this.status = 'waiting';
        this.currentTurn = null;
        this.sentences = [];
        this.readyPlayers = new Set();
    }

    addPlayer(playerId) {
        if (!this.players.includes(playerId)) {
            this.players.push(playerId);
        }
    }

    removePlayer(playerId) {
        this.players = this.players.filter(id => id !== playerId);
        this.readyPlayers.delete(playerId);
        if (this.currentTurn === playerId) {
            this.nextTurn();
        }
    }

    startGame() {
        if (this.players.length < 2) {
            throw new Error('Not enough players to start the game');
        }
        this.status = 'playing';
        this.currentRound = 1;
        this.currentTurn = this.players[0];
        this.readyPlayers.clear();
    }

    endGame() {
        this.status = 'ended';
        this.currentTurn = null;
    }

    nextRound() {
        if (this.currentRound < this.maxRounds) {
            this.currentRound++;
            this.currentTurn = this.players[0];
            this.readyPlayers.clear();
        } else {
            this.endGame();
        }
    }

    nextTurn() {
        const currentIndex = this.players.indexOf(this.currentTurn);
        this.currentTurn = this.players[(currentIndex + 1) % this.players.length];
    }

    addSentence(sentence) {
        this.sentences.push(sentence);
    }

    playerReady(playerId) {
        this.readyPlayers.add(playerId);
    }

    allPlayersReady() {
        return this.readyPlayers.size === this.players.length;
    }

    getState() {
        return {
            lobbyId: this.lobbyId,
            players: this.players,
            currentRound: this.currentRound,
            maxRounds: this.maxRounds,
            status: this.status,
            currentTurn: this.currentTurn,
            sentences: this.sentences,
            readyPlayers: Array.from(this.readyPlayers)
        };
    }
}