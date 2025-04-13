import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [features, setFeatures] = useState([]);
  const [editingFeature, setEditingFeature] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    isPremium: false,
    icon: "",
  });
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et est un administrateur
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    // Charger les fonctionnalités
    loadFeatures();
  }, [user, navigate]);

  const loadFeatures = () => {
    // Simuler le chargement des fonctionnalités depuis le stockage local
    // En production, cela viendrait d'une API
    const storedFeatures = localStorage.getItem("features");
    if (storedFeatures) {
      setFeatures(JSON.parse(storedFeatures));
    } else {
      // Utiliser les fonctionnalités par défaut
      const defaultFeatures = [
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
          description:
            "Visualisation des données et statistiques en temps réel.",
          category: "Analytics",
          icon: "📊",
          isPremium: true,
        },
        // Ajouter d'autres fonctionnalités par défaut
      ];
      setFeatures(defaultFeatures);
      localStorage.setItem("features", JSON.stringify(defaultFeatures));
    }
  };

  const handleEditClick = (feature) => {
    setEditingFeature(feature);
    setFormData({
      title: feature.title,
      description: feature.description,
      category: feature.category,
      isPremium: feature.isPremium,
      icon: feature.icon,
    });
    setIsAddMode(false);
  };

  const handleAddNew = () => {
    setEditingFeature(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      isPremium: false,
      icon: "",
    });
    setIsAddMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAddMode) {
      // Ajouter une nouvelle fonctionnalité
      const newFeature = {
        id:
          features.length > 0 ? Math.max(...features.map((f) => f.id)) + 1 : 1,
        ...formData,
      };
      const updatedFeatures = [...features, newFeature];
      setFeatures(updatedFeatures);
      localStorage.setItem("features", JSON.stringify(updatedFeatures));
    } else {
      // Mettre à jour une fonctionnalité existante
      const updatedFeatures = features.map((feature) => {
        if (feature.id === editingFeature.id) {
          return {
            ...feature,
            ...formData,
          };
        }
        return feature;
      });
      setFeatures(updatedFeatures);
      localStorage.setItem("features", JSON.stringify(updatedFeatures));
    }

    // Réinitialiser le formulaire
    setIsAddMode(false);
    setEditingFeature(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      isPremium: false,
      icon: "",
    });
  };

  const handleDelete = (featureId) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette fonctionnalité ?"
      )
    ) {
      const updatedFeatures = features.filter(
        (feature) => feature.id !== featureId
      );
      setFeatures(updatedFeatures);
      localStorage.setItem("features", JSON.stringify(updatedFeatures));
    }
  };

  const handleCancel = () => {
    setIsAddMode(false);
    setEditingFeature(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      isPremium: false,
      icon: "",
    });
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Administration des fonctionnalités</h1>

      <div className="admin-panel">
        <div className="features-list-section">
          <div className="section-header">
            <h2>Liste des fonctionnalités</h2>
            <button className="add-button" onClick={handleAddNew}>
              Ajouter une fonctionnalité
            </button>
          </div>

          <div className="features-list">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`feature-item ${
                  editingFeature?.id === feature.id ? "active" : ""
                }`}
              >
                <div className="feature-item-content">
                  <div className="feature-item-icon">{feature.icon}</div>
                  <div className="feature-item-info">
                    <h3>{feature.title}</h3>
                    <p className="feature-item-category">{feature.category}</p>
                    {feature.isPremium && (
                      <span className="premium-tag">Premium</span>
                    )}
                  </div>
                </div>
                <div className="feature-item-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(feature)}
                  >
                    Modifier
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(feature.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {(isAddMode || editingFeature) && (
          <div className="feature-edit-section">
            <h2>
              {isAddMode
                ? "Ajouter une fonctionnalité"
                : "Modifier une fonctionnalité"}
            </h2>
            <form onSubmit={handleSubmit} className="feature-form">
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category">Catégorie</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Administration">Administration</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Communication">Communication</option>
                  <option value="Contenu">Contenu</option>
                  <option value="Intégration">Intégration</option>
                  <option value="Recherche">Recherche</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="icon">Icône (emoji)</label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="Utilisez un emoji, ex: 📊"
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isPremium"
                    checked={formData.isPremium}
                    onChange={handleInputChange}
                  />
                  Fonctionnalité Premium
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Annuler
                </button>
                <button type="submit" className="save-button">
                  {isAddMode ? "Ajouter" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
