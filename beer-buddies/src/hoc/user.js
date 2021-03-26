import React, { useState, useEffect } from "react";

const UserDetails = (props) => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(false);
    async function fetchAPI() {
      const request = await fetch("http://localhost:3001/login", {
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
        } else if (res.status === 401) {
          res.json().then((data) => {
            setData(true);
            setLoggedIn(false);
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
