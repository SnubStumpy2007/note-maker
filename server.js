const expresse = require('express')
const fs = require('fs')
const path = require('path')

//initalize app and define port number
const app = express();
// In many environments like Heroku, I can set a manual port number. https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js
const PORT = process.env.PORT || 3001;

const notes = require('./Develop/db/db.json');

// Middlewear
// Parse data through JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));


// app.gets
app.get('./public/assets/notes', (req, res) => {
    res.json(notes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFiled(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});