import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAuthenticated, isAdmin } = useAuth();

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoute - isAdmin:", isAdmin);
  console.log("ProtectedRoute - adminOnly:", adminOnly);

  // Check if user is authenticated
  if (!isAuthenticated) {
    console.log("Non authentifié, redirection vers /login");
    return <Navigate to="/login" replace />;
  }

  // Check if route requires admin access
  if (adminOnly && !isAdmin) {
    console.log(
      "Admin requis mais utilisateur non admin, redirection vers /dashboard"
    );
    return <Navigate to="/dashboard" replace />;
  }

  console.log("Accès autorisé");
  return children;
};

export default ProtectedRoute;
