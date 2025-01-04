import { z as Z } from "zod";

export enum UserStatus 
{    
    Unauthenticated = "unauthenticated",
    Pending = "pending",
    Authenticated = "authenticated",
    ConnectedToLobby = "connected",
    Error = "error"
};

export const UserStatusTypeEnum = Z.nativeEnum(UserStatus);

export const UserDto = Z.object({
    name: Z.string(), 
    email: Z.string().optional(),
    password: Z.string(),
    createdAt: Z.date(),
    id: Z.string(),
    status: UserStatusTypeEnum
});