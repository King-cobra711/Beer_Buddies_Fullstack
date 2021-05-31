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

  useEffect(() => {
    setLoaded(false);
    fetch("http://localhost:3001/AdminUserSearchInfo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: "beergirl",
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
      {loaded ? (
        <Formik
          initialValues={{
            Email: userInfo.User_Email,
            Username: userInfo.User_Name,
            biography: userInfo.User_Bio,
            picture: userInfo.User_Picture,
            theme: userInfo.User_Theme,
            blacklistStatus: userInfo.User_Blacklist_Status,
            userLevel: userInfo.User_Level,
          }}
          validationSchema={userSchema}
          onSubmit={(fields) => {
            fetch("http://localhost:3001/checkRegisterDetails", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(fields),
            }).then((res) => {
              if (res.status === 200) {
                fetch("http://localhost:3001/admin/editUser", {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify(fields),
                }).then((res) => {
                  if (res.status === 200) {
                    res.json().then((data) => {});
                  }
                });
              }
            });
          }}
        >
          <Form className={classes.Display}>
            <Field
              name="Username"
              type="text"
              placeholder={userInfo.User_Name}
              className={classes.inputRegister}
            />
            <ErrorMessage
              name="Username"
              component="p"
              className={classes.errorMessage}
            />
            <Field
              name="Email"
              type="text"
              placeholder={userInfo.User_Email}
              className={classes.inputRegister}
            />
            <ErrorMessage
              name="Email"
              component="p"
              className={classes.errorMessage}
            />
            <Field
              name="Password"
              type="password"
              placeholder="Password"
              className={classes.inputRegister}
            />
            <ErrorMessage
              name="Password"
              component="p"
              className={classes.errorMessage}
            />
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
