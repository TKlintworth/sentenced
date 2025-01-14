import { nanoid } from "nanoid";
import { IUser } from "../Interfaces/IUser";

export class Game
{
    public id: string //guid,
    public isGameInProgress = false; // make an enum
    public players: IUser[] = [];
    public scores: Map<string, number> = new Map(); // perhaps one day can be an object
    public currentRound = 0;
    public maxRounds: number = 0;
    public roundLength: number = 0;
    public sentences: Map<string, string> = new Map(); // <connectionId, sentence>
    public createdAt: Date;

    constructor()
    {
        this.id = nanoid();
        this.createdAt = new Date();
    }
}