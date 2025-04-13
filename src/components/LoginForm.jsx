import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Simuler une vérification des identifiants
      // Dans une vraie application, vous feriez un appel API ici
      const mockUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = mockUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        login(userWithoutPassword);
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/features");
        }, 1500);
      } else {
        setErrors({
          auth: "Email ou mot de passe incorrect",
        });
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="form-container success-message">
        <h2>Connexion réussie!</h2>
        <p>Redirection vers la page des fonctionnalités...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        {errors.auth && (
          <div className="error-message auth-error">{errors.auth}</div>
        )}
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
          <div className="remember-me-container">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe" className="checkbox-label">
              Se souvenir de moi
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Se connecter
        </button>

        <div className="signup-link">
          <p>
            Vous n'avez pas de compte? <Link to="/register">S'inscrire</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
