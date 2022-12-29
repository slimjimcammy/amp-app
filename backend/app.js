const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());
app.use(cors());


// connect to MySQL database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "f00d3qu1ty!",
    database: "AMPdata"
});



// ADMIN

// GET: display admin page
app.get("/admin", function(req, res) {
    res.redirect("/admin");
})

// POST: add student into database
app.post("/add", function(req, res) {

    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (UserID, UserName, UserEmail, UserPassword) VALUES (?, ?, ?, ?)",
        [id, name, email, password],
        (error, result) => {
            if (error) {
                res.send("Failed to register.");
            }
        }
    );

});

// POST: delete student from database
app.post("/delete", function(req, res) {

    const del_id = req.body.id;

    db.query (
        `DELETE FROM users WHERE UserID='${del_id}';`,
        (error, result) => {
            if (error) {
                res.send("Could not delete.");
            }
        }
    );

});

// LOGIN

// POST: validate user and log them in
app.post("/validate", function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        `SELECT * FROM users WHERE (UserEmail='${username}') and (UserPassword='${password}');`,
        (error, result) => {
            if (error) {
                res.send("Invalid Username or Password");
            }
            else {
                res.send(result);
            }
        }
    )

});


// run server
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

app.listen(port, function() {
    console.log("Server started at port 8000");
});




// tests

app.post("/test", function(req, res) {
    res.send("Test");
});