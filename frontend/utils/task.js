import axios from "axios";

const deleteTask = async (task, setTasks) => {
  const answer = confirm(`Are you sure you want to delete this task?\n\nName: ${task.name}\n\nWARNING! This action cannot be undone.`);
  if (!answer) return;
  // send delete network req
  const taskId = task._id;
  // Error handling
  try {
    const response = await axios.delete(`http://localhost:8000/tasks/${taskId}`);
    console.log("delete request response:", response);
    if (response.status === 200) {
      // modify tasks piece of state, filter deleted task out
      const deletedTaskId = response.data.deletedTask._id;
      setTasks((prevState) => {
        return prevState.filter((task) => task._id !== deletedTaskId);
      });
    }
  } catch (error) {
    console.log("ERROR: deleteTask", error);
  }
};

// ============================================================================

const toggleFinished = async (task, setTasks, setShowFlashMsg, setFlashMsgData) => {
  const taskId = task._id;
  // send patch network req -- update task's isFinished by id
  try {
    const response = await axios.patch(`http://localhost:8000/tasks/${taskId}`, { isFinished: !task.isFinished });
    console.log("toggleFinished request response:", response);
    if (response.status === 200) {
      // update state
      setTasks((prevState) => {
        return prevState.map((entry) =>
          entry._id === taskId ? { ...entry, isFinished: !entry.isFinished, updatedAt: response.data.updatedTask.updatedAt } : entry
        );
        // return prevState.map((entry) => (entry._id === taskId ? (entry.isFinished = !entry.isFinished) : entry)); // wrong: must spread first, then reassign
      });

      // show flash msg
      setShowFlashMsg(true);
      setFlashMsgData(["success", "Task updated."]);
    }
  } catch (error) {
    console.log("ERROR: toggleFinished", error);
  }
};

// ============================================================================

const showUpdateForm = async (task, setTaskInEdit, setTaskIdInEdit) => {
  // change form: title, button, put task name in input
  setTaskInEdit(task.name);
  setTaskIdInEdit(task._id);
  // maybe change 'mode' piece of state to send req to different endpoint
};

// ============================================================================

export { deleteTask, toggleFinished, showUpdateForm };
