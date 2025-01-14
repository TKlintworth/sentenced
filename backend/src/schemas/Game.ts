import { nanoid } from "nanoid";
import { User } from "./User";

export class Game
{
    public id: string //guid,
    public isGameInProgress = false; // make an enum
    public players: User[];
    public scores: Map<string, number>; // perhaps one day can be an object
    public currentRound = 0;
    public maxRounds: number;
    public roundLength: number;
    public sentences: Map<string, string>; // <connectionId, sentence>
    public createdAt: Date;

    constructor()
    {
        this.id = nanoid();
        this.createdAt = new Date();
        this.roundLength = 60;
    }
}