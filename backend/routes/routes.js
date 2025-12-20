const express = require("express");
const router = express.Router();
const { createTask, getTasks, deleteTask, updateTask } = require("../controllers/taskController");
const { createUser, checkToken } = require("../controllers/userController");

// create task
router.post("/tasks", createTask);

// get all tasks
router.get("/tasks", getTasks);

// delete task
router.delete("/tasks/:id", deleteTask);

// update task
router.patch("/tasks/:id", updateTask);

// create user
router.post("/users", createUser);

// check token
// router.post("/users/me", checkToken);

module.exports = router;
