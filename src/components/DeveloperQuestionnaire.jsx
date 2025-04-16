import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./DeveloperQuestionnaire.css";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaMobile,
  FaDesktop,
  FaCloud,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaListAlt,
} from "react-icons/fa";

const DeveloperQuestionnaire = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    experienceLevel: "",
    primaryRole: "",
    technologies: [],
    frameworks: [],
    projectTypes: [],
    teamSize: "",
    challenges: [],
    goals: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Titre de la page
    document.title = "Questionnaire Développeur | FeatureFlex";

    // Si l'utilisateur a déjà rempli le questionnaire, charger ses données
    if (user && user.developerProfile) {
      setFormData(user.developerProfile);
    }
  }, [user]);

  const steps = [
    {
      title: "Niveau d'expérience",
      description: "Quel est votre niveau d'expérience en développement?",
      field: "experienceLevel",
      options: [
        { value: "junior", label: "Junior (0-2 ans)" },
        { value: "intermediate", label: "Intermédiaire (2-5 ans)" },
        { value: "senior", label: "Senior (5+ ans)" },
        { value: "expert", label: "Expert / Architecte" },
      ],
    },
    {
      title: "Rôle principal",
      description: "Quel est votre rôle principal dans le développement?",
      field: "primaryRole",
      options: [
        {
          value: "frontend",
          label: "Développeur Frontend",
          icon: <FaDesktop />,
        },
        { value: "backend", label: "Développeur Backend", icon: <FaServer /> },
        {
          value: "fullstack",
          label: "Développeur Full Stack",
          icon: <FaCode />,
        },
        { value: "mobile", label: "Développeur Mobile", icon: <FaMobile /> },
        {
          value: "devops",
          label: "DevOps / Infrastructure",
          icon: <FaCloud />,
        },
        {
          value: "database",
          label: "Administrateur de Base de Données",
          icon: <FaDatabase />,
        },
      ],
    },
    {
      title: "Technologies",
      description: "Quelles technologies utilisez-vous régulièrement?",
      field: "technologies",
      multiSelect: true,
      options: [
        { value: "javascript", label: "JavaScript" },
        { value: "typescript", label: "TypeScript" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "csharp", label: "C#" },
        { value: "php", label: "PHP" },
        { value: "go", label: "Go" },
        { value: "ruby", label: "Ruby" },
        { value: "swift", label: "Swift" },
        { value: "kotlin", label: "Kotlin" },
      ],
    },
    {
      title: "Frameworks",
      description: "Quels frameworks ou bibliothèques utilisez-vous?",
      field: "frameworks",
      multiSelect: true,
      options: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "vue", label: "Vue.js" },
        { value: "nodejs", label: "Node.js" },
        { value: "django", label: "Django" },
        { value: "spring", label: "Spring" },
        { value: "laravel", label: "Laravel" },
        { value: "dotnet", label: ".NET" },
        { value: "flutter", label: "Flutter" },
        { value: "reactnative", label: "React Native" },
      ],
    },
    {
      title: "Types de projets",
      description: "Sur quels types de projets travaillez-vous généralement?",
      field: "projectTypes",
      multiSelect: true,
      options: [
        { value: "webapps", label: "Applications Web" },
        { value: "mobileapps", label: "Applications Mobiles" },
        { value: "ecommerce", label: "E-commerce" },
        { value: "saas", label: "SaaS (Software as a Service)" },
        { value: "enterprise", label: "Applications d'Entreprise" },
        { value: "apis", label: "APIs et Microservices" },
        { value: "datascience", label: "Data Science / IA" },
      ],
    },
    {
      title: "Taille de l'équipe",
      description:
        "Quelle est la taille typique de votre équipe de développement?",
      field: "teamSize",
      options: [
        { value: "solo", label: "Solo / Freelance" },
        { value: "small", label: "Petite équipe (2-5 personnes)" },
        { value: "medium", label: "Équipe moyenne (6-15 personnes)" },
        { value: "large", label: "Grande équipe (16+ personnes)" },
      ],
    },
    {
      title: "Défis",
      description: "Quels sont vos plus grands défis dans le développement?",
      field: "challenges",
      multiSelect: true,
      options: [
        { value: "performance", label: "Optimisation des performances" },
        { value: "security", label: "Sécurité des applications" },
        { value: "scalability", label: "Mise à l'échelle" },
        { value: "testing", label: "Tests et assurance qualité" },
        { value: "cicd", label: "CI/CD et déploiement" },
        { value: "architecture", label: "Architecture logicielle" },
        { value: "legacy", label: "Maintenance de code legacy" },
        { value: "documentation", label: "Documentation" },
        { value: "collaboration", label: "Collaboration d'équipe" },
      ],
    },
    {
      title: "Objectifs",
      description: "Quels sont vos objectifs de développement principaux?",
      field: "goals",
      multiSelect: true,
      options: [
        { value: "productivity", label: "Améliorer la productivité" },
        { value: "quality", label: "Augmenter la qualité du code" },
        { value: "learning", label: "Apprendre de nouvelles technologies" },
        { value: "automation", label: "Automatiser les processus répétitifs" },
        { value: "bestpractices", label: "Adopter les meilleures pratiques" },
        { value: "innovation", label: "Innover dans les solutions" },
        {
          value: "userexperience",
          label: "Améliorer l'expérience utilisateur",
        },
      ],
    },
  ];

  const handleSingleSelectChange = (value) => {
    setFormData({
      ...formData,
      [steps[currentStep].field]: value,
    });
  };

  const handleMultiSelectChange = (value) => {
    const field = steps[currentStep].field;
    const currentValues = formData[field] || [];

    if (currentValues.includes(value)) {
      // Si déjà sélectionné, le retirer
      setFormData({
        ...formData,
        [field]: currentValues.filter((item) => item !== value),
      });
    } else {
      // Sinon, l'ajouter
      setFormData({
        ...formData,
        [field]: [...currentValues, value],
      });
    }
  };

  const nextStep = () => {
    const currentField = steps[currentStep].field;
    const isMultiSelect = steps[currentStep].multiSelect;

    // Validation simple pour s'assurer qu'une option est sélectionnée
    if (
      isMultiSelect &&
      (!formData[currentField] || formData[currentField].length === 0)
    ) {
      alert("Veuillez sélectionner au moins une option");
      return;
    } else if (!isMultiSelect && !formData[currentField]) {
      alert("Veuillez sélectionner une option");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitQuestionnaire();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    // Logique pour générer des recommandations basées sur les réponses
    // Ceci est une démonstration simplifiée

    const recommendations = [];

    // Recommandations basées sur le rôle
    if (formData.primaryRole === "frontend") {
      recommendations.push({
        id: 1,
        title: "Interface utilisateur responsive",
        description:
          "Interface adaptable à tous les appareils avec thème sombre et clair.",
        type: "UI/UX",
      });
    }

    if (
      formData.primaryRole === "backend" ||
      formData.primaryRole === "fullstack"
    ) {
      recommendations.push({
        id: 2,
        title: "API RESTful",
        description:
          "Système complet d'API avec authentification et documentation.",
        type: "Backend",
      });
    }

    // Recommandations basées sur les défis
    if (formData.challenges.includes("performance")) {
      recommendations.push({
        id: 3,
        title: "Optimisation des performances",
        description:
          "Outils et techniques pour améliorer les performances des applications.",
        type: "Performance",
      });
    }

    if (formData.challenges.includes("security")) {
      recommendations.push({
        id: 4,
        title: "Sécurité des applications",
        description:
          "Pratiques de sécurité et protection contre les attaques courantes.",
        type: "Sécurité",
      });
    }

    // Recommandations basées sur les technologies
    if (
      formData.technologies.includes("javascript") ||
      formData.technologies.includes("typescript")
    ) {
      recommendations.push({
        id: 5,
        title: "Bonnes pratiques JavaScript/TypeScript",
        description:
          "Guide des meilleures pratiques pour le développement moderne.",
        type: "Développement",
      });
    }

    // Recommandations basées sur les objectifs
    if (formData.goals.includes("automation")) {
      recommendations.push({
        id: 6,
        title: "Automatisation des tests",
        description:
          "Configuration complète pour les tests unitaires, d'intégration et end-to-end.",
        type: "QA",
      });
    }

    return recommendations;
  };

  const submitQuestionnaire = async () => {
    setIsSubmitting(true);

    try {
      // Générer des recommandations basées sur les réponses
      const generatedRecommendations = generateRecommendations();
      setRecommendations(generatedRecommendations);

      // Enregistrer les réponses dans le profil utilisateur
      if (user) {
        await updateUserProfile({
          ...user,
          developerProfile: formData,
        });
      }

      // Enregistrer dans le localStorage pour les utilisateurs non connectés
      localStorage.setItem("developerProfile", JSON.stringify(formData));
      localStorage.setItem(
        "recommendations",
        JSON.stringify(generatedRecommendations)
      );

      // Afficher les résultats
      setCurrentStep(steps.length); // Pour afficher la page de résultats
    } catch (error) {
      console.error("Erreur lors de la soumission du questionnaire:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuestionnaire = () => {
    setFormData({
      experienceLevel: "",
      primaryRole: "",
      technologies: [],
      frameworks: [],
      projectTypes: [],
      teamSize: "",
      challenges: [],
      goals: [],
    });
    setCurrentStep(0);
    setRecommendations([]);
  };

  const viewRecommendedFeatures = () => {
    // Enregistrer les recommandations et rediriger vers la page des fonctionnalités
    localStorage.setItem("recommendations", JSON.stringify(recommendations));
    navigate("/features");
  };

  // Rendu pour la page de résultats/recommandations
  if (currentStep === steps.length) {
    return (
      <div
        className={`questionnaire-container ${
          theme === "dark" ? "dark-mode" : ""
        }`}
      >
        <div className="questionnaire-results">
          <h1>Vos recommandations personnalisées</h1>
          <p>
            Basé sur vos réponses, voici les fonctionnalités qui correspondent
            le mieux à votre profil de développeur:
          </p>

          <div className="recommendations-list">
            {recommendations.map((recommendation) => (
              <div key={recommendation.id} className="recommendation-card">
                <div className="recommendation-header">
                  <h3>{recommendation.title}</h3>
                  <span className="recommendation-type">
                    {recommendation.type}
                  </span>
                </div>
                <p>{recommendation.description}</p>
              </div>
            ))}
          </div>

          <div className="results-actions">
            <button className="secondary-button" onClick={resetQuestionnaire}>
              <FaArrowLeft /> Recommencer le questionnaire
            </button>
            <button
              className="primary-button"
              onClick={viewRecommendedFeatures}
            >
              Voir toutes les fonctionnalités <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Rendu pour les étapes du questionnaire
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div
      className={`questionnaire-container ${
        theme === "dark" ? "dark-mode" : ""
      }`}
    >
      <div className="questionnaire-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        <div className="step-indicator">
          Étape {currentStep + 1} sur {steps.length}
        </div>
      </div>

      <div className="questionnaire-content">
        <h1>{currentStepData.title}</h1>
        <p className="step-description">{currentStepData.description}</p>

        <div className="options-container">
          {currentStepData.options.map((option) => {
            const isSelected = currentStepData.multiSelect
              ? formData[currentStepData.field]?.includes(option.value)
              : formData[currentStepData.field] === option.value;

            return (
              <div
                key={option.value}
                className={`option-card ${isSelected ? "selected" : ""}`}
                onClick={() =>
                  currentStepData.multiSelect
                    ? handleMultiSelectChange(option.value)
                    : handleSingleSelectChange(option.value)
                }
              >
                {option.icon && (
                  <div className="option-icon">{option.icon}</div>
                )}
                <div className="option-label">{option.label}</div>
                {isSelected && <FaCheck className="check-icon" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="questionnaire-actions">
        <button
          className="secondary-button"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <FaArrowLeft /> Précédent
        </button>
        <button
          className="primary-button"
          onClick={nextStep}
          disabled={isSubmitting}
        >
          {isLastStep ? (
            isSubmitting ? (
              "Soumission en cours..."
            ) : (
              "Terminer"
            )
          ) : (
            <>
              Suivant <FaArrowRight />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeveloperQuestionnaire;
