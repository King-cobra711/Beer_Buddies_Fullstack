import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import React, { useState, useEffect } from "react";
import * as Mui from "@material-ui/core";

import MainMenu from "./Components/bodyComps/mainMenu/mainMenu";
import HeaderWelcome from "./Containers/headerWelcome";
import Header from "./Containers/header";
import Easy from "./Components/bodyComps/Game/Easy/gameEasy";
import Medium from "./Components/bodyComps/Game/Medium/gameMedium";
import Hard from "./Components/bodyComps/Game/Hard/gameHard";
import ChooseDifficulty from "./Components/bodyComps/chooseDifficulty/chooseDifficulty";
import Login from "./Components/bodyComps/loginRegister/login";
import Register from "./Components/bodyComps/register/register";
import Leaderboards from "./Components/bodyComps/leaderboards/leaderboard";
import UserCard from "./Components/bodyComps/userCard/userCard";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      setLoaded(false);
      const request = await fetch("http://localhost:3001/login", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(),
      })
        .catch((error) => console.log(error))
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            res.json().then((data) => {
              console.log(data.loggedIn);
              setLoginStatus(data.loggedIn);
              console.log(data.userDetails);
              setLoaded(true);
            });
          } else if (res.status === 401) {
            res.json().then((data) => {
              console.log(data);
              setLoginStatus(data.loggedIn);
              console.log(loginStatus);
              setLoaded(true);
            });
          } else {
            res.json().then((data) => {
              console.log(data);
              setLoaded(true);
            });
          }
        })
        .catch((error) => console.log(error));
      return request;
    }
    fetchAPI();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/"
          render={() => {
            if (loginStatus) {
              return <HeaderWelcome />;
            } else {
              return <Header />;
            }
          }}
        ></Route>

        <Route path="/" exact render={() => <MainMenu />}></Route>

        <Route path="/difficulty" render={() => <ChooseDifficulty />}></Route>

        <Route path="/easy" render={() => <Easy />}></Route>

        <Route path="/medium" render={() => <Medium />}></Route>

        <Route path="/hard" render={() => <Hard />}></Route>

        <Route path="/login" render={() => <Login />}></Route>

        <Route path="/register" render={() => <Register />}></Route>

        <Route path="/leaderboards" render={() => <Leaderboards />}></Route>

        {loaded ? (
          <Route
            path="/usercard"
            render={() => {
              if (loginStatus === true) {
                return <UserCard />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          ></Route>
        ) : (
          <Mui.LinearProgress
            style={{
              colorPrimary: "rgb(255, 255, 24)",
              backgroundColor: "black",
              margin: "auto",
              marginTop: "60%",
              width: "80%",
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
