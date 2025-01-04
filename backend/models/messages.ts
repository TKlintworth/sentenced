import { z as Z } from "zod";

export const MessageDto = Z.object({
    user: UserDto, 
    message: Z.string(),
    createdAt: Z.date(),
});