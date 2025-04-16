import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./FeatureDocumentation.css";
import {
  FaArrowLeft,
  FaBook,
  FaCode,
  FaQuestion,
  FaLaptopCode,
  FaClock,
  FaTools,
  FaMobileAlt,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
  FaReact,
  FaVuejs,
  FaAngular,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaUser,
  FaComment,
  FaInfoCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import { SiSvelte } from "react-icons/si";
import { DiNodejs } from "react-icons/di";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useAuth } from "../context/AuthContext";
import featureDocumentation from "../data/featureDocumentation";
import { Link } from "react-router-dom";
import { FaBookmark, FaLightbulb, FaChevronRight } from "react-icons/fa";

const FeatureDocumentation = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [feature, setFeature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    text: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState({});

  useEffect(() => {
    // Set document title
    document.title = "Documentation des fonctionnalités | NLP App";

    // Find the feature by ID
    const foundFeature = featureDocumentation.find(
      (f) => f.id === parseInt(id)
    );

    if (foundFeature) {
      setFeature(foundFeature);
      setLoading(false);
    } else {
      setError("Documentation non trouvée");
      setLoading(false);
    }

    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Load helpful reviews from localStorage
    const storedHelpfulReviews = localStorage.getItem(`helpful_reviews_${id}`);
    if (storedHelpfulReviews) {
      setHelpfulReviews(JSON.parse(storedHelpfulReviews));
    }
  }, [id]);

  // Check if user has access to this feature
  const hasAccess = () => {
    if (!feature) return false;

    // If feature is free for all, allow access
    if (feature.accessibility.free) return true;

    // If premium feature, check if user is premium
    if (feature.accessibility.premium && currentUser?.isPremium) return true;

    // If feature has trial, always allow (in real app, would check if trial period is active)
    if (feature.accessibility.trial) return true;

    return false;
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleRatingChange = (rating) => {
    setNewReview({
      ...newReview,
      rating,
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to save the review
    alert("Votre avis a été soumis avec succès!");
    setNewReview({
      rating: 5,
      title: "",
      text: "",
    });
    setShowReviewForm(false);
  };

  const handleHelpfulClick = (reviewId, isHelpful) => {
    if (!currentUser) {
      alert("Veuillez vous connecter pour marquer les avis comme utiles");
      return;
    }

    const newHelpfulReviews = {
      ...helpfulReviews,
      [reviewId]: isHelpful,
    };

    setHelpfulReviews(newHelpfulReviews);
    localStorage.setItem(
      `helpful_reviews_${id}`,
      JSON.stringify(newHelpfulReviews)
    );

    // In a real app, this would update the review in the database
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="rating-stars">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="star filled" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="star half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="star empty" />
        ))}
      </div>
    );
  };

  const renderSelectableStars = () => {
    return (
      <div className="selectable-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingChange(star)}
            className={`selectable-star ${
              star <= newReview.rating ? "selected" : ""
            }`}
          >
            {star <= newReview.rating ? (
              <FaStar className="star filled" />
            ) : (
              <FaRegStar className="star empty" />
            )}
          </span>
        ))}
      </div>
    );
  };

  const renderRatingDistribution = (distribution) => {
    const total = Object.values(distribution).reduce(
      (acc, val) => acc + val,
      0
    );

    return (
      <div className="rating-distribution">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="distribution-row">
            <div className="star-label">
              {star} <FaStar className="star filled" />
            </div>
            <div className="distribution-bar-container">
              <div
                className="distribution-bar"
                style={{ width: `${(distribution[star] / total) * 100}%` }}
              ></div>
            </div>
            <div className="distribution-count">{distribution[star]}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    if (!feature) return null;

    switch (activeTab) {
      case "overview":
        return (
          <div className="doc-overview">
            <p className="doc-description">{feature.overview}</p>

            <div className="doc-benefits">
              <h3>Avantages</h3>
              <ul>
                {feature.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="doc-use-cases">
              <h3>Cas d'utilisation</h3>
              <div className="use-cases-grid">
                {feature.useCases.map((useCase, index) => (
                  <div className="use-case-card" key={index}>
                    <h4>{useCase.title}</h4>
                    <p>{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "guide":
        return (
          <div className="doc-guide">
            <div className="guide-steps">
              {feature.guide.steps.map((step) => (
                <div className="guide-step" key={step.step}>
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    {step.image && (
                      <div className="step-image">
                        <img src={step.image} alt={step.title} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="guide-tips">
              <h3>
                <FaLightbulb /> Conseils pour de meilleurs résultats
              </h3>
              <ul>
                {feature.guide.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="doc-faq">
            <div className="faq-list">
              {feature.faqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <h3>
                    <FaQuestion /> {faq.question}
                  </h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "examples":
        return (
          <div className="doc-examples">
            {feature.examples.map((example, index) => (
              <div className="code-example" key={index}>
                <h3>{example.title}</h3>
                <div className="code-block">
                  <pre>
                    <code className={example.language}>{example.code}</code>
                  </pre>
                </div>
              </div>
            ))}

            <div className="examples-note">
              <p>
                Pour plus d'exemples, consultez notre{" "}
                <a
                  href={feature.metadata.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  documentation API complète
                </a>
                .
              </p>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="doc-reviews">
            <div className="reviews-summary">
              <div className="average-rating">
                <div className="rating-number">
                  {feature.ratings.average.toFixed(1)}
                </div>
                <div className="rating-stars-container">
                  {renderRatingStars(feature.ratings.average)}
                  <div className="rating-count">
                    {feature.ratings.count} évaluations
                  </div>
                </div>
              </div>

              <div className="rating-distribution-container">
                <h3>Répartition des notes</h3>
                {renderRatingDistribution(feature.ratings.distribution)}
              </div>
            </div>

            {currentUser && !showReviewForm && (
              <div className="add-review-prompt">
                <button
                  className="add-review-button"
                  onClick={() => setShowReviewForm(true)}
                >
                  <FaComment /> Ajouter votre avis
                </button>
              </div>
            )}

            {showReviewForm && (
              <div className="review-form-container">
                <h3>Partagez votre expérience</h3>
                <form onSubmit={handleReviewSubmit} className="review-form">
                  <div className="form-group">
                    <label>Votre note</label>
                    {renderSelectableStars()}
                  </div>
                  <div className="form-group">
                    <label htmlFor="review-title">Titre de votre avis</label>
                    <input
                      id="review-title"
                      type="text"
                      name="title"
                      value={newReview.title}
                      onChange={handleReviewChange}
                      placeholder="Résumez votre expérience en une phrase"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="review-text">Votre avis détaillé</label>
                    <textarea
                      id="review-text"
                      name="text"
                      value={newReview.text}
                      onChange={handleReviewChange}
                      placeholder="Partagez votre expérience avec cette fonctionnalité..."
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-review-button">
                      Publier l'avis
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="reviews-list">
              <h3>Avis des développeurs</h3>
              {feature.reviews && feature.reviews.length > 0 ? (
                feature.reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="reviewer-avatar"
                        />
                        <div className="reviewer-details">
                          <div className="reviewer-name">{review.author}</div>
                          <div className="reviewer-role">
                            {review.authorRole} chez {review.authorCompany}
                          </div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {renderRatingStars(review.rating)}
                      </div>
                    </div>
                    <div className="review-body">
                      <h4 className="review-title">{review.title}</h4>
                      <p className="review-text">{review.text}</p>
                      <div className="review-date">
                        Publié le {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="review-footer">
                      <div className="helpful-buttons">
                        <span>Cet avis vous a-t-il été utile ?</span>
                        <button
                          className={`helpful-button ${
                            helpfulReviews[review.id] === true ? "selected" : ""
                          }`}
                          onClick={() => handleHelpfulClick(review.id, true)}
                          disabled={helpfulReviews[review.id] !== undefined}
                        >
                          <FaThumbsUp /> Oui ({review.helpful})
                        </button>
                        <button
                          className={`not-helpful-button ${
                            helpfulReviews[review.id] === false
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleHelpfulClick(review.id, false)}
                          disabled={helpfulReviews[review.id] !== undefined}
                        >
                          <FaThumbsDown /> Non ({review.notHelpful})
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  <p>
                    Aucun avis pour le moment. Soyez le premier à partager votre
                    expérience !
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div>Contenu non disponible</div>;
    }
  };

  if (loading) {
    return <div className="doc-loading">Chargement de la documentation...</div>;
  }

  if (error) {
    return (
      <div className="doc-error">
        <h2>Erreur</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/features")}>
          Retour à la liste des fonctionnalités
        </button>
      </div>
    );
  }

  // Calculer le nombre d'avis
  const reviewCount = feature?.reviews?.length || 0;

  return (
    <div className={`feature-documentation ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="doc-header">
        <Link to="/features" className="back-link">
          <FaArrowLeft /> Retour aux fonctionnalités
        </Link>

        <div className="feature-meta">
          <div className="feature-category">{feature.category}</div>
          <div className={`feature-status status-${feature.status}`}>
            {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
          </div>
        </div>

        <h1 className="feature-title">{feature.title}</h1>
        <p className="feature-description">{feature.description}</p>

        <div className="feature-version-info">
          <span>Version {feature.version}</span>
          <span>
            Mise à jour le {new Date(feature.lastUpdated).toLocaleDateString()}
          </span>
        </div>

        <div className="feature-access-info">
          {feature.accessibility.premium && (
            <span className="access-badge premium">Premium</span>
          )}
          {feature.accessibility.free && (
            <span className="access-badge free">Gratuit</span>
          )}
          {feature.accessibility.trial && (
            <span className="access-badge trial">
              Essai {feature.accessibility.trialDuration} jours
            </span>
          )}
        </div>

        <div className="feature-rating-summary">
          {renderRatingStars(feature.ratings.average)}
          <span className="rating-text">
            {feature.ratings.average.toFixed(1)} ({feature.ratings.count} avis)
          </span>
        </div>
      </div>

      {!hasAccess() && (
        <div className="access-restriction-notice">
          <h3>Fonctionnalité premium</h3>
          <p>
            Cette fonctionnalité nécessite un abonnement premium. Passez à la
            version premium pour accéder à toutes les fonctionnalités.
          </p>
          <Link to="/pricing" className="upgrade-button">
            Passer à la version premium
          </Link>
        </div>
      )}

      {hasAccess() && (
        <>
          <div className="doc-navigation">
            <button
              className={`nav-button ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <FaInfoCircle className="icon" /> Aperçu
            </button>
            <button
              className={`nav-button ${activeTab === "guide" ? "active" : ""}`}
              onClick={() => setActiveTab("guide")}
            >
              <FaBook className="icon" /> Guide
            </button>
            <button
              className={`nav-button ${activeTab === "faq" ? "active" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              <FaQuestionCircle className="icon" /> FAQ
            </button>
            <button
              className={`nav-button ${
                activeTab === "examples" ? "active" : ""
              }`}
              onClick={() => setActiveTab("examples")}
            >
              <FaCode className="icon" /> Exemples
            </button>
            <button
              className={`nav-button ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              <FaStar className="icon" /> Avis
              {reviewCount > 0 && <span className="badge">{reviewCount}</span>}
            </button>
          </div>

          <div className="doc-content">{renderTabContent()}</div>

          <div className="doc-footer">
            <div className="doc-metadata">
              <div className="metadata-item">
                <strong>API Endpoint:</strong>{" "}
                <code>{feature.metadata.apiEndpoint}</code>
              </div>
              <div className="metadata-item">
                <strong>Limite d'utilisation:</strong>{" "}
                {feature.metadata.rateLimit}
              </div>
              <div className="metadata-item">
                <strong>Confidentialité:</strong> {feature.metadata.dataPrivacy}
              </div>
            </div>

            <div className="related-features">
              <h3>Fonctionnalités associées</h3>
              <div className="related-features-list">
                {feature.relatedFeatures.map((relatedId) => {
                  const relatedFeature = featureDocumentation.find(
                    (f) => f.id === relatedId
                  );
                  return relatedFeature ? (
                    <Link
                      to={`/features/documentation/${relatedFeature.id}`}
                      key={relatedFeature.id}
                      className="related-feature-link"
                    >
                      {relatedFeature.title} <FaChevronRight />
                    </Link>
                  ) : null;
                })}
              </div>
            </div>

            <div className="doc-actions">
              <a href={feature.metadata.demoUrl} className="demo-button">
                Essayer la démo
              </a>
              <a
                href={feature.metadata.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-link"
              >
                <FaBookmark /> Documentation technique
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeatureDocumentation;
