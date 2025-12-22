import { createContext, useState } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // user tasks
  const [showFlashMsg, setShowFlashMsg] = useState(false); // is flash msg visible or not
  const [flashMsgData, setFlashMsgData] = useState([]); // flash msg type & content
  const [taskInEdit, setTaskInEdit] = useState(""); // name of task in edit
  const [taskIdInEdit, setTaskIdInEdit] = useState(""); // index of task in edit
  const [finishedTasks, setFinishedTasks] = useState(0); // num of finished tasks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const [allUserTasksCount, setAllUserTasksCount] = useState(0); // pagination

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
        userName,
        setUserName,
        currentPage,
        setCurrentPage,
        allUserTasksCount,
        setAllUserTasksCount,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
