import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import MyContext from "../context/MyContext";

function Form({ title = "Add Your Task" }) {
  const { setTasks, setShowFlashMsg, setFlashMsgData, taskInEdit, taskIdInEdit, setTaskInEdit } = useContext(MyContext);
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
      const newTask = {
        name: inputValue,
      };
      const response = await axios.post("http://localhost:8000/tasks", newTask);
      console.log("create new task response:", response);
      setTasks((prevState) => [response.data.task, ...prevState]);
      setInputValue("");
      setShowFlashMsg(true);
      if (response.status >= 200 && response.status < 300) setFlashMsgData(["success", "Operation successful!"]);
    } else {
      // modify task name
      const response = await axios.patch(`http://localhost:8000/tasks/${taskIdInEdit}`, { name: inputValue });
      console.log("modify task name response:", response);
      setTaskInEdit("");
      setBlockTitle("Add Your Task");
      setBtnText("Add Task");
      setBtnBg("bg-blue-500");
      setTasks((prevState) => {
        return prevState.map((entry) => (entry._id === taskIdInEdit ? { ...entry, name: inputValue, updatedAt: response.data.updatedTask.updatedAt } : entry));
      });
      setInputValue("");
      setShowFlashMsg(true);
      if (response.status >= 200 && response.status < 300) setFlashMsgData(["success", "Operation successful!"]);
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
