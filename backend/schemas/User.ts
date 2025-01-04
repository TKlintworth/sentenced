import { UserStatus } from "../models/users";

export class User
{
    public name: string; //required 
    public email?: string;
    public password: string;
    public createdAt: Date; //required
    public id: string; //required
    public status: UserStatus = UserStatus.Offline //required

    constructor(name: string, password: string, email?: string)
    {
        this.name = name;
        this.password = password;
        
        this.createdAt = new Date();
        
        if (email)
            this.email = email;
    }

    public setStatus()
    {

    }
}