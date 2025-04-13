import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./FeaturesPage.css";

const FeaturesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userAccountType, setUserAccountType] = useState("free");
  const [favoriteFeatures, setFavoriteFeatures] = useState([]);

  useEffect(() => {
    // Récupérer le type de compte de l'utilisateur connecté
    if (user) {
      setUserAccountType(user.accountType);

      // Chargement des favoris
      const storedFavorites = localStorage.getItem(`favorites_${user.email}`);
      if (storedFavorites) {
        setFavoriteFeatures(JSON.parse(storedFavorites));
      }
    }
  }, [user]);

  const features = [
    {
      id: 1,
      title: "Gestion des utilisateurs",
      description:
        "Système complet de gestion des utilisateurs avec authentification et autorisations.",
      category: "Administration",
      icon: "👥",
      isPremium: false,
    },
    {
      id: 2,
      title: "Tableau de bord analytique",
      description: "Visualisation des données et statistiques en temps réel.",
      category: "Analytics",
      icon: "📊",
      isPremium: true,
    },
    {
      id: 3,
      title: "Système de notifications",
      description: "Notifications en temps réel pour les utilisateurs.",
      category: "Communication",
      icon: "🔔",
      isPremium: false,
    },
    {
      id: 4,
      title: "Gestion de contenu",
      description: "Création et gestion de contenu dynamique.",
      category: "Contenu",
      icon: "📝",
      isPremium: false,
    },
    {
      id: 5,
      title: "Intégration API",
      description: "Connexion avec des services tiers via API.",
      category: "Intégration",
      icon: "🔌",
      isPremium: true,
    },
    {
      id: 6,
      title: "Système de recherche avancée",
      description: "Recherche performante avec filtres multiples.",
      category: "Recherche",
      icon: "🔍",
      isPremium: true,
    },
    {
      id: 7,
      title: "Rapport personnalisé",
      description:
        "Création de rapports personnalisés avec visualisations avancées et export multi-format.",
      category: "Analytics",
      icon: "📈",
      isPremium: true,
    },
    {
      id: 8,
      title: "Éditeur de texte riche",
      description:
        "Éditeur de texte avec formatage avancé, insertion d'images et gestion des styles.",
      category: "Contenu",
      icon: "✏️",
      isPremium: false,
    },
    {
      id: 9,
      title: "Système des tags",
      description:
        "Organisation du contenu avec un système de tags avancé et catégorisation intelligente.",
      category: "Recherche",
      icon: "🏷️",
      isPremium: false,
    },
    {
      id: 10,
      title: "Chatbot",
      description:
        "Assistant virtuel intelligent pour répondre aux questions et guider les utilisateurs.",
      category: "Communication",
      icon: "🤖",
      isPremium: true,
    },
  ];

  // Filtrer les fonctionnalités en fonction de la recherche et de la catégorie
  // Ne plus filtrer par type de compte pour afficher toutes les fonctionnalités
  const filteredFeatures = features.filter((feature) => {
    const matchesSearch = feature.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || feature.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFeatureClick = (feature) => {
    if (feature.isPremium && userAccountType === "free") {
      alert(
        "Cette fonctionnalité est disponible uniquement pour les utilisateurs premium. Passez à un compte premium pour y accéder."
      );
    }
  };

  const isFeatureInFavorites = (featureId) => {
    return favoriteFeatures.some((fav) => fav.id === featureId);
  };

  const handleAddToFavorites = (feature, event) => {
    event.stopPropagation();

    if (!user) {
      alert(
        "Veuillez vous connecter pour ajouter des fonctionnalités à vos favoris."
      );
      navigate("/login");
      return;
    }

    // Vérifier si la fonctionnalité est déjà dans les favoris
    if (isFeatureInFavorites(feature.id)) {
      alert("Cette fonctionnalité est déjà dans vos favoris.");
      return;
    }

    const newFavorite = {
      ...feature,
      addedAt: new Date().toISOString(),
      userNotes: "",
      userPriority: "medium",
      userCustomization: "",
    };

    const updatedFavorites = [...favoriteFeatures, newFavorite];
    setFavoriteFeatures(updatedFavorites);
    localStorage.setItem(
      `favorites_${user.email}`,
      JSON.stringify(updatedFavorites)
    );

    alert("La fonctionnalité a été ajoutée à vos favoris.");
  };

  const handleViewDashboard = () => {
    navigate("/dashboard");
  };

  const categories = ["all", ...new Set(features.map((f) => f.category))];

  return (
    <div className="features-page">
      <h1>Catalogue de Fonctionnalités</h1>

      {/* Bannière de type de compte - uniquement pour les utilisateurs connectés avec un compte gratuit */}
      {user && user.accountType === "free" && (
        <div className="account-type-banner">
          <p>Vous utilisez actuellement un compte gratuit</p>
          <button className="upgrade-button">Passer à Premium</button>
        </div>
      )}

      {user && (
        <div className="dashboard-link">
          <button className="dashboard-button" onClick={handleViewDashboard}>
            Voir mon tableau de bord
          </button>
        </div>
      )}

      <div className="features-controls">
        <input
          type="text"
          placeholder="Rechercher une fonctionnalité..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "Toutes les catégories" : category}
            </option>
          ))}
        </select>
      </div>

      <div className="features-grid">
        {filteredFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`feature-card ${
              feature.isPremium ? "premium-feature" : ""
            } ${
              feature.isPremium && userAccountType === "free" ? "locked" : ""
            }`}
            onClick={() => handleFeatureClick(feature)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="feature-footer">
              <span className="feature-category">{feature.category}</span>
              {user && (
                <button
                  className={`favorite-button ${
                    isFeatureInFavorites(feature.id) ? "favorited" : ""
                  }`}
                  onClick={(e) => handleAddToFavorites(feature, e)}
                  disabled={isFeatureInFavorites(feature.id)}
                >
                  {isFeatureInFavorites(feature.id) ? "✓ Ajouté" : "Ajouter"}
                </button>
              )}
            </div>
            {feature.isPremium && userAccountType === "free" && (
              <div className="premium-lock">
                <span className="lock-icon">🔒</span>
                <span>Fonctionnalité Premium</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
