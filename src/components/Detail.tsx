import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import useGames from "../useGames";
import "./Detail.css";

const Detail: FunctionComponent = () => {
  const params = useParams();
  const [games] = useGames();
  if ("app_id" in params === false) return <div />;

  const target_game = games.find(
    ({ app_id }) => parseInt(params.app_id!.substring(1), 10) === app_id,
  );
  // 없는 게임을 타고 들어오려고 하면 App단에서 다시 홈으로 redirect 시킬 것으로 보임

  if (target_game === undefined) {
    return <div />;
  }
  const { app_id, name, playtime } = target_game;

  return (
    <div className="detail-wrapper">
      <div className="game-images-container">
        <img
          className="hero"
          src={`https://steamcdn-a.akamaihd.net/steam/apps/${app_id}/library_hero.jpg`}
          alt={`${name} hero`}
        />
        {/* <div className="logo-container"> */}
        <img
          className="logo"
          src={`https://steamcdn-a.akamaihd.net/steam/apps/${app_id}/logo.png`}
          alt={`${name} logo`}
        />
        {/* </div> */}
      </div>
      <div className="contents-container">
        <h2>{name}</h2>
        <h4>{playtime}</h4>
      </div>
    </div>
  );
};

export default Detail;
