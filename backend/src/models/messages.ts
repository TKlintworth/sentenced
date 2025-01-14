import { z as Z } from "zod";
import { UserDto } from "./users.ts";

export const MessageDto = Z.object({
    user: UserDto, 
    message: Z.string(),
    createdAt: Z.date(),
});