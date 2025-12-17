import Task from "./Task";

function Tasks() {
  return (
    <section className="max-w-3xl mx-auto mt-16 p-6 bg-gray-800 rounded shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Tasks</h1>
        <div className="flex space-x-8 mt-2 sm:mt-0">
          {/* <span className="text-white">Total: 12</span> */}
          <span className="text-white">
            <span className="font-bold opacity-60">Done / All:</span> 4 / 12
          </span>
        </div>
      </div>

      {/* Task List Container */}
      <div className="space-y-4">
        <Task />
      </div>
    </section>
  );
}

export default Tasks;
