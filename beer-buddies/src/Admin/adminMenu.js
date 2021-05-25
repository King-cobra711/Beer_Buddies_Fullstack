import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import * as Mui from "@material-ui/core";
import classes from "./adminMenu.module.css";
import { withStyles } from "@material-ui/core/styles";

const AdminMenu = () => {
  const CustomButton = withStyles({
    root: {
      fontSize: "large",
      marginLeft: "15px",
      width: "1px",
      height: "90%",
      padding: "0px",
      paddingRight: "10px",
      background: "white",
      borderRadius: 3,
      border: 0,
      color: "red",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    label: {
      textTransform: "capitalize",
    },
  })((props) => <Mui.Button {...props} />);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    setLoaded(false);

    fetch("http://localhost:3001/AdminUserSearch", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application.json",
      },
    }).then((res) => {
      res
        .json()
        .then((response) => {
          setAllUsers(response.users);
        })
        .then(setLoaded(true));
    });
  }, [userName]);

  return (
    <div>
      <Mui.Grid container spacing={0} style={{ width: "90%", margin: "auto" }}>
        <Mui.Grid item xs={9}>
          <input
            className={classes.searchbar}
            type="text"
            placeholder="Search..."
            value={searchTerms}
            onChange={(event) => {
              setSearchTerms(event.target.value);
              setSearchName(event.target.value);
            }}
            onClick={() => {
              seterrorMessage("");
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Mui.Button
            onClick={() => {
              fetch("http://localhost:3001/Admin/searchUser", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  name: searchName,
                }),
              }).then((res) => {
                console.log(res);
                if (res.status === 400) {
                  seterrorMessage("User doesn't exist");
                }
              });
            }}
            variant="contained"
            color="default"
            size="large"
            style={{
              marginTop: "20px",
              marginLeft: "15px",
              width: "40px",
              height: "40px",
              padding: "0px",
              paddingRight: "10px",
            }}
            // component={Link}
            // to="/difficulty"
            endIcon={<Mui.Icon>search</Mui.Icon>}
          ></Mui.Button>
        </Mui.Grid>
      </Mui.Grid>
      <p className={classes.error}>{errorMessage}</p>
      <div
        style={{
          height: "58.5vh",
          overflow: "scroll",
          marginTop: "5px",
        }}
      >
        {allUsers
          .filter((val) => {
            if (searchTerms == "") {
              return val;
            } else if (
              val.User_Name.toLowerCase().includes(searchTerms.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return (
              <div
                className={classes.userlist}
                onClick={() => {
                  seterrorMessage("");
                  setUserName(val.User_Name);
                  // console.log(userName);
                  console.log(searchTerms);
                }}
              >
                <Mui.Grid container spacing={0}>
                  <Mui.Grid
                    item
                    xs={5}
                    onClick={() => {
                      setSearchTerms(val.User_Name);
                      seterrorMessage("");
                      setSearchName(val.User_Name);
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontSize: "1.2em",
                      }}
                    >
                      {val.User_Name}
                    </p>
                  </Mui.Grid>
                  <Mui.Grid
                    item
                    xs={4}
                    onClick={() => {
                      setSearchTerms(val.User_Name);
                      seterrorMessage("");
                      setSearchName(val.User_Name);
                    }}
                  >
                    <img
                      style={{
                        width: 60,
                        height: 60,
                      }}
                      src={`/cards/${val.User_Picture}.png`}
                      alt="User Pic"
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={3}>
                    <CustomButton
                      onClick={() => {
                        setSearchTerms("");
                        setUserName(val.User_Name);
                        console.log(userName);
                        fetch("http://localhost:3001/Admin/DeleteUser", {
                          method: "POST",
                          headers: {
                            "Content-type": "application/json",
                          },
                          credentials: "include",
                          body: JSON.stringify({
                            name: userName,
                          }),
                        }).then((res) => {
                          console.log(res);
                          if (res.status === 400) {
                            seterrorMessage("User doesn't exist");
                          }
                        });
                      }}
                      variant="contained"
                      size="large"
                      // component={Link}
                      // to="/difficulty"
                      endIcon={
                        <Mui.Icon style={{ color: "red" }}>
                          deleteforever
                        </Mui.Icon>
                      }
                    ></CustomButton>
                  </Mui.Grid>
                </Mui.Grid>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default AdminMenu;
