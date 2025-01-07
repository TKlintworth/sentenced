import { UserStatus } from "../models";

export interface IUser
{
    name: string; 
    email?: string;
    password?: string;
    createdAt: Date;
    id: string;
    status: UserStatus;
}