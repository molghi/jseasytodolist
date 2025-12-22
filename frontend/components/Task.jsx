import { useContext } from "react";
import MyContext from "../context/MyContext.jsx";
import { deleteTask, toggleFinished, showUpdateForm } from "../utils/task.js";

function Task({ task }) {
  const { setTasks, setShowFlashMsg, setFlashMsgData, setTaskInEdit, setTaskIdInEdit, setFinishedTasks, setAllUserTasksCount, currentPage } =
    useContext(MyContext);

  // format date string nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-UK", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div
      className={`flex gap-4 flex-col sm:flex-row items-center justify-between p-4 mb-4 shadow rounded border border-gray-200 bg-gray-800 transition duration-300 hover:bg-gray-900 ${
        task.isFinished ? "opacity-40 hover:opacity-100" : ""
      }`}
    >
      <div className="flex-1 space-y-3">
        {/* Task name */}
        <p className={`text-lg font-semibold text-white transition duration-300 ${task.isFinished ? "opacity-30 hover:opacity-100 line-through" : ""}`}>
          {task.name}
        </p>

        {/* Created at & updated at */}
        <div
          className={`flex text-sm items-center text-white gap-x-3 opacity-50 transition duration-300 hover:opacity-100 flex-col sm:flex-row ${
            task.isFinished ? "opacity-30" : ""
          }`}
        >
          <p>
            <span className="font-bold">Created at:</span> {formatDate(task.createdAt)}
          </p>{" "}
          <span>—</span>
          <p>
            <span className="font-bold">Updated at:</span> {formatDate(task.updatedAt)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap max-w-[160px]">
        {/* Actions block title */}
        <span className="flex-1 basis-full text-white font-bold">Actions</span>

        {/* Btn to edit task name */}
        <button
          className="mt-2 sm:mt-0 px-4 py-1 bg-purple-700 text-white rounded hover:opacity-60 transition duration-300"
          title="Edit Task Name"
          onClick={() => showUpdateForm(task, setTaskInEdit, setTaskIdInEdit)}
        >
          ✏️
        </button>

        {/* Btn to toggle task's complete/uncomplete */}
        <button
          className={`mt-2 sm:mt-0 px-4 py-1 text-white rounded hover:opacity-60 transition duration-300 ${task.isFinished ? "bg-orange-500" : "bg-green-500"}`}
          title={`${!task.isFinished ? "Complete" : "Uncomplete"} Task`}
          onClick={() => toggleFinished(task, setTasks, setShowFlashMsg, setFlashMsgData, setFinishedTasks)}
        >
          ✔️
        </button>

        {/* Btn to delete task */}
        <button
          onClick={() => deleteTask(task, setTasks, setShowFlashMsg, setFlashMsgData, setAllUserTasksCount, currentPage, setFinishedTasks)}
          className="mt-2 sm:mt-0 px-4 py-1 bg-red-400 text-white rounded hover:opacity-60 transition duration-300"
          title="Delete Task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default Task;
