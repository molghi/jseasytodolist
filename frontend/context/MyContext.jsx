import { createContext, useState } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [showFlashMsg, setShowFlashMsg] = useState(false);
  const [flashMsgData, setFlashMsgData] = useState([]);
  const [taskInEdit, setTaskInEdit] = useState("");
  const [taskIdInEdit, setTaskIdInEdit] = useState("");
  const [finishedTasks, setFinishedTasks] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MyContext.Provider
      value={{
        tasks,
        setTasks,
        showFlashMsg,
        setShowFlashMsg,
        flashMsgData,
        setFlashMsgData,
        taskInEdit,
        setTaskInEdit,
        taskIdInEdit,
        setTaskIdInEdit,
        finishedTasks,
        setFinishedTasks,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
