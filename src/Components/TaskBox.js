import React, { useContext, useEffect, useState } from "react";
import "../Css files/Homepage.css";
//context
import { TaskContext } from "../Context/TaskContext.js";
import ThemeContext from "../Context/ThemeContext";
import { DeleteContext } from "../Context/DeleteContext.js";
import { AuthContext } from "../Context/AuthContext.js";

import { completeTask } from "../Services/taskService.js";

const TaskBox = ({ taskTitle, tasktime, taskID, taskStatus }) => {
  //usecontext
  const { tasks, setTasks } = useContext(TaskContext);
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthContext);
  const { deletedTasks, setDeletedTasks, handleDeletedTasks, deletedMode } =
    useContext(DeleteContext);
  //usestate
  const [isChecked, setIsChecked] = useState(taskStatus);

  const addingDeletedTasks = async (id) => {
    if (deletedTasks.includes(id)) {
      setDeletedTasks(deletedTasks.filter((taskId) => taskId !== id)); 
    } else {
      setDeletedTasks([...deletedTasks, id]); // Add task if not selected
    }
  };

  const handleToggle = async (id) => {
    const updatedTask = await completeTask(id, token);
    taskStatus = updatedTask.status;
    if (updatedTask) {
      setIsChecked(taskStatus);
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    }
  };

  return (
    <div
      onClick={() =>
        deletedMode ? addingDeletedTasks(taskID) : handleToggle(taskID)
      }
      style={{
        backgroundColor:
          theme == "dark"
            ? deletedTasks.includes(taskID)
              ? "#99B9F0"
              : "white"
            : deletedTasks.includes(taskID)
            ? "#5B6DC2"
            : "#8495E6",
        boxShadow: theme == "dark" ? "0 0 2px lightgray" : "0 0 2px darkgray",
      }}
      className={`Taskbox`}
    >
      <input
        type="checkbox"
        id={taskID}
        name={taskTitle}
        checked={isChecked}
        onChange={() => handleToggle(taskID)}
        className="checkBoxStyle"
        style={{
          backgroundColor:
            theme == "dark"
              ? deletedTasks.includes(taskID)
                ? "#99B9F0"
                : "white"
              : deletedTasks.includes(taskID)
              ? "#5B6DC2"
              : "#8495E6",
          border:
            theme == "dark"
              ? deletedTasks.includes(taskID)
                ? "1px solid white"
                : "1px solid gray"
              : "1px solid white",
        }}
      />
      <div className="taskboxDiv">
        <label
          className="TaskTextStyles"
          style={{
            color:
              theme == "dark"
                ? deletedTasks.includes(taskID)
                  ? "white"
                  : "#5B6DC2"
                : "white",
          }}
        >
          {taskTitle}
        </label>
      </div>
    </div>
  );
};

export default TaskBox;
