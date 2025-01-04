import { Message } from "../schemas/Message";
import { User } from "../schemas/User";
import { LobbyStatus } from "../models";

export interface ILobby
{
    name: string;
    createdAt: Date; 
    id: string;
    users: User[];
    maxUsers: number;
    status: LobbyStatus;
    messages: Message[];
    password?: string;
    owner: User;
}