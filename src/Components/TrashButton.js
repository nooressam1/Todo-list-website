import React, { useContext } from "react";
import "../Css files/Homepage.css";
import TrashCan from "../Assets/trashCan.png";
import CheckMark from "../Assets/check.png";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import ThemeContext from "../Context/ThemeContext";
import { DeleteContext } from "../Context/DeleteContext";

const TrashButton = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { activateDeleteMode, deletedMode } = useContext(DeleteContext);

  return (
    <div style={{ width: "3rem", height: "3em" }} data-aos="fade-left" data-aos-anchor-placement="top-bottom">
      <button
        onClick={() => {
          activateDeleteMode();
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
          src={deletedMode ? CheckMark : TrashCan}
          style={{ width: "2rem", height: "2rem" }}
        />
      </button>
    </div>
  );
};

export default TrashButton;
