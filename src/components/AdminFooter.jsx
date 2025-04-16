import React from "react";
import "./AdminFooter.css";
import { useTheme } from "../context/ThemeContext";
import {
  FaHeart,
  FaGithub,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";

const AdminFooter = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const version = "v1.0.6";

  return (
    <footer
      className={`admin-footer-v2 ${theme === "dark" ? "dark-mode" : ""}`}
    >
      <div className="footer-content-v2">
        <div className="footer-links-v2">
          <a href="#help">
            <FaQuestionCircle /> Aide
          </a>
          <a href="#contact">
            <FaEnvelope /> Contact
          </a>
          <a
            href="https://github.com/votre-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub
          </a>
        </div>
        <div className="footer-info-v2">
          <div>
            &copy; {currentYear} FeatureFlex - {version}
          </div>
          <div>
            Fait avec <FaHeart style={{ color: "#ff0000" }} /> pour améliorer
            votre expérience
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
