import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";
import {
  FaHome,
  FaTools,
  FaQuestionCircle,
  FaProjectDiagram,
  FaBook,
  FaEnvelope,
  FaTachometerAlt,
  FaUserShield,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  // Surveiller le défilement pour ajouter des effets à la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
    closeMenu();
  };

  // Menu principal pour les utilisateurs standards
  const mainMenuItems = [
    { path: "/home", label: "Accueil", icon: <FaHome /> },
    { path: "/features", label: "Fonctionnalités", icon: <FaTools /> },
    {
      path: "/dev-questionnaire",
      label: "Questionnaire",
      icon: <FaQuestionCircle />,
    },
    {
      path: "/project-generator",
      label: "Générateur",
      icon: <FaProjectDiagram />,
    },
    { path: "/api-docs", label: "API", icon: <FaBook /> },
    { path: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  // Menu supplémentaire pour les admins
  const adminMenuItems = [
    { path: "/admin", label: "Admin", icon: <FaUserShield /> },
    { path: "/doc-preview", label: "Documentation", icon: <FaBook /> },
    { path: "/dependencies", label: "Dépendances", icon: <FaProjectDiagram /> },
  ];

  // Vérifier si l'utilisateur est un administrateur
  const isAdmin = user && user.role === "admin";

  // Si l'utilisateur est un admin, afficher une navbar simplifiée
  if (isAdmin) {
    return (
      <nav
        className={`navbar admin-navbar ${
          theme === "dark" ? "navbar-dark" : ""
        } ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="navbar-container admin-navbar-container">
          {/* Partie gauche: Logo et navigation */}
          <div className="admin-navbar-left">
            <Link to="/admin" className="navbar-logo" onClick={closeMenu}>
              <span className="logo-icon">🔧</span>
              <span className="logo-text">Admin Panel</span>
            </Link>

            {/* Menu admin simplifié */}
            <div className="admin-nav-links">
              <Link
                to="/admin"
                className={`admin-nav-item ${
                  isActive("/admin") ? "active" : ""
                }`}
              >
                <span className="admin-nav-icon">
                  <FaUserShield />
                </span>
                <span className="admin-nav-text">Admin</span>
              </Link>
              <Link
                to="/dependencies"
                className={`admin-nav-item ${
                  isActive("/dependencies") ? "active" : ""
                }`}
              >
                <span className="admin-nav-icon">
                  <FaProjectDiagram />
                </span>
                <span className="admin-nav-text">Dépendances</span>
              </Link>
            </div>
          </div>

          {/* Partie droite: Informations utilisateur */}
          <div className="admin-navbar-right">
            <div className="user-menu">
              <div className="user-info">
                <span className="user-icon">
                  <FaUserShield />
                </span>
                <span className="user-name">{user.name || "Admin"}</span>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt />{" "}
                <span className="logout-text">Déconnexion</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Navbar standard pour les utilisateurs non-admin
  return (
    <nav
      className={`navbar ${theme === "dark" ? "navbar-dark" : ""} ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🔧</span>
          <span className="logo-text">FeatureCatalogue</span>
        </Link>

        {/* Menu pour mobile - hamburger */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? "active" : ""}`}></div>
        </div>

        {/* Menu principal */}
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          {mainMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-item ${isActive(item.path) ? "active" : ""}`}
              onClick={closeMenu}
            >
              <span className="navbar-item-icon">{item.icon}</span>
              <span className="navbar-item-text">{item.label}</span>
            </Link>
          ))}

          {/* Menu tableau de bord pour utilisateurs connectés */}
          {user && (
            <Link
              to="/dashboard"
              className={`navbar-item ${
                isActive("/dashboard") ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              <span className="navbar-item-icon">
                <FaTachometerAlt />
              </span>
              <span className="navbar-item-text">Tableau de Bord</span>
            </Link>
          )}

          {/* Menu admin */}
          {user &&
            user.role === "admin" &&
            adminMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-item ${isActive(item.path) ? "active" : ""}`}
                onClick={closeMenu}
              >
                <span className="navbar-item-icon">{item.icon}</span>
                <span className="navbar-item-text">{item.label}</span>
              </Link>
            ))}
        </div>

        {/* Menu authentification */}
        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                {user.name && (
                  <span className="user-icon">
                    <FaUserCircle />
                  </span>
                )}
                <span className="user-name">{user.name || "Utilisateur"}</span>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt />{" "}
                <span className="logout-text">Déconnexion</span>
              </button>
              <ThemeToggle />
            </div>
          ) : (
            <div className="auth-buttons">
              <Link
                to="/login"
                className={`login-button ${isActive("/login") ? "active" : ""}`}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className={`register-button ${
                  isActive("/register") ? "active" : ""
                }`}
              >
                Inscription
              </Link>
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
