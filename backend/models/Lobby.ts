import { z as Z } from "zod";
import { MessageDto } from "./messages";
import { UserDto } from "./users";

export enum LobbyStatus 
{
    Started = "started",
    Waiting = "waiting"
}

export const LobbyDto = Z.object({
    name: Z.string(),
    createdAt: Z.date(),
    id: Z.string(),
    users: Z.array(UserDto),
    maxUsers: Z.number().min(1).max(10), // make these env variables
    game: Z.string().optional(),
    status: Z.enum([LobbyStatus.Started, LobbyStatus.Waiting]),
    messages: Z.array(MessageDto).optional(),
    password: Z.string().optional(),
    owner: UserDto,
});

export const CreateLobbyRequest = Z.object({
    name: Z.string(),
    users: Z.array(UserDto),
    maxUsers: Z.number().min(1).max(10), // make these env variables
    password: Z.string().optional(),
    owner: Z.string()
});

export const JoinLobbyRequest = Z.object({
    id: Z.string(),
    userId: Z.string(),
    password: Z.string().optional()
});

export const ExitLobbyRequest = Z.object({
    id: Z.string(),
    userId: Z.string()
});

export const ListLobbiesResponse = Z.object({
    lobbies: Z.array(LobbyDto)
});

export type CreateLobbyRequest = Z.infer<typeof CreateLobbyRequest>;
export type JoinLobbyRequest = Z.infer<typeof JoinLobbyRequest>;
export type ExitLobbyRequest = Z.infer<typeof ExitLobbyRequest>;
export type ListLobbiesResponse = Z.infer<typeof ListLobbiesResponse>;