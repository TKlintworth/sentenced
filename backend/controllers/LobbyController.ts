import { Socket } from "socket.io";
import { ILobby } from "../Interfaces/ILobby";
import { CreateLobbyRequest, JoinLobbyRequest } from "../models";
import { Lobby } from "../schemas/lobby";
import UserService from "../services/UserService";
import { io } from "../config/socket";
import * as HttpStatus from "http-status-codes";

export class LobbyController
{
    // init to []?
    private lobbies: ILobby[];

    // POST /lobbies
    public createLobby(req: CreateLobbyRequest)
    {
        const lobby = new Lobby();

        lobby.maxUsers = req.maxUsers;
        lobby.name = req.name;
        lobby.owner = req.owner;

        // lobby.parse(CreateLobbyRequest)
        // return lobby.parse(LobbyDto)
    }

    // POST /lobbies/join
    public joinLobby(req: JoinLobbyRequest, socket: Socket)
    {
        try
        {
            const lobby = this.lobbies.find(l => l.id === req.id);
            const user = UserService.findById(req.userId);
    
            // TODO: Replace errors with error along with appropriate code
            if (!user)
                throw new Error("User does not exist");

            if (!lobby)
                throw new Error('Lobby not found');
        
            if (lobby.password && lobby.password !== req.password) 
                throw new Error('Incorrect password');
        
            if (lobby.users.length >= lobby.maxUsers) 
                throw new Error('Lobby is full');
        
            if (lobby.users[req.userId] !== undefined)
                throw new Error('You are already in this lobby');
        
            socket.join(lobby.id);
            console.log(`User ${socket.id} joined lobby ${lobby.name}, ${lobby.id}`);

            // onlineUsers[socket.id].lobby = lobbyId;
            // onlineUsers[socket.id].lobbyName = lobbies[lobbyId].serverName;
            // io.emit('user-updated', onlineUsers[socket.id]);

            // Send a message to the user that they have successfully joined the lobby
            socket.to(lobby.id).emit('user-joined-lobby', user);
            socket.emit('lobby-joined', lobby.id);
            io.emit('lobby-updated', lobby.id);

            return HttpStatus.StatusCodes.ACCEPTED; // TODO: Does this correctly return to the client?
        }
        catch(err)
        {
            
        }
    }
}