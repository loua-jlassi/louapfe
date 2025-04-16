import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/accessibility.css";
import "./AccessibilityBar.css";

const AccessibilityBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Vérifier les préférences système au chargement
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setReducedMotion(true);
      document.body.classList.add("reduced-motion");
    }

    // Vérifier si des préférences d'accessibilité sont stockées
    const savedTextSize = localStorage.getItem("accessibility_textSize");
    const savedHighContrast = localStorage.getItem(
      "accessibility_highContrast"
    );
    const savedReducedMotion = localStorage.getItem(
      "accessibility_reducedMotion"
    );

    if (savedTextSize) setTextSize(savedTextSize);
    if (savedHighContrast === "true") setHighContrast(true);
    if (savedReducedMotion === "true") setReducedMotion(true);

    // Appliquer les préférences sauvegardées
    applyTextSize(savedTextSize || "normal");
    if (savedHighContrast === "true") {
      document.body.classList.add("high-contrast-mode");
    }
    if (savedReducedMotion === "true") {
      document.body.classList.add("reduced-motion");
    }
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const changeTextSize = (size) => {
    setTextSize(size);
    applyTextSize(size);
    localStorage.setItem("accessibility_textSize", size);
  };

  const applyTextSize = (size) => {
    // Supprimer toutes les classes de taille de texte existantes
    document.body.classList.remove(
      "text-zoom-reset",
      "text-zoom-large",
      "text-zoom-larger"
    );

    // Ajouter la nouvelle classe selon la taille choisie
    if (size === "large") {
      document.body.classList.add("text-zoom-large");
    } else if (size === "larger") {
      document.body.classList.add("text-zoom-larger");
    } else {
      document.body.classList.add("text-zoom-reset");
    }
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);

    if (newValue) {
      document.body.classList.add("high-contrast-mode");
    } else {
      document.body.classList.remove("high-contrast-mode");
    }

    localStorage.setItem("accessibility_highContrast", newValue.toString());
  };

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);

    if (newValue) {
      document.body.classList.add("reduced-motion");
    } else {
      document.body.classList.remove("reduced-motion");
    }

    localStorage.setItem("accessibility_reducedMotion", newValue.toString());
  };

  const resetAllSettings = () => {
    // Réinitialiser toutes les préférences
    setTextSize("normal");
    setHighContrast(false);
    setReducedMotion(false);

    // Supprimer toutes les classes
    document.body.classList.remove(
      "text-zoom-reset",
      "text-zoom-large",
      "text-zoom-larger",
      "high-contrast-mode",
      "reduced-motion"
    );

    // Ajouter la classe de taille normale
    document.body.classList.add("text-zoom-reset");

    // Supprimer les préférences stockées
    localStorage.removeItem("accessibility_textSize");
    localStorage.removeItem("accessibility_highContrast");
    localStorage.removeItem("accessibility_reducedMotion");
  };

  return (
    <div className={`accessibility-widget ${isOpen ? "open" : ""}`}>
      <button
        className="accessibility-toggle"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? "Fermer les options d'accessibilité"
            : "Ouvrir les options d'accessibilité"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm-2.001 12.25v-1h4v1h-4zm.008-3h4v1h-4v-1zm-.008-2h4v1h-4v-1zm.015-2h3.97v1h-3.97v-1z" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="accessibility-options"
          role="dialog"
          aria-label="Options d'accessibilité"
        >
          <h3>Options d'accessibilité</h3>

          <div className="option-group">
            <h4>Taille du texte</h4>
            <div className="button-group">
              <button
                className={`accessibility-button ${
                  textSize === "normal" ? "active" : ""
                }`}
                onClick={() => changeTextSize("normal")}
                aria-pressed={textSize === "normal"}
              >
                Normal
              </button>
              <button
                className={`accessibility-button ${
                  textSize === "large" ? "active" : ""
                }`}
                onClick={() => changeTextSize("large")}
                aria-pressed={textSize === "large"}
              >
                Grand
              </button>
              <button
                className={`accessibility-button ${
                  textSize === "larger" ? "active" : ""
                }`}
                onClick={() => changeTextSize("larger")}
                aria-pressed={textSize === "larger"}
              >
                Très grand
              </button>
            </div>
          </div>

          <div className="option-group">
            <h4>Contraste</h4>
            <div className="button-group">
              <button
                className={`accessibility-button ${
                  highContrast ? "active" : ""
                }`}
                onClick={toggleHighContrast}
                aria-pressed={highContrast}
              >
                Contraste élevé {highContrast ? "(Activé)" : "(Désactivé)"}
              </button>
              <button
                className={`accessibility-button ${
                  theme === "dark" ? "active" : ""
                }`}
                onClick={toggleTheme}
                aria-pressed={theme === "dark"}
              >
                Mode sombre {theme === "dark" ? "(Activé)" : "(Désactivé)"}
              </button>
            </div>
          </div>

          <div className="option-group">
            <h4>Mouvement</h4>
            <div className="button-group">
              <button
                className={`accessibility-button ${
                  reducedMotion ? "active" : ""
                }`}
                onClick={toggleReducedMotion}
                aria-pressed={reducedMotion}
              >
                Réduire les animations{" "}
                {reducedMotion ? "(Activé)" : "(Désactivé)"}
              </button>
            </div>
          </div>

          <div className="option-group">
            <button
              className="reset-button"
              onClick={resetAllSettings}
              aria-label="Réinitialiser toutes les options d'accessibilité"
            >
              Réinitialiser les paramètres
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityBar;
