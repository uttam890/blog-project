const express = require('express');
let cors = require("cors");


//express intializaion
const app = express();
const port = 4000

app.get('/', (req, res) => res.send('Server is live...'))
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "15Mb" })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false, limit: "15Mb" }));
app.use(cors({
    origin: true,
    credentials: true
}));


// session intializaion
var session = require('express-session');
var FileStore = require('session-file-store')(session);
let store = new FileStore({
    path: "/var/local-sessions",  //directory where session files will be stored
    useAsync: true,
    reapInterval: 5000,
    maxAge: 24 * 60 * 60 * 1000
});
app.use(session({
    secret: 'session_secret',
    resave: false,
    store: store,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
        secure: false
    }
}));

//Initialize mysql db
require('./utils/db.config');

// routes
require('./routes')(app);






app.listen(port, () => console.log(`Example app listening on port ${port}!`))