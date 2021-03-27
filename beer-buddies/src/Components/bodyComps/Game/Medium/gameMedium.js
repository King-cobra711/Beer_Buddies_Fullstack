import React, { useState, useEffect } from "react";

import initialiseDeck from "./Deck/deck";
import Board from "./Board/board";
import User from "../../../../hoc/user";

import * as Mui from "@material-ui/core";

import classes from "./gameMedium.module.css";
import Timer from "./Timer/timer";

const Medium = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDemension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [started, setStarted] = useState(false);
  const [endGame, setEndGame] = useState(1);
  const [shuffle, setShuffle] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    resizedBoard();
    setCards(initialiseDeck());
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const resizedListener = window.addEventListener("resize", resizedBoard);

    return () => window.removeEventListener("resize", resizedListener);
  });

  const handleClick = (id) => {
    setDisabled(true);
    setStarted(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        setEndGame(endGame + 1);
        resetCards();
      } else {
        setTimeout(resetCards, 2000);
      }
      if (endGame === 4) {
        setGameOver(true);
        setStarted(false);
        setShuffle(false);
        handleOpen();
      }
    }
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  const resizedBoard = () => {
    setDemension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };

  let PlayerID = User()[0].User_ID;

  useEffect(() => {
    if (gameOver) {
      if (typeof PlayerID !== "undefined") {
        async function fetchAPI() {
          const request = await fetch(
            "http://localhost:3001/UpdateMediumScore",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ id: PlayerID, score: score }),
            }
          ).then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                console.log(data);
                setMessage(data.message);
              });
            } else {
              console.log("ERROR");
            }
          });
          return request;
        }
        fetchAPI();
      }
    }
  }, [gameOver]);

  return (
    <div>
      <Mui.Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Mui.Fade in={open}>
          <div className={classes.modalMessage}>
            <Mui.Grid container spacing={0}>
              <Mui.Grid item xs={12}>
                <h1>
                  {message ? `Your score was ${score} . ${message}!` : null}
                </h1>
              </Mui.Grid>
            </Mui.Grid>
          </div>
        </Mui.Fade>
      </Mui.Modal>
      <ul className={classes.Display}>
        <li>
          <Mui.Button
            href="/"
            variant="contained"
            color="default"
            size="medium"
          >
            HOME
          </Mui.Button>
        </li>
        <li>
          <Mui.Button
            href="/difficulty"
            variant="contained"
            color="default"
            size="medium"
          >
            LEVEL
          </Mui.Button>
        </li>
        <li>
          <Timer
            setEndGame={setEndGame}
            setDisabled={setDisabled}
            setSolved={setSolved}
            setFlipped={setFlipped}
            setCards={setCards}
            started={started}
            isStarted={setStarted}
            setScore={setScore}
            setGameOver={setGameOver}
          />
        </li>
      </ul>
      <Board
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
    </div>
  );
};
export default Medium;
