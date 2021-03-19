require('dotenv').config({path: '/Users/Matt/Desktop/Beer Buddies/.env'});
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');
const mysql = require('mysql');



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
    const Email = req.body.Email;
    const Username = req.body.Username;

    const RegistrationDetails = "SELECT User_Name FROM User WHERE User_Name = ?;SELECT User_Email FROM User WHERE User_Email = ?;"

    db.query(RegistrationDetails, [Username,Email], (err,result)=>{
        if(err){
            console.log(err);
        }
        if(result[0].length > 0 && result[1].length > 0){
            status(400)
            return;
        }
        if(result[0].length > 0){
            status(406)
            return;
        }
        if(result[1].length > 0){
            status(409)
            return;
        }
        else{
            status(200)
            return;
        }
    });
    };
const registerUser = (req, res) => {
    const Email = req.body.Email;
    const Username = req.body.Username;
    const Password = req.body.Password;

    const RegisterUser = "INSERT INTO User (User_Email, User_Name, User_Password, User_Date_Joined) VALUES (?, ?, ?, CURRENT_DATE);"

    bcrypt.hash(Password, saltRounds, (err, hash)=>{
        if(err){
            console.log(err)
        }
        db.query(RegisterUser, [Email, Username, hash], (err, result)=>{
        console.log(err);
        console.log(result);
        console.log(db.port);
        res.send({LoggedIn: true});
    });
    });
}

const Login = (req, status) => {
    const userName = req.body.Username;
    const password = req.body.Password;

    const checkDetails = "SELECT User_Name, User_Password FROM User WHERE User_Name = ?"

    const login = "SELECT User_ID, User_Name, DATE_FORMAT(User_Date_Joined, '%d/%m/%Y') AS 'User_Date_Joined', User_Bio, User_Picture, User_Theme, User_Blacklist_Status FROM User WHERE User_Name = ?"

    db.query(checkDetails, [userName], (err, result)=>{
        console.log(err)
        console.log(result)
        if(err){
        res.send({err: err})
        }
        if(result.length > 0){
        bcrypt.compare(password, result[0].User_Password, (err, response)=>{
            if(response){
                db.query(login, [userName], (err,userDetails)=>{
                    if(err){
                        console.log(err);
                    }
                    if(userDetails.length > 0){
                        status([200, userDetails])
                    }
                })
            }
            else{
                status([406])
            }
    })
            }
            else{
                status([404])
            }

    })
};




    // GET


const scores = (res) => {

    const allScores ="SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 1;SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 2;SELECT User.User_Name, Leaderboards.Best_Score from User JOIN Leaderboards ON User.User_ID = Leaderboards.User_ID WHERE Game_ID = 3;"
    

    db.query(allScores,[0, 1, 2], (err, result)=>{
        console.log(err)
        console.log(result)
        res.send(result);
    })
};






module.exports = {
    checkRegistrationDetails: checkRegistrationDetails,
    registerUser: registerUser,
    scores: scores,
    Login: Login,
};