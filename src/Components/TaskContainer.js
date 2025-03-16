import React, { useContext, useEffect, useState } from "react";
import "../Css files/Homepage.css";
//context
import { TaskContext } from "../Context/TaskContext.js";
import { AuthContext } from "../Context/AuthContext.js";

import { getTasks } from "../Services/taskService.js";
import AOS from "aos";

import "aos/dist/aos.css"; // You can also use <link> for styles
import TaskBox from "./TaskBox";

const TaskContainer = ({ taskTitle }) => {
  const { token } = useContext(AuthContext);
  const { tasks, setTasks } = useContext(TaskContext);

  const [addNewTask, setNewTaskScreem] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks(token);
      setTasks(data);
    };
    fetchTasks();
  }, [token, setTasks]);

  useEffect(() => {
    const FilterTasks = tasks.filter((task) => task.taskSection === taskTitle);
    setFilteredTasks(FilterTasks);
  }, [tasks, taskTitle]);

  return (
    <div className="TaskcontainoutterDiv">
      <h1 className="taskContainerTitlestyle">{taskTitle}</h1>

      <div data-aos="zoom-in">
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

export default TaskContainer;
