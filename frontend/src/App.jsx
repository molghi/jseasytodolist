import { useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Tasks from "../components/Tasks";
import FlashMessage from "../components/FlashMessage";
import Auth from "../components/Auth";
import axios from "axios";
import MyContext from "../context/MyContext";

function App() {
  const { isLoggedIn, showFlashMsg, setIsLoggedIn, setTasks, setFinishedTasks } = useContext(MyContext);

  useEffect(() => {
    // get all tasks from db
    const getTasks = async () => {
      try {
        const response = await axios.get("/tasks", { withCredentials: true }); // credentials enabled to include httpOnly token cookie
        if (response.status === 401) {
          console.log(`not logged in, no token received`);
        } else {
          setIsLoggedIn(true);
          setTasks(response.data.tasks);
          if (response.data.tasks.length > 0) {
            setFinishedTasks(response.data.tasks.filter((task) => task.isFinished).length);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);

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
      </main>
      <Footer />
    </div>
  );
}

export default App;
