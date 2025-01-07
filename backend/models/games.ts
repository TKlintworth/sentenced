import { z as Z } from "zod";
import { UserDto } from "./users";

export const GameDto = Z.object({
    id: Z.string(),
    isGameInProgress: Z.boolean(),
    players: Z.array(Z.string()),
    scores: Z.map(Z.string(), Z.number()),
    currentRound: Z.number(),
    maxRounds: Z.number(),
    roundLength: Z.number(),
    sentences: Z.map(Z.string(), Z.string())
});

export const CreateGameRequest = Z.object({
    maxRounds: Z.number().min(2).max(99),
    roundLength: Z.number().min(5).max(240)
});

export const StartGameRequest = Z.object({
    lobby: Z.string()
});

export const EndGameRequest = Z.object({
    lobby: Z.string()
});

export type CreateGameRequest = Z.infer<typeof CreateGameRequest>;
export type StartGameRequest  = Z.infer<typeof StartGameRequest>;
export type EndGameRequest    = Z.infer<typeof EndGameRequest>;