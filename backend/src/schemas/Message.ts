import { User } from "./User";

export class Message
{
    public user: User; 
    public message: string;
    public createdAt: Date;

    constructor(user: User, message: string)
    {
        this.user = user;
        this.message = message;

        this.createdAt = new Date();
    }
}