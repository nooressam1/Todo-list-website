import React, { useContext, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../Css files/Homepage.css";
//context
import { TaskContext } from "../Context/TaskContext.js";
import ThemeContext from "../Context/ThemeContext.js";

const ProgressBar = () => {
  //context
  const { tasks } = useContext(TaskContext);
  const { theme } = useContext(ThemeContext);
  //usestates
  const [numTasks, setNumTasks] = useState(0);
  const [uncomTasks, setUncomTasks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sideTasks, setSideTasks] = useState(0);
  const [completedSideTasks, setCompletedSideTasks] = useState(0);

  useEffect(() => {
    const fetchProgressNum = () => {

      const mainTasks = tasks.filter(
        (task) => task.taskSection !== "SideQuest"
      );
      const completedMainTasks = mainTasks.filter(
        (task) => task.status === true
      ).length;

      const sideTasksList = tasks.filter(
        (task) => task.taskSection === "SideQuest"
      );
      const completedSideTasks = sideTasksList.filter(
        (task) => task.status === true
      ).length;

      setNumTasks(mainTasks.length);
      setUncomTasks(mainTasks.length - completedMainTasks);

      setSideTasks(sideTasksList.length);
      setCompletedSideTasks(completedSideTasks);

      setProgress(
        mainTasks.length > 0 ? (completedMainTasks / mainTasks.length) * 100 : 0
      );
    };

    fetchProgressNum();
  }, [tasks]);

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "white" : "#8495E6",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: theme === "dark" ? "0 0 2px lightgray" : "0 0 2px darkgray",
        transition: "background-color 0.5s ease-in-out" /* Smooth transition */,
      }}
    >
      {/* Main Task Progress */}
      <div className="ProgressCircleHolder">
        <div>
          <h1
            className="ProgressBarTextstyle"
            style={{ color: theme === "dark" ? "#7390EA" : "#FFFFFF" }}
          >
            Tasks Complete
          </h1>
          <h1
            className="ProgressBarTextstyle"
            style={{
              color: theme === "dark" ? "#7390EA" : "#E0E8F4",
              fontWeight: "400",
              fontSize: "1em",
            }}
          >
            {uncomTasks} task{uncomTasks !== 1 ? "s" : ""} left <br />
          </h1>
        </div>
        <div
          style={{ width: "4.5rem", height: "4.5rem" }}
          className="CircularProgressbar"
        >
          <CircularProgressbar
            value={progress}
            text={`${Math.round(progress)}%`}
            styles={buildStyles({
              textSize: "1.5em",
              pathTransitionDuration: 0.5,
              pathColor: theme === "dark" ? "#99B9F0" : "#FFFFFF",
              textColor: theme === "dark" ? "#99B9F0" : "#FFFFFF",
              trailColor: theme === "dark" ? "#d6d6d6" : "#5B6DC2",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
