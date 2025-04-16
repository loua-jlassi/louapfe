import React from "react";
import { FaTimes, FaBell, FaCheck, FaCheckDouble } from "react-icons/fa";
import "./AdminDashboard.css";

const NotificationsPanel = ({
  notifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
}) => {
  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="mark-all-read" onClick={markAllNotificationsAsRead}>
          <FaCheckDouble /> Tout marquer comme lu
        </button>
      </div>

      <div className="notifications-content">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "" : "unread"
              }`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="notification-content">
                <h4>
                  {notification.priority === "high" && (
                    <span className="priority high">!</span>
                  )}
                  {notification.title || "Notification"}
                </h4>
                <p>{notification.text}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
              {!notification.read && (
                <span className="notification-status">
                  <FaBell size={14} />
                </span>
              )}
              {notification.read && (
                <span className="notification-status read">
                  <FaCheck size={14} />
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="empty-notifications">
            <p>Aucune notification</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
