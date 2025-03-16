import React, { useContext, useEffect } from "react";
//styling
import "../Css files/Homepage.css";
import Addicon from "../Assets/Addicon.png";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles


import ThemeContext from "../Context/ThemeContext";

const AddNewTask = ({ openScreen }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{ width: "auto", height: "3em" }}
      data-aos="fade-left"
      data-aos-anchor-placement="top-bottom"
    >
      <button
        onClick={() => openScreen()}
        className="Bluebuttonstyle"
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: theme === "dark" ? "#99B9F0" : "#5B6DC2",
          gap: "8px",
        }}
      >
        <img src={Addicon} style={{ width: "2rem", height: "2rem" }} />
       <span className="ButtonTextStyles"> Add new task</span>
      </button>
    </div>
  );
};

export default AddNewTask;
