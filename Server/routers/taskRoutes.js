const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify user
const router = express.Router();
const Task = require("../models/Task");
require("dotenv").config();

// GET All Tasks for a User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  console.log("📩 Incoming request body:", req.body);
  console.log("🔑 Incoming token:", req.header("Authorization"));

  if (!req.user) {
    console.error("🚨 Auth Middleware failed: No user attached");

    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  const { task, taskSection } = req.body;
  if (!task || !taskSection) {
    console.error("❌ Missing fields: Task or Section");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newTask = await Task.create({
      task,
      taskSection,
      userId: req.user.id,
    });
    res.status(201).json({ message: "New Task registered", newTask });
  } catch (err) {
    console.error("❌ Task creation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE Task (Toggle Completion)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task does not exist" });
    }
    task.status = !task.status; // Toggle completion status
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE a Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { taskIds } = req.body; // Expecting an array of task IDs
    await Task.deleteMany({ _id: { $in: taskIds } });
    res.status(200).json({ message: "Tasks deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting tasks" });
  }
});

module.exports = router;
