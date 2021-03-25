import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Aux from "../../../hoc/aux";
import * as Mui from "@material-ui/core";
import classes from "./mainMenu.module.css";
import User from "../../../hoc/user";

const MainMenu = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  let log = User()[2];
  useEffect(() => {
    if (typeof log !== "undefined") {
      if (log === true) {
        setLoggedIn(true);
      } else if (log === false) {
        setLoggedIn(false);
      }
    }
  }, [log]);

  return (
    <Aux>
      <div className={classes.Display}>
        <Mui.Button
          variant="contained"
          color="default"
          size="medium"
          component={Link}
          to="/difficulty"
          endIcon={
            <Mui.Icon style={{ marginLeft: 5 }}>play_circle_outline</Mui.Icon>
          }
        >
          PLAY
        </Mui.Button>

        {loggedIn ? null : (
          <Mui.Button
            href="/login"
            variant="contained"
            color="default"
            size="medium"
          >
            LOGIN / Register
          </Mui.Button>
        )}

        <Mui.Button
          href="/leaderboards"
          variant="contained"
          color="default"
          size="medium"
        >
          LEADERBOARDS
        </Mui.Button>
        {loggedIn ? (
          <Mui.Button variant="contained" color="default" size="medium">
            FIND FRIENDS
          </Mui.Button>
        ) : (
          <Mui.Button
            variant="contained"
            color="default"
            size="medium"
            disabled
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.726)",
              color: "rgba(0, 0, 0, 0.500)",
            }}
          >
            Login to view
          </Mui.Button>
        )}
      </div>
    </Aux>
  );
};

export default MainMenu;
