const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Cors = require("cors");
const app = express();
const db = require("./sql/db_functions");
const { body, validationResult } = require("express-validator");
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

app.post(
  "/checkRegisterDetails",
  body("Email").isEmail(),
  body("Username").isLength({ min: 3, max: 15 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      db.checkRegistrationDetails(req, (status) => {
        console.log(status);
        if (status === 400) {
          res.status(409).send({
            email: "email already in use",
            user: "user already exists",
          });
        } else if (status === 406) {
          res.status(409).send({ user: "user already exists" });
        } else if (status === 409) {
          res.status(409).send({ email: "email already in use" });
        } else if (status === 200) {
          res.status(200).send();
        }
      });
    }
  }
);

app.post(
  "/register",
  body("Email").isEmail(),
  body("Username").isLength({ min: 3, max: 15 }),
  body("Password").isLength({ min: 6, max: 20 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
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
    }
  }
);

app.post(
  "/login",
  body("Password").isLength({ min: 6, max: 20 }),
  body("Username").isLength({ min: 3, max: 15 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      db.Login(req, (logstat) => {
        console.log(logstat);
        if (logstat === 406) {
          res
            .status(406)
            .send({ message: "Incorrect username and/or password" });
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
    }
  }
);

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

app.post("/userScores", body("id").isNumeric(), (req, res) => {
  db.userScores(req, (scores) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      if (scores === 400) {
        res.status(400).send({ error: "error" });
      } else {
        res.status(200).send({ UserScores: scores });
      }
    }
  });
});
app.post(
  "/UpdateEasyScore",
  body("id").isNumeric(),
  body("score").isNumeric(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      db.newEasyScore(req, (newScore) => {
        if (newScore === 400) {
          res.status(200).send({ message: "Better luck next time" });
        } else if (newScore === 201) {
          req.session.user.User_Level = 2;
          res
            .status(200)
            .send({ message: "New Best Score! Next level unlocked!" });
        } else if (newScore === 200) {
          res.status(200).send({ message: "New Best Score!" });
        }
      });
    }
  }
);
app.post(
  "/UpdateMediumScore",
  body("id").isNumeric(),
  body("score").isNumeric(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      db.newMediumScore(req, (newScore) => {
        if (newScore === 400) {
          res.status(200).send({ message: "Better luck next time" });
        } else if (newScore === 201) {
          req.session.user.User_Level = 3;
          res
            .status(200)
            .send({ message: "New Best Score! Next level unlocked!" });
        } else if (newScore === 200) {
          res.status(200).send({ message: "New Best Score!" });
        }
      });
    }
  }
);
app.post(
  "/UpdateHardScore",
  body("id").isNumeric(),
  body("score").isNumeric(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      db.newHardScore(req, (newScore) => {
        if (newScore === 400) {
          res.status(200).send({ message: "Better luck next time" });
        } else {
          res.status(200).send({ message: "New Best Score!" });
        }
      });
    }
  }
);

app.post(
  "/UpdateTheme",
  body("id").isNumeric(),
  body("theme").matches({
    options: [
      "blue",
      "red",
      "black",
      "white",
      "yellow",
      "green",
      "purble",
      "pink",
    ],
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      db.updateUserTheme(req, (cb) => {
        if (cb === 400) {
          res.status(200).send({ message: "Fail", code: 400 });
        } else {
          req.session.user.User_Theme = cb;
          res.status(200).send({ message: "success", code: 200 });
        }
      });
    }
  }
);
app.post(
  "/UpdatePic",
  body("id").isNumeric(),
  body("Pic").matches({
    options: ["Coors", "Corona", "Heinekin", "Peroni", "StoneWood", "xxxxGold"],
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      db.updateUserPic(req, (cb) => {
        if (cb === 400) {
          res.status(200).send({ message: "Fail", code: 400 });
        } else {
          req.session.user.User_Picture = cb;
          res.status(200).send({ message: "success", code: 200 });
        }
      });
    }
  }
);
app.post(
  "/UpdateBiography",
  body("id").isNumeric(),
  body("Biography").isLength({ max: 100 }),
  (req, res) => {
    db.updateUserBio(req, (cb) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        if (cb === 400) {
          res.status(200).send({ message: "Failed to update", code: 400 });
        } else {
          console.log(req.session.user);
          req.session.user.User_Bio = cb;
          res.status(200).send({ message: cb, code: 200 });
        }
      }
    });
  }
);

app.listen(3001, () => {
  console.log("running on port 3001");
});
