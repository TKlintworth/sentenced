import { Socket } from 'socket.io';
import { Game } from '../models/Game';
import { User } from '../models/User';

export class GameController {
	public games: Game[] = [];

	public createGame(players: User[], maxRounds: number): Game
	{
		const game = new Game(players, maxRounds);
		this.games.push(game);
		return game;
	}

	public startGame(game: Game) {
		try 
		{
			
			// add game to game states
			//- POST /game/start
			//- { status, round, sentences }
			// - Client cannot start game until all user statuses are ready
			// - Server returns an initialized game object
		}
		catch (err) {
			// error handler
		}
	}
}