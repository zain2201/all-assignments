const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const admin = ADMINS.find(
    (elem) => elem.username == username && elem.password == password
  );
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};
const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const admin = USERS.find(
    (elem) => elem.username == username && elem.password == password
  );
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};

// Admin routes

app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = ADMINS.find(
    (elem) => elem.username === username && elem.password === password
  );
  if (admin) {
    res.status(403).json({ message: "admin already exists" });
  } else {
    ADMINS.push(req.body);
    res.json({ message: "admin created successfully" });
  }
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.json({ message: "admin logged in successfully" });
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
  // logic to create a course
  const course = req.body;
  course = { ...course, courseID: Date.now() };
  COURSES.push(course);
  res.json({ message: "course created successfully", courseID: Date.now() });
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  // logic to edit a course
  const courseID = req.params.courseId;
  const course = COURSES.find((elem) => elem.id === courseID);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: "course updated successfully" });
  } else res.status(403).json({ message: "course not found" });
});

app.get("/admin/courses", adminAuthentication, (req, res) => {
  // logic to get all courses
  res.json({ courses: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const admin = USERS.find(
    (elem) => elem.username === username && elem.password === password
  );
  if (admin) {
    res.status(403).json({ message: "user already exists" });
  } else {
    USERS.push(req.body);
    res.json({ message: "user created successfully" });
  }
});

app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  res.json({ message: "user logged in successfully" });
});

app.get("/users/courses", userAuthentication, (req, res) => {
  // logic to list all courses
  res.json({ courses: COURSES });
});

app.post("/users/courses/:courseId", userAuthentication, (req, res) => {
  // logic to purchase a course

  res.json({ message: "Course purchased successfully" });
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
