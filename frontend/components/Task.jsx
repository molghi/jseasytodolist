function Task() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 mb-4 shadow rounded border border-gray-200 bg-gray-800">
      {/* Task Info */}
      <div className="flex-1 space-y-3">
        <p className="text-lg font-semibold text-white">Task Name Here</p>
        {/* <p className="text-sm text-white">Finished: No</p> */}
        <div className="flex gap-6 opacity-50 transition duration-300 hover:opacity-100">
          <p className="text-sm text-white">
            <span className="font-bold">Created at:</span> 2025-12-17
          </p>
          <p className="text-sm text-white">
            <span className="font-bold">Updated at:</span> 2025-12-17
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <button className="mt-2 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Complete</button>
    </div>
  );
}

export default Task;
