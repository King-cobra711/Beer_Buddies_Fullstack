import React, { useState, useEffect } from "react";

const UserDetails = (props) => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setData(false);
    setLoggedIn(false);
    fetch("http://localhost:3001/login", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application.json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setUser(data.User);
          setData(true);
          setLoggedIn(true);
        });
      } else if (res === 401) {
        res.json().then((data) => {
          setData(true);
          setLoggedIn(false);
        });
      }
    });
  }, []);

  return [user, data, loggedIn];
};

export default UserDetails;
