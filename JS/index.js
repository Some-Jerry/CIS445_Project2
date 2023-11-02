var express = require('express');
var app = express();
var mysql = require('mysql');

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

// Define a route to fetch data from the database
app.get('/display', (req, res) => {
  // Fetch data from the tables
  const departmentQuery = 'SELECT * FROM department';
  const studentQuery = 'SELECT * FROM student';
  const instructorQuery = 'SELECT * FROM instructor';
  const advisorQuery = 'SELECT * FROM advisor';

  const departmentData = [];
  const studentData = [];
  const instructorData = [];
  const advisorData = [];

  con.query(departmentQuery, (err, departmentResults) => {
    if (err) {
      console.error('Error querying the department table:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    departmentData.push(departmentResults);

    con.query(studentQuery, (err, studentResults) => {
      if (err) {
        console.error('Error querying the student table:', err);
        res.status(500).send('Error fetching data');
        return;
      }
      studentData.push(studentResults);

      con.query(instructorQuery, (err, instructorResults) => {
        if (err) {
          console.error('Error querying the instructor table:', err);
          res.status(500).send('Error fetching data');
          return;
        }
        instructorData.push(instructorResults);

        con.query(advisorQuery, (err, advisorResults) => {
          if (err) {
            console.error('Error querying the advisor table:', err);
            res.status(500).send('Error fetching data');
            return;
          }
          advisorData.push(advisorResults);

          res.render('display', {
            departmentData,
            studentData,
            instructorData,
            advisorData
          });
        });
      });
    });
  });
});

app.set("view engine", "ejs"); // template engine
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

// Start here to enter the data you want
app.get("/menu", function (req, res) {
  res.render("menu", { name: req.body.std_name, id: req.body.std_id });
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
