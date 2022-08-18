// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// Accessing the path module
const path = require("path");

const app = express();

// routes
const books = require('./routes/api/books');

connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('Hello World'));

// use Routes
app.use('/api/books', books);

if (process.env.NODE_ENV === "production"|| process.env.NODE_ENV === "staging") {
    app.use(express.static("mern_a_to_z_client/build"));
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/mern_a_to_z_client/build/index.html"));
    });
}
else{
  app.get('/', (req, res) => res.send('API running on port ${port}'));
}

// Step 1:
app.use(express.static(path.resolve(__dirname, "./mern_a_to_z_client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./mern_a_to_z_client/build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));