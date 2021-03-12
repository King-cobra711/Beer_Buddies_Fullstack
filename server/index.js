
const express = require('express');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
const Cors = require('cors');
const app = express();
const db = require('./sql/db_functions');



app.use(Cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/register', (req, res) => {
    db.registerUser(req)
});

app.get('/scores', (req, res) => {
    db.scores(res);
});

app.listen(3001, () => {
    console.log('running on port 3001')
});