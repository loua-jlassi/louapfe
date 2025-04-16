import React, { useState, useEffect, useContext } from "react";
import { FaCheck, FaPaperPlane, FaExclamationTriangle } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import "./ContactForm.css";

const ContactForm = ({ onSubmitSuccess, initialValues = {} }) => {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    email: initialValues.email || "",
    subject: initialValues.subject || "",
    message: initialValues.message || "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Reset form when initialValues change
  useEffect(() => {
    setFormData({
      name: initialValues.name || "",
      email: initialValues.email || "",
      subject: initialValues.subject || "",
      message: initialValues.message || "",
    });
  }, [initialValues]);

  // Validate form input whenever formData changes
  useEffect(() => {
    if (Object.keys(touched).some((key) => touched[key])) {
      validateForm();
    }
  }, [formData, touched]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states
    setSubmitError("");
    setSubmitSuccess(false);

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Success handling
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTouched({
          name: false,
          email: false,
          subject: false,
          message: false,
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          if (onSubmitSuccess) {
            onSubmitSuccess();
          }
        }, 5000);
      } catch (error) {
        // Error handling
        setIsSubmitting(false);
        setSubmitError(
          "Une erreur est survenue. Veuillez réessayer plus tard."
        );
      }
    }
  };

  return (
    <div className={`contact-form ${darkMode ? "dark-theme" : ""}`}>
      {submitSuccess ? (
        <div className="form-success-message">
          <h3>Merci pour votre message !</h3>
          <p>Nous vous répondrons dans les plus brefs délais.</p>
          <button
            className="submit-btn"
            onClick={() => setSubmitSuccess(false)}
            type="button"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form className="form-container" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="name" className={errors.name ? "error" : ""}>
                  Nom <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? "error" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Votre nom"
                />
                {errors.name && (
                  <div className="error-message">
                    <FaExclamationTriangle /> {errors.name}
                  </div>
                )}
              </div>
            </div>

            <div className="form-col">
              <div className="form-group">
                <label htmlFor="email" className={errors.email ? "error" : ""}>
                  Email <span className="required-field">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "error" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="votre.email@exemple.com"
                />
                {errors.email && (
                  <div className="error-message">
                    <FaExclamationTriangle /> {errors.email}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className={errors.subject ? "error" : ""}>
              Sujet <span className="required-field">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className={`form-control ${errors.subject ? "error" : ""}`}
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Sujet de votre message"
            />
            {errors.subject && (
              <div className="error-message">
                <FaExclamationTriangle /> {errors.subject}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message" className={errors.message ? "error" : ""}>
              Message <span className="required-field">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className={`form-control ${errors.message ? "error" : ""}`}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Rédigez votre message ici..."
              rows={6}
            ></textarea>
            {errors.message && (
              <div className="error-message">
                <FaExclamationTriangle /> {errors.message}
              </div>
            )}
          </div>

          {submitError && (
            <div className="form-error-message">
              <FaExclamationTriangle /> {submitError}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Envoyer
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
