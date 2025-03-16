import React, { createContext, useContext, useState } from "react";
import { deleteTasks } from "../Services/taskService.js"; // Assuming batch delete

import { TaskContext } from "./TaskContext.js";
import { AuthContext } from "../Context/AuthContext.js";

export const DeleteContext = createContext();

export const DeleteProvider = ({ children }) => {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [deletedMode, setDeleteMode] = useState(false);
  //use context
  const { tasks, setTasks } = useContext(TaskContext);
  const { token } = useContext(AuthContext);

  const activateDeleteMode = () => {
    setDeleteMode(!deletedMode);
    if (!deletedTasks) {
    } else {
      handleDeletedTasks(deletedTasks);
    }
  };

  const handleDeletedTasks = async (taskIds) => {
    if (!taskIds.length) return;
    try {
      await deleteTasks(taskIds, token);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => !taskIds.includes(task._id))
      );
      setDeletedTasks([]);
    } catch (err) {
      console.error("❌ Error in handleDeletedTasks:", err);
    }
  };

  return (
    <DeleteContext.Provider
      value={{
        deletedTasks,
        setDeletedTasks,
        handleDeletedTasks,
        activateDeleteMode,
        deletedMode,
      }}
    >
      {children}
    </DeleteContext.Provider>
  );
};
