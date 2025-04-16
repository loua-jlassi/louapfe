import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import ContactForm from "./ContactForm";
import "./ContactPage.css";

const ContactPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Contactez-nous | FeatureFlex";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitSuccess = () => {
    console.log("Formulaire soumis avec succès");
    // Vous pourriez ajouter une logique supplémentaire ici comme l'affichage d'une notification
  };

  return (
    <div className={`contact-page ${darkMode ? "dark-theme" : ""}`}>
      <div className="contact-page-header">
        <div className="header-content">
          <h1>Contactez-nous</h1>
          <p>
            Nous serions ravis d'avoir de vos nouvelles. Que vous ayez une
            question sur nos fonctionnalités, nos tarifs, ou toute autre chose,
            notre équipe est prête à répondre à vos questions.
          </p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <h2>Informations de Contact</h2>
          <p>Contactez-nous par l'un de ces moyens :</p>

          <div className="contact-info-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h3>Notre Adresse</h3>
                <p>123 Rue des Fonctionnalités, Vallée Tech, 75000 Paris</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-details">
                <h3>Numéro de Téléphone</h3>
                <p>+33 (0)1 23 45 67 89</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h3>Adresse Email</h3>
                <p>contact@featureflex.com</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaClock />
              </div>
              <div className="contact-details">
                <h3>Heures d'Ouverture</h3>
                <p>Lundi-Vendredi: 9h - 18h</p>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h3>Suivez-nous</h3>
            <div className="social-links">
              <a
                href="https://facebook.com"
                className="social-link"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                className="social-link"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com"
                className="social-link"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Envoyez-nous un Message</h2>
          <p>
            Remplissez le formulaire ci-dessous et nous vous répondrons dès que
            possible.
          </p>
          <ContactForm
            onSubmitSuccess={handleSubmitSuccess}
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
              subject: "",
              message: "",
            }}
          />
        </div>
      </div>

      <div className="map-section">
        <h2>Visitez Nos Bureaux</h2>
        <div className="map-container">
          {/* Dans un projet réel, vous utiliseriez une intégration de carte comme Google Maps */}
          <div className="map-placeholder">
            <FaMapMarkerAlt className="map-marker" />
            <p>La carte interactive serait affichée ici</p>
          </div>
        </div>
      </div>

      <div className="contact-cta">
        <div className="cta-content">
          <h2>Pas encore prêt à nous contacter ?</h2>
          <p>
            Explorez nos fonctionnalités et découvrez ce que nous proposons.
          </p>
          <div className="cta-buttons">
            <Link to="/features" className="cta-btn primary">
              Explorer les Fonctionnalités
            </Link>
            <Link to="/about" className="cta-btn secondary">
              À Propos de Nous
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
