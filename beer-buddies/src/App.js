import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import React, { useState, useEffect } from "react";
import * as Mui from "@material-ui/core";

import MainMenu from "./Components/bodyComps/mainMenu/mainMenu";
import HeaderWelcome from "./Containers/headerWelcome";
import Easy from "./Components/bodyComps/Game/Easy/gameEasy";
import Medium from "./Components/bodyComps/Game/Medium/gameMedium";
import Hard from "./Components/bodyComps/Game/Hard/gameHard";
import ChooseDifficulty from "./Components/bodyComps/chooseDifficulty/chooseDifficulty";
import Login from "./Components/bodyComps/loginRegister/login";
import Register from "./Components/bodyComps/register/register";
import Leaderboards from "./Components/bodyComps/leaderboards/leaderboard";
import UserCard from "./Components/bodyComps/userCard/userCard";
import AdminMenu from "./Admin/adminMenu";
import AdminAddUserType from "./Admin/adminAddUserType";
import AdminEditUser from "./Admin/adminEditUser";
import Help from "./Help/help";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userInfo, setUserInfo] = useState([{ UserType_ID: 0 }]);
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
              setLoginStatus(data.loggedIn);
              if (data.User) {
                setUserInfo(data.User);
              }
              setLoaded(true);
            });
          } else {
            res.json().then((data) => {
              console.log("Error");
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
        <Route path="/" render={() => <HeaderWelcome />}></Route>

        <Route path="/" exact render={() => <MainMenu />}></Route>
        {loaded ? (
          <Route
            path="/Admin"
            exact
            render={() => {
              if (userInfo.UserType_ID === 1) {
                return <AdminMenu />;
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
        {loaded ? (
          <Route
            path="/Admin/UserTypes"
            exact
            render={() => {
              if (loginStatus === true) {
                if (userInfo.UserType_ID === 1) {
                  return <AdminAddUserType />;
                } else {
                  return <Redirect to="/login" />;
                }
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
        {loaded ? (
          <Route
            path="/Admin/EditUser/:name"
            exact
            render={() => {
              if (loginStatus === true) {
                if (userInfo.UserType_ID === 1) {
                  return <AdminEditUser />;
                } else {
                  return <Redirect to="/login" />;
                }
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
        <Route path="/difficulty" render={() => <ChooseDifficulty />}></Route>
        <Route path="/easy" render={() => <Easy />}></Route>
        <Route path="/help" render={() => <Help />}></Route>
        {loaded ? (
          <Route
            path="/register"
            render={() => {
              if (loginStatus === true) {
                return <Redirect to="/usercard" />;
              } else {
                return <Register />;
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
        {loaded ? (
          <Route
            path="/login"
            render={() => {
              if (loginStatus === true) {
                return <Redirect to="/usercard" />;
              } else {
                return <Login />;
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
        <Route path="/leaderboards" render={() => <Leaderboards />}></Route>
        {loaded ? (
          <Route
            path="/medium"
            render={() => {
              if (loginStatus === true) {
                return <Medium />;
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
        {loaded ? (
          <Route
            path="/hard"
            render={() => {
              if (loginStatus === true) {
                return <Hard />;
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
