import React, { useState, useEffect } from "react";

const UserDetails = (refresh) => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(false);
    async function fetchAPI() {
      const request = await fetch("http://localhost:3001/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application.json",
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            if (data.loggedIn === true) {
              setUser(data.User);
              setData(true);
              setLoggedIn(true);
            } else if (data.loggedIn === false) {
              setData(true);
              setLoggedIn(false);
            }
          });
        }
      });
      return request;
    }
    fetchAPI();
  }, []);

  return [user, data, loggedIn];
};

export default UserDetails;
