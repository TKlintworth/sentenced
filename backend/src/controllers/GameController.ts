import { LobbyStatus } from "../models";
import { CreateGameRequest, EndGameRequest, StartGameRequest } from "../models/games";
import { Game } from "../schemas/Game";
import LobbyService from "../services/LobbyService.ts";
import GameService from "../services/GameService.ts";
import * as HttpStatusCodes from "http-status-codes";

export class GameController
{
    public async createGame(req: CreateGameRequest)
    {
        const game = new Game();

        game.maxRounds = req.maxRounds;
        game.roundLength = req.roundLength;

        // game.save() // TODO: Do this
    }

    public async startGame(req: StartGameRequest)
    {
        const lobby = await LobbyService.findById(req.id);

        if (lobby)
            return HttpStatusCodes.StatusCodes.NOT_FOUND;

        const game = await GameService.findById(req.id);
        
        if (game)
            return HttpStatusCodes.StatusCodes.NOT_FOUND;

        lobby.game = game.id;
        lobby.status = LobbyStatus.Started;
    }

    public async endGame(req: EndGameRequest)
    {
        const lobby = await LobbyService.findById(req.id);

        if (lobby)
            return HttpStatusCodes.StatusCodes.NOT_FOUND;

        lobby.status = LobbyStatus.Waiting;
    }

    public async endRound()
    {
        // TODO: do
    }
}