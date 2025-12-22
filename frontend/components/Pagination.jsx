import { useContext } from "react";
import MyContext from "../context/MyContext";

function Pagination() {
  const { currentPage, setCurrentPage, tasks, allUserTasksCount } = useContext(MyContext);

  const paginate = (flag) => {
    if (flag === "next") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => {
        let newPage = prev - 1;
        if (newPage < 1) newPage = 1;
        return newPage;
      });
    }
  };

  const canPaginateNext = tasks.length === 10 && allUserTasksCount > 10;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center">
        {/* Prev btn */}
        <button
          title={currentPage === 1 ? "First page" : "Go to previous page"}
          onClick={() => paginate("prev")}
          disabled={currentPage === 1}
          className={`mt-2 sm:mt-0 px-4 py-2 text-white rounded transition duration-300 bg-blue-500 ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:opacity-60"
          }`}
        >
          Prev
        </button>

        {/* Info msg */}
        <span className="text-white text-sm opacity-50 transition duration-300 hover:opacity-100">Showing page {currentPage}</span>

        {/* Next btn */}
        <button
          title={!canPaginateNext ? "Last page" : "Go to next page"}
          onClick={() => paginate("next")}
          disabled={!canPaginateNext}
          className={`mt-2 sm:mt-0 px-4 py-2 text-white rounded  transition duration-300 bg-blue-500 ${
            !canPaginateNext ? "cursor-not-allowed opacity-50" : "hover:opacity-60"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
