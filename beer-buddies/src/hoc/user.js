import React, { useState, useEffect } from "react";

const UserDetails = (props) => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState(false);

  useEffect(() => {
    setData(false);
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
        });
      } else if (res === 403) {
        res.json().then((data) => {
          console.log(data);
          setData(true);
        });
      }
    });
  }, []);

  return [user, data];
};

export default UserDetails;
