const mysql = require('mysql');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require("cors");
const md5 = require('md5');

const app = express();

require('./webpack-run')(app);
app.use(cors());
app.use(express.json());

const pathReact = ['/about', '/news', '/contacts', '/kolorit', '/kolorit/about', '/kolorit/menu',
    '/koliba', '/koliba/about', '/koliba/menu',
    '/harchev', '/harchev/about', '/harchev/menu',
    '/podvirja', '/podvirja/about', '/podvirja/menu'];
pathReact.forEach(el => {
    app.get(`${el}`, function (req, res) {
        res.sendFile(path.join(__dirname, '../../../dist/index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    });
});

var sess = {
    secret: 'secret',
    cookie: {
        originalMaxAge: null,
        expires: null,
        httpOnly: false,
        path: "/"
    },
}
app.use(session(sess));

app.post('/login', (req, res) => {
    console.log(req.body);

    let query = `SELECT * FROM various_data WHERE name = "admin_login" OR name = "admin_password" ;`;

    db.query(query, (err, result) => {
        if (err) {
            return console.log('Error select about!', err);
        }

        if (req.body.login === result[0].value && md5(req.body.pass) === result[1].value) {
            req.session.admin = true;
        }
        console.log(req.session);
        res.send(req.session.admin)

    });
});

app.get('/check-login', (req, res) => {
    console.log(req.session);

    req.session.admin
        ? res.send(true)
        : res.send(false)
});

app.get('/logout', (req, res) => {
    req.session.admin = false;
    res.send(req.session.admin);
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "roksolany"
});

db.connect(error => {
    if (error) {
        console.log("Error connection");
        return error;
    } else {
        console.log("Connected!");
        const pathToImages = "/Архив/javascript/Roxolany_Complex/src/images";
        require("./routes")(app, db, pathToImages);
        require("./email")(app, db);
    }
});

app.listen(8080, () => {
    console.log('App is listening port 8080');
});
