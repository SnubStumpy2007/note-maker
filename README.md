## Simple Note-Taking Web Application

This is a simple note-taking web application built using Node.js and Express.js. It allows users to create and view notes, and all notes are stored in a JSON file on the server.

# Table of Contents

Installation
Usage
Endpoints
Technologies Used
License

# Installation

Make sure you have Node.js installed on your machine.
Clone this repository to your local machine or download the source code as a ZIP file.
Navigate to the project directory using the terminal or command prompt.
Run npm install to install the required dependencies.

# Usage

After installing the dependencies, start the application by running npm start or node index.js.
The application will start, and you should see a message indicating that the server is listening on a specific port.
Open your web browser and go to <http://localhost:3001>.

# Endpoints

POST /api/notes
This endpoint allows users to create a new note. The request body should be in JSON format and include the title and text of the note. The server will generate a unique ID for the new note using the uuid library.

GET /api/notes
This endpoint returns all the notes currently stored on the server in JSON format.

GET /notes
This endpoint serves the HTML page for the note-taking interface. Users can view and manage their notes from this page.

GET / (Catch-all)
For any other URL that is not defined above, the server will serve the homepage HTML page. This ensures that the application always loads the correct HTML page, even if the URL is not recognized.

# Technologies Used

Node.js
Express.js
uuid (for generating unique IDs)
HTML
CSS
JavaScript

# License

This project is licensed under the MIT License.

# Sources

<https://www.geeksforgeeks.org/how-to-build-note-taking-application-using-node-js/#>
<https://medium.com/swlh/node-js-module-system-part-1-note-taking-app-78b642242370>
<https://www.geeksforgeeks.org/express-js-app-post-function/#>
<https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST>
<https://expressjs.com/en/resources/middleware/body-parser.html>
<https://github.com/jfisher396/express-note-taker>
Tutor Jehyun Jung
