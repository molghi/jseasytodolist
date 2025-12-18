import { deleteTask, toggleFinished, showUpdateForm } from "../utils/task.js";

function Task({ task, setTasks, setShowFlashMsg, setFlashMsgData, setTaskInEdit, setTaskIdInEdit }) {
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
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 mb-4 shadow rounded border border-gray-200 bg-gray-800 transition duration-300 hover:bg-gray-900">
      {/* Task Info */}
      <div className="flex-1 space-y-3">
        <p className={`text-lg font-semibold text-white ${task.isFinished ? "opacity-60 line-through" : ""}`}>{task.name}</p>
        {/* <p className="text-sm text-white">Finished: No</p> */}
        <div className="flex text-sm items-center text-white gap-3 opacity-50 transition duration-300 hover:opacity-100">
          <p className="">
            <span className="font-bold">Created at:</span> {formatDate(task.createdAt)}
          </p>{" "}
          —
          <p className="">
            <span className="font-bold">Updated at:</span> {formatDate(task.updatedAt)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap max-w-[160px]">
        <span className="flex-1 basis-full text-white font-bold">Actions</span>
        {/* edit name */}
        <button
          className="mt-2 sm:mt-0 px-4 py-1 bg-purple-700 text-white rounded hover:opacity-60 transition duration-300"
          title="Edit Task Name"
          onClick={() => showUpdateForm(task, setTaskInEdit, setTaskIdInEdit)}
        >
          ✏️
        </button>
        {/* toggle complete/uncomplete */}
        <button
          className={`mt-2 sm:mt-0 px-4 py-1 text-white rounded hover:opacity-60 transition duration-300 ${task.isFinished ? "bg-orange-500" : "bg-green-500"}`}
          title={`${!task.isFinished ? "Complete" : "Uncomplete"} Task`}
          onClick={() => toggleFinished(task, setTasks, setShowFlashMsg, setFlashMsgData)}
        >
          ✔️
        </button>
        {/* delete */}
        <button
          onClick={() => deleteTask(task, setTasks)}
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
