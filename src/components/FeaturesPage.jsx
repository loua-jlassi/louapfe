import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./FeaturesPage.css";
import { useTheme } from "../context/ThemeContext";
import {
  FaLock,
  FaStar,
  FaCheck,
  FaClipboardCheck,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import Footer from "./Footer";

const FeaturesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userAccountType, setUserAccountType] = useState("free");
  const [favoriteFeatures, setFavoriteFeatures] = useState([]);
  const { isLoggedIn, updateUserAccountType } = useAuth();
  const { theme, isDarkMode } = useTheme();
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

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

    // Charger les recommandations si disponibles
    const storedRecommendations = localStorage.getItem("recommendations");
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
      setShowRecommendations(true);
    }
  }, [user]);

  const handleUpgrade = () => {
    if (!user) {
      alert("Veuillez vous connecter pour passer à la version premium");
      navigate("/login");
      return;
    }

    // Mise à jour du type de compte de l'utilisateur
    const updatedUser = { ...user, accountType: "premium" };

    // Mettre à jour le stockage local
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, accountType: "premium" } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Mettre à jour l'état de l'application
    updateUserAccountType("premium");
    setUserAccountType("premium");

    alert("Félicitations ! Vous êtes maintenant un utilisateur premium.");
  };

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
  const filteredFeatures = features.filter((feature) => {
    const matchesSearch = feature.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || feature.category === selectedCategory;

    // Ne pas filtrer par type de compte - afficher toutes les fonctionnalités
    return matchesSearch && matchesCategory;
  });

  const handleFeatureClick = (feature) => {
    if (feature.isPremium && userAccountType === "free") {
      alert(
        "Cette fonctionnalité est disponible uniquement pour les utilisateurs premium. Passez à un compte premium pour y accéder."
      );
    } else {
      // Rediriger vers la page de documentation de la fonctionnalité
      navigate(`/features/documentation/${feature.id}`);
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

  const handleStartQuestionnaire = () => {
    navigate("/dev-questionnaire");
  };

  const clearRecommendations = () => {
    localStorage.removeItem("recommendations");
    setRecommendations([]);
    setShowRecommendations(false);
  };

  // Identifier les fonctionnalités recommandées
  const isRecommended = (feature) => {
    if (!recommendations.length) return false;
    return recommendations.some((rec) => rec.title === feature.title);
  };

  const categories = ["all", ...new Set(features.map((f) => f.category))];

  const FeatureCard = ({ feature, isAuthenticated, isPremium }) => {
    const userAccount = isAuthenticated ? userAccountType : "free";
    const canAccess = !feature.isPremium || userAccount === "premium";

    const handleAddToFavorites = () => {
      if (!isAuthenticated) {
        alert("Veuillez vous connecter pour ajouter aux favoris.");
        navigate("/login");
        return;
      }

      // Ajouter aux favoris
      if (!isFeatureInFavorites(feature.id)) {
        const updatedFavorites = [...favoriteFeatures, feature];
        setFavoriteFeatures(updatedFavorites);

        // Stocker dans localStorage
        localStorage.setItem(
          `favorites_${user.email}`,
          JSON.stringify(updatedFavorites)
        );
      }
    };

    return (
      <div
        className={`feature-card ${
          recommendations.includes(feature.id) ? "recommended" : ""
        } ${isDarkMode ? "dark-mode" : ""}`}
      >
        {/* Badge premium si applicable */}
        {feature.isPremium && (
          <div className="premium-tag">
            <FaLock /> Premium
          </div>
        )}

        {/* En-tête de la carte */}
        <div className="feature-header">
          <div className="feature-icon">{renderIcon(feature.icon)}</div>
          <div className="feature-actions">
            <button
              className="favorite-button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToFavorites();
              }}
              aria-label="Ajouter aux favoris"
              title="Ajouter aux favoris"
            >
              <FaStar
                className={`star-icon ${
                  isFeatureInFavorites(feature.id) ? "favorited" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Contenu de la carte */}
        <div className="feature-content">
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
          <div className="feature-category">{feature.category}</div>
        </div>

        {/* Pied de la carte avec bouton d'action */}
        <div className="feature-card-footer">
          <Link
            to={`/features/documentation/${feature.id}`}
            className="view-details-button"
            onClick={(e) => {
              if (!canAccess) {
                e.preventDefault();
                alert(
                  "Cette fonctionnalité est disponible uniquement pour les utilisateurs premium. Passez à un compte premium pour y accéder."
                );
              }
            }}
          >
            Voir les détails
          </Link>
        </div>
      </div>
    );
  };

  // Add renderIcon function
  const renderIcon = (icon) => {
    // If icon is an emoji or text, return it directly
    if (typeof icon === "string") {
      return icon;
    }
    // If no icon is provided, return a default
    return "📦";
  };

  return (
    <div className={`features-page ${theme === "dark" ? "theme-dark" : ""}`}>
      <div className="features-container">
        <div className="features-header">
          <h1>Découvrez Nos Fonctionnalités</h1>
          <p>
            Explorer toutes les fonctionnalités disponibles pour améliorer votre
            expérience. Nous proposons des outils puissants pour vous aider dans
            tous vos projets.
          </p>
        </div>

        {userAccountType === "free" && (
          <div className="account-type-banner">
            <p>
              Vous utilisez actuellement un compte{" "}
              <span className="free-account">Gratuit</span>. Certaines
              fonctionnalités sont réservées aux utilisateurs premium.
            </p>
            <div className="upgrade-text">
              Passez à Premium pour accéder à toutes les fonctionnalités !
            </div>
            <button className="upgrade-button" onClick={handleUpgrade}>
              Passer à Premium
            </button>
          </div>
        )}

        {userAccountType === "premium" && (
          <div className="premium-user-banner">
            <div className="premium-user-text">Compte Premium</div>
            <p>Vous avez accès à toutes les fonctionnalités premium !</p>
          </div>
        )}

        {/* Section questionnaire développeur */}
        <div className="developer-tools-banner">
          <div className="developer-tools-content">
            <h2>Vous êtes développeur ?</h2>
            <p>
              Nous pouvons vous proposer des fonctionnalités adaptées à vos
              besoins spécifiques. Complétez notre questionnaire rapide pour
              obtenir des recommandations personnalisées.
            </p>
            <button
              className="questionnaire-button"
              onClick={handleStartQuestionnaire}
            >
              Commencer le questionnaire
            </button>
          </div>
        </div>

        {/* Afficher les recommandations si disponibles */}
        {showRecommendations && recommendations.length > 0 && (
          <div className="recommendations-section">
            <div className="recommendations-header">
              <h2>Recommandations personnalisées</h2>
              <button
                className="clear-recommendations"
                onClick={clearRecommendations}
              >
                Effacer les recommandations
              </button>
            </div>
            <div className="recommendations-description">
              <p>
                Basé sur votre profil de développeur, nous vous recommandons les
                fonctionnalités suivantes :
              </p>
            </div>
            <div className="recommendations-list">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="recommendation-tag">
                  <FaClipboardCheck className="recommendation-icon" />
                  {recommendation.title}
                  <span className="recommendation-type">
                    {recommendation.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="features-filters">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher une fonctionnalité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            <button
              className={`category-button ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              Toutes
            </button>
            {Array.from(
              new Set(features.map((feature) => feature.category))
            ).map((category) => (
              <button
                key={category}
                className={`category-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {user && user.role === "admin" && (
          <div className="dashboard-link">
            <button className="dashboard-button" onClick={handleViewDashboard}>
              Accéder au tableau de bord administrateur
            </button>
          </div>
        )}

        <div className="features-grid">
          {filteredFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isAuthenticated={user}
              isPremium={userAccountType === "premium"}
            />
          ))}
        </div>

        {/* Section "Prêt à commencer" */}
        <section className="features-cta-section">
          <h2>Prêt à commencer?</h2>
          <p>
            Explorez notre catalogue complet de fonctionnalités et intégrez-les
            à vos projets dès maintenant
          </p>
          <div className="cta-buttons">
            {!user ? (
              <>
                <Link to="/register" className="cta-button primary">
                  S'inscrire
                </Link>
                <Link to="/login" className="cta-button secondary">
                  Se connecter
                </Link>
              </>
            ) : userAccountType === "free" ? (
              <button className="cta-button primary" onClick={handleUpgrade}>
                Passer à Premium
              </button>
            ) : (
              <Link to="/dashboard" className="cta-button primary">
                Accéder à mon tableau de bord
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturesPage;
