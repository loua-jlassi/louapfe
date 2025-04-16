import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { user, updateUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [favoriteFeatures, setFavoriteFeatures] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

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

    // Charger l'image de profil depuis localStorage
    const storedProfileImage = localStorage.getItem(
      `profileImage_${user.email}`
    );
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
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

  const handleGenerateProject = () => {
    if (favoriteFeatures.length === 0) {
      alert(
        "Veuillez ajouter au moins une fonctionnalité à vos favoris pour générer un projet."
      );
      return;
    }

    setIsGenerating(true);

    // Simuler un temps de génération
    setTimeout(() => {
      const premiumFeatures = favoriteFeatures.filter(
        (feature) => feature.isPremium
      );

      if (premiumFeatures.length > 0 && user.accountType !== "premium") {
        alert(
          "Votre projet contient des fonctionnalités premium. Veuillez passer à un compte premium pour les inclure dans votre projet."
        );
      } else {
        alert(
          "Votre projet a été généré avec succès! Vous pouvez le télécharger dans la section 'Mes Projets'."
        );
      }

      setIsGenerating(false);
    }, 2000);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setProfileImage(imageData);
        localStorage.setItem(`profileImage_${user.email}`, imageData);

        // Update user object with profile image info
        if (user) {
          const updatedUser = { ...user, hasProfileImage: true };
          updateUser(updatedUser);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem(`profileImage_${user.email}`);

    // Update user object to reflect image removal
    if (user) {
      const updatedUser = { ...user, hasProfileImage: false };
      updateUser(updatedUser);
    }
  };

  return (
    <div
      className={`dashboard-container ${
        theme === "dark" ? "dark-dashboard" : ""
      }`}
    >
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
              <div className="profile-avatar-container">
                <div
                  className="profile-avatar"
                  onClick={handleImageClick}
                  style={
                    profileImage
                      ? {
                          backgroundImage: `url(${profileImage})`,
                          backgroundSize: "cover",
                        }
                      : {}
                  }
                >
                  {!profileImage &&
                    (user?.firstName
                      ? user.firstName.charAt(0).toUpperCase()
                      : "U")}
                  <div className="avatar-overlay">
                    <span className="avatar-edit-icon">📷</span>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                {profileImage && (
                  <button
                    className="remove-image-button"
                    onClick={handleRemoveImage}
                  >
                    Supprimer l'image
                  </button>
                )}
              </div>
              <div className="profile-info">
                <h2>
                  {user?.firstName} {user?.lastName || ""}
                </h2>
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
                  <strong>Prénom:</strong> {user?.firstName || "Non défini"}
                </p>
                <p>
                  <strong>Nom:</strong> {user?.lastName || "Non défini"}
                </p>
                <p>
                  <strong>Nom d'utilisateur:</strong>{" "}
                  {user?.username || "Non défini"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "Non défini"}
                </p>
                <p>
                  <strong>GitHub:</strong> {user?.githubLink || "Non défini"}
                </p>
                <p>
                  <strong>Niveau d'expérience:</strong>{" "}
                  {user?.experienceLevel || "Non défini"}
                </p>
                <p>
                  <strong>Date d'inscription:</strong>{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Non définie"}
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
              <>
                <div className="generate-project-top">
                  <button
                    className={`generate-project-button ${
                      isGenerating ? "generating" : ""
                    }`}
                    onClick={handleGenerateProject}
                    disabled={isGenerating}
                  >
                    <span className="generate-icon">⚙️</span>
                    {isGenerating
                      ? "Génération en cours..."
                      : "Générer mon projet avec ces fonctionnalités"}
                  </button>
                </div>
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
                <div className="generate-project-bottom">
                  <button
                    className={`generate-project-button ${
                      isGenerating ? "generating" : ""
                    }`}
                    onClick={handleGenerateProject}
                    disabled={isGenerating}
                  >
                    <span className="generate-icon">🛠️</span>
                    {isGenerating
                      ? "Génération en cours..."
                      : "Générer mon projet avec ces fonctionnalités"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
