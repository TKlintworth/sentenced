import { ILobby } from "../Interfaces/ILobby";
import { CreateLobbyRequest } from "../models";
import { Lobby } from "../schemas/lobby";

export class LobbyController
{
    // init to []?
    private lobbies: ILobby[];

    public createLobby(req: CreateLobbyRequest)
    {
        const lobby = new Lobby();

        lobby.maxUsers = req.maxUsers;
        lobby.name = req.name;
        lobby.owner = req.owner;
    }

    public joinLobby()
    {
        try
        {
            const lobby = lobbies[lobbyId];
    
            if(!lobby){
                throw new Error('Lobby not found');
            }
        
            if (lobby.password && lobby.password !== password) {
                throw new Error('Incorrect password');
            }
        
            if (lobby.userCount >= lobby.maxUsers) {
                throw new Error('Lobby is full');
            }
        
            if (onlineUsers[socket.id].lobby === lobbyId) {
                throw new Error('You are already in this lobby');
            }
        
            socket.join(lobbyId);
            lobbies[lobbyId].userCount++;
            console.log(`User ${socket.id} joined lobby ${lobbyId}`);
            onlineUsers[socket.id].lobby = lobbyId;
            onlineUsers[socket.id].lobbyName = lobbies[lobbyId].serverName;
            io.emit('user-updated', onlineUsers[socket.id]);
            socket.to(lobbyId).emit('user-joined-lobby', onlineUsers[socket.id]);
            // Send a message to the user that they have successfully joined the lobby
            socket.emit('lobby-joined', lobbyId);
            io.emit('lobby-updated', lobbies[lobbyId]);
        }
        catch(err)
        {
            
        }
    }
}