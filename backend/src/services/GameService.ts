import { IGame } from "../Interfaces/IGame";

const games: IGame[] = [];

export default class GameService 
{
    public static async listAllGames(): Promise<IGame[]>
    {
        return games;
    }

    public static async findById(id: string): Promise<IGame>
    {
        return games.find(l => l.id === id)!;
    }
}