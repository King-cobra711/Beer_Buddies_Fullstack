import React from "react";

import WelcomeMessage from "../Components/headerComps/welcomeMessage";

import classes from "./headerWelcome.module.css";

const HeaderWelcome = () => {
  return (
    <div className={classes.MainContainer}>
      <div className={classes.Background}></div>
      <WelcomeMessage />
    </div>
  );
};

export default HeaderWelcome;
