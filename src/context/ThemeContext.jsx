import React, { createContext, useState, useContext, useEffect } from "react";

// Créer le contexte de thème
export const ThemeContext = createContext();

// Hook personnalisé pour utiliser le contexte de thème
export const useTheme = () => useContext(ThemeContext);

// Fournisseur du contexte de thème
export const ThemeProvider = ({ children }) => {
  // Vérifier si un thème est déjà sauvegardé dans le localStorage
  // ou utiliser le thème par défaut basé sur les préférences du navigateur
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [mountedComponent, setMountedComponent] = useState(false);

  // Basculer entre les thèmes clair et sombre
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Appliquer les variables CSS appropriées pour le thème
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === "light") {
      // Thème clair
      root.style.setProperty("--bg-color", "#f8f9fa");
      root.style.setProperty("--text-color", "#333333");
      root.style.setProperty("--text-secondary", "#6c757d");
      root.style.setProperty("--primary-color", "#4e73df");
      root.style.setProperty("--primary-hover", "#375dcc");
      root.style.setProperty("--accent-bg", "#e8f0fe");
      root.style.setProperty("--card-bg", "#ffffff");
      root.style.setProperty("--border-color", "#dee2e6");
      root.style.setProperty("--input-bg", "#ffffff");
      root.style.setProperty("--button-bg", "#f0f2f5");
      root.style.setProperty("--button-hover-bg", "#e2e6ea");
      root.style.setProperty("--tag-bg", "#e9ecef");
      root.style.setProperty("--premium-badge-bg", "#ffd700");

      // Supprimer la classe pour le thème sombre
      body.classList.remove("theme-dark");
    } else {
      // Thème sombre
      root.style.setProperty("--dark-bg-color", "#121212");
      root.style.setProperty("--dark-text-color", "#e0e0e0");
      root.style.setProperty("--dark-text-secondary", "#b0b0b0");
      root.style.setProperty("--dark-primary-color", "#7986cb");
      root.style.setProperty("--dark-primary-hover", "#5c6bc0");
      root.style.setProperty("--dark-accent-bg", "#1e2030");
      root.style.setProperty("--dark-card-bg", "#1e1e1e");
      root.style.setProperty("--dark-border-color", "#444444");
      root.style.setProperty("--dark-input-bg", "#2d2d2d");
      root.style.setProperty("--dark-button-bg", "#2d2d2d");
      root.style.setProperty("--dark-button-hover-bg", "#3d3d3d");
      root.style.setProperty("--dark-tag-bg", "#3d3d3d");
      root.style.setProperty("--dark-premium-badge-bg", "#b8860b");

      // Ajouter la classe pour le thème sombre
      body.classList.add("theme-dark");
    }

    setMountedComponent(true);
  }, [theme]);

  // Rendu conditionnel pour éviter l'hydratation côté serveur (si utilisé avec SSR)
  if (!mountedComponent) return <div />;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
