const cohorts = require("./cohorts.json");
const students = require("./students.json");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const cookieParser = require("cookie-parser");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");
const PORT = 5005;
const cors = require("cors");

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
app.use(cors("*"));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/readme", (req, res) => {
  res.sendFile(__dirname + "/README.md");
});
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENTS ROUTES 
//Create new student
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
    projects: req.body.projects,
  })
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      console.log("Error while posting ", error);
      res.status(500).json({ error: "Failed to create the student" });
    });
});

//Get all students
app.get("/api/students", (req, res) => {
  Student.find({})
  .then((allStudents) => {
    res.status(200).json(allStudents)
  })
  .catch((error) => {
    res.status(500).json({message: "Error while trying to get all students"});
  })
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Student.find({cohort:cohortId})
  .then((result) => {  // "result" is the array of results that is returned by the find method (promise). every ditto we put inside the () of the then is automatically the result of find.
    console.log("request -> ", req)
    res.status(200).json(result);
  })
  .catch((error) => {
    console.log("error -> ", error)
    res.status(500).json({message: "Error while trying to get student by cohort"});
  });

})

app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
  .populate("cohort")
  .then((student) => {
    res.status(200).json(student)
  })
  .catch((error) => {
    res.status(500).json({message: "Error getting one student"})
  })
})

// Update existing student 
app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, {new:true} ) // {new:true} updates the response we send to the frontend. without it, the visual part is updated too, but the response is not
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      res.status(500).json({message: "Error while updating student"});
    });
});

//Delete a student
app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
  .then((student) => {
    res.json(student);
  })
  .catch((error) => {
    res.status(500).json({message: "Error while deleting a student"})
  })
})

// COHORTS ROUTES
//Create new cohort
app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      console.log("Error creating a new cohort", error);
      res.status(500).json({ error: "failed creating a new cohort" });
    });
});

//Get all cohorts
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
  .then((allCohorts) => {
    res.status(200).json(allCohorts)
  })
  .catch((error) => {
    res.status(500).json({message: "Error while trying to get all cohorts"})
  })
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
  .then((cohort) => {
    res.status(200).json(cohort);
  })
  .catch((error) => {
    res.status(500).json({message: "Error while getting the cohort"});
  });
});

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {new:true})
  .then((cohort) => {
    res.status(200).json(cohort);
  })
  .catch((error) => {
    res.status(500).json({message: "Error while updating a cohort"})
  })
})

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
  .then((cohort) => {
    res.json(cohort);
  })
  .catch((error) => {
    res.status(500).json({message: "Error while trying to delete cohort"})
  })
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
