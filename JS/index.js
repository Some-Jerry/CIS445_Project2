var express = require('express');
var app = express();
app.set("view engine", "ejs");//template engine
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

// Start here to enter the data you want
app.get("/menu", function(req, res) {
//res.send("Test response from our web app");
res.render("menu", { name: req.body.std_name, id: req.body.std_id });
});

// Push user to this page and show them data, or request for more data
app.post("/register", function(req, res) {
console.log(req.body.std_name);
console.log(req.body.std_id);
//res.send(req.body.std_name);
//res.redirect("/");
res.render("menu", { name: req.body.std_name, id: req.body.std_id });
});

app.listen(8080, function() {
console.log('App listening on port 8080!');
});