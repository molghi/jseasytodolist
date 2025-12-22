import { useEffect, useContext } from "react";
import MyContext from "../context/MyContext";
import axios from "axios";
import Task from "./Task";

function Tasks() {
  const { tasks, setTasks, finishedTasks, setFinishedTasks, allUserTasksCount } = useContext(MyContext);

  useEffect(() => {
    // get all tasks from db
    const getTasks = async () => {
      try {
        const response = await axios.get("/tasks", { withCredentials: true }); // credentials enabled to include httpOnly token cookie
        if (response.status === 200) {
          setTasks(response.data.tasks);
          setFinishedTasks(response.data.finishedTasks);
        }
      } catch (error) {
        console.error("OOPS!", error);
      }
    };
    getTasks();
  }, []);

  return (
    <section className="max-w-3xl mx-auto mt-16 p-6 bg-gray-800 rounded shadow">
      {/* Block header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white">Your Tasks</h1>

        {/* Count finished tasks to all user tasks */}
        <div className="flex space-x-8 mt-2 sm:mt-0">
          <span className="text-white" title="Finished tasks to all user tasks">
            <span className="font-bold opacity-50">Done / All:</span> {finishedTasks} / {allUserTasksCount}
          </span>
        </div>
      </div>

      {/* Task List Box */}
      <div className="space-y-6">
        {tasks && tasks.length > 0 ? tasks.map((task) => <Task key={task._id} task={task} />) : <div className="text-white text-center">No tasks created.</div>}
      </div>
    </section>
  );
}

export default Tasks;
