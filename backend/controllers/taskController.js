// @desc    create task
// @route   POST /tasks
function createTask(req, res) {
  const newTaskObj = req.body;
  console.log(newTaskObj);
  // validate input
  // if not good, throw error
  // if good, form an obj for db (with userId, timestamps, isFinished)
  // insert into db -- not everything but only what's needed
  // return either inserted or all -- on frontend, re-render it
}

// ============================================================================

// @desc    get all tasks
// @route   GET /tasks
function getTasks(req, res) {
  // must be auth protected
  // query db, return all entries
  // return response to frontend -- on frontend, re-render it
}

module.exports = { createTask, getTasks };
