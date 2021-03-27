import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Aux from "../../../hoc/aux";
import classes from "./chooseDifficulty.module.css";
import * as Mui from "@material-ui/core";
import User from "../../../hoc/user";

const ChooseDifficulty = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [playerLevel, setPlayerLevel] = useState(0);
  let log = User()[2];
  let level = User()[0].User_Level;
  let data = User()[1];
  useEffect(() => {
    if (data) {
      if (typeof log !== "undefined") {
        if (log === true) {
          setLoggedIn(true);
          setPlayerLevel(level);
        } else if (log === false) {
          setLoggedIn(false);
        }
      }
    }
  }, [data]);

  return (
    <Aux>
      <div className={classes.Display}>
        <h2 style={{ color: "white" }}>Choose difficulty</h2>

        <Mui.Button
          href="/easy"
          variant="contained"
          color="default"
          size="medium"
        >
          TIPSY
        </Mui.Button>
        {loggedIn ? (
          <div name="me" style={{ width: "100%" }}>
            {playerLevel === 1 ? (
              <div style={{ borderTop: "white dotted" }}>
                <p>Beat Tipsy time to access Drunk</p>
                <Mui.Button
                  href="/medium"
                  variant="contained"
                  color="default"
                  size="medium"
                  disabled
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.726)",
                    color: "rgba(0, 0, 0, 0.500)",
                  }}
                  endIcon={<Mui.Icon style={{ marginLeft: 5 }}>lock</Mui.Icon>}
                >
                  DRUNK
                </Mui.Button>
                <Mui.Button
                  href="/hard"
                  variant="contained"
                  color="default"
                  size="medium"
                  disabled
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.726)",
                    color: "rgba(0, 0, 0, 0.500)",
                  }}
                  endIcon={<Mui.Icon style={{ marginLeft: 5 }}>lock</Mui.Icon>}
                >
                  HAMMERED
                </Mui.Button>
              </div>
            ) : null}
            {playerLevel === 2 ? (
              <div style={{ width: "100%" }}>
                <Mui.Button
                  href="/medium"
                  variant="contained"
                  color="default"
                  size="medium"
                >
                  DRUNK
                </Mui.Button>
                <p style={{ borderTop: "white dotted" }}>
                  Beat Drunk time to access Hammered
                </p>
                <Mui.Button
                  href="/hard"
                  variant="contained"
                  color="default"
                  size="medium"
                  disabled
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.726)",
                    color: "rgba(0, 0, 0, 0.500)",
                  }}
                  endIcon={<Mui.Icon style={{ marginLeft: 5 }}>lock</Mui.Icon>}
                >
                  HAMMERED
                </Mui.Button>
              </div>
            ) : null}
            {playerLevel === 3 ? (
              <div>
                <Mui.Button
                  href="/medium"
                  variant="contained"
                  color="default"
                  size="medium"
                >
                  DRUNK
                </Mui.Button>
                <Mui.Button
                  href="/hard"
                  variant="contained"
                  color="default"
                  size="medium"
                >
                  HAMMERED
                </Mui.Button>
              </div>
            ) : null}
          </div>
        ) : (
          <div style={{ borderTop: "white dotted" }}>
            <p>
              <a href="/login" style={{ color: "white" }}>
                Login
              </a>
              to access higher levels
            </p>
            <Mui.Button
              href="/medium"
              variant="contained"
              color="default"
              size="medium"
              disabled
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.726)",
                color: "rgba(0, 0, 0, 0.500)",
              }}
            >
              DRUNK
            </Mui.Button>

            <Mui.Button
              href="/hard"
              variant="contained"
              color="default"
              size="medium"
              disabled
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.726)",
                color: "rgba(0, 0, 0, 0.500)",
              }}
            >
              HAMMERED
            </Mui.Button>
          </div>
        )}

        <div style={{ borderTop: "white dotted", width: "100%" }}>
          <Mui.Button
            href="/"
            variant="contained"
            color="default"
            size="medium"
          >
            MAIN MENU
          </Mui.Button>
        </div>
      </div>
    </Aux>
  );
};

export default ChooseDifficulty;
