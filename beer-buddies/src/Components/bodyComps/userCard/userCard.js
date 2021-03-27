import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { userSchemaBio } from "../../../Validations/Usercard/biography";

import classes from "./userCard.module.css";
import * as Mui from "@material-ui/core";
import { useHistory } from "react-router-dom";

// import User from "../../../hoc/user";

const UserCard = () => {
  let history = useHistory();

  const [open, setOpen] = useState(false);
  const [openBio, setOpenBio] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenBio = () => {
    setOpenBio(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseBio = () => {
    setOpenBio(false);
  };

  const [onOff, setSwitch] = useState(true);
  const handleSwitch = (onOff) => {
    setSwitch(!onOff);
  };
  const [User, setUser] = useState([{}, false, false]);
  const [user, setuser] = useState([]);
  const [data, setData] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userScores, setUserScores] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [update, setUpdate] = useState(false);
  let PlayerID = User[0].User_ID;
  let Data = User[1];

  const refresh = () => {
    setUpdate(!update);
  };

  const home = () => {
    history.push("/");
  };

  useEffect(() => {
    setLoggedIn(false);
    fetch("http://localhost:3001/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application.json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          if (data.loggedIn === true) {
            setuser(data.User);
            setData(true);
            setLoggedIn(true);
            setTimeout(() => {
              setUpdate(!update);
            }, 1);
          } else if (data.loggedIn === false) {
            setData(true);
            setLoggedIn(false);
          }
        });
      }
    });
    setUser([user, data, loggedIn]);
  }, [data, update]);

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
  }, [Data]);

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
            <Mui.Button
              variant="contained"
              color="default"
              size="small"
              style={{
                minWidth: "20px",
                width: "30px",
                height: "30px",
                position: "relative",
                bottom: "4em",
                left: "90%",
                padding: 0,
                color: "rgb(163, 2, 2)",
              }}
              onClick={() => handleClose()}
            >
              X
            </Mui.Button>
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
                  onClick={handleOpenBio}
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
      <Mui.Modal
        className={classes.BioModal}
        open={openBio}
        onClose={handleCloseBio}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Mui.Fade in={openBio}>
          <div className={classes.modalMessage}>
            <Mui.Grid
              component="label"
              container
              alignItems="center"
              spacing={2}
            >
              <Mui.Grid item xs={12}>
                <Formik
                  initialValues={{
                    Biography: "",
                    id: "",
                  }}
                  validationSchema={userSchemaBio}
                  onSubmit={(fields) => {
                    fetch("http://localhost:3001/UpdateBiography", {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                      },
                      credentials: "include",
                      body: JSON.stringify(fields),
                    }).then((res) => {
                      if (res.status === 200) {
                        setOpenBio(false);
                        setUpdate(!update);
                        res.json().then((data) => {
                          if (data.code === 200) {
                            console.log(data.message);
                          } else if (data.code === 400) {
                            console.log(data.message);
                          } else {
                            console.log("ERROR Updating Biography");
                          }
                        });
                      }
                    });
                  }}
                >
                  <Form className={classes.BioForm}>
                    <h2>Biography</h2>
                    <Field
                      name="Biography"
                      type="text"
                      placeholder="100 charachters max"
                    />
                    <ErrorMessage
                      name="Biography"
                      component="p"
                      className={classes.errorMessage}
                    />
                    <Field name="id" type="number" value={PlayerID} hidden />
                    <div style={{ width: "80%", margin: "auto" }}>
                      <Mui.Button
                        style={{
                          padding: 5,
                          margin: 10,
                          marginLeft: 0,
                          float: "left",
                          letterSpacing: 2,
                        }}
                        variant="contained"
                        color="default"
                        size="medium"
                        type="submit"
                        onClick={() => refresh()}
                      >
                        Submit
                      </Mui.Button>
                      <Mui.Button
                        style={{
                          padding: 5,
                          margin: 10,
                          marginLeft: 0,
                          float: "right",
                          letterSpacing: 2,
                        }}
                        variant="contained"
                        color="default"
                        size="medium"
                        onClick={handleCloseBio}
                      >
                        Close
                      </Mui.Button>
                    </div>
                  </Form>
                </Formik>
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
            src={`/cards/${User[0].User_Picture}.png`}
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
          <p
            style={{ paddingLeft: 10 }}
          >{`Date joined: ${User[0].User_Date_Joined}`}</p>
          <p style={{ paddingLeft: 10 }}>{`Username: ${User[0].User_Name}`}</p>
          <p style={{ paddingLeft: 10, marginBottom: 0 }}>Biography:</p>
          <p style={{ paddingLeft: 10, marginTop: 5 }}>{User[0].User_Bio}</p>
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
