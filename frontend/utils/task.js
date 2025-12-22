import axios from "axios";

const deleteTask = async (task, setTasks, setShowFlashMsg, setFlashMsgData, setAllUserTasksCount, currentPage, setFinishedTasks) => {
  const answer = confirm(`Are you sure you want to delete this task?\n\nName: ${task.name}\n\nWARNING! This action cannot be undone.`);
  if (!answer) return;
  // send delete network req
  const taskId = task._id;
  // Error handling
  try {
    const response = await axios.delete(`/tasks/${taskId}`);
    // console.log("delete request response:", response);
    if (response.status === 200) {
      // modify tasks piece of state
      const responseGetTasks = await axios.get(`/tasks?page=${currentPage}`, { withCredentials: true });
      setShowFlashMsg(true);
      setFlashMsgData(["success", "Task deleted successfully!"]);
      setTasks(responseGetTasks.data.tasks);
      setAllUserTasksCount(responseGetTasks.data.allUserTasksCount);
      setFinishedTasks(response.data.finishedTasks);
    }
  } catch (error) {
    console.log("ERROR: deleteTask", error);
  }
};

// ============================================================================

const toggleFinished = async (task, setTasks, setShowFlashMsg, setFlashMsgData, setFinishedTasks) => {
  const taskId = task._id;
  // send patch network req -- update task's isFinished by id
  try {
    const response = await axios.patch(`/tasks/${taskId}`, { isFinished: !task.isFinished });
    // console.log("toggleFinished request response:", response);
    if (response.status === 200) {
      let tasks;
      // update state
      setTasks((prevState) => {
        tasks = prevState.map((entry) =>
          entry._id === taskId ? { ...entry, isFinished: !entry.isFinished, updatedAt: response.data.updatedTask.updatedAt } : entry
        );
        // setFinishedTasks(tasks.filter((task) => task.isFinished).length);
        setFinishedTasks(response.data.finishedTasks);
        return tasks;
        // return prevState.map((entry) => (entry._id === taskId ? (entry.isFinished = !entry.isFinished) : entry)); // wrong: must spread first, then reassign
      });

      // show flash msg
      setShowFlashMsg(true);
      setFlashMsgData(["success", "Task updated!"]);
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

const createTask = async (inputValue, currentPage, setTasks, setInputValue, setShowFlashMsg, setFlashMsgData, setAllUserTasksCount) => {
  const newTask = {
    name: inputValue,
  };

  const response = await axios.post("/tasks", newTask, { withCredentials: true });

  // console.log("create new task response:", response);

  if (response.status >= 200 && response.status < 300) {
    const responseGetTasks = await axios.get(`/tasks?page=${currentPage}`, { withCredentials: true });
    // console.log(responseGetTasks);
    // setTasks((prevState) => [response.data.task, ...prevState]);
    setTasks(responseGetTasks.data.tasks);
    setAllUserTasksCount(responseGetTasks.data.allUserTasksCount);
    setInputValue("");
    setShowFlashMsg(true);
    setFlashMsgData(["success", "Task created!"]);
  }
};

// ============================================================================

const modifyTaskName = async (
  taskIdInEdit,
  inputValue,
  setTaskInEdit,
  setBlockTitle,
  setBtnText,
  setBtnBg,
  setTasks,
  setInputValue,
  setShowFlashMsg,
  setFlashMsgData
) => {
  const response = await axios.patch(`/tasks/${taskIdInEdit}`, { name: inputValue }, { withCredentials: true });

  // console.log("modify task name response:", response);

  setTaskInEdit("");
  setBlockTitle("Add Your Task");
  setBtnText("Add Task");
  setBtnBg("bg-blue-500");
  setTasks((prevState) => {
    return prevState.map((entry) => (entry._id === taskIdInEdit ? { ...entry, name: inputValue, updatedAt: response.data.updatedTask.updatedAt } : entry));
  });

  setInputValue("");
  setShowFlashMsg(true);

  if (response.status >= 200 && response.status < 300) {
    setFlashMsgData(["success", "Task name updated!"]);
  }
};

// ============================================================================

export { deleteTask, toggleFinished, showUpdateForm, createTask, modifyTaskName };
