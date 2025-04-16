import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./ProjectGenerator.css";

const ProjectGenerator = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    packageName: "com.example",
    description: "",
    springVersion: "3.2.0",
    javaVersion: "17",
  });
  const [generationComplete, setGenerationComplete] = useState(false);
  const [previewMode, setPreviewMode] = useState(null); // null, 'readme', 'structure', 'gitlab-ci'
  const [generatedProjectId, setGeneratedProjectId] = useState(null);

  // Simuler la récupération des fonctionnalités disponibles
  useEffect(() => {
    const fetchedFeatures = [
      {
        id: 1,
        name: "User Authentication",
        description: "Gestion des utilisateurs avec JWT",
        versions: ["1.0.0", "1.1.0", "2.0.0"],
        currentVersion: "2.0.0",
        category: "security",
      },
      {
        id: 2,
        name: "RESTful API",
        description: "API REST avec documentation Swagger",
        versions: ["1.0.0", "1.2.0", "1.3.0"],
        currentVersion: "1.3.0",
        category: "backend",
      },
      {
        id: 3,
        name: "Database Integration",
        description: "Intégration avec bases de données SQL/NoSQL",
        versions: ["1.0.0", "2.0.0"],
        currentVersion: "2.0.0",
        category: "data",
      },
      {
        id: 4,
        name: "Email Service",
        description: "Service d'envoi d'emails",
        versions: ["1.0.0", "1.1.0"],
        currentVersion: "1.1.0",
        category: "communication",
      },
      {
        id: 5,
        name: "File Upload",
        description: "Gestion des uploads de fichiers",
        versions: ["1.0.0"],
        currentVersion: "1.0.0",
        category: "utility",
      },
    ];

    setFeatures(fetchedFeatures);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({
      ...projectDetails,
      [name]: value,
    });
  };

  const handleFeatureSelection = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const handleVersionChange = (featureId, version) => {
    const updatedFeatures = features.map((feature) =>
      feature.id === featureId
        ? { ...feature, selectedVersion: version }
        : feature
    );
    setFeatures(updatedFeatures);
  };

  const getSelectedFeaturesDetails = () => {
    return features.filter((feature) => selectedFeatures.includes(feature.id));
  };

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateProject = () => {
    // Simuler un délai de génération
    setTimeout(() => {
      setGenerationComplete(true);
      saveProjectToHistory();
    }, 1500);
  };

  const saveProjectToHistory = () => {
    // Générer un ID unique pour le projet
    const projectId = Date.now().toString();

    // Créer l'objet du projet
    const project = {
      id: projectId,
      name: projectDetails.name,
      description: projectDetails.description,
      packageName: projectDetails.packageName,
      javaVersion: projectDetails.javaVersion,
      springVersion: projectDetails.springVersion,
      features: selectedFeatures.map((id) => {
        const feature = features.find((f) => f.id === id);
        return {
          id: feature.id,
          name: feature.name,
          version: feature.selectedVersion || feature.currentVersion,
        };
      }),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      tags: selectedFeatures
        .map((id) => {
          const feature = features.find((f) => f.id === id);
          return feature.category;
        })
        .filter((value, index, self) => self.indexOf(value) === index),
      isFavorite: false,
    };

    // Sauvegarder dans localStorage
    const existingProjects = JSON.parse(
      localStorage.getItem("userProjects") || "[]"
    );
    localStorage.setItem(
      "userProjects",
      JSON.stringify([project, ...existingProjects])
    );
  };

  const handlePreviewMode = (mode) => {
    setPreviewMode(mode);
  };

  const generateReadmePreview = () => {
    const selectedFeaturesDetails = getSelectedFeaturesDetails();
    return `# ${projectDetails.name}

## Description
${projectDetails.description}

## Configuration
- Java Version: ${projectDetails.javaVersion}
- Spring Boot Version: ${projectDetails.springVersion}
- Package: ${projectDetails.packageName}

## Features
${selectedFeaturesDetails
  .map(
    (feature) =>
      `### ${feature.name} (v${
        feature.selectedVersion || feature.currentVersion
      })
