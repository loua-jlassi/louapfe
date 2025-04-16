import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaHeart,
  FaGithub,
  FaEnvelope,
  FaQuestionCircle,
  FaCodeBranch,
} from "react-icons/fa";

// Style en ligne pour éviter tout problème de CSS
const footerStyles = {
  container: {
    marginTop: "auto",
    width: "100%",
    padding: "1.5rem 2rem",
    backgroundColor: "#e6f2ff",
    borderTop: "2px solid #007bff",
    boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
    position: "relative",
    zIndex: 10,
    fontSize: "0.9rem",
  },
  containerDark: {
    backgroundColor: "#171a21",
    borderTop: "2px solid #0d6efd",
    color: "white",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  links: {
    display: "flex",
    gap: "2rem",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#0056b3",
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontWeight: 600,
    padding: "0.5rem",
    borderRadius: "4px",
  },
  linkDark: {
    color: "#60b0ff",
  },
  info: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    color: "#0056b3",
    fontWeight: 500,
  },
  infoDark: {
    color: "#60b0ff",
  },
  heart: {
    color: "#ff0000",
  },
};

// Componser mobile responsive en fonction de la taille d'écran
const applyMobileStyles = (isMobile) => {
  if (!isMobile) return {};

  return {
    container: {
      padding: "1rem",
    },
    content: {
      flexDirection: "column",
      textAlign: "center",
      gap: "1.5rem",
    },
    links: {
      justifyContent: "center",
      width: "100%",
    },
    info: {
      textAlign: "center",
      width: "100%",
    },
  };
};

const NewAdminFooter = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const version = "v1.0.7"; // Version incrémentée

  // Détection mobile basique côté client
  const isMobile = window.innerWidth <= 768;
  const mobileStyles = applyMobileStyles(isMobile);

  // Fusion des styles de base avec les styles dark mode si nécessaire
  const containerStyle = {
    ...footerStyles.container,
    ...(theme === "dark" ? footerStyles.containerDark : {}),
    ...(isMobile ? mobileStyles.container : {}),
  };

  const contentStyle = {
    ...footerStyles.content,
    ...(isMobile ? mobileStyles.content : {}),
  };

  const linksStyle = {
    ...footerStyles.links,
    ...(isMobile ? mobileStyles.links : {}),
  };

  const linkStyle = {
    ...footerStyles.link,
    ...(theme === "dark" ? footerStyles.linkDark : {}),
  };

  const infoStyle = {
    ...footerStyles.info,
    ...(theme === "dark" ? footerStyles.infoDark : {}),
    ...(isMobile ? mobileStyles.info : {}),
  };

  return (
    <footer style={containerStyle}>
      <div style={contentStyle}>
        <div style={linksStyle}>
          <a href="#help" style={linkStyle}>
            <FaQuestionCircle /> Aide
          </a>
          <a href="#contact" style={linkStyle}>
            <FaEnvelope /> Contact
          </a>
          <a
            href="https://github.com/votre-repo"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            <FaGithub /> GitHub
          </a>
          <a href="#version" style={linkStyle}>
            <FaCodeBranch /> {version}
          </a>
        </div>
        <div style={infoStyle}>
          <div>&copy; {currentYear} FeatureFlex - Tous droits réservés</div>
          <div>
            Fait avec <FaHeart style={footerStyles.heart} /> pour améliorer
            votre expérience
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewAdminFooter;
