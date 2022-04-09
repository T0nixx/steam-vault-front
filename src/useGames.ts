import { Dispatch, useState } from "react";

export interface GameInfo {
  app_id: string;
  name: string;
  playtime: number;
}

export default function useGames(): [GameInfo[], Dispatch<GameInfo[]>] {
  const validateGame = (game: any): game is GameInfo =>
    game !== null && "app_id" in game && "name" in game && "playtime" in game;

  const getGames = (): GameInfo[] => {
    const gameString = sessionStorage.getItem("games");
    if (gameString == null) return [];
    const parsed = JSON.parse(gameString);
    if (Array.isArray(parsed) === false) return [];
    return parsed.every(validateGame) ? parsed : [];
  };

  const [games, setGames] = useState(getGames());

  const saveGame = (gamesToSave: GameInfo[]) => {
    sessionStorage.setItem("game", JSON.stringify(gamesToSave));
    setGames(gamesToSave);
  };

  return [games, saveGame];
}
