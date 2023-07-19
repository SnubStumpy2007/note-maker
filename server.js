const express = require('express')
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
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});


app.post('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).json({error: 'Failed to read notes.'})
        }

        const note = JSON.parse(data);

        const newNotes =  {
            id: generateUniqueId(),
            title: req.body.title,
            text: req.body.text,
        };

        note.push(newNotes);

        fs.writeFile('db.json', JSON.stringify(notes), (err) => {
            if(err) {
                console.log(err)
                return res.status(500).json({error: 'Failed to read notes.'})
            }

            res.json(newNotes)
        })
    })
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
   
  });

// helper function to generate a unique ID
function generateUniqueId() {
    return Math.random().toString(36).substr(2,9);
}