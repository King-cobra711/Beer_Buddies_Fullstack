import { React, useEffect, useState } from "react";
import User from "../hoc/user";
import * as Mui from "@material-ui/core";

import WelcomeMessage from "../Components/headerComps/welcomeMessage";

import classes from "./headerWelcome.module.css";
import { useHistory } from "react-router-dom";

const HeaderWelcome = () => {
  const [color, setColor] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [signUp, setSignUp] = useState(false);

  let history = useHistory();

  let data = User()[1];
  let userTheme = User()[0].User_Theme;
  let In = User()[2];

  const home = () => {
    history.push("/");
  };

  useEffect(() => {
    setLoaded(false);
    if (In === true) {
      if (typeof userTheme !== "undefined") {
        setLoaded(true);
        setColor(userTheme);
      }
      setSignUp(true);
    } else if (In === false) {
      setSignUp(false);
      setLoaded(true);
    }
  }, [In]);
  return (
    <div>
      {loaded ? (
        <div className={classes.MainContainer}>
          <div
            onClick={() => home()}
            className={classes.Background}
            style={{ borderColor: `${color}` }}
          ></div>
          {signUp ? <WelcomeMessage /> : null}
        </div>
      ) : (
        <Mui.CircularProgress
          color="black"
          // style={{ position: "relative", left: "150%" }}
        />
      )}
    </div>
  );
};

export default HeaderWelcome;
