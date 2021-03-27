import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./timer.module.css";
import * as Mui from "@material-ui/core";
import initialiseDeck from "../Deck/deck";

export default function Timer({
  setGameOver,
  setScore,
  setSolved,
  setDisabled,
  setEndGame,
  setFlipped,
  setCards,
  started,
  isStarted,
}) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function reset() {
    setCards([]);
    setCards(initialiseDeck());
    setSeconds(0);
    setIsActive(false);
    // begin(true)
    isStarted(false);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setEndGame(1);
    setGameOver(false);
  }

  useEffect(() => {
    let interval = null;
    if (started) {
      setIsActive(true);
    }
    if (!started) {
      setIsActive(false);
    }
    if (isActive) {
      // begin(false);
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      setScore(seconds + 1);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, started, setScore]);

  return (
    <div className={classes.timerContainer}>
      {/* <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button> */}
      <Mui.Button
        variant="contained"
        color="default"
        size="medium"
        onClick={reset}
      >
        RESET
      </Mui.Button>
      <Mui.Icon style={{ marginLeft: "15%" }}>timer</Mui.Icon>
      <div className={classes.timer} style={{ marginLeft: "25%" }}>
        {seconds}s
      </div>
    </div>
  );
}
Timer.propTypes = {
  started: PropTypes.bool.isRequired,
};
