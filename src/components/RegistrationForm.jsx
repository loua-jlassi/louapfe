import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegistrationForm.css";

const RegistrationForm = () => {
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
      console.log("Formulaire soumis avec succès:", formData);
      setIsSubmitted(true);
      // Ici, vous pourriez appeler une API pour enregistrer l'utilisateur
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
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Inscription au Catalogue de Fonctionnalités</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Prénom*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "error" : ""}
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
            className={errors.lastName ? "error" : ""}
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
            className={errors.username ? "error" : ""}
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
            className={errors.githubLink ? "error" : ""}
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
            className={errors.experienceLevel ? "error" : ""}
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
            className={errors.email ? "error" : ""}
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
            className={errors.password ? "error" : ""}
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
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group">
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

        <div className="login-link">
          <p>
            Vous avez déjà un compte? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
