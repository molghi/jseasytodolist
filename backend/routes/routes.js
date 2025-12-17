const express = require("express");
const router = express.Router();
const { createTask, getTasks } = require("../controllers/taskController");

// create task
router.post("/tasks", createTask);

// get all tasks
router.get("/tasks", getTasks);

module.exports = router;
