import React, { useContext, useEffect, useState } from "react";
import "../Css files/Homepage.css";
import TaskBox from "./TaskBox";

import ThemeContext from "../Context/ThemeContext";
import { TaskContext } from "../Context/TaskContext";
import { AuthContext } from "../Context/AuthContext.js";

import { getTasks } from "../Services/taskService.js";

const SideQuestGenerator = () => {
  //usecontext
  const { theme } = useContext(ThemeContext);
  const { handleAddTask } = useContext(TaskContext);
  const { tasks, setTasks } = useContext(TaskContext);
  const { token } = useContext(AuthContext);
  //usestates
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sideTasks, setSideTasks] = useState({
    task: "",
    taskSection: "SideQuest",
    status: false,
  });
  const listSidetasks = [
    "Take a different route home and see what you discover.",
    "Find a local landmark or hidden gem in your area.",
    "Write a short story or a poem based on your day.",
    "Take five random photos throughout your day and make a mini photo journal.",
    "Leave a positive note somewhere for someone to find.",
    "Try to balance on one foot for a full minute.",
    "Hold the door open for five people today.",
    "Write a nice review for a local business.",
    "Count how many dogs you see today.",
    "Explore a random Wikipedia article and learn something new.",
    "Donate something you no longer use.",
  ];
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks(token);
      setTasks(data);
    };
    fetchTasks();
  }, [token, setTasks]);

  useEffect(() => {
    const FilterTasks = tasks.filter(
      (task) => task.taskSection === "SideQuest"
    );
    setFilteredTasks(FilterTasks);
  }, [tasks]);

  const addTask = () => {
    const newTask = {
      task: listSidetasks[Math.floor(Math.random() * listSidetasks.length)],
      taskSection: "SideQuest",
      status: false,
    };

    handleAddTask(newTask);
  };

  return (
    <div style={{ height: "15rem" }}>
      <div style={{ width: "100%", height: "3em", marginTop: "1rem" }}>
        <button
          type="submit"
          className="Bluebuttonstyle"
          style={{ backgroundColor: theme === "dark" ? "#99B9F0" : "#5B6DC2" }}
          onClick={() => addTask()}
        >
          Side Quest Generator
        </button>
      </div>
      <div>
        {filteredTasks.map((task) => (
          <TaskBox
            key={task._id}
            taskTitle={task.task}
            tasktime="1:00pm"
            taskID={task._id}
            taskStatus={task.status}
          ></TaskBox>
        ))}
      </div>
    </div>
  );
};

export default SideQuestGenerator;
