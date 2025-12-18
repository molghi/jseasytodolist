import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Tasks from "../components/Tasks";
import FlashMessage from "../components/FlashMessage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showFlashMsg, setShowFlashMsg] = useState(false);
  const [flashMsgData, setFlashMsgData] = useState([]);
  const [taskInEdit, setTaskInEdit] = useState("");
  const [taskIdInEdit, setTaskIdInEdit] = useState("");

  return (
    <div className="flex flex-col min-h-[100vh]">
      <main className="flex-1">
        <Header />
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
        />
        {showFlashMsg && <FlashMessage showFlashMsg={showFlashMsg} flashMsgData={flashMsgData} setShowFlashMsg={setShowFlashMsg} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
