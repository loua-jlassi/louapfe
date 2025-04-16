import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./LoginForm.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [step, setStep] = useState(1); // Étapes: 1-Email, 2-Code, 3-Nouveau mot de passe

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  // Étape 1: Valider et envoyer l'email
  const validateEmail = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "L'email est invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (validateEmail()) {
      // Vérifier si l'utilisateur existe
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email);

      if (!user) {
        setErrors({ email: "Aucun compte n'est associé à cet email" });
        return;
      }

      // Générer un code à 6 chiffres
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);

      // Dans un environnement réel, vous enverriez un email avec ce code
      console.log(`Code généré pour ${email}: ${code}`);

      setMessage(`Un code de vérification a été envoyé à ${email}`);
      setStep(2);
    }
  };

  // Étape 2: Valider le code
  const validateCode = () => {
    const newErrors = {};

    if (!verificationCode.trim()) {
      newErrors.code = "Le code est requis";
    } else if (verificationCode !== generatedCode) {
      newErrors.code = "Code incorrect";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    if (validateCode()) {
      setMessage("Code vérifié. Veuillez définir un nouveau mot de passe.");
      setStep(3);
    }
  };

  // Étape 3: Réinitialiser le mot de passe
  const validatePassword = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.password = "Le mot de passe est requis";
    } else if (newPassword.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (validatePassword()) {
      // Mettre à jour le mot de passe de l'utilisateur
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((user) => {
        if (user.email === email) {
          return { ...user, password: newPassword };
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setIsSubmitted(true);
      setMessage("Mot de passe réinitialisé avec succès!");

      // Rediriger vers la page de connexion après 3 secondes
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className={`form-container success-message ${
          theme === "dark" ? "dark-form" : ""
        }`}
      >
        <h2>Réinitialisation réussie!</h2>
        <p>{message}</p>
        <p>Redirection vers la page de connexion...</p>
      </div>
    );
  }

  return (
    <div className={`form-container ${theme === "dark" ? "dark-form" : ""}`}>
      <h2>Réinitialisation du mot de passe</h2>

      {message && <div className="info-message">{message}</div>}

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${errors.email ? "error" : ""} ${
                theme === "dark" ? "dark-input" : ""
              }`}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Envoyer le code
          </button>

          <div
            className={`signup-link ${theme === "dark" ? "dark-signup" : ""}`}
          >
            <p>
              Retour à la <Link to="/login">connexion</Link>
            </p>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <div className="form-group">
            <label htmlFor="code">Code de vérification*</label>
            <input
              type="text"
              id="code"
              name="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={`${errors.code ? "error" : ""} ${
                theme === "dark" ? "dark-input" : ""
              }`}
            />
            {errors.code && (
              <span className="error-message">{errors.code}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Vérifier
          </button>

          <div className="form-note">
            <button
              type="button"
              className="text-button"
              onClick={() => {
                const code = Math.floor(
                  100000 + Math.random() * 900000
                ).toString();
                setGeneratedCode(code);
                console.log(`Nouveau code généré pour ${email}: ${code}`);
                setMessage(`Un nouveau code a été envoyé à ${email}`);
              }}
            >
              Renvoyer le code
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">Nouveau mot de passe*</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${errors.confirmPassword ? "error" : ""} ${
                theme === "dark" ? "dark-input" : ""
              }`}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Réinitialiser le mot de passe
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
