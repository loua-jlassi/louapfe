import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Liste complète des fonctionnalités
  const allFeatures = [
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

  // Sélectionner 2 fonctionnalités gratuites et 2 premium pour la page d'accueil
  const freeFeatures = allFeatures
    .filter((feature) => !feature.isPremium)
    .slice(0, 2);
  const premiumFeatures = allFeatures
    .filter((feature) => feature.isPremium)
    .slice(0, 2);
  const featuredFeatures = [...freeFeatures, ...premiumFeatures];

  const handleViewMore = () => {
    navigate("/features");
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Bienvenue dans notre Catalogue de Fonctionnalités</h1>
        <p>
          Découvrez notre collection complète de fonctionnalités pour améliorer
          votre application
        </p>
      </section>

      {/* Bannière de compte gratuit - ne s'affiche que si l'utilisateur est connecté avec un compte gratuit */}
      {user && user.accountType === "free" && (
        <div className="account-type-banner">
          <p>Vous utilisez actuellement un compte gratuit</p>
          <button className="upgrade-button">Passer à Premium</button>
        </div>
      )}

      <section className="features-section">
        <h2>Fonctionnalités populaires</h2>
        <div className="features-grid">
          {featuredFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card ${
                feature.isPremium ? "premium-feature" : ""
              }`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-category">{feature.category}</span>
              {feature.isPremium && (
                <span className="premium-badge">PREMIUM</span>
              )}
            </div>
          ))}
        </div>
        <div className="view-more-container">
          <button className="view-more-button" onClick={handleViewMore}>
            Voir plus de fonctionnalités
          </button>
        </div>
      </section>

      <section className="categories-section">
        <h2>Catégories</h2>
        <div className="categories-container">
          <div className="category-item">
            <h3>Administration</h3>
            <p>Outils pour gérer votre application</p>
          </div>
          <div className="category-item">
            <h3>Analytics</h3>
            <p>Analyse de données et rapports</p>
          </div>
          <div className="category-item">
            <h3>Communication</h3>
            <p>Outils de communication et notification</p>
          </div>
          <div className="category-item">
            <h3>Contenu</h3>
            <p>Gestion et création de contenu</p>
          </div>
          <div className="category-item">
            <h3>Intégration</h3>
            <p>Connexion avec d'autres services</p>
          </div>
          <div className="category-item">
            <h3>Recherche</h3>
            <p>Outils de recherche et organisation</p>
          </div>
        </div>
      </section>

      {!user && (
        <section className="cta-section">
          <h2>Prêt à commencer?</h2>
          <p>
            Inscrivez-vous dès maintenant pour accéder à toutes nos
            fonctionnalités
          </p>
        </section>
      )}
    </div>
  );
};

export default HomePage;
