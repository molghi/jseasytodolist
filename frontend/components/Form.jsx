import { useState, useEffect, useRef, useContext } from "react";
import MyContext from "../context/MyContext";
import { createTask, modifyTaskName } from "../utils/task";

function Form({ title = "Add Your Task" }) {
  const { setTasks, setShowFlashMsg, setFlashMsgData, taskInEdit, taskIdInEdit, setTaskInEdit, currentPage, setAllUserTasksCount } = useContext(MyContext);

  const [btnText, setBtnText] = useState(title.includes("Add") ? "Add Task" : "Edit Task");
  const [btnBg, setBtnBg] = useState(title.includes("Add") ? "bg-blue-500" : "bg-green-500");
  const [blockTitle, setBlockTitle] = useState(title.includes("Add") ? "Add Your Task" : "Edit Your Task");
  const [inputValue, setInputValue] = useState("");
  const formInputRef = useRef(null);

  useEffect(() => {
    if (taskInEdit) {
      setBlockTitle("Edit Your Task");
      setBtnText("Edit Task");
      setInputValue(taskInEdit);
      setBtnBg("bg-green-500");
      formInputRef.current.focus();
    }
  }, [taskInEdit]);

  const submitForm = async (e) => {
    e.preventDefault();
    // shoot network request
    if (!taskInEdit) {
      // create new task
      createTask(inputValue, currentPage, setTasks, setInputValue, setShowFlashMsg, setFlashMsgData, setAllUserTasksCount);
    } else {
      // modify task name
      modifyTaskName(taskIdInEdit, inputValue, setTaskInEdit, setBlockTitle, setBtnText, setBtnBg, setTasks, setInputValue, setShowFlashMsg, setFlashMsgData);
    }
  };

  // ============================================================================

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-md shadow">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-white">{blockTitle}</h1>

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <input
          type="text"
          ref={formInputRef}
          placeholder="Enter Task Name"
          autoFocus
          className="px-4 py-2 border border-gray-300 bg-[#111] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type="submit" className={`px-4 py-2 text-white font-semibold rounded hover:opacity-60 transition duration-300 ${btnBg}`}>
          {btnText}
        </button>
      </form>
    </section>
  );
}

export default Form;
