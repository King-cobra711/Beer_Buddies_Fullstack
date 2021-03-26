import { React, useEffect, useState } from "react";
import User from "../hoc/user";
import classes from "./header.module.css";

const Header = () => {
  return (
    <div className={classes.MainContainer}>
      <div className={classes.Background}></div>
    </div>
  );
};

export default Header;
