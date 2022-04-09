import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import useProfile from "../useProfile";

const { REACT_APP_API_URL } = process.env;

const Home: FunctionComponent = () => {
  const [profile] = useProfile();
  const [games, setGames] = useGames();

  useEffect(() => {
    const getOwnedGames = async (steam_id: string) => {
      const response = await axios.get<GetOwnedGamesResponse>(
        `${REACT_APP_API_URL}/api/get_owned_games/${steam_id}`,
      );

      setGames(response.data.games);
    };
    if (profile === null) return;
    getOwnedGames(profile.steam_id);
  }, [profile, games]);

  return (
    <div className="game-wrapper">
      {games.map(({ app_id, name, playtime }) => (
        <div className="game-container">
          <h3>{name}</h3>
          <p>Play Time: {(playtime / 60).toFixed(1)}Hour</p>
          <img
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${app_id}/library_hero.jpg`}
            alt={`${name} hero`}
          />
          <img
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${app_id}/logo.png`}
            alt={`${name} logo`}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;

interface GameInfo {
  app_id: string;
  name: string;
  playtime: number;
}

interface GetOwnedGamesResponse {
  games: GameInfo[];
}
