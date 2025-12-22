const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { createTask, getTasks, deleteTask, updateTask } = require("../controllers/taskController");
const { createUser, logout, login } = require("../controllers/userController");

// create task
router.post("/tasks", auth, createTask);

// get all tasks
router.get("/tasks", auth, getTasks);

// delete task
router.delete("/tasks/:id", auth, deleteTask); // auth-protecting is redundant since un-authed user gets no tasks returned

// update task
router.patch("/tasks/:id", auth, updateTask); // auth-protecting is redundant since un-authed user gets no tasks returned

// create user
router.post("/users", createUser);

// log out
router.get("/logout", logout); // auth-protecting is redundant since un-authed users can't log out

// log in
router.post("/login", login);

module.exports = router;
