import { z as Z } from "zod";

export enum UserStatus 
{    
    Offline = "offline",
    Online = "online",
    ConnectedToLobby = "connected",
    Error = "error"
};

export const UserStatusTypeEnum = Z.nativeEnum(UserStatus);

export const UserDto = Z.object({
    id: Z.string(),
    name: Z.string(), 
    email: Z.string().optional(),
    password: Z.string(),
    createdAt: Z.date(),
    status: UserStatusTypeEnum
});