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

export const UpdateUserRequest = Z.object({
    name: Z.string()
});

export const UserRequestParams = Z.object({
    id: Z.string()
});

export const ListUsersResponse = Z.object({
    users: Z.array(UserDto)
});

export type CreateUserRequest = Z.infer<typeof CreateUserRequest>;
export type UserRequestParams = Z.infer<typeof UserRequestParams>;
export type ListUsersResponse = Z.infer<typeof ListUsersResponse>;
export type UpdateUserRequest = Z.infer<typeof UpdateUserRequest>;