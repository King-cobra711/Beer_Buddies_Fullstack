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
      credentials: "include",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({ name: params.name }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setUserInfo(data.userInfo);
          setLoaded(true);
        });
      } else {
        console.log("ERROR getting user information");
      }
    });
  }, []);

  return (
    <div>
      <p>current user --- {params.name}</p>
      <h3>Username</h3>
      <h3>Email</h3>
      <Formik
        initialValues={{
          Password: "",
          biography: "",
          picture: "",
          theme: "",
          blacklistStatus: "",
          userLevel: "",
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
            placeholder="biography..."
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
            placeholder="Choose picture..."
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
            placeholder="Choose theme"
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
            placeholder="Choose theme"
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
            placeholder="edit lvl..."
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
    </div>
  );
};
export default AdminEditUser;
