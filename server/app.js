const cohorts = require("./cohorts.json")
const students = require("./students.json")
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose")
require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI
const cookieParser = require("cookie-parser");
const Student = require("./models/Student.model");
const PORT = 5005;


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// CONNECT TO MONGODB
mongoose
	.connect(MONGODB_URI)
	.then((res) =>
		console.log(
			`Connected to Mongo! Database name: "${res.connections[0].name}"`
		)
	)
	.catch((err) => console.error("Error connecting to mongo", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/readme", (req, res) => {
  res.sendFile(__dirname + "/README.md");
});
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});
app.get("/api/students", (req, res) => {
  res.json(students);
});

app.post("/api/students", (req, res) => {
	Student.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName, 
		email: req.body.email,
		phone: req.body.phone, 
		linkedinUrl: req.body.linkedinUrl, 
		languages: req.body.languages, 
		program: req.body.program, 
		background: req.body.background, 
		image: req.body.image, 
		cohort: req.body.cohort, 
		projects: req.body.projects
	})
	.then((createdStudent) => {
		res.status(201).json(createdStudent);
	})
	.catch((error) => {
		console.log("Error while posting ", error)
		res.status(500).json({error: "Failed to create the student"});
	})
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});