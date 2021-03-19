
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Cors = require('cors');
const app = express();
const db = require('./sql/db_functions');
require('dotenv').config({path: '/Users/Matt/Desktop/Beer Buddies/.env'});



app.use(Cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: 'User',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: null,
        secure: false,
        httpOnly: true,
    }
}));

app.post('/checkRegisterDetails', (req, res) => {
    db.checkRegistrationDetails(req, (status) => {
        console.log(status);
        if(status === 400){
            res.status(409).send({email: "email already in use", user: "user already exists"});
        }else if(status === 406){
            res.status(409).send({user: "user already exists"});
        }else if(status === 409){
            res.status(409).send({email: "email already in use"});
        } else if(status === 200){
            res.status(200).send();
        }
    })
    
});

app.post('/register', (req, res) => {
    db.registerUser(req, res);

});

app.post('/login', (req, res) => {
    db.Login(req, (status)=>{
        console.log(status);
        if(status[0] === 200){
            req.session.user = status[1];
            console.log(req.session.user)
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            res.status(200).send(req.session.user);
        }else if(status[0] === 406){
            res.status(406).send({message: 'Incorrect username and/or password'})}
        else if(status[0] === 404){
            res.status(404).send({message: "User does not exist"})
        }
    })
});

app.get('/login', (req, res) => {
    if(req.session.user){
        res.status(200).send({loggedIn: true, User: req.session.user})
    }else{
        res.status(401).send({loggedIn: false})
    }
});
app.get('/logout', (req, res) => {
    res.send({Message:'logged out'});
});



app.get('/scores', (req, res) => {
    db.scores(res);
});

app.listen(3001, () => {
    console.log('running on port 3001')
});