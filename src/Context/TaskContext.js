import React, { createContext, useContext, useState, useEffect } from "react";
import { getTasks, createTask } from "../Services/taskService";
import { AuthContext } from "../Context/AuthContext.js";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return; // Prevent running if token is missing

    const fetchTasks = async () => {
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [token]);

  const handleAddTask = async (newTaskData) => {
    if (!newTaskData) return;
    try {
      const response = await createTask(newTaskData, token);
      if (response && response.newTask) {
        setTasks((prevTasks) => [...prevTasks, response.newTask]); // ✅ Append new task
      }
    } catch (err) {
      console.error("❌ Error in handleAddTask:", err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, handleAddTask }}>
      {children}
    </TaskContext.Provider>
  );
};
