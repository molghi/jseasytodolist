const express = require("express");
const router = express.Router();
const { createTask, getTasks, deleteTask, updateTask } = require("../controllers/taskController");
const { createUser, checkToken, logout, login } = require("../controllers/userController");

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

// log out
router.get("/logout", logout);

// log in
router.post("/login", login);

module.exports = router;
