import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SteamAuth from "./components/SteamAuth";
import useProfile from "./useProfile";
import "./App.css";
import Detail from "./components/Detail";

const App = (): JSX.Element => {
  const [profile, setProfile] = useProfile();
  const isLoggedIn = profile !== null;

  if (isLoggedIn === false) {
    return <SteamAuth setProfile={setProfile} />;
  }

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:app_id" element={<Detail />} />
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
