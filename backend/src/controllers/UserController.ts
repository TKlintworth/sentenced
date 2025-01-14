// THIS CONTROLLER WILL NEED TO HAVE VERY GOOD VALIDATION TO AVOID BAD ACTORS, BECAUSE THEY WILL HAPPEN

import { CreateUserRequest, UpdateUserRequest, UserRequestParams, ListUsersResponse, UserDto } from "../models";
import { User } from "../schemas/User.ts";
import UserService from "../services/UserService.ts";
import * as HttpStatus from "http-status-codes";

export default class UserController
{
    // /users
    static async createUser(req: CreateUserRequest)
    {
        const user = new User();
        
        user.name = req.name;
        // user.save(); // TODO: do this
    }

    static async updateUser(params: UserRequestParams, req: UpdateUserRequest)
    {
        const user = await UserService.findById(params.id);

        // user.name = req.name;
        // user.save();
    }

    // /users/:id
    static async getUser(params: UserRequestParams)
    {
        const user = UserService.findById(params.id);

        if (!user)
            return HttpStatus.StatusCodes.NOT_FOUND;

        return UserDto.parse(user);
    }

    // /users
    static async listUsers()
    {
        const users = UserService.listUsers();

        return ListUsersResponse.parse(users);
    }
}