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
    password: Z.string().optional(),
    createdAt: Z.date(),
    status: UserStatusTypeEnum
});

export const CreateUserRequest = Z.object({
    name: Z.string()
});

export const GetUserRequestParams = Z.object({
    id: Z.string()
});

export const ListUsersResponse = Z.object({
    users: Z.array(UserDto)
});

export type CreateUserRequest = Z.infer<typeof CreateUserRequest>;
export type GetUserRequestParams = Z.infer<typeof GetUserRequestParams>;
export type ListUsersResponse = Z.infer<typeof ListUsersResponse>;