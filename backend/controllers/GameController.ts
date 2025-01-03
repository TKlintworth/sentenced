import { Socket } from 'socket.io';
import { Game } from '../models/Game';

export class GameController {
	public createGame()
	{

	}

	public startGame() {
		try 
		{

			const game = new Game();
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