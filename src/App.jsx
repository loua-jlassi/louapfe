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
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import FeaturesPage from "./components/FeaturesPage";
import UserDashboard from "./components/UserDashboard";
import EditFeature from "./components/EditFeature";
import AdminDashboard from "./components/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route
                path="/edit-feature/:featureId"
                element={<EditFeature />}
              />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>
              &copy; {new Date().getFullYear()} - Catalogue de Fonctionnalités
            </p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
