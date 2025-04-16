import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    githubLink: "",
    experienceLevel: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    accountType: "free",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const experienceLevels = ["Débutant", "Intermédiaire", "Avancé"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validation du prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    // Validation du nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    // Validation du nom d'utilisateur
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    }

    // Validation du lien GitHub
    if (!formData.githubLink.trim()) {
      newErrors.githubLink = "Le lien GitHub est requis";
    } else if (
      !/^https?:\/\/(www\.)?github\.com\/\S+/i.test(formData.githubLink)
    ) {
      newErrors.githubLink = "Le lien GitHub n'est pas valide";
    }

    // Validation du niveau d'expérience
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Le niveau d'expérience est requis";
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    // Confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Validation des conditions générales
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Vous devez accepter les conditions générales";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Vérifier si l'email existe déjà
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (existingUsers.some((user) => user.email === formData.email)) {
        setErrors({
          email: "Cet email est déjà utilisé",
        });
        return;
      }

      // Sauvegarder l'utilisateur
      const newUser = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Connecter l'utilisateur
      const {
        password,
        confirmPassword,
        agreeTerms,
        ...userWithoutSensitiveData
      } = newUser;
      login(userWithoutSensitiveData);

      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/features");
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="form-container success-message">
        <h2>Inscription réussie!</h2>
        <p>
          Merci {formData.firstName} {formData.lastName} pour votre inscription
          à notre catalogue de fonctionnalités.
        </p>
        <p>Un email de confirmation a été envoyé à {formData.email}.</p>
        <p>
          Type de compte:{" "}
          {formData.accountType === "free" ? "Gratuit" : "Premium"}
        </p>
        <p>Redirection vers la page des fonctionnalités...</p>
      </div>
    );
  }

  return (
    <div className={`form-container ${theme === "dark" ? "dark-form" : ""}`}>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Prénom*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`${errors.firstName ? "error" : ""} ${
              theme === "dark" ? "dark-input" : ""
            }`}
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`${errors.lastName ? "error" : ""} ${
              theme === "dark" ? "dark-input" : ""
            }`}
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur*</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`${errors.username ? "error" : ""} ${
              theme === "dark" ? "dark-input" : ""
            }`}
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="githubLink">Lien GitHub*</label>
          <input
            type="url"
            id="githubLink"
            name="githubLink"
            placeholder="https://github.com/username"
            value={formData.githubLink}
            onChange={handleChange}
            className={`${errors.githubLink ? "error" : ""} ${
              theme === "dark" ? "dark-input" : ""
            }`}
          />
          {errors.githubLink && (
            <span className="error-message">{errors.githubLink}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="experienceLevel">Niveau d'expérience*</label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className={`${errors.experienceLevel ? "error" : ""} ${
              theme === "dark" ? "dark-input" : ""
            }`}
          >
            <option value="">Sélectionnez votre niveau</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.experienceLevel && (
            <span className="error-message">{errors.experienceLevel}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${errors.email ? "error" : ""} ${
              theme === "dark" ? "dark-input" : ""
            }`}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${errors.password ? "error" : ""} ${
              theme === "dark" ? "dark-input" : ""
            }`}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`${errors.confirmPassword ? "error" : ""} ${
              theme === "dark" ? "dark-input" : ""
            }`}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label>Type de compte*</label>
          <div className="account-type-container">
            <div
              className={`account-type-option ${
                formData.accountType === "free" ? "selected" : ""
              } ${theme === "dark" ? "dark-option" : ""}`}
            >
              <input
                type="radio"
                id="accountTypeFree"
                name="accountType"
                value="free"
                checked={formData.accountType === "free"}
                onChange={handleChange}
              />
              <label htmlFor="accountTypeFree" className="account-type-label">
                <span className="account-type-title">Gratuit</span>
                <span className="account-type-description">
                  Accès limité aux fonctionnalités de base
                </span>
              </label>
            </div>
            <div
              className={`account-type-option ${
                formData.accountType === "premium" ? "selected" : ""
              } ${theme === "dark" ? "dark-option" : ""}`}
            >
              <input
                type="radio"
                id="accountTypePremium"
                name="accountType"
                value="premium"
                checked={formData.accountType === "premium"}
                onChange={handleChange}
              />
              <label
                htmlFor="accountTypePremium"
                className="account-type-label"
              >
                <span className="account-type-title">Premium</span>
                <span className="account-type-description">
                  Accès complet à toutes les fonctionnalités
                </span>
                <span className="account-type-price">9.99€/mois</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group terms-form-group">
          <div className="terms-container">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={errors.agreeTerms ? "error" : ""}
            />
            <label htmlFor="agreeTerms">
              J'accepte les conditions générales d'utilisation*
            </label>
          </div>
          {errors.agreeTerms && (
            <span className="error-message">{errors.agreeTerms}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          S'inscrire
        </button>

        <div className={`login-link ${theme === "dark" ? "dark-link" : ""}`}>
          <p>
            Vous avez déjà un compte? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
