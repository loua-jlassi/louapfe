import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./HomePage.css";

const HomePage = () => {
  const { user, updateUserAccountType } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

    alert("Félicitations ! Vous êtes maintenant un utilisateur premium.");
  };

  const handleContactButtonClick = () => {
    setShowContactForm(true);
  };

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setFormSubmitted(true);
      setTimeout(() => {
        setShowContactForm(false);
        setFormSubmitted(false);
        setContactFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };

  const handleCloseContact = () => {
    setShowContactForm(false);
    setFormSubmitted(false);
  };

  return (
    <div className={`home-container ${theme === "dark" ? "theme-dark" : ""}`}>
      <section className="hero-section">
        <h1>Bienvenue dans notre Catalogue de Fonctionnalités</h1>
        <p>
          Découvrez notre collection complète de fonctionnalités pour améliorer
          votre application
        </p>
        <div className="hero-buttons">
          <button className="hero-button" onClick={() => navigate("/features")}>
            Explorer les fonctionnalités
          </button>
          <button className="contact-button" onClick={handleContactButtonClick}>
            Nous contacter
          </button>
        </div>
      </section>

      {/* Formulaire de contact en overlay */}
      {showContactForm && (
        <div
          className={`contact-overlay ${
            theme === "dark" ? "dark-overlay" : ""
          }`}
        >
          <div
            className={`contact-popup ${theme === "dark" ? "dark-popup" : ""}`}
          >
            <button className="close-button" onClick={handleCloseContact}>
              &times;
            </button>
            {formSubmitted ? (
              <div className="success-message">
                <h3>Message envoyé avec succès!</h3>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <>
                <h3>Contactez-nous</h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactInputChange}
                      required
                      className={theme === "dark" ? "dark-input" : ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      required
                      className={theme === "dark" ? "dark-input" : ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={contactFormData.message}
                      onChange={handleContactInputChange}
                      required
                      className={theme === "dark" ? "dark-input" : ""}
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">
                    Envoyer le message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bannière de compte gratuit - ne s'affiche que si l'utilisateur est connecté avec un compte gratuit */}
      {user && user.accountType === "free" && (
        <div
          className={`account-type-banner ${
            theme === "dark" ? "dark-banner" : ""
          }`}
        >
          <p>Vous utilisez actuellement un compte gratuit</p>
          <button className="upgrade-button" onClick={handleUpgrade}>
            Passer à Premium
          </button>
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
              } ${theme === "dark" ? "dark-card" : ""}`}
              onClick={() => navigate(`/features/${feature.id}`)}
            >
              <div className="feature-icon">{feature.icon}</div>
              {feature.isPremium && (
                <span
                  className={`premium-badge ${
                    theme === "dark" ? "dark-badge" : ""
                  }`}
                >
                  PREMIUM
                </span>
              )}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span
                className={`feature-category ${
                  theme === "dark" ? "dark-category" : ""
                }`}
              >
                {feature.category}
              </span>
            </div>
          ))}
        </div>
        <div className="view-more-container">
          <button className="view-more-button" onClick={handleViewMore}>
            Voir plus de fonctionnalités
          </button>
        </div>
      </section>

      {/* Section de contact */}
      <section
        className={`contact-section ${theme === "dark" ? "dark-contact" : ""}`}
      >
        <div className="contact-content">
          <h2>Une question? Contactez-nous</h2>
          <p>
            Notre équipe est à votre disposition pour répondre à toutes vos
            questions et vous aider à tirer le meilleur parti de nos
            fonctionnalités.
          </p>
          <button
            className="contact-button-large"
            onClick={handleContactButtonClick}
          >
            Nous contacter
          </button>
        </div>
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div className="contact-text">
              <h3>Email</h3>
              <p>support@fonctionalites.com</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📱</div>
            <div className="contact-text">
              <h3>Téléphone</h3>
              <p>+33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">🌐</div>
            <div className="contact-text">
              <h3>Réseaux sociaux</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  Facebook
                </a>
                <a href="#" className="social-link">
                  Twitter
                </a>
                <a href="#" className="social-link">
                  LinkedIn
                </a>
              </div>
            </div>
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
          <div className="cta-buttons">
            <Link to="/features" className="cta-button primary">
              Explorer les fonctionnalités
            </Link>
            <Link to="/register" className="cta-button secondary">
              S'inscrire
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
