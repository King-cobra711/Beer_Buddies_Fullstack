require('dotenv').config({path: '/Users/Matt/Desktop/Beer Buddies/.env'});
const express = require('express');
const mysql = require('mysql');
// const app = express();


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    port: process.env.PORT,
    multipleStatements: true, 
});

// POST

const registerUser = (req) => {
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(db.port)
    console.log(db.host)
    console.log(db.user)
    const RegisterUser = "INSERT INTO User (User_Email, User_Name, User_Password) VALUES (?, ?, ?);"
    db.query(RegisterUser, [email, userName, password], (err, result)=>{
        console.log(err)
        console.log(result)
    })};




    // GET


const easyLeaderboard = (res) => {

    const easyScores = "SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 1;"
    db.query(easyScores, (err, result)=>{
        console.log(err)
        console.log(result)
        res.send(result);
    })};
const mediumLeaderboard = (res) => {

    const easyScores = "SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 2;"
    db.query(easyScores, (err, result)=>{
        console.log(err)
        console.log(result)
        res.send(result);
    })};


const scores = (res) => {

    const allScores ="SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 1;SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 2;SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 3;"
    

    db.query(allScores,[0, 1, 2], (err, result)=>{
        console.log(err)
        console.log(result)
        res.send(result);
    })
};






module.exports = {
    registerUser: registerUser, 
    easyLeaderboard: easyLeaderboard,
    mediumLeaderboard: mediumLeaderboard,
    scores: scores,
};