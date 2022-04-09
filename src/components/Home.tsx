import axios from "axios";
import "./Home.css";
import React, { FunctionComponent, useEffect } from "react";
import useGames, { GameInfo } from "../useGames";
import useProfile from "../useProfile";
// import { Link } from "react-router-dom";

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
    if (profile === null || games.length !== 0) return;
    getOwnedGames(profile.steam_id);
  }, [profile, games, setGames]);

  return (
    <div className="game-wrapper">
      {games.map(({ app_id, name, playtime }) => (
        <div className="game-container">
          <img
            className="game-card"
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${app_id}/library_600x900_2x.jpg`}
            alt={`${name} card`}
          />
          <div className="playtime-container">
            <div className="playtime">{`${(playtime / 60).toFixed(1)} 시간`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

interface GetOwnedGamesResponse {
  games: GameInfo[];
}
