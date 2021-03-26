import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./userCard.module.css";
import * as Mui from "@material-ui/core";
import { useHistory } from "react-router-dom";

import User from "../../../hoc/user";

const UserCard = () => {
  let history = useHistory();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [onOff, setSwitch] = useState(true);
  const handleSwitch = (onOff) => {
    setSwitch(!onOff);
  };

  const [userScores, setUserScores] = useState({});
  const [loaded, setLoaded] = useState(false);
  let PlayerID = User()[0].User_ID;

  const home = () => {
    history.push("/");
  };

  useEffect(() => {
    if (typeof PlayerID !== "undefined") {
      async function fetchAPI() {
        setLoaded(false);
        const request = await fetch("http://localhost:3001/userScores", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id: PlayerID }),
        }).then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              console.log(data.UserScores[0]);
              setUserScores(data.UserScores);
              setLoaded(true);
            });
          } else {
            console.log("ERROR");
            setLoaded(true);
          }
        });
        return request;
      }
      fetchAPI();
    }
  }, [PlayerID]);

  return (
    <div className={classes.Display}>
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
            <Mui.Grid
              component="label"
              container
              alignItems="center"
              spacing={2}
            >
              <Mui.Grid item xs={6}>
                Edit:{" "}
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Mui.Button
                  style={{
                    padding: 5,
                    margin: 10,
                    marginLeft: 0,
                    width: "100%",
                  }}
                  variant="contained"
                  color="default"
                  size="medium"
                  // component={ Link } to="/difficulty"
                  endIcon={
                    <Mui.Icon style={{ marginLeft: 5 }}>gradient</Mui.Icon>
                  }
                >
                  Theme
                </Mui.Button>
                <Mui.Button
                  style={{
                    padding: 5,
                    margin: 10,
                    marginLeft: 0,
                    width: "100%",
                  }}
                  variant="contained"
                  color="default"
                  size="medium"
                  // component={ Link } to="/difficulty"
                  endIcon={
                    <Mui.Icon style={{ marginLeft: 5 }}>create</Mui.Icon>
                  }
                >
                  Biography
                </Mui.Button>
                <Mui.Button
                  style={{
                    padding: 5,
                    margin: 10,
                    marginLeft: 0,
                    width: "100%",
                  }}
                  variant="contained"
                  color="default"
                  size="medium"
                  // component={ Link } to="/difficulty"
                  endIcon={<Mui.Icon style={{ marginLeft: 5 }}>photo</Mui.Icon>}
                >
                  Picture
                </Mui.Button>
              </Mui.Grid>

              <Mui.Grid
                component="label"
                container
                alignItems="center"
                spacing={2}
              >
                <Mui.Grid item xs={6} style={{ marginLeft: 5 }}>
                  Dark Mode:{" "}
                </Mui.Grid>
                <Mui.Grid item>Off</Mui.Grid>
                <Mui.Grid item>
                  <Mui.Switch
                    onClick={() => handleSwitch(onOff)}
                    checked={onOff}
                    style={{ marginLeft: 0 }}
                  />
                </Mui.Grid>
                <Mui.Grid item>On</Mui.Grid>
              </Mui.Grid>
            </Mui.Grid>
          </div>
        </Mui.Fade>
      </Mui.Modal>
      <ul className={classes.Navbar}>
        <li>
          <button onClick={() => home()}>Main Menu</button>
        </li>
        <li>
          <Link to="/difficulty">
            <button>Play</button>
          </Link>
        </li>
        <li>
          <Link to="/leaderboards">
            <button>Leaderboards</button>
          </Link>
        </li>
      </ul>
      <Mui.Grid container spacing={0}>
        <Mui.Grid item xs={3}>
          <img
            style={{
              width: 75,
              height: 75,
              margin: "20px",
              border: "blue solid 2px",
            }}
            src={`/cards/${User()[0].User_Picture}.png`}
            alt="coors beer logo"
          />
          <Mui.Icon
            style={{ color: "white", border: "white solid 3px", padding: 5 }}
          >
            group
          </Mui.Icon>
        </Mui.Grid>
        <Mui.Grid style={{ textAlign: "start" }} item xs={9}>
          <Mui.Icon
            onClick={handleOpen}
            style={{
              color: "white",
              margin: "0px 10px 0px 5px",
              fontSize: "2em",
              float: "right",
            }}
          >
            settings
          </Mui.Icon>
          <p style={{ paddingLeft: 10 }}>{`Date joined: ${
            User()[0].User_Date_Joined
          }`}</p>
          <p style={{ paddingLeft: 10 }}>{`Username: ${
            User()[0].User_Name
          }`}</p>
          <p style={{ paddingLeft: 10 }}>{`
            Biography: ${User()[0].User_Bio}`}</p>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <h2>
            <u>Easy</u>
          </h2>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <h2>
            <u>Medium</u>
          </h2>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <h2>
            <u>Hard</u>
          </h2>
        </Mui.Grid>
      </Mui.Grid>
      {loaded ? (
        <Mui.Grid container spacing={0}>
          <Mui.Grid item xs={4}>
            {userScores[0].Best_Score == null ? (
              <p>-</p>
            ) : (
              <p>{userScores[0].Best_Score} sec</p>
            )}
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            {userScores[1].Best_Score == null ? (
              <p>-</p>
            ) : (
              <p>{userScores[1].Best_Score} sec</p>
            )}
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            {userScores[2].Best_Score == null ? (
              <p>-</p>
            ) : (
              <p>{userScores[2].Best_Score} sec</p>
            )}
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <p>{userScores[0].Score_Date}</p>
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <p>{userScores[1].Score_Date}</p>
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <p>{userScores[2].Score_Date}</p>
          </Mui.Grid>
        </Mui.Grid>
      ) : (
        <Mui.CircularProgress
          color="white"
          style={{ margin: "auto", marginTop: "20%" }}
        />
      )}
    </div>
  );
};

export default UserCard;
