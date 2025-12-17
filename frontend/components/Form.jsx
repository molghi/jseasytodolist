import { useState } from "react";
import axios from "axios";

function Form({ title = "Add Your Task" }) {
  const [btnText, setBtnText] = useState(title.includes("Add") ? "Add Task" : "Edit Task");
  const [btnBg, setBtnBg] = useState(title.includes("Add") ? "bg-blue-500" : "bg-green-500");
  const [inputValue, setInputValue] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    // shoot network request
    const newTask = {
      name: inputValue,
    };
    axios.post("http://localhost:8000/tasks", newTask); // create task
  };

  // ============================================================================

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-md shadow">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-white">{title}</h1>

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Task Name"
          autoFocus
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
