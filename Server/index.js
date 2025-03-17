const express = require("express");
const cors = require("cors"); // makes the connection on different ports
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const TaskRoutes = require("./routers/taskRoutes");

const mongoose = require("mongoose");
const UserModel = require("./models/User");
const saltRounds = 10; // Determines how strong the hash is

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tasks", TaskRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/User")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.post("/register", async (req, res) => {
  const { userName, email, passWord } = req.body;
  try {
    const existingEmail = await UserModel.findOne({ email });
    const existingUserName = await UserModel.findOne({ userName });

    if (existingEmail && existingUserName) {
      return res.status(400).json({ error: "Username and Email in use" });
    }
    if (existingEmail) {
      console.log("existing account");
      return res.status(400).json({ error: "Email in use" });
    }
    if (existingUserName) {
      console.log("existing Username");
      return res.status(400).json({ error: "Username in use" });
    }

    const hashedPassword = await bcrypt.hash(req.body.passWord, saltRounds);
    const user = await UserModel.create({
      userName: req.body.userName,
      email: req.body.email,
      passWord: hashedPassword, // Store hashed password, NOT the plain text one
    });
    console.log("📩 Received data:", req.body); // Debugging line

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password,rememberMe } = req.body; // Use `password` for consistency
    const user = await UserModel.findOne({ email });
    const expiresIn = rememberMe ? "7d" : "1h"; //  Extend token expiration if Remember Me is checked

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passWord);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: expiresIn }
    );

    // Remove password from user object before sending response
    const userData = user.toObject();
    delete userData.passWord;
    
    res
      .status(200)
      .json({ message: "Login successful", token, user: userData });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running", PORT);
});
