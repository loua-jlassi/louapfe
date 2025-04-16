import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/utilities.css";
import App from "./App";

// Désactiver le StrictMode en développement pour éviter des problèmes de connexion
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode peut causer des problèmes de double rendu et de connexion
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
