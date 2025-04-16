import React from "react";
import {
  FaTachometerAlt,
  FaListAlt,
  FaUsers,
  FaCogs,
  FaSignOutAlt,
  FaUserCircle,
  FaEnvelope,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

const AdminSidebar = ({ activeTab, setActiveTab, menuItems }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Fonction pour obtenir l'icône correspondante
  const getIcon = (iconName) => {
    switch (iconName) {
      case "dashboard":
        return <FaTachometerAlt />;
      case "features":
        return <FaListAlt />;
      case "users":
        return <FaUsers />;
      case "messages":
        return <FaEnvelope />;
      case "settings":
        return <FaCogs />;
      default:
        return <FaListAlt />;
    }
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <div className="admin-info">
        <div className="admin-avatar">
          <FaUserCircle size={36} />
        </div>
        <div className="admin-details">
          <h3>{currentUser?.name || "Admin User"}</h3>
          <p>{currentUser?.email || "admin@example.com"}</p>
        </div>
      </div>

      <nav className="admin-menu">
        {menuItems ? (
          // Si menuItems est fourni, utiliser les éléments fournis
          menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="menu-icon">
                {getIcon(item.icon)}
              </span>
              <span className="menu-text">{item.label}</span>
            </button>
          ))
        ) : (
          // Sinon, afficher les éléments par défaut
          <>
            <button
              className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <span className="menu-icon">
                <FaTachometerAlt />
              </span>
              <span className="menu-text">Tableau de Bord</span>
            </button>

            <button
              className={`menu-item ${activeTab === "features" ? "active" : ""}`}
              onClick={() => setActiveTab("features")}
            >
              <span className="menu-icon">
                <FaListAlt />
              </span>
              <span className="menu-text">Fonctionnalités</span>
            </button>

            <button
              className={`menu-item ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              <span className="menu-icon">
                <FaUsers />
              </span>
              <span className="menu-text">Utilisateurs</span>
            </button>

            <button
              className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <span className="menu-icon">
                <FaCogs />
              </span>
              <span className="menu-text">Paramètres</span>
            </button>
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
