import React from "react";
import { FaSearch, FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./AdminDashboard.css";
import NotificationsPanel from "./NotificationsPanel";

const DashboardHeader = ({
  title,
  searchTerm,
  setSearchTerm,
  setShowNotifications,
  showNotifications,
  notifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="admin-topbar">
      <div className="header-title">
        <h1>{title}</h1>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        <button
          className="icon-button theme-toggle"
          onClick={toggleTheme}
          title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button
          className="icon-button notification-button"
          onClick={() => setShowNotifications((prev) => !prev)}
          title="Notifications"
        >
          <FaBell />
          <span className="notification-indicator"></span>
        </button>
      </div>

      {showNotifications && (
        <NotificationsPanel
          notifications={notifications}
          markAsRead={markNotificationAsRead}
          markAllAsRead={markAllNotificationsAsRead}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
