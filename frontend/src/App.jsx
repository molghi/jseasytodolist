import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Tasks from "../components/Tasks";
import FlashMessage from "../components/FlashMessage";
import Auth from "../components/Auth";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showFlashMsg, setShowFlashMsg] = useState(false);
  const [flashMsgData, setFlashMsgData] = useState([]);
  const [taskInEdit, setTaskInEdit] = useState("");
  const [taskIdInEdit, setTaskIdInEdit] = useState("");
  const [finishedTasks, setFinishedTasks] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // get all tasks from db
    const getTasks = async () => {
      try {
        const response = await axios.get("/tasks", { withCredentials: true }); // credentials enabled to include httpOnly token cookie
        // console.log("get all tasks response:", response);
        if (response.status === 401) {
          // not logged in, no token received
        } else {
          setIsLoggedIn(true);
          setTasks(response.data.tasks);
          if (response.data.tasks.length > 0) {
            setFinishedTasks(response.data.tasks.filter((task) => task.isFinished).length);
          }
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getTasks();
  }, []);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <main className="flex-1">
        <Header isLoggedIn={isLoggedIn} />

        {!isLoggedIn ? (
          <Auth setIsLoggedIn={setIsLoggedIn} setShowFlashMsg={setShowFlashMsg} setFlashMsgData={setFlashMsgData} />
        ) : (
          <>
            <Form
              title="Add Your Task"
              taskSetter={setTasks}
              setShowFlashMsg={setShowFlashMsg}
              setFlashMsgData={setFlashMsgData}
              taskInEdit={taskInEdit}
              taskIdInEdit={taskIdInEdit}
              setTaskInEdit={setTaskInEdit}
            />
            <Tasks
              tasks={tasks}
              setTasks={setTasks}
              setShowFlashMsg={setShowFlashMsg}
              setFlashMsgData={setFlashMsgData}
              setTaskInEdit={setTaskInEdit}
              setTaskIdInEdit={setTaskIdInEdit}
              finishedTasks={finishedTasks}
              setFinishedTasks={setFinishedTasks}
            />
          </>
        )}

        {showFlashMsg && <FlashMessage showFlashMsg={showFlashMsg} flashMsgData={flashMsgData} setShowFlashMsg={setShowFlashMsg} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
