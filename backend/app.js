const express = require("express");

const app = express();

app.get("/", function(req, res) {
    res.send("Connection test");
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

app.listen(port, function() {
    console.log("Server started at port 8000");
});