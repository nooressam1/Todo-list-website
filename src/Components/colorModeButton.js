import React, { useContext, useState } from "react";
import LightMode from "../Assets/LightMode.png";
import Darkmode from "../Assets/Darkmode.png";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import "../Css files/Homepage.css";
import ThemeContext from "../Context/ThemeContext";

const ColorModeButton = ({ ChangeTheme }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{ width: "auto", height: "3rem" }}
      data-aos="fade-right"
      data-aos-anchor-placement="top-bottom"
    >
      <button
        onClick={() => {
          ChangeTheme();
        }}
        className="Bluebuttonstyle"
        style={{
          display: "flex",
          alignItems: "center", // Aligns items vertically in the center
          textAlign: "center",
          justifyContent: "center", // Centers horizontally
          backgroundColor: theme == "dark" ? "#99B9F0" : "#5B6DC2",
          gap: "8px",
        }}
      >
        <img
          src={theme == "dark" ? Darkmode : LightMode}
          style={{ width: "2rem", height: "2rem" }}
        />
        <span className="ButtonTextStyles">
          {theme == "dark" ? "Dark Mode" : "Light Mode"}
        </span>
      </button>
    </div>
  );
};

export default ColorModeButton;
