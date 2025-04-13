import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./EditFeature.css";

const EditFeature = () => {
  const { featureId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [feature, setFeature] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: "",
    priority: "medium",
    customization: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas connecté
    if (!user) {
      navigate("/login");
      return;
    }

    // Récupérer les favoris de l'utilisateur
    const storedFavorites = localStorage.getItem(`favorites_${user.email}`);
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      const foundFeature = favorites.find(
        (feature) => feature.id === parseInt(featureId)
      );

      if (foundFeature) {
        setFeature(foundFeature);
        setFormData({
          title: foundFeature.title || "",
          description: foundFeature.description || "",
          notes: foundFeature.userNotes || "",
          priority: foundFeature.userPriority || "medium",
          customization: foundFeature.userCustomization || "",
        });
        setIsLoading(false);
      } else {
        setError("Fonctionnalité non trouvée dans vos favoris");
        setIsLoading(false);
      }
    } else {
      setError("Aucune fonctionnalité favorite trouvée");
      setIsLoading(false);
    }
  }, [featureId, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Récupérer les favoris actuels
    const storedFavorites = localStorage.getItem(`favorites_${user.email}`);
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      const updatedFavorites = favorites.map((feat) => {
        if (feat.id === parseInt(featureId)) {
          return {
            ...feat,
            userNotes: formData.notes,
            userPriority: formData.priority,
            userCustomization: formData.customization,
            lastEdited: new Date().toISOString(),
          };
        }
        return feat;
      });

      // Sauvegarder les favoris mis à jour
      localStorage.setItem(
        `favorites_${user.email}`,
        JSON.stringify(updatedFavorites)
      );

      // Rediriger vers le tableau de bord
      navigate("/dashboard");
    }
  };

  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Erreur</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/dashboard")}>
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  return (
    <div className="edit-feature-container">
      <h1>Modifier la fonctionnalité</h1>

      <div className="feature-info">
        <div className="feature-icon">{feature?.icon}</div>
        <div className="feature-details">
          <h2>{feature?.title}</h2>
          <p className="category-badge">{feature?.category}</p>
          {feature?.isPremium && <p className="premium-badge">Premium</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-section">
          <h3>Détails de la fonctionnalité</h3>
          <div className="form-group">
            <label>Titre</label>
            <input
              type="text"
              value={formData.title}
              disabled
              className="disabled-input"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              disabled
              className="disabled-input"
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h3>Vos personnalisations</h3>
          <div className="form-group">
            <label htmlFor="notes">Notes personnelles</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Ajoutez vos notes personnelles ici..."
              rows={4}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priorité</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="customization">Personnalisation</label>
            <textarea
              id="customization"
              name="customization"
              value={formData.customization}
              onChange={handleInputChange}
              placeholder="Décrivez comment vous souhaiteriez personnaliser cette fonctionnalité..."
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/dashboard")}
          >
            Annuler
          </button>
          <button type="submit" className="save-button">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFeature;
