import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Catalogue de Fonctionnalités</h1>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>
            &copy; {new Date().getFullYear()} - Catalogue de Fonctionnalités
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
