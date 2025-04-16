import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";
import "../styles/LegalPages.css";
import "../components/AboutPage.css";

const AboutPage = () => {
  const { theme } = useTheme();

  // Données de l'équipe
  const teamMembers = [
    {
      name: "Alex Dubois",
      role: "Fondateur & CEO",
      image: "👨‍💼",
      bio: "Développeur passionné avec plus de 10 ans d'expérience dans la création d'outils pour développeurs.",
    },
    {
      name: "Marie Laurent",
      role: "CTO",
      image: "👩‍💻",
      bio: "Ancienne architecte logiciel chez Google, Marie dirige notre équipe technique avec expertise.",
    },
    {
      name: "Thomas Moreau",
      role: "Designer UX",
      image: "👨‍🎨",
      bio: "Expert en expérience utilisateur qui s'assure que nos fonctionnalités sont intuitives et élégantes.",
    },
    {
      name: "Sophie Leclerc",
      role: "Responsable Produit",
      image: "👩‍💼",
      bio: "À l'écoute des besoins clients, Sophie transforme les retours en nouvelles fonctionnalités.",
    },
  ];

  return (
    <>
      <div className={`about-page ${theme === "dark" ? "dark" : ""}`}>
        <div className="about-container">
          <section className="about-hero">
            <h1>À propos de nous</h1>
            <p className="subtitle">
              Nous simplifions la gestion de vos projets pour booster votre
              productivité.
            </p>
          </section>

          <section className="about-mission">
            <div className="mission-content">
              <h2>Notre mission</h2>
              <p>
                Notre mission est de simplifier le développement de projets pour
                les équipes de toutes tailles. Nous offrons un catalogue de
                fonctionnalités qui peuvent être facilement intégrées, vous
                permettant de vous concentrer sur ce qui compte vraiment : créer
                des produits exceptionnels.
              </p>
              <p>
                Créée en 2020, notre plateforme est rapidement devenue un outil
                indispensable pour des centaines d'équipes dans le monde entier,
                leur permettant d'accélérer leur développement et d'améliorer
                leur productivité.
              </p>
            </div>
            <div className="mission-image">
              <div className="mission-icon">🚀</div>
            </div>
          </section>

          <section className="values-section">
            <h2>Nos valeurs</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">💡</div>
                <h3>Innovation</h3>
                <p>
                  Nous recherchons constamment de nouvelles façons d'améliorer
                  nos fonctionnalités et de résoudre les défis complexes de
                  développement.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Collaboration</h3>
                <p>
                  Nous croyons au pouvoir du travail d'équipe et à la force des
                  communautés de développeurs qui partagent leurs connaissances.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🔒</div>
                <h3>Fiabilité</h3>
                <p>
                  Nous nous engageons à fournir des outils fiables et sécurisés
                  que nos utilisateurs peuvent intégrer en toute confiance.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🌱</div>
                <h3>Adaptabilité</h3>
                <p>
                  Nous évoluons constamment pour répondre aux besoins changeants
                  du monde du développement logiciel.
                </p>
              </div>
            </div>
          </section>

          <section className="team-section">
            <h2>Notre équipe</h2>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div className="team-card" key={index}>
                  <div className="team-member-image">{member.image}</div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="contact-cta">
            <h2>Travaillons ensemble</h2>
            <p>
              Vous avez des questions ou vous souhaitez en savoir plus sur nos
              services? N'hésitez pas à nous contacter.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">
                Contactez-nous
              </Link>
              <Link to="/features" className="cta-button secondary">
                Voir nos fonctionnalités
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
