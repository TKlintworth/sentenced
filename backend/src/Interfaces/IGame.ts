import { IUser } from "./IUser";

export interface IGame
{
    id: string;
    isGameInProgress: boolean;
    players: IUser[];
    scores: Map<string, number>; // perhaps one day can be an object
    currentRound: number;
    maxRounds: number;
    roundLength: number;
    sentences: Map<string, string>; // <userId, sentence>
}