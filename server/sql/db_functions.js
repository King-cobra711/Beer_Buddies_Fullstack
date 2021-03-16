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

const checkRegistrationDetails = (req, res) => {
    const Email = req.body.Email;
    const Username = req.body.Username;

    const RegistrationDetails = "SELECT User_Name FROM User WHERE User_Name = ?;SELECT User_Email FROM User WHERE User_Email = ?;"

    db.query(RegistrationDetails, [Username,Email], (err,result)=>{
        if(err){
            console.log(err);
        }
        if(result[0].length > 0 && result[1].length > 0){
            
            res.send({
            userExists: 'User already exists',
            emailExists: 'Email already in use',
        }) ;
            console.log(result);
            return;
        }
        if(result[0].length > 0){
            res.send({userExists: 'User already exists'}) ;
            console.log(result);
            return;
        }
        if(result[1].length > 0){
            console.log(result[1])
            res.send({emailExists: 'Email already in use'});
            return;
        }
        else{
            res.send({RegConfirmed: true});
            return;
        }
    });
    };
const registerUser = (req, res) => {
    const Email = req.body.Email;
    const Username = req.body.Username;
    const Password = req.body.Password;

    const RegisterUser = "INSERT INTO User (User_Email, User_Name, User_Password) VALUES (?, ?, ?);"

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

const Login = (req, res) => {
    const userName = req.body.Username;
    const password = req.body.Password;

    const loginUser = "SELECT User_Name, User_Password FROM User WHERE User_Name = ?"
    db.query(loginUser, [userName], (err, result)=>{
        console.log(err)
        console.log(result)
        if(err){
        res.send({err: err})
        }
        if(result.length > 0){
        bcrypt.compare(password, result[0].User_Password, (err, response)=>{
            if(response){
                res.send(result)
            }else{
                res.send({message: 'Incorrect username and/or email'})
            }
        })
            }
            else{
                res.send({message: "User does not exist"});
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