const express = require("express");
const app = express();
const mongoose = require("mongoose");
const registerUser = require("./models/schema");
const cors = require("cors");
const bcrypt = require("bcrypt");
const registeredRecruiter = require("./models/schema2");
const registerUserss = require("./models/schema");
const { configDotenv } = require("dotenv");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

app.get("/", (req, res) => res.send("HelloWorld!!z"));
app.post("/register/jobseekers", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    mobilenumber,
    jobRole,
  } = req.body;
  console.log(req.body);

  try {
    //count increase aithundhi kani knipachtle y
    const existingUser = await registerUserss.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new registerUserss({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      mobileNumber: mobilenumber,
      jobRole,
    });

    await user.save();
    res.send("Inserted successfully");
  } catch (error) {
    res.status(500).send("Error inserting user: " + error.message);
  }
});

app.post("/register/recruiters", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    mobilenumber,
    jobRole,
  } = req.body;

  try {
    const existingUser = await registeredRecruiter.findOne({ email });
    console.log(existingUser); //
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new registeredRecruiter({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      mobileNumber: mobilenumber,
      jobRole,
    });

    await user.save();
    res.send("Inserted successfully");
  } catch (error) {
    res.status(500).send("Error inserting user: " + error.message);
  }
});

app.post("/login/jobseekers", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // Check if user exists
    const existingUser = await registerUser.findOne({ email });
    if (!existingUser) {
      return res.status(401).send("Invalid email or password.");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    ); // Use existingUser instead of user
    console.log(isPasswordValid);
    if (isPasswordValid) {
      return res.send("");
    } else {
      return res.status(401).send("Invalid email or password.");
    }
  } catch (error) {
    console.error("Login error: ", error); // Log the error to the console for debugging
    res.status(500).send("Server error: " + error.message);
  }
});

app.post("/login/recruiters", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // Check if user exists
    const existingUser = await registeredRecruiter.findOne({ email });
    if (!existingUser) {
      return res.status(401).send("Invalid email or password.");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    ); // Use existingUser instead of user
    console.log(isPasswordValid);
    if (isPasswordValid) {
      return res.send("");
    } else {
      return res.status(401).send("Invalid email or password.");
    }
  } catch (error) {
    console.error("Login error: ", error); // Log the error to the console for debugging
    res.status(500).send("Server error: " + error.message);
  }
});

app.listen(3000, () => {
  //first step listen  ikada server start ayyidi
  console.log("listening");
});
