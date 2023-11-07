var express = require('express');
var app = express();
var mysql = require('mysql');
app.set("view engine", "ejs"); // template engine
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cis445'
});

// Connect to the database
con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// MENU
app.get("/menu", function (req, res) {
  res.render("menu", { name: req.body.std_name, id: req.body.std_id });
});

// DISPLAY
app.get("/display", function(req, res) {


  var q1 = "select * from department;";
  con.query(q1, function(error, departmentResult) {
  if (error) throw error;

  var q2 = "select * from student;";
  con.query(q2, function(error, studentResult) {
  if (error) throw error;

  var q3 = "select * from instructor;";
  con.query(q3, function(error, instructorResult) {
  if (error) throw error;

  var q4 = "select * from advisor;";
  con.query(q4, function(error, advisorResult) {
  if (error) throw error;
  res.render("display", { studentData: studentResult, departmentData: departmentResult, advisorData: advisorResult, instructorData: instructorResult});
  
});});});});
});

app.get("/delete", function (req, res) {
  res.render("delete");
});

app.get("/display", function (req, res) {
  res.render("display");
});

// Push user to this page and show them data, or request for more data
app.post("/register", function (req, res) {
  console.log(req.body.std_name);
  console.log(req.body.std_id);
  res.render("menu", { name: req.body.std_name, id: req.body.std_id });
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});
