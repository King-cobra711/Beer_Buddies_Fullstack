require("dotenv").config({ path: "/Users/Matt/Desktop/Beer Buddies/.env" });
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  port: process.env.PORT,
  multipleStatements: true,
});

// POST

const checkRegistrationDetails = (req, status) => {
  console.log(db.port);
  console.log("db.port");
  const Email = req.body.Email;
  const Username = req.body.Username;

  const RegistrationDetails =
    "SELECT User_Name FROM User WHERE User_Name = ?;SELECT User_Email FROM User WHERE User_Email = ?;";

  db.query(RegistrationDetails, [Username, Email], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result[0].length > 0 && result[1].length > 0) {
      status(400);
      return;
    }
    if (result[0].length > 0) {
      status(406);
      return;
    }
    if (result[1].length > 0) {
      status(409);
      return;
    } else {
      status(200);
      return;
    }
  });
};
const registerUser = (req, res, cb) => {
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;

  const RegisterUser =
    "INSERT INTO User (User_Email, User_Name, User_Password, User_Date_Joined) VALUES (?, ?, ?, CURRENT_DATE);";

  bcrypt.hash(Password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      cb(400);
    }
    db.query(RegisterUser, [Email, Username, hash], (err, result) => {
      if (err) {
        cb(400);
      }
      if (result) {
        console.log(result);
        cb(200);
      }
    });
  });
};

const Login = (req, logstat) => {
  const userName = req.body.Username;
  const password = req.body.Password;

  const checkDetails =
    "SELECT User_Name, User_Password FROM User WHERE User_Name = ?";

  const login =
    "SELECT User_ID, User_Name, DATE_FORMAT(User_Date_Joined, '%d/%m/%Y') AS 'User_Date_Joined', User_Bio, User_Picture, User_Theme, User_Blacklist_Status FROM User WHERE User_Name = ?";

  db.query(checkDetails, [userName], (err, result) => {
    console.log(err);
    console.log(result);
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].User_Password, (err, response) => {
        if (response) {
          db.query(login, [userName], (error, response) => {
            if (error) {
              console.log(error);
            }
            if (response) {
              logstat(response);
            }
          });
        } else {
          logstat(406);
        }
      });
    } else {
      logstat(404);
    }
  });
};

const newEasyScore = (req, newScore) => {
  const score = req.body.score;
  const id = req.body.id;
  console.log(score);

  const check =
    "SELECT Best_Score FROM Leaderboards WHERE Game_ID = 1 AND User_ID = ?";

  const insert =
    "UPDATE Leaderboards SET Best_Score = ?, Score_Date = CURRENT_DATE WHERE (User_ID = ? AND Game_ID = 1)";

  db.query(check, [id], (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res[0].Best_Score > score) {
      db.query(insert, [score, id], (error, response) => {
        if (error) {
          console.log(error);
        }
        if (response) {
          newScore(200);
        }
      });
    }
    if (res[0].Best_Score <= score) {
      newScore(400);
    } else {
      console.log("ERROR");
    }
  });
};

// GET

const scores = (res) => {
  const allScores =
    "SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 1;SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 2;SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 3;";

  db.query(allScores, [0, 1, 2], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
};

const userScores = (req, scores) => {
  const Id = req.body.id;

  const userscores =
    "SELECT Best_Score, DATE_FORMAT(Score_Date, '%d/%m/%Y') AS 'Score_Date' FROM Leaderboards WHERE User_ID = ? ORDER BY Game_ID ASC;";
  db.query(userscores, [Id], (err, result) => {
    if (err) {
      console.log(err);
      scores(400);
    }
    if (result) {
      scores(result);
      console.log(result);
    }
  });
};

module.exports = {
  checkRegistrationDetails: checkRegistrationDetails,
  registerUser: registerUser,
  scores: scores,
  Login: Login,
  userScores: userScores,
  newEasyScore: newEasyScore,
};
