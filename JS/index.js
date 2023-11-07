 // --- PACKAGE DECLARATIONS ETC. --- //
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

// Connect to the database //
con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// --- MENU --- //
app.get("/menu", function (req, res) {
  res.render("menu", { name: req.body.std_name, id: req.body.std_id });
});

// --- DISPLAY --- //
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

// --- DELETE --- //
app.get("/delete", function (req, res) {
  res.render("delete");
});

app.get("/deletedepartment", function (req, res) {
  res.render("deletedepartment");
});

app.get("/deletedepartmentname", function (req, res) {
  res.render("deletedepartmentname");
});

app.post("/delete", function(req, res) {

  var info = { dept_name: req.body.std_dept_name};
  var q = "DELETE FROM department WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.get("/deletedepartmentbuilding", function (req, res) {
  res.render("deletedepartmentbuilding");
});

app.get("/deletedepartmentbudget", function (req, res) {
  res.render("deletedepartmentbudget");
});

app.get("/deleteinstructor", function (req, res) {
  res.render("deleteinstructor");
});

app.get("/deletestudent", function (req, res) {
  res.render("deletestudent");
});

app.get("/deleteadvisor", function (req, res) {
  res.render("deleteadvisor");
});

// --- MISC --- //

app.get("/querysuccess", function (req, res) {
  res.render("querysuccess");
});

app.get("/queryfailure", function (req, res) {
  res.render("queryfailure");
});


app.listen(8080, function () {
  console.log('App listening on port 8080!');
});
