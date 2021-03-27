const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Cors = require("cors");
const app = express();
const db = require("./sql/db_functions");
require("dotenv").config({ path: "/Users/Matt/Desktop/Beer Buddies/.env" });

app.use(
  Cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "User",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: null,
      secure: false,
      httpOnly: true,
    },
  })
);

app.post("/checkRegisterDetails", (req, res) => {
  db.checkRegistrationDetails(req, (status) => {
    console.log(status);
    if (status === 400) {
      res
        .status(409)
        .send({ email: "email already in use", user: "user already exists" });
    } else if (status === 406) {
      res.status(409).send({ user: "user already exists" });
    } else if (status === 409) {
      res.status(409).send({ email: "email already in use" });
    } else if (status === 200) {
      res.status(200).send();
    }
  });
});

app.post("/register", (req, res) => {
  db.registerUser(req, res, (cb) => {
    if (cb === 400) {
      res.status(400).send({ LoggedIn: false });
    } else {
      req.session.user = cb[0];
      console.log(req.session.user);
      console.log("above");
      res.status(200).send({ LoggedIn: true });
    }
  });
});

app.post("/login", (req, res) => {
  db.Login(req, (logstat) => {
    console.log(logstat);
    if (logstat === 406) {
      res.status(406).send({ message: "Incorrect username and/or password" });
    } else if (logstat === 404) {
      res.status(404).send({ message: "User does not exist" });
    } else {
      req.session.user = logstat[0];
      console.log(logstat);
      console.log(req.session.user);
      console.log("above");
      res.status(200).send({ LoggedIn: true });
    }
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.status(200).send({ loggedIn: true, User: req.session.user });
  } else {
    res.status(401).send({ loggedIn: false });
  }
});
app.get("/user", (req, res) => {
  if (req.session.user) {
    res.status(200).send({ loggedIn: true, User: req.session.user });
  } else {
    res.status(200).send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).send({ Message: "logged out" });
});

app.get("/scores", (req, res) => {
  db.scores(res);
});

app.post("/userScores", (req, res) => {
  db.userScores(req, (scores) => {
    if (scores === 400) {
      res.status(400).send({ error: "error" });
    } else {
      res.status(200).send({ UserScores: scores });
    }
  });
});
app.post("/UpdateEasyScore", (req, res) => {
  db.newEasyScore(req, (newScore) => {
    if (newScore === 400) {
      res.status(200).send({ message: "Better luck next time" });
    } else if (newScore === 201) {
      req.session.user.User_Level = 2;
      res.status(200).send({ message: "New Best Score! Next level unlocked!" });
    } else if (newScore === 200) {
      res.status(200).send({ message: "New Best Score!" });
    }
  });
});
app.post("/UpdateMediumScore", (req, res) => {
  db.newMediumScore(req, (newScore) => {
    if (newScore === 400) {
      res.status(200).send({ message: "Better luck next time" });
    } else if (newScore === 201) {
      req.session.user.User_Level = 3;
      res.status(200).send({ message: "New Best Score! Next level unlocked!" });
    } else if (newScore === 200) {
      res.status(200).send({ message: "New Best Score!" });
    }
  });
});
app.post("/UpdateHardScore", (req, res) => {
  db.newHardScore(req, (newScore) => {
    if (newScore === 400) {
      res.status(200).send({ message: "Better luck next time" });
    } else {
      res.status(200).send({ message: "New Best Score!" });
    }
  });
});
app.post("/UpdateBiography", (req, res) => {
  db.updateUserBio(req, (cb) => {
    if (cb === 400) {
      res.status(200).send({ message: "Failed to update", code: 400 });
    } else {
      console.log(cb);
      req.session.user.User_Bio = cb;
      res.status(200).send({ message: "Updated Biography", code: 200 });
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
