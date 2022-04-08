import React, { useEffect, FunctionComponent, Dispatch } from "react";
import { SteamUserProfile } from "../useProfile";
// import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const SteamAuth: FunctionComponent<{
  setProfile: Dispatch<SteamUserProfile>;
}> = ({ setProfile }): JSX.Element => {
  const handleMessage = async ({ origin, data }: MessageEvent<SteamUserProfile>) => {
    if (origin !== REACT_APP_API_URL) {
      return;
    }

    setProfile(data);
  };

  useEffect(() => {
    if (!window.onmessage) {
      window.onmessage = handleMessage;
    }

    return window.removeEventListener("message", handleMessage);
  });

  const handleClick = () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    window.open(
      `${REACT_APP_API_URL}/api/login/`,
      window.origin,
      `width=${currentWidth * 0.5},
      height=${currentHeight * 0.8},
      left=${currentWidth * 0.25},
      top=${currentHeight * 0.1}`,
    );
  };

  return (
    <div className="steam-auth-wrapper">
      <button type="button" onClick={handleClick}>
        <img src="/images/sits_large_border.png" alt="sign in through steam" />
      </button>
      <p>{REACT_APP_API_URL}</p>
    </div>
  );
};
export default SteamAuth;
