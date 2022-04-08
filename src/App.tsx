import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SteamAuth from "./components/SteamAuth";
import useProfile from "./useProfile";

const App = (): JSX.Element => {
  const { profile, setProfile } = useProfile();
  const isLoggedIn = profile !== null;

  if (isLoggedIn === false) {
    return <SteamAuth setProfile={setProfile} />;
  }

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<div>{JSON.stringify(profile)}</div>} />
          <Route
            path="*"
            element={
              <div className="wrapper">
                <p>There&apos;s nothing here</p>
                <p>Go back to home.</p>
                <Navigate to="/" />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
