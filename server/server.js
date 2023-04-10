
// Require dependencies

const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const flash = require("connect-flash");

// Require router module

const router = require('./routes/router');

// Initialize the app

const app = express();

// Connect to the DB

require("./db");

const port = 5000;

// Make the response body readable in "JSON"" form

app.use(bodyParser.json());

// Create a session in the req or res object

app.use(
    session({
        secret: "abcdefg",
        resave: true,
        saveUninitialized: false,
    })
);

// Use a cookie parser

app.use(cookieParser());

// Use Cross-Origin Resource Sharing policy to allow clients to access the data on the server

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(flash());

// Handle routing

app.use('/', router);

app.use((req, res, next) => {
    res.locals.user = req.user;

    next();
});

// Serve build folder in both development and production environment

const buildDir = path.join(__dirname, "../client/build");

app.use(express.static(buildDir));

app.get("*", (req, res) => {
    res.sendFile(path.join(buildDir, "index.html"));
});

// Server listens for connections

app.listen(process.env.PORT || port, () =>
    console.log(`biddingApp listening at http://localhost:${port}`)
);