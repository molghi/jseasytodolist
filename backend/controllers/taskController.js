const taskModel = require("../models/taskModel");

// ============================================================================

// @desc    create task
// @route   POST /tasks
async function createTask(req, res) {
  const newTaskObj = req.body;

  // validate input
  if (!newTaskObj.name.trim() || newTaskObj.name.trim().length < 3) {
    return res.status(400).json({ msg: "Invalid task name" }); // if not good, throw error
  }

  // if all good, form an obj for db (with task id, userId, timestamps, isFinished)
  const task = {
    userId: req.user.id,
    name: newTaskObj.name.trim(),
  };

  // insert into db (not everything but only what's needed)
  const insertedTask = await taskModel.create(task); // it's async

  // return either inserted or all -- on frontend, re-render it
  return res.status(201).json({ msg: "Task inserted successfully", task: insertedTask });
}

// ============================================================================

// @desc    get all tasks
// @route   GET /tasks
async function getTasks(req, res) {
  const pageRequested = +req.query.page || 1;
  const resultsPerPage = 10;

  // query db, return entries, newest first
  const tasks = await taskModel
    .find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .skip((pageRequested - 1) * resultsPerPage)
    .limit(resultsPerPage);

  const allUserTasksCount = await taskModel.countDocuments({ userId: req.user.id });

  const finishedTasks = await taskModel.countDocuments({ userId: req.user.id, isFinished: true });

  // skip-limiting is more efficient than slicing all tasks

  // return response to frontend -- on frontend, re-render it
  return res.status(200).json({ msg: "Tasks retrieved successfully", tasks, allUserTasksCount, finishedTasks, name: req.user.name });
}

// ============================================================================

async function deleteTask(req, res) {
  // must be auth protected

  const task = await taskModel.findById(req.params.id);
  if (task) {
    // query db, delete one task
    const deletedTask = await taskModel.findByIdAndDelete(req.params.id);

    const finishedTasks = await taskModel.countDocuments({ userId: req.user.id, isFinished: true });

    // return response to frontend
    return res.status(200).json({ msg: "Deletion successful", deletedTask, finishedTasks });
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
    const finishedTasks = await taskModel.countDocuments({ userId: req.user.id, isFinished: true });

    // return response to frontend
    return res.status(200).json({ msg: "Update successful", updatedTask, finishedTasks });
  } else {
    return res.status(404).json({ msg: "Task not found" });
  }
}

// ============================================================================

module.exports = { createTask, getTasks, deleteTask, updateTask };
