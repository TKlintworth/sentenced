import { nanoid } from "nanoid";
import { Message } from "./Message";
import { User } from "./User";
import { LobbyStatus } from "../models";

export class Lobby
{
    public name: string;
    public createdAt: Date;
    public id: string;
    public users: User[] = [];
    public maxUsers: number;
    public status: LobbyStatus = LobbyStatus.Waiting;
    public game?: string;
    public messages: Message[] = [];
    public password?: string;
    public owner: string; // eventually our DB will showing the object vs id, more on that later
   
    constructor()
    {
        this.id = nanoid();
        this.createdAt = new Date();
    }

    public addMessage(message: Message): void
    {
        this.messages.push(message);
    }
}