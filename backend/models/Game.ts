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
    public sentences: Map<string, string>; // <connectionId, sentence>

    constructor(players: User[], maxRounds: number)
    {
        this.id = nanoid();
        this.players = players; // validation?

        if (maxRounds > 0)
            this.maxRounds = maxRounds;
        else
        {
            // throw some kind of error?
        }
    }

    public setIsGameInProgress(status: boolean)
    {
        this.isGameInProgress = status;
    }
}