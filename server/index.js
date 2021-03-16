
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
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: parseInt(process.env.SESSION_MAX_AGE),
    }
}));

app.post('/checkRegisterDetails', (req, res) => {
    db.checkRegistrationDetails(req, res)
});

app.post('/register', (req, res) => {
    db.registerUser(req, res)
});

app.post('/login', (req, res) => {
    db.Login(req, res)
});

app.get('/scores', (req, res) => {
    db.scores(res);
});

app.listen(3001, () => {
    console.log('running on port 3001')
});