${feature.description}`
  )
  .join("\n\n")}

## Getting Started
1. Clone this repository
2. Open it in your favorite IDE
3. Run \`./mvnw spring-boot:run\`

## API Documentation
The API documentation is available at \`/swagger-ui.html\` when the application is running.`;
  };

  const generateGitlabCIPreview = () => {
    return `stages:
  - build
  - test
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

cache:
  paths:
    - .m2/repository/
    - target/

build:
  stage: build
  script:
    - ./mvnw package -DskipTests
  artifacts:
    paths:
      - target/*.jar

test:
  stage: test
  script:
    - ./mvnw test

deploy_dev:
  stage: deploy
  script:
    - echo "Deploying to development environment"
  environment:
    name: development
  only:
    - develop

deploy_prod:
  stage: deploy
  script:
    - echo "Deploying to production environment"
  environment:
    name: production
  only:
    - main
  when: manual`;
  };

  const generateProjectStructure = () => {
    const selectedFeaturesDetails = getSelectedFeaturesDetails();
    let structure = [
      `${projectDetails.name}/`,
      `├── src/`,
      `│   ├── main/`,
      `│   │   ├── java/`,
      `│   │   │   └── ${projectDetails.packageName.replace(/\./g, "/")}/`,
      `│   │   │       ├── ${projectDetails.name.toLowerCase()}/`,
      `│   │   │       │   ├── config/`,
      `│   │   │       │   │   └── ApplicationConfig.java`,
      `│   │   │       │   ├── exception/`,
      `│   │   │       │   │   └── GlobalExceptionHandler.java`,
      `│   │   │       │   └── ${projectDetails.name.toLowerCase()}Application.java`,
    ];

    selectedFeaturesDetails.forEach((feature) => {
      const featurePath = feature.name.replace(/\s+/g, "").toLowerCase();

      if (feature.name === "User Authentication") {
        structure.push(
          `│   │   │       │   ├── auth/`,
          `│   │   │       │   │   ├── controller/`,
          `│   │   │       │   │   │   └── AuthController.java`,
          `│   │   │       │   │   ├── model/`,
          `│   │   │       │   │   │   └── User.java`,
          `│   │   │       │   │   ├── repository/`,
          `│   │   │       │   │   │   └── UserRepository.java`,
          `│   │   │       │   │   └── service/`,
          `│   │   │       │   │       └── AuthService.java`
        );
      } else if (feature.name === "RESTful API") {
        structure.push(
          `│   │   │       │   ├── api/`,
          `│   │   │       │   │   ├── controller/`,
          `│   │   │       │   │   ├── dto/`,
          `│   │   │       │   │   └── mapper/`
        );
      } else if (feature.name === "Database Integration") {
        structure.push(
          `│   │   │       │   ├── repository/`,
          `│   │   │       │   │   └── BaseRepository.java`
        );
      } else {
        structure.push(
          `│   │   │       │   ├── ${featurePath}/`,
          `│   │   │       │   │   ├── controller/`,
          `│   │   │       │   │   ├── model/`,
          `│   │   │       │   │   └── service/`
        );
      }
    });

    structure = structure.concat([
      `│   │   ├── resources/`,
      `│   │   │   ├── application.properties`,
      `│   │   │   ├── static/`,
      `│   │   │   └── templates/`,
      `│   └── test/`,
      `│       └── java/`,
      `│           └── ${projectDetails.packageName.replace(/\./g, "/")}/`,
      `├── .gitignore`,
      `├── pom.xml`,
      `├── README.md`,
      `└── .gitlab-ci.yml`,
    ]);

    return structure.join("\n");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Étape 1: Informations du projet</h2>
            <div className="form-group">
              <label htmlFor="name">Nom du projet</label>
              <input
                type="text"
                id="name"
                name="name"
                value={projectDetails.name}
                onChange={handleInputChange}
                className={theme === "dark" ? "dark-input" : ""}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="packageName">Nom du package</label>
              <input
                type="text"
                id="packageName"
                name="packageName"
                value={projectDetails.packageName}
                onChange={handleInputChange}
                className={theme === "dark" ? "dark-input" : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={projectDetails.description}
                onChange={handleInputChange}
                className={theme === "dark" ? "dark-input" : ""}
                rows="4"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="springVersion">Version Spring Boot</label>
              <select
                id="springVersion"
                name="springVersion"
                value={projectDetails.springVersion}
                onChange={handleInputChange}
                className={theme === "dark" ? "dark-input" : ""}
              >
                <option value="2.6.0">2.6.0</option>
                <option value="2.7.0">2.7.0</option>
                <option value="3.0.0">3.0.0</option>
                <option value="3.1.0">3.1.0</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="javaVersion">Version Java</label>
              <select
                id="javaVersion"
                name="javaVersion"
                value={projectDetails.javaVersion}
                onChange={handleInputChange}
                className={theme === "dark" ? "dark-input" : ""}
              >
                <option value="8">Java 8</option>
                <option value="11">Java 11</option>
                <option value="17">Java 17</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Étape 2: Sélection des fonctionnalités</h2>
            <div className="features-grid">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`feature-card ${
                    selectedFeatures.includes(feature.id) ? "selected" : ""
                  }`}
                  onClick={() => handleFeatureSelection(feature.id)}
                >
                  <h3>{feature.name}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-meta">
                    <span className="feature-category">{feature.category}</span>
                    <span className="feature-version">
                      v{feature.currentVersion}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Étape 3: Configuration des versions</h2>
            {selectedFeatures.length > 0 ? (
              <div className="selected-features">
                {getSelectedFeaturesDetails().map((feature) => (
                  <div key={feature.id} className="selected-feature-item">
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                    <div className="version-selector">
                      <label>Version:</label>
                      <select
                        value={
                          feature.selectedVersion || feature.currentVersion
                        }
                        onChange={(e) =>
                          handleVersionChange(feature.id, e.target.value)
                        }
                        className={theme === "dark" ? "dark-input" : ""}
                      >
                        {feature.versions.map((version) => (
                          <option key={version} value={version}>
                            {version}{" "}
                            {version === feature.currentVersion
                              ? "(latest)"
                              : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-features-selected">
                <p>
                  Aucune fonctionnalité sélectionnée. Veuillez retourner à
                  l'étape précédente pour sélectionner des fonctionnalités.
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>Étape 4: Prévisualisation et Génération</h2>

            {generationComplete ? (
              <div className="generation-complete">
                <div className="success-icon">✓</div>
                <h3>Projet généré avec succès!</h3>
                <p>
                  Votre projet <strong>{projectDetails.name}</strong> a été
                  généré avec {selectedFeatures.length} fonctionnalités.
                </p>
                <div className="action-buttons">
                  <button className="download-btn">
                    Télécharger le projet
                  </button>
                  <button
                    className="preview-btn"
                    onClick={() => handlePreviewMode("readme")}
                  >
                    Aperçu du README
                  </button>
                  <button
                    className="preview-btn"
                    onClick={() => handlePreviewMode("structure")}
                  >
                    Structure du projet
                  </button>
                  <button
                    className="preview-btn"
                    onClick={() => handlePreviewMode("gitlab-ci")}
                  >
                    CI/CD Config
                  </button>
                  <Link to="/project-history" className="history-btn">
                    Voir l'historique des projets
                  </Link>
                </div>
              </div>
            ) : (
              <div className="generation-summary">
                <h3>Résumé de la configuration:</h3>
                <div className="config-summary">
                  <div className="summary-item">
                    <span className="summary-label">Nom du projet:</span>
                    <span className="summary-value">{projectDetails.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Package:</span>
                    <span className="summary-value">
                      {projectDetails.packageName}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Description:</span>
                    <span className="summary-value">
                      {projectDetails.description}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Spring Boot:</span>
                    <span className="summary-value">
                      {projectDetails.springVersion}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Java:</span>
                    <span className="summary-value">
                      {projectDetails.javaVersion}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Fonctionnalités:</span>
                    <span className="summary-value">
                      {getSelectedFeaturesDetails()
                        .map(
                          (f) =>
                            `${f.name} (v${
                              f.selectedVersion || f.currentVersion
                            })`
                        )
                        .join(", ")}
                    </span>
                  </div>
                </div>

                <button
                  className="generate-btn"
                  onClick={generateProject}
                  disabled={
                    !projectDetails.name ||
                    !projectDetails.packageName ||
                    selectedFeatures.length === 0
                  }
                >
                  Générer le projet
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Afficher une page de connexion nécessaire si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <div className={`login-required ${theme === "dark" ? "dark-mode" : ""}`}>
        <div className="login-required-content">
          <div className="login-icon">🔒</div>
          <h2>Connexion requise</h2>
          <p>Vous devez être connecté pour accéder au générateur de projets.</p>
          <p className="login-description">
            Notre générateur de projets vous permet de créer rapidement des
            projets avec les fonctionnalités de votre choix. Connectez-vous pour
            commencer à générer vos projets personnalisés.
          </p>
          <div className="login-buttons">
            <Link to="/login" className="login-button">
              Se connecter
            </Link>
            <Link to="/register" className="register-button">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`project-generator ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className="generator-header">
        <h1>Générateur de Projet</h1>
        <p>Créez un nouveau projet en quelques étapes simples</p>
        <Link to="/project-history" className="history-link">
          Voir l'historique des projets
        </Link>
      </div>

      <div className="stepper">
        <div
          className={`step ${currentStep === 1 ? "active" : ""} ${
            currentStep > 1 ? "completed" : ""
          }`}
        >
          <div className="step-number">1</div>
          <div className="step-label">Informations</div>
        </div>
        <div
          className={`step ${currentStep === 2 ? "active" : ""} ${
            currentStep > 2 ? "completed" : ""
          }`}
        >
          <div className="step-number">2</div>
          <div className="step-label">Fonctionnalités</div>
        </div>
        <div
          className={`step ${currentStep === 3 ? "active" : ""} ${
            currentStep > 3 ? "completed" : ""
          }`}
        >
          <div className="step-number">3</div>
          <div className="step-label">Versions</div>
        </div>
        <div
          className={`step ${currentStep === 4 ? "active" : ""} ${
            currentStep > 4 ? "completed" : ""
          }`}
        >
          <div className="step-number">4</div>
          <div className="step-label">Génération</div>
        </div>
      </div>

      <div className="generator-container">{renderStepContent()}</div>

      <div className="navigation-buttons">
        {currentStep > 1 && (
          <button className="button back-button" onClick={goToPreviousStep}>
            Précédent
          </button>
        )}

        {currentStep < 4 && (
          <button className="button next-button" onClick={goToNextStep}>
            Suivant
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectGenerator;
