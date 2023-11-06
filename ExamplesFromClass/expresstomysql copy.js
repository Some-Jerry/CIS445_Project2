var express = require('express');
var app = express();

app.get("/", function(req, res){
res.send("Test response from our web app");
});
app.listen(3000, function () {
console.log('App listening on port 3000!');
});


var mysql = require('mysql');
//connect with mysql
var con = mysql.createConnection({
host : 'localhost',
user : 'root',
database : 'cis445'
});

app.set("view engine", "ejs");

app.get("/db", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM Student';
    con.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("home",{data:count});
});//query
});


app.get("/display", function(req, res) {
var q = "select * from Student";
con.query(q, function(error, results) {
if (error) throw error;
res.render("DisplayAll", { data: results });
});
});


var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

app.post("/register", function(req, res) {
    var student_info = { Name: req.body.std_name, tot_credit: req.body.std_tot_credit, dept_name: req.body.std_dept_name };
    var q = "insert into Student set ?";
    con.query(q, student_info, function(error, results) {
    if (error) throw error;
    res.redirect("/db"); //redirect to root page
});
});