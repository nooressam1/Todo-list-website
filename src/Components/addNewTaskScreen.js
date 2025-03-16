import React, { useContext, useEffect, useState } from "react";
//styling
import "../Css files/Homepage.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
//components
import TextinputBlue from "../Components/TextinputBlue";

//Contexts
import ThemeContext from "../Context/ThemeContext";
import { TaskContext } from "../Context/TaskContext.js";
import { AuthContext } from "../Context/AuthContext.js";

import { createTask } from "../Services/taskService.js";

const AddNewTaskScreen = ({ cancelButton }) => {
//usestates 
const [selected, setSelected] = useState("");
const [newTaskData, setNewTaskData] = useState({
  task: "",
  taskSection: "",
  status: false,
});
//usecontext
const { token } = useContext(AuthContext);
const { handleAddTask } = useContext(TaskContext);
const { theme, toggleTheme } = useContext(ThemeContext);


 
  const addTask = () => {
    handleAddTask(newTaskData);
    setNewTaskData({ task: "", taskSection: "", status: false });
    setSelected("");
    cancelButton(false);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.name;
    setSelected(selectedValue); // Update selected first
    setNewTaskData((prev) => ({
      ...prev,
      taskSection: selectedValue, // Now, update taskSection correctly
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="newTaskTransparentDiv"></div>
      <div
        className="newTaskContentBox"
        style={{
          // Centers horizontally
          backgroundColor: theme == "dark" ? "white" : "#5B6DC2",
        }}
        data-aos="fade-up"
      >
        <div style={{ width: "90%" }}>
          <div style={{ marginTop: 25, marginBottom: 15 }}>
            <h1
              style={{
                color: theme == "dark" ? "#7390EA" : "#FFFFFF",

                fontWeight: "700",
                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                margin: 0,
              }}
            >
              Create new task
            </h1>
          </div>

          <div style={{ width: "100%" }}>
            <label
              htmlFor="fname"
              style={{
                color: theme == "dark" ? "#99b9f0" : "#FFFFFF",

                fontSize: "1em",
                marginBottom: "2%",
                fontWeight: "500",
                display: "block",
              }}
            >
              Task
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder={"Task"}
              onChange={(e) => {
                setNewTaskData((prev) => ({
                  ...prev, // Keep the existing `section` value
                  task: e.target.value, // Update only `title`
                }));
              }}
              style={{
                padding: "2%",
                width: "90%",
                display: "block",
                border: " transparent",
                borderRadius: "10px",
                outline: "none",
                boxShadow: "inset 1px 1px 5px rgba(59, 59, 59, 0.2)", // Inner shadow
              }}
            />
          </div>

          <h1
            style={{
              color: theme == "dark" ? "#99b9f0" : "#FFFFFF",
              fontSize: "1em",
              marginBottom: "2%",
              fontWeight: "500",
              display: "block",
            }}
          >
            Task section
          </h1>
          <div
            style={{
              padding: "2%",
              color: "#616263",
              width: "90%",
              height: "5rem",
              display: "flex",
              flexDirection: "column", // Stack elements vertically
              gap: "5%",
              alignItems: "flex-start", // Align left
              borderRadius: "10px",
              boxShadow: "inset 1px 1px 5px rgba(59, 59, 59, 0.2)", // Inner shadow
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="Today"
                name="Today"
                value="Today"
                checked={selected === "Today"}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  border: "1px solid gray",
                }}
              />
              <label
                htmlFor="Today" 
                style={{ cursor: "pointer" }}
              >
                Today
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="Work"
                name="Work"
                value="Work"
                checked={selected === "Work"}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  border: "1px solid gray",
                }}
              />
              <label
                htmlFor="Work" 
                style={{ cursor: "pointer" }}
              >
                Work
              </label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center", 
              marginTop: "2rem",
              gap: "8px",
            }}
          >
            <div style={{ width: "70%", height: "4em" }}>
              <button
                onClick={() => {
                  setNewTaskData({ task: "", taskSection: "" });
                  cancelButton(false);
                }}
                className="Bluebuttonstyle"
                style={{
                  display: "flex",
                  alignItems: "center", 
                  textAlign: "center",
                  justifyContent: "center", 
                  backgroundColor: theme == "dark" ? "#CADDFC" : "#8495E6",

                  gap: "8px",
                }}
              >
                Cancel
              </button>
            </div>
            <div style={{ width: "70%", height: "4em" }}>
              <button
                type="submit"
                onClick={() => {
                  addTask();
                }}
                className="Bluebuttonstyle"
                style={{
                  display: "flex",
                  alignItems: "center", // Aligns items vertically in the center
                  textAlign: "center",
                  justifyContent: "center", // Centers horizontally
                  gap: "8px",
                  backgroundColor: theme == "dark" ? "#99B9F0" : "#8495E6",
                  color: "white",
                }}
              >
                Add new task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTaskScreen; 
