const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Initialize the Express app and define the port number
const app = express();
const PORT = process.env.PORT || 3001;

// Load existing notes from the 'db.json' file into the 'notes' array
const notes = require('./db/db.json');

// Middleware
// Parse data through JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// POST request to create a new note
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to read notes.' });
        }

        // Parse existing notes data
        const note = JSON.parse(data);

        // Create a new note object with a unique ID using 'uuidv4'
        const newNote = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text,
        };

        // Add the new note to the 'note' array
        note.push(newNote);

        // Write the updated 'note' array back to the 'db.json' file
        fs.writeFile('./db/db.json', JSON.stringify(note), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Failed to write notes.' });
            }

            // Respond with the newly created note in JSON format
            res.json(newNote);
        });
    });
});

// GET request to retrieve all notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to read notes.' });
        }

        // Parse existing notes data
        const note = JSON.parse(data);

        // Respond with the 'note' array containing all notes in JSON format
        res.json(note);
    });
});

// GET request to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET request to serve the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Catch-all route (*) to redirect to the index.html file for any other request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
