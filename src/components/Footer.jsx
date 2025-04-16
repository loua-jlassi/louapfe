import React from "react";
import "./Footer.css";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${theme === "dark" ? "footer-dark" : ""}`}>
      <div className="footer-bottom">
        <div className="copyright">
          &copy; {currentYear} FeatureFlex. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
