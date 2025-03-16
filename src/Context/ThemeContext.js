import React, { createContext, useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    AOS.init({ once: true }); // Ensure animations don't restart on every theme change
  }, []); // Runs only once on mount

  useEffect(() => {
    setIsAnimating(false); // Reset animation state first
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setIsAnimating(false); // Stop animation after 4s
    }, 2000);
  
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]); // Runs when theme changes

  const toggleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
