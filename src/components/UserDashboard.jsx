import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [favoriteFeatures, setFavoriteFeatures] = useState([]);

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas connecté
    if (!user) {
      navigate("/login");
      return;
    }

    // Charger les fonctionnalités favorites depuis localStorage
    const storedFavorites = localStorage.getItem(`favorites_${user.email}`);
    if (storedFavorites) {
      setFavoriteFeatures(JSON.parse(storedFavorites));
    }
  }, [user, navigate]);

  const handleRemoveFavorite = (featureId) => {
    const updatedFavorites = favoriteFeatures.filter(
      (feature) => feature.id !== featureId
    );
    setFavoriteFeatures(updatedFavorites);
    localStorage.setItem(
      `favorites_${user.email}`,
      JSON.stringify(updatedFavorites)
    );
  };

  const handleEditFeature = (featureId) => {
    // Ouvrir le formulaire d'édition pour cette fonctionnalité
    navigate(`/edit-feature/${featureId}`);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tableau de bord utilisateur</h1>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Mon Profil
        </button>
        <button
          className={`tab-button ${activeTab === "favorites" ? "active" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          Fonctionnalités Favorites
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "profile" && (
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="profile-info">
                <h2>{user?.name || "Utilisateur"}</h2>
                <p>{user?.email || "email@exemple.com"}</p>
                <span className="account-type-badge">
                  Compte{" "}
                  {user?.accountType === "premium" ? "Premium" : "Gratuit"}
                </span>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <h3>Informations personnelles</h3>
                <p>
                  <strong>Nom:</strong> {user?.name || "Non défini"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "Non défini"}
                </p>
                <p>
                  <strong>Date d'inscription:</strong>{" "}
                  {user?.registrationDate || "Non définie"}
                </p>
              </div>

              <div className="detail-item">
                <h3>Type de compte</h3>
                <p>
                  {user?.accountType === "premium"
                    ? "Vous disposez d'un compte Premium avec accès à toutes les fonctionnalités."
                    : "Vous disposez d'un compte Gratuit. Passez à Premium pour accéder à toutes les fonctionnalités."}
                </p>
                {user?.accountType !== "premium" && (
                  <button className="upgrade-button">Passer à Premium</button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="favorites-section">
            <h2>Mes fonctionnalités favorites</h2>
            {favoriteFeatures.length === 0 ? (
              <div className="empty-favorites">
                <p>
                  Vous n'avez pas encore de fonctionnalités favorites. Parcourez
                  le catalogue et ajoutez des fonctionnalités à vos favoris.
                </p>
                <button
                  className="browse-button"
                  onClick={() => navigate("/features")}
                >
                  Parcourir le catalogue
                </button>
              </div>
            ) : (
              <div className="favorites-grid">
                {favoriteFeatures.map((feature) => (
                  <div key={feature.id} className="favorite-card">
                    <div className="favorite-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <div className="favorite-actions">
                      <button
                        className="edit-button"
                        onClick={() => handleEditFeature(feature.id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveFavorite(feature.id)}
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
