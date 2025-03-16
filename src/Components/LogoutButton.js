import React, { useContext, useEffect } from "react";
import "../Css files/Homepage.css";
import logoutLight from "../Assets/logoutLight.png";
import logoutDark from "../Assets/logoutDark.png";

import ThemeContext from "../Context/ThemeContext.js";
import { AuthContext } from "../Context/AuthContext.js"; 

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
const LogoutButton = ({ openScreen }) => {
  const { theme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  return (
    <div
      style={{ width: "auto", height: "3em" }}
      data-aos="fade-left"
      data-aos-anchor-placement="top-bottom"
    >
      <button
        onClick={() => logout()}
        className="Bluebuttonstyle"
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          gap: "8px",
          backgroundColor: theme === "dark" ? "white" : "#5B6DC2",
          color: theme == "dark" ? "#99B9F0" : "white",
          boxShadow: theme == "dark" ? "0 0 2px lightgray" : "0 0 2px darkgray",
        }}
      >
        <img
          src={theme === "dark" ? logoutLight : logoutDark}
          style={{ width: "1.8rem", height: "1.8rem" }}
        />
        <span className="ButtonTextStyles">Logout</span>
      </button>
    </div>
  );
};

export default LogoutButton;
