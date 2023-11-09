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

app.get("/deletedepartmentbuilding", function (req, res) {
  res.render("deletedepartmentbuilding");
});

app.get("/deletedepartmentbudget", function (req, res) {
  res.render("deletedepartmentbudget");
});

app.post("/deletedeptname", function(req, res) {

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

app.post("/deletedeptbudget", function(req, res) {

  var info = { budget: req.body.std_budget};
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

app.post("/deletedeptbuilding", function(req, res) {

  var info = { building: req.body.std_building};
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

app.get("/deleteinstructor", function (req, res) {
  res.render("deleteinstructor");
});

app.get("/deleteinstructorID", function (req, res) {
  res.render("deleteinstructorID");
});

app.get("/deleteinstructorname", function (req, res) {
  res.render("deleteinstructorname");
});

app.get("/deleteinstructordept", function (req, res) {
  res.render("deleteinstructordept");
});

app.get("/deleteinstructorsalary", function (req, res) {
  res.render("deleteinstructorsalary");
});

app.post("/deleteinstID", function(req, res) {

  var info = { ID: req.body.std_ID};
  var q = "DELETE FROM instructor WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/deleteinstname", function(req, res) {

  var info = { name: req.body.std_name};
  var q = "DELETE FROM instructor WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/deleteinstdept", function(req, res) {

  var info = { dept_name: req.body.std_dept_name};
  var q = "DELETE FROM instructor WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/deleteinstsalary", function(req, res) {

  var info = { salary: req.body.std_salary};
  var q = "DELETE FROM instructor WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.get("/deletestudent", function (req, res) {
  res.render("deletestudent");
});

app.get("/deletestudentID", function (req, res) {
  res.render("deletestudentID");
});

app.get("/deletestudentname", function (req, res) {
  res.render("deletestudentname");
});

app.get("/deletestudentdept", function (req, res) {
  res.render("deletestudentdept");
});

app.get("/deletestudentcredits", function (req, res) {
  res.render("deletestudentcredits");
});

app.post("/deletestudID", function(req, res) {

  var info = { ID: req.body.std_ID};
  var q = "DELETE FROM student WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/deletestudname", function(req, res) {

  var info = { name: req.body.std_name};
  var q = "DELETE FROM student WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/deletestuddept", function(req, res) {

  var info = { dept_name: req.body.std_dept};
  var q = "DELETE FROM student WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/deletestudcredits", function(req, res) {

  var info = { tot_credit: req.body.std_credits};
  var q = "DELETE FROM student WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.get("/deleteadvisor", function (req, res) {
  res.render("deleteadvisor");
});

app.get("/deleteadvisorIID", function (req, res) {
  res.render("deleteadvisorIID");
});

app.get("/deleteadvisorSID", function (req, res) {
  res.render("deleteadvisorSID");
});

app.post("/deleteadvSID", function(req, res) {

  var info = { S_ID: req.body.std_SID};
  var q = "DELETE FROM advisor WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/deleteadvIID", function(req, res) {

  var info = { I_ID: req.body.std_IID};
  var q = "DELETE FROM advisor WHERE ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});
// --- INSERT --- ///

app.get("/insert", function (req, res) {
  res.render("insert");
});

app.get("/insertadvisor", function (req, res) {
  res.render("insertadvisor");
});

app.get("/insertdepartment", function (req, res) {
  res.render("insertdepartment");
});

app.get("/insertstudent", function (req, res) {
  res.render("insertstudent");
});

app.get("/insertinstructor", function (req, res) {
  res.render("insertinstructor");
});

app.post("/insertadv", function(req, res) {

  const min = 100000; 
  const max = 999999; 

  if (req.body.std_SID == "") req.body.std_SID = (Math.floor(Math.random() * (max - min + 1)) + min).toString;
  if (req.body.std_IID == "") req.body.std_IID = (Math.floor(Math.random() * (max - min + 1)) + min).toString;
  
  var info = { S_ID: req.body.std_SID, I_ID: req.body.std_IID};
  var q = "INSERT INTO advisor SET ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error); 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/insertins", function(req, res) {

  const min = 100000; 
  const max = 999999; 

  if (req.body.std_ID == "") req.body.std_ID = (Math.floor(Math.random() * (max - min + 1)) + min).toString;
  if (req.body.std_building == "") req.body.std_building = "none";
  if (req.body.std_dept == "") req.body.std_dept = "none";
  if (req.body.std_salary == "") req.body.std_salary = "0";

  var info = { ID: req.body.std_ID, name: req.body.std_name, dept_name: req.body.std_dept, salary: req.body.std_salary};
  var q = "INSERT INTO instructor SET ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/insertdept", function(req, res) {

  if (req.body.std_budget == "") req.body.std_budget = "0";
  if (req.body.std_building == "") req.body.std_building = "none";
  if (req.body.std_dept == "") req.body.std_dept = "none";

  var info = { dept_name: req.body.std_dept, building: req.body.std_building, budget: req.body.std_budget};
  var q = "INSERT INTO department SET ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});

app.post("/insertstud", function(req, res) {

  const min = 100000; 
  const max = 999999; 

  if (req.body.std_ID == "") req.body.std_ID = (Math.floor(Math.random() * (max - min + 1)) + min).toString;
  if (req.body.std_building == "") req.body.std_building = "none";
  if (req.body.std_dept == "") req.body.std_dept = "none";
  if (req.body.std_credits == "") req.body.std_credits = "0";

  var info = { ID: req.body.std_ID, name: req.body.std_name, dept_name: req.body.std_dept, tot_credit: req.body.std_credits};
  var q = "INSERT INTO student SET ?";
  var success = true;

  con.query(q, info, function(error, results) {
  if (error) throw err; 
  
  if (results.affectedRows == 0) success = false;

  console.log(results);

  if (success) res.redirect("/querysuccess"); // redirect to success page
  else res.redirect("/queryfailure"); // redirect to error page, query failed
});
});
// --- SEARCH --- //

app.get("/search", function (req, res) {
  res.render("search");
});

app.get("/searchdepartment", function (req, res) {
  res.render("searchdepartment");
});

app.get("/searchstudent", function (req, res) {
  res.render("searchstudent");
});

app.get("/searchinstructor", function (req, res) {
  res.render("searchinstructor");
});

app.get("/searchadvisor", function (req, res) {
  res.render("searchadvisor");
});

app.post("/searchAdvisor", function(req, res) {
  var S_ID = req.body.std_S_ID;
  var I_ID = req.body.std_I_ID;
  var params = [S_ID, I_ID];

  var q = "SELECT * FROM advisor WHERE S_ID = ? AND I_ID = ?";

  if (S_ID == "" && I_ID == "") 
  {
    q = "SELECT * FROM advisor";
  }

  else if (I_ID == "")
  {
    q = "SELECT * FROM advisor WHERE S_ID ?";
    params = S_ID;
  }

  else if (S_ID == "")
  {
    q = "SELECT * FROM advisor WHERE I_ID ?";
    params = I_ID;
  }

  con.query(q, params, function(error, results) {
    if (error) throw err;

    if (results.length > 0) {
      // Match found
      res.redirect("/searchsuccess"); // Redirect to a success page
    } else {
      // No match found
      res.redirect("/searchfailure"); // Redirect to an error page, no matching entry
    }
  });
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
