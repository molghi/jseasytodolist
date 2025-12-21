import { useEffect, useContext } from "react";
import MyContext from "../context/MyContext";
import axios from "axios";
import Task from "./Task";

function Tasks() {
  const { tasks, setTasks, finishedTasks, setFinishedTasks } = useContext(MyContext);

  useEffect(() => {
    // get all tasks from db
    const getTasks = async () => {
      const response = await axios.get("/tasks", { withCredentials: true }); // credentials enabled to include httpOnly token cookie
      console.log("get all tasks response:", response);
      setTasks(response.data.tasks);
      if (response.data.tasks.length > 0) {
        setFinishedTasks(response.data.tasks.filter((task) => task.isFinished).length);
      }
    };
    getTasks();
  }, []);

  return (
    <section className="max-w-3xl mx-auto mt-16 p-6 bg-gray-800 rounded shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Your Tasks</h1>
        <div className="flex space-x-8 mt-2 sm:mt-0">
          {/* <span className="text-white">Total: 12</span> */}
          <span className="text-white">
            <span className="font-bold opacity-50">Done / All:</span> {finishedTasks} / {tasks ? tasks.length : 0}
          </span>
        </div>
      </div>

      {/* Task List Container */}
      <div className="space-y-6">{tasks ? tasks.map((task) => <Task key={task._id} task={task} />) : ""}</div>
    </section>
  );
}

export default Tasks;
