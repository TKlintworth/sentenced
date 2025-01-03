import { Message } from "./Message";
import { User } from "./User";

export enum LobbyStatus 
{
    Started = "started",
    Waiting = "waiting"
}

export class Lobby
{
    public name: string;
    public createdAt: Date; 
    public id: string;
    public users: User[];
    public maxUsers: number;
    public status: LobbyStatus = LobbyStatus.Waiting;
    public messages: Message[] = [];
    public password?: string;
    public owner: User;
   
    constructor(name: string, users: User[], maxUsers: number, owner: User, password?: string)
    {
        this.name = name;
        this.users = users; // validation?
        this.owner = owner;

        if (password)
            this.password;
        
        if (maxUsers > 0)
            this.maxUsers = maxUsers;
        else
            throw new Error("You've forgotten to make max users more than 0!");
    }

    public addMessage(message: Message): void
    {
        this.messages.push(message);
    }
}