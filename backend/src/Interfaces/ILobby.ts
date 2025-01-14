import { Message } from "../src/schemas/Message";
import { User } from "../src/schemas/User";
import { LobbyStatus } from "../models";

export interface ILobby
{
    name: string;
    createdAt: Date; 
    id: string;
    users: User[];
    maxUsers: number;
    status: LobbyStatus;
    game?: string;
    messages: Message[];
    password?: string;
    owner: User;
}