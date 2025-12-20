const taskModel = require("../models/taskModel");
const jwt = require("jsonwebtoken");

// @desc    create task
// @route   POST /tasks
async function createTask(req, res) {
  const newTaskObj = req.body;

  // validate input
  if (!newTaskObj.name.trim() || newTaskObj.name.trim().length < 3) {
    // if not good, throw error
    return res.status(400).json({ msg: "Invalid task name" });
  }

  // if good, form an obj for db (with task id, userId, timestamps, isFinished)
  const task = {
    userId: "64a1f8c3b1234e567890abcd", // HARDCODED
    name: newTaskObj.name.trim(),
  };

  // insert into db -- not everything but only what's needed
  const insertedTask = await taskModel.create(task); // it's async

  // return either inserted or all -- on frontend, re-render it
  return res.status(201).json({ msg: "Task inserted successfully", task: insertedTask });
}

// ============================================================================

// @desc    get all tasks
// @route   GET /tasks
async function getTasks(req, res) {
  // verify user
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ msg: "Not Authorized" });
  } else {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ msg: "Not authorized" });
    }
  }

  // must be auth protected
  // query db, return all entries, newest first
  const tasks = await taskModel.find().sort({ createdAt: -1 });
  // return response to frontend -- on frontend, re-render it
  return res.status(200).json({ msg: "Tasks retrieved successfully", tasks });
}

// ============================================================================

async function deleteTask(req, res) {
  // must be auth protected

  const task = await taskModel.findById(req.params.id);
  if (task) {
    // query db, delete one task
    const deletedTask = await taskModel.findByIdAndDelete(req.params.id);

    // return response to frontend
    return res.status(200).json({ msg: "Deletion successful", deletedTask });
  } else {
    return res.status(404).json({ msg: "Task not found" });
  }
}

// ============================================================================

async function updateTask(req, res) {
  // check existence
  const task = await taskModel.findById(req.params.id);

  if (task) {
    let updatedTask;
    if (Object.keys(req.body).includes("isFinished")) {
      // modify task's isFinished
      updatedTask = await taskModel.findByIdAndUpdate(task._id, { isFinished: req.body.isFinished }, { new: true }); // { new: true } to return updated doc (after update)
    } else {
      // modify task's name
      updatedTask = await taskModel.findByIdAndUpdate(task._id, { name: req.body.name }, { new: true }); // { new: true } to return updated doc (after update)
    }
    // return response to frontend
    return res.status(200).json({ msg: "Update successful", updatedTask });
  } else {
    return res.status(404).json({ msg: "Task not found" });
  }
}

// ============================================================================

module.exports = { createTask, getTasks, deleteTask, updateTask };
