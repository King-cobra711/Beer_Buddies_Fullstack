import { React, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import * as Mui from "@material-ui/core";
import classes from "./adminEditUser.module.css";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { userSchema } from "../Validations/AdminEditeUser/validateEditUser";

import { Formik, Field, Form, ErrorMessage } from "formik";

const AdminEditUser = () => {
  let params = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [loaded, setLoaded] = useState(false);

  let history = useHistory();

  const home = () => {
    history.push("/");
  };

  useEffect(() => {
    setLoaded(false);
    fetch("http://localhost:3001/AdminUserSearchInfo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: params.name,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data.userInfo);
          setUserInfo(data.userInfo[0]);
          setLoaded(true);
        });
      } else {
        console.log("ERROR getting user information");
      }
    });
  }, []);

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
      {loaded ? (
        <Formik
          initialValues={{
            name: userInfo.User_Name,
            biography: userInfo.User_Bio,
            picture: userInfo.User_Picture,
            theme: userInfo.User_Theme,
            blacklistStatus: userInfo.User_Blacklist_Status,
            userLevel: userInfo.User_Level,
          }}
          validationSchema={userSchema}
          onSubmit={(fields) => {
            fetch("http://localhost:3001/AdminUpdateUser", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(fields),
            }).then((res) => {
              if (res.status === 200) {
                res.json().then((data) => {
                  console.log(data.message);
                  history.go(0);
                });
              }
            });
          }}
        >
          <Form className={classes.Display}>
            <h2>Username: {userInfo.User_Name}</h2>
            <h2>Email: {userInfo.User_Email}</h2>
            <Field
              name="name"
              type="hidden"
              initialValues={userInfo.User_Name}
              placeholder={userInfo.User_Name}
              className={classes.inputRegister}
            />
            <h3>Biography</h3>
            <Field
              name="biography"
              type="text"
              placeholder={userInfo.User_Bio}
              className={classes.inputRegister}
            />
            <ErrorMessage
              name="biography"
              component="p"
              className={classes.errorMessage}
            />
            <h3>Picture</h3>
            <Field
              name="picture"
              type="text"
              placeholder={userInfo.User_Picture}
              className={classes.inputRegister}
            />
            <ErrorMessage
              name="picture"
              component="p"
              className={classes.errorMessage}
            />
            <h3>Theme</h3>
            <Field
              name="theme"
              type="text"
              placeholder={userInfo.User_Theme}
              className={classes.inputRegister}
            />
            <ErrorMessage
              name="theme"
              component="p"
              className={classes.errorMessage}
            />
            <h3>Blacklist</h3>
            <Field
              name="blacklistStatus"
              type="text"
              placeholder={userInfo.User_Blacklist_Status}
              className={classes.inputRegister}
            />
            <ErrorMessage
              name="blacklistStatus"
              component="p"
              className={classes.errorMessage}
            />
            <h3>User Level</h3>
            <Field
              name="userLevel"
              type="text"
              placeholder={userInfo.User_Level}
              className={classes.inputRegister}
            />
            <ErrorMessage
              name="userLevel"
              component="p"
              className={classes.errorMessage}
            />
            <Mui.Button
              style={{ fontFamily: "DotGothic16", fontSize: "1em" }}
              variant="contained"
              color="default"
              size="medium"
              type="submit"
              // href='/'
            >
              Update
            </Mui.Button>
          </Form>
        </Formik>
      ) : (
        <p>Please wait ...</p>
      )}
    </div>
  );
};
export default AdminEditUser;
