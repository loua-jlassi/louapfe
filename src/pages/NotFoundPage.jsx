import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NotFoundPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`not-found-container ${theme === "dark" ? "dark" : ""}`}>
      <h1>404</h1>
      <h2>Page Non Trouvée</h2>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link to="/" className="back-home-button">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
