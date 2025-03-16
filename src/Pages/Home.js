import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Css files/Homepage.css";
import blankPic from "../Assets/blank-profilepic.png";

//Components
import TaskContainer from "../Components/TaskContainer";
import ProgressBar from "../Components/ProgressBar";
import SideQuestGenerator from "../Components/sideQuestGenerator.js";
import AddNewTask from "../Components/addNewTask.js";
import AddNewTaskScreen from "../Components/addNewTaskScreen.js";
import ColorModeButton from "../Components/colorModeButton.js";
import TrashButton from "../Components/TrashButton.js";
import LogoutButton from "../Components/LogoutButton.js";

//Context
import ThemeContext from "../Context/ThemeContext.js";
import { TaskContext } from "../Context/TaskContext.js";
import { AuthContext } from "../Context/AuthContext.js";

const Home = () => {
  //use states
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(blankPic);
  const [addNewTask, setNewTaskScreem] = useState(false);
  

  // usecontext
  const { tasks, setTasks } = useContext(TaskContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const storeduser = localStorage.getItem("userName");
    if (storeduser) {
      setUsername(storeduser);
    }
  });
  
  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to Home page
    }
  }, [token]);

  return (
    <div className="HomeBackgroundImage">
      <div className="Parentheaderdiv">
        <div className="headerDiv">
          {/* Title in the Center */}
          <h1 className="Headertextstyle">{username} Planner</h1>

          {/* Username & Profile Picture on the Right */}
          <div className="accountDiv">
            <LogoutButton></LogoutButton>
          </div>
        </div>
        <div className="LineStyle"></div>
      </div>

      <div className="TaskContentholder">
        <div className="TaskcontainDiv">
          <TaskContainer taskTitle={"Today"}></TaskContainer>
          <TaskContainer taskTitle={"Work"}></TaskContainer>
        </div>
        <div className="progressBarContainerHolder" data-aos="zoom-in">
          <ProgressBar></ProgressBar>
          <SideQuestGenerator></SideQuestGenerator>
        </div>
      </div>
      <footer>
        <div
          style={{
            display: "flex", // Enables flexbox
            alignItems: "space-around", // Centers vertically
            justifyContent: "space-around", // Centers horizontally
            gap: "50%",
            height: "5rem",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <ColorModeButton ChangeTheme={toggleTheme}></ColorModeButton>
          <div
            style={{
              display: "flex",
              gap: "10px",
              height: "5rem",
              width: "auto",
            }}
          >
            <TrashButton></TrashButton>
            <AddNewTask openScreen={() => setNewTaskScreem(true)} />
          </div>
        </div>
      </footer>
      {addNewTask && (
        <AddNewTaskScreen
          cancelButton={() => setNewTaskScreem()}
          tasks={tasks}
          setTasks={setTasks}
          token={token}
        />
      )}
    </div>
  );
};

export default Home;
