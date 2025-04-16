import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    try {
      // Essayer d'abord avec 'user', puis avec 'currentUser' pour la rétrocompatibilité
      let storedUser = localStorage.getItem("user");
      if (!storedUser) {
        storedUser = localStorage.getItem("currentUser");
      }

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("Utilisateur chargé depuis localStorage:", parsedUser);
        setCurrentUser(parsedUser);

        // S'assurer que les deux clés contiennent les mêmes données
        localStorage.setItem("user", storedUser);
        localStorage.setItem("currentUser", storedUser);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur:", error);
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log("Login avec:", userData);

    setCurrentUser(userData);

    // Stocker dans les deux clés pour la cohérence
    const userString = JSON.stringify(userData);
    localStorage.setItem("user", userString);
    localStorage.setItem("currentUser", userString);
  };

  const logout = () => {
    console.log("Déconnexion utilisateur");

    setCurrentUser(null);

    // Supprimer des deux clés
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
  };

  const updateUserAccountType = (accountType) => {
    const updatedUser = { ...currentUser, accountType };
    console.log("Mise à jour du type de compte:", updatedUser);

    setCurrentUser(updatedUser);

    // Mettre à jour dans les deux clés
    const userString = JSON.stringify(updatedUser);
    localStorage.setItem("user", userString);
    localStorage.setItem("currentUser", userString);
  };

  // Déterminer si l'utilisateur est authentifié
  const isAuthenticated = !!currentUser;

  // Déterminer si l'utilisateur est un administrateur
  const isAdmin = currentUser && currentUser.role === "admin";

  console.log("État Auth Context - Authentifié:", isAuthenticated);
  console.log("État Auth Context - Admin:", isAdmin);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: currentUser, // pour rétrocompatibilité
        login,
        logout,
        updateUserAccountType,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
