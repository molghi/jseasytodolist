import { useEffect, useContext } from "react";
import axios from "axios";
import MyContext from "../context/MyContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Tasks from "../components/Tasks";
import FlashMessage from "../components/FlashMessage";
import Auth from "../components/Auth";
import Pagination from "../components/Pagination";

function App() {
  const { isLoggedIn, showFlashMsg, setIsLoggedIn, setTasks, setFinishedTasks, setUserName, currentPage, setAllUserTasksCount } = useContext(MyContext);

  useEffect(() => {
    // get all tasks from db
    const getTasks = async () => {
      try {
        const response = await axios.get(`/tasks?page=${currentPage}`, { withCredentials: true }); // credentials enabled to include httpOnly token cookie
        if (response.status !== 401) {
          // upon success
          setIsLoggedIn(true);
          setUserName(response.data.name);
          setTasks(response.data.tasks);
          setAllUserTasksCount(response.data.allUserTasksCount);
          setFinishedTasks(response.data.finishedTasks);
        }
      } catch (error) {
        console.error("OOPS!", error);
      }
    };
    getTasks();
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <main className="flex-1">
        <Header />

        {!isLoggedIn ? (
          <Auth />
        ) : (
          <>
            <Form title="Add Your Task" />
            <Tasks />
          </>
        )}

        {showFlashMsg && <FlashMessage />}

        {isLoggedIn && <Pagination />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
