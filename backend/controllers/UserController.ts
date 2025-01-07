// THIS CONTROLLER WILL NEED TO HAVE VERY GOOD VALIDATION TO AVOID BAD ACTORS, BECAUSE THEY WILL HAPPEN

import { CreateUserRequest, GetUserRequestParams, ListUsersResponse, UserDto } from "../models";
import { User } from "../schemas/User";
import UserService from "../services/UserService";
import * as HttpStatus from "http-status-codes";

export class UserController
{
    // /users
    public async createUser(req: CreateUserRequest)
    {
        const user = new User();
        
        user.name = req.name;
        // user.save(); // TODO: do this
    }

    // /users/:id
    public async getUser(params: GetUserRequestParams)
    {
        const user = UserService.findById(params.id);

        if (!user)
            return HttpStatus.StatusCodes.NOT_FOUND;

        return UserDto.parse(user);
    }

    // /users
    public async listUsers()
    {
        const users = UserService.listUsers();

        return ListUsersResponse.parse(users);
    }
}