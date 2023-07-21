const express = require('express')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

//initalize app and define port number
const app = express();
// In many environments like Heroku, I can set a manual port number. https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js
const PORT = process.env.PORT || 3001;

const notes = require('./db/db.json');

// Middlewear
// Parse data through JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));


// app.gets



app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).json({error: 'Failed to read notes.'})
        }

        const note = JSON.parse(data);

        const newNotes =  {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text,
        };

        note.push(newNotes);
        fs.writeFile('./db/db.json', JSON.stringify(note), (err) => {
            if(err) {
                console.log(err)
                return res.status(500).json({error: 'Failed to read notes.'})
            }

            res.json(newNotes)
        })
    })
})

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).json({error: 'Failed to read notes.'})
        }

        const note = JSON.parse(data);
        res.json(note);
    })
    
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
   
  });
