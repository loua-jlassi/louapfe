import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import "./WorkflowCalculator.css";

const WorkflowCalculator = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    projectType: "website",
    teamSize: 3,
    taskCount: 20,
    complexity: "medium",
    timePerTask: 4,
  });
  const [results, setResults] = useState(null);

  // Calculer les résultats lorsque formData change
  useEffect(() => {
    calculateResults();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "teamSize" || name === "taskCount" || name === "timePerTask"
          ? parseInt(value, 10)
          : value,
    });
  };

  const calculateResults = () => {
    // Facteurs de complexité
    const complexityFactors = {
      low: 0.8,
      medium: 1,
      high: 1.3,
      extreme: 1.7,
    };

    // Facteurs de type de projet
    const projectTypeFactors = {
      website: 1,
      mobile: 1.2,
      desktop: 1.1,
      enterprise: 1.5,
    };

    // Calculs de base
    const complexityFactor = complexityFactors[formData.complexity];
    const projectFactor = projectTypeFactors[formData.projectType];
    const totalHours =
      formData.taskCount *
      formData.timePerTask *
      complexityFactor *
      projectFactor;
    const daysPerPerson = totalHours / 8; // 8 heures par jour
    const totalDays = daysPerPerson / formData.teamSize;
    const totalCost = totalHours * 75; // 75€ par heure

    setResults({
      totalHours: Math.round(totalHours),
      totalDays: Math.round(totalDays),
      totalCost: Math.round(totalCost),
      estimatedDelivery: getDeliveryDate(totalDays),
    });
  };

  const getDeliveryDate = (days) => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.round(days));
    return deliveryDate.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const containerClass = `calculator-container ${
    theme === "dark" ? "dark-theme" : ""
  }`;

  return (
    <div className={containerClass}>
      <div className="calculator-header">
        <h1>Calculateur de Workflow</h1>
        <p>Estimez le temps et les ressources nécessaires pour votre projet</p>
      </div>

      <div className="calculator-content">
        <div className="calculator-form">
          <div className="form-group">
            <label htmlFor="projectType">Type de projet</label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="website">Site Web</option>
              <option value="mobile">Application Mobile</option>
              <option value="desktop">Application Desktop</option>
              <option value="enterprise">Solution Entreprise</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="teamSize">Taille de l'équipe</label>
            <input
              type="number"
              id="teamSize"
              name="teamSize"
              min="1"
              max="20"
              value={formData.teamSize}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="taskCount">Nombre de tâches</label>
            <input
              type="number"
              id="taskCount"
              name="taskCount"
              min="1"
              max="200"
              value={formData.taskCount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="complexity">Complexité du projet</label>
            <select
              id="complexity"
              name="complexity"
              value={formData.complexity}
              onChange={handleChange}
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
              <option value="extreme">Extrême</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timePerTask">Temps moyen par tâche (heures)</label>
            <input
              type="number"
              id="timePerTask"
              name="timePerTask"
              min="1"
              max="40"
              value={formData.timePerTask}
              onChange={handleChange}
            />
          </div>
        </div>

        {results && (
          <div className="calculator-results">
            <h2>Estimation du projet</h2>
            <div className="result-item">
              <span className="result-label">Heures totales:</span>
              <span className="result-value">{results.totalHours} heures</span>
            </div>
            <div className="result-item">
              <span className="result-label">Jours de travail:</span>
              <span className="result-value">{results.totalDays} jours</span>
            </div>
            <div className="result-item">
              <span className="result-label">Coût estimé:</span>
              <span className="result-value">{results.totalCost} €</span>
            </div>
            <div className="result-item">
              <span className="result-label">Date de livraison estimée:</span>
              <span className="result-value">{results.estimatedDelivery}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowCalculator;
