import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import * as Mui from "@material-ui/core";
import classes from "./adminAUT.module.css";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const AdminAddUserType = () => {
  const CustomButton = withStyles({
    root: {
      fontSize: "large",
      marginLeft: "15px",
      width: "50%",
      height: "50%",
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

  let history = useHistory();
  const home = () => {
    history.push("/");
  };

  const [loaded, setLoaded] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newUserType, setNewUserType] = useState("");
  const [delUserType, setdelUserType] = useState("");

  const add = () => {
    console.log("newusers types here -> " + newUserType);
    async function fetchAPI() {
      const request = await fetch("http://localhost:3001/NewUserTypes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ntype: newUserType,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setRefresh(true);
          setSuccessMessage("User type added");
        } else {
          seterrorMessage("Could not delete");
        }
      });
      return request;
    }
    fetchAPI();
  };

  const remove = (event) => {
    setdelUserType(event);
    console.log(event + "<--- event");
    setRefresh(false);
    console.log(delUserType + "<-------here");
    async function fetchAPI() {
      const request = await fetch("http://localhost:3001/deleteUserType", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          deltype: event,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setSuccessMessage("user type deleted");
          setRefresh(true);
        } else {
          seterrorMessage("Could not delete");
          setRefresh(true);
        }
      });
      return request;
    }
    fetchAPI();
  };

  useEffect(() => {
    setLoaded(false);
    setRefresh(false);

    fetch("http://localhost:3001/UserTypes", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application.json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((response) => {
          if (response.usertypes) {
            setLoaded(true);
            setUserTypes(response.usertypes);
            console.log(userTypes + "these are the user types");
          } else {
            setLoaded(true);
            seterrorMessage("error loading user types");
          }
        });
      } else {
        setLoaded(true);
        seterrorMessage("error");
      }
    });
  }, [refresh]);

  return (
    <div>
      <ul className={classes.Navbar}>
        <li>
          <Link to="/Admin">
            <button>Admin Menu</button>
          </Link>
        </li>
        <li>
          <button onClick={() => home()}>Main Menu</button>
        </li>
      </ul>
      <p className={classes.successMessage}>{successMessage}</p>
      <Mui.Grid
        container
        spacing={0}
        style={{
          width: "90%",
          margin: "auto",
          marginBottom: "30px",
          backgroundColor: "blanchedalmond",
          color: "black",
        }}
      >
        <Mui.Grid
          style={{ boxSizing: "border-box", height: "3em" }}
          item
          xs={9}
        >
          <input
            style={{ fontSize: "1.6em", marginTop: "5px" }}
            onChange={(event) => {
              setNewUserType(event.target.value);
              console.log(newUserType);
            }}
            placeholder="add new..."
          />
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <CustomButton
            onClick={() => add()}
            variant="contained"
            size="medium"
            style={{ marginTop: "10%" }}
            endIcon={<Mui.Icon style={{ color: "green" }}>addicon</Mui.Icon>}
          ></CustomButton>
        </Mui.Grid>
      </Mui.Grid>
      <table className={classes.table}>
        <tr>
          <th>User_Type_ID</th>
          <th>User_Type_Name</th>
          <th>remove</th>
        </tr>
        {userTypes.map((val, key) => {
          return (
            <tr>
              <td>{val.User_Type_ID}</td>
              <td>{val.User_Type_Name}</td>
              <td>
                <CustomButton
                  onClick={() => {
                    remove(val.User_Type_Name);
                  }}
                  variant="contained"
                  size="large"
                  endIcon={
                    <Mui.Icon style={{ color: "red" }}>
                      removecircleoutline
                    </Mui.Icon>
                  }
                ></CustomButton>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default AdminAddUserType;
