import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <span className="logo-icon">🔧</span>
          <span className="logo-text">LoulouCatalogue</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/home"
            className={`navbar-item ${isActive("/home") ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/features"
            className={`navbar-item ${isActive("/features") ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Fonctionnalités
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`navbar-item ${
                isActive("/dashboard") ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Mon Tableau de Bord
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className={`navbar-item ${isActive("/admin") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button className="logout-button" onClick={handleLogout}>
                Déconnexion
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? "active" : ""}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
