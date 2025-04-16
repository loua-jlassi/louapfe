import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="theme-toggle">
      <button
        onClick={toggleTheme}
        className={`theme-toggle-button ${isDark ? "dark" : "light"}`}
        aria-label={`Passer au thème ${isDark ? "clair" : "sombre"}`}
      >
        <div className="toggle-wrapper">
          <div className="toggle-background"></div>
          <div className="toggle-circle">
            {isDark ? (
              <span className="toggle-icon moon">🌙</span>
            ) : (
              <span className="toggle-icon sun">☀️</span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
