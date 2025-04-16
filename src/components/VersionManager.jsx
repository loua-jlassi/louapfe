import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./VersionManager.css";

const VersionManager = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [versions, setVersions] = useState([]);
  const [newVersion, setNewVersion] = useState({
    versionNumber: "",
    releaseDate: "",
    description: "",
    isDeprecated: false,
    deprecationReason: "",
  });
  const [compatibilityMatrix, setCompatibilityMatrix] = useState({});
  const [activeTab, setActiveTab] = useState("versions"); // versions, compatibility, deprecation

  // Simuler la récupération des données
  useEffect(() => {
    // Données simulées des fonctionnalités
    const mockFeatures = [
      { id: 1, name: "User Authentication", category: "security" },
      { id: 2, name: "RESTful API", category: "backend" },
      { id: 3, name: "Database Integration", category: "data" },
      { id: 4, name: "Email Service", category: "communication" },
      { id: 5, name: "File Upload", category: "utility" },
    ];

    // Données simulées des versions
    const mockVersionsMap = {
      1: [
        {
          id: 1,
          featureId: 1,
          versionNumber: "1.0.0",
          releaseDate: "2023-01-15",
          description: "Version initiale de l'authentification utilisateur",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: false,
        },
        {
          id: 2,
          featureId: 1,
          versionNumber: "1.1.0",
          releaseDate: "2023-03-20",
          description: "Ajout de l'authentification à 2 facteurs",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: false,
        },
        {
          id: 3,
          featureId: 1,
          versionNumber: "2.0.0",
          releaseDate: "2023-06-10",
          description: "Refonte complète avec support OAuth2",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: true,
        },
      ],
      2: [
        {
          id: 4,
          featureId: 2,
          versionNumber: "1.0.0",
          releaseDate: "2023-01-10",
          description: "API REST basique",
          isDeprecated: true,
          deprecationReason: "Manque de fonctionnalités essentielles",
          isLatest: false,
        },
        {
          id: 5,
          featureId: 2,
          versionNumber: "1.2.0",
          releaseDate: "2023-04-05",
          description: "Ajout de la pagination et du filtrage",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: false,
        },
        {
          id: 6,
          featureId: 2,
          versionNumber: "1.3.0",
          releaseDate: "2023-07-22",
          description: "Support complet de Swagger",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: true,
        },
      ],
      3: [
        {
          id: 7,
          featureId: 3,
          versionNumber: "1.0.0",
          releaseDate: "2023-02-05",
          description: "Support MySQL et PostgreSQL",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: false,
        },
        {
          id: 8,
          featureId: 3,
          versionNumber: "2.0.0",
          releaseDate: "2023-08-15",
          description: "Ajout du support MongoDB et Redis",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: true,
        },
      ],
      4: [
        {
          id: 9,
          featureId: 4,
          versionNumber: "1.0.0",
          releaseDate: "2023-03-10",
          description: "Service d'email basique",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: false,
        },
        {
          id: 10,
          featureId: 4,
          versionNumber: "1.1.0",
          releaseDate: "2023-07-05",
          description: "Ajout de templates d'emails",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: true,
        },
      ],
      5: [
        {
          id: 11,
          featureId: 5,
          versionNumber: "1.0.0",
          releaseDate: "2023-05-20",
          description: "Upload de fichiers basique",
          isDeprecated: false,
          deprecationReason: "",
          isLatest: true,
        },
      ],
    };

    // Données simulées de compatibilité
    const mockCompatibility = {
      // Feature1:Version1 compatibilité avec Feature2:Version2
      "1:2.0.0": {
        "2:1.3.0": true,
        "2:1.2.0": true,
        "2:1.0.0": false,
        "3:2.0.0": true,
        "3:1.0.0": true,
        "4:1.1.0": true,
        "4:1.0.0": false,
        "5:1.0.0": true,
      },
      "2:1.3.0": {
        "1:2.0.0": true,
        "1:1.1.0": true,
        "1:1.0.0": false,
        "3:2.0.0": true,
        "3:1.0.0": true,
        "4:1.1.0": true,
        "4:1.0.0": true,
        "5:1.0.0": true,
      },
    };

    setFeatures(mockFeatures);
    if (selectedFeature) {
      setVersions(mockVersionsMap[selectedFeature.id] || []);
    }
    setCompatibilityMatrix(mockCompatibility);
  }, [selectedFeature]);

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
  };

  const handleVersionInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewVersion({
      ...newVersion,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleVersionAdd = () => {
    if (!selectedFeature || !newVersion.versionNumber) return;

    const newVersionObject = {
      id: Math.max(...versions.map((v) => v.id), 0) + 1,
      featureId: selectedFeature.id,
      ...newVersion,
      releaseDate:
        newVersion.releaseDate || new Date().toISOString().split("T")[0],
    };

    const updatedVersions = [...versions, newVersionObject];

    // Mettre à jour le statut isLatest
    const latestVersion = updatedVersions.reduce((latest, current) => {
      if (
        !latest ||
        compareVersions(current.versionNumber, latest.versionNumber) > 0
      ) {
        return current;
      }
      return latest;
    }, null);

    const finalVersions = updatedVersions.map((version) => ({
      ...version,
      isLatest: version.id === latestVersion.id,
    }));

    setVersions(finalVersions);

    // Reset the form
    setNewVersion({
      versionNumber: "",
      releaseDate: "",
      description: "",
      isDeprecated: false,
      deprecationReason: "",
    });
  };

  const handleToggleDeprecation = (versionId) => {
    setVersions(
      versions.map((version) => {
        if (version.id === versionId) {
          const isDeprecated = !version.isDeprecated;
          return {
            ...version,
            isDeprecated,
            deprecationReason: isDeprecated ? version.deprecationReason : "",
          };
        }
        return version;
      })
    );
  };

  const handleDeprecationReasonChange = (versionId, reason) => {
    setVersions(
      versions.map((version) => {
        if (version.id === versionId) {
          return {
            ...version,
            deprecationReason: reason,
          };
        }
        return version;
      })
    );
  };

  const handleCompatibilityChange = (featureVersion1, featureVersion2) => {
    const currentStatus = getCompatibilityStatus(
      featureVersion1,
      featureVersion2
    );

    setCompatibilityMatrix({
      ...compatibilityMatrix,
      [featureVersion1]: {
        ...(compatibilityMatrix[featureVersion1] || {}),
        [featureVersion2]: !currentStatus,
      },
    });
  };

  const getCompatibilityStatus = (featureVersion1, featureVersion2) => {
    return compatibilityMatrix[featureVersion1]?.[featureVersion2] || false;
  };

  const compareVersions = (v1, v2) => {
    // Simple version comparison for semantic versioning
    const v1Parts = v1.split(".").map(Number);
    const v2Parts = v2.split(".").map(Number);

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;

      if (v1Part > v2Part) return 1;
      if (v1Part < v2Part) return -1;
    }

    return 0;
  };

  // Vérifier si l'utilisateur est un admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login", { state: { from: "/version-manager" } });
    }
  }, [user, navigate]);

  // Obtenir toutes les versions de toutes les fonctionnalités
  const getAllVersions = () => {
    const allVersions = [];
    Object.values(features).forEach((feature) => {
      const featureVersions = versions.filter(
        (v) => v.featureId === feature.id
      );
      featureVersions.forEach((version) => {
        allVersions.push({
          featureId: feature.id,
          featureName: feature.name,
          ...version,
        });
      });
    });
    return allVersions;
  };

  return (
    <div className={`version-manager ${theme === "dark" ? "dark" : ""}`}>
      <div className="version-manager-header">
        <h1>Gestion des Versions</h1>
        <p>
          Gérez les versions des fonctionnalités, la compatibilité et marquez
          les versions dépréciées
        </p>
      </div>

      <div className="version-manager-content">
        <div className="features-sidebar">
          <h2>Fonctionnalités</h2>
          <ul className="features-list">
            {features.map((feature) => (
              <li
                key={feature.id}
                className={`feature-item ${
                  selectedFeature?.id === feature.id ? "selected" : ""
                }`}
                onClick={() => handleFeatureSelect(feature)}
              >
                <span className="feature-name">{feature.name}</span>
                <span className="feature-category">{feature.category}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="versions-main">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "versions" ? "active" : ""}`}
              onClick={() => setActiveTab("versions")}
            >
              Versions
            </button>
            <button
              className={`tab ${activeTab === "compatibility" ? "active" : ""}`}
              onClick={() => setActiveTab("compatibility")}
            >
              Compatibilité
            </button>
            <button
              className={`tab ${activeTab === "deprecation" ? "active" : ""}`}
              onClick={() => setActiveTab("deprecation")}
            >
              Dépréciation
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "versions" && (
              <div className="versions-tab">
                <h2>
                  {selectedFeature
                    ? `Versions de ${selectedFeature.name}`
                    : "Sélectionnez une fonctionnalité"}
                </h2>

                {selectedFeature && (
                  <>
                    <div className="add-version-form">
                      <h3>Ajouter une nouvelle version</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="versionNumber">
                            Numéro de version
                          </label>
                          <input
                            type="text"
                            id="versionNumber"
                            name="versionNumber"
                            value={newVersion.versionNumber}
                            onChange={handleVersionInputChange}
                            placeholder="ex: 1.0.0"
                            className={theme === "dark" ? "dark-input" : ""}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="releaseDate">Date de sortie</label>
                          <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            value={newVersion.releaseDate}
                            onChange={handleVersionInputChange}
                            className={theme === "dark" ? "dark-input" : ""}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          name="description"
                          value={newVersion.description}
                          onChange={handleVersionInputChange}
                          rows="3"
                          className={theme === "dark" ? "dark-input" : ""}
                        ></textarea>
                      </div>
                      <div className="form-group checkbox-group">
                        <input
                          type="checkbox"
                          id="isDeprecated"
                          name="isDeprecated"
                          checked={newVersion.isDeprecated}
                          onChange={handleVersionInputChange}
                        />
                        <label htmlFor="isDeprecated">Version dépréciée</label>
                      </div>
                      {newVersion.isDeprecated && (
                        <div className="form-group">
                          <label htmlFor="deprecationReason">
                            Raison de dépréciation
                          </label>
                          <textarea
                            id="deprecationReason"
                            name="deprecationReason"
                            value={newVersion.deprecationReason}
                            onChange={handleVersionInputChange}
                            rows="2"
                            className={theme === "dark" ? "dark-input" : ""}
                          ></textarea>
                        </div>
                      )}
                      <button
                        className="add-version-button"
                        onClick={handleVersionAdd}
                      >
                        Ajouter la version
                      </button>
                    </div>

                    <div className="versions-list">
                      <h3>Versions existantes</h3>
                      <table className="versions-table">
                        <thead>
                          <tr>
                            <th>Version</th>
                            <th>Date de sortie</th>
                            <th>Description</th>
                            <th>Statut</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {versions.map((version) => (
                            <tr
                              key={version.id}
                              className={
                                version.isDeprecated ? "deprecated" : ""
                              }
                            >
                              <td>
                                {version.versionNumber}
                                {version.isLatest && (
                                  <span className="latest-badge">Latest</span>
                                )}
                              </td>
                              <td>{version.releaseDate}</td>
                              <td>{version.description}</td>
                              <td>
                                {version.isDeprecated ? (
                                  <span className="deprecated-status">
                                    Dépréciée
                                  </span>
                                ) : (
                                  <span className="active-status">Active</span>
                                )}
                              </td>
                              <td>
                                <button
                                  className={`toggle-deprecation ${
                                    version.isDeprecated
                                      ? "undeprecate"
                                      : "deprecate"
                                  }`}
                                  onClick={() =>
                                    handleToggleDeprecation(version.id)
                                  }
                                >
                                  {version.isDeprecated
                                    ? "Réactiver"
                                    : "Déprécier"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "compatibility" && (
              <div className="compatibility-tab">
                <h2>Matrice de Compatibilité</h2>
                <p className="compatibility-info">
                  La matrice ci-dessous vous permet de gérer la compatibilité
                  entre les différentes versions des fonctionnalités. Cliquez
                  sur une cellule pour changer le statut de compatibilité.
                </p>

                <div className="compatibility-matrix">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        {features.map((feature) => {
                          const featureVersions = versions.filter(
                            (v) => v.featureId === feature.id
                          );
                          return featureVersions.map((version) => (
                            <th key={`${feature.id}:${version.versionNumber}`}>
                              {feature.name} v{version.versionNumber}
                              {version.isDeprecated && (
                                <span className="deprecated-badge">D</span>
                              )}
                            </th>
                          ));
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {features.map((feature1) => {
                        const feature1Versions = versions.filter(
                          (v) => v.featureId === feature1.id
                        );
                        return feature1Versions.map((version1) => (
                          <tr
                            key={`row-${feature1.id}:${version1.versionNumber}`}
                          >
                            <td className="feature-version-cell">
                              {feature1.name} v{version1.versionNumber}
                              {version1.isDeprecated && (
                                <span className="deprecated-badge">D</span>
                              )}
                            </td>
                            {features.map((feature2) => {
                              const feature2Versions = versions.filter(
                                (v) => v.featureId === feature2.id
                              );
                              return feature2Versions.map((version2) => {
                                const featureVersion1 = `${feature1.id}:${version1.versionNumber}`;
                                const featureVersion2 = `${feature2.id}:${version2.versionNumber}`;

                                // Ne pas afficher la compatibilité avec soi-même
                                if (
                                  feature1.id === feature2.id &&
                                  version1.id === version2.id
                                ) {
                                  return (
                                    <td
                                      key={`cell-${featureVersion2}`}
                                      className="self-cell"
                                    >
                                      -
                                    </td>
                                  );
                                }

                                const isCompatible = getCompatibilityStatus(
                                  featureVersion1,
                                  featureVersion2
                                );

                                return (
                                  <td
                                    key={`cell-${featureVersion2}`}
                                    className={`compatibility-cell ${
                                      isCompatible
                                        ? "compatible"
                                        : "incompatible"
                                    }`}
                                    onClick={() =>
                                      handleCompatibilityChange(
                                        featureVersion1,
                                        featureVersion2
                                      )
                                    }
                                  >
                                    {isCompatible ? "✓" : "✗"}
                                  </td>
                                );
                              });
                            })}
                          </tr>
                        ));
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="compatibility-legend">
                  <div className="legend-item">
                    <span className="legend-symbol compatible">✓</span>
                    <span className="legend-text">Compatible</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-symbol incompatible">✗</span>
                    <span className="legend-text">Incompatible</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-symbol deprecated-badge">D</span>
                    <span className="legend-text">Dépréciée</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "deprecation" && (
              <div className="deprecation-tab">
                <h2>Gestion des Dépréciations</h2>
                <p className="deprecation-info">
                  Marquez les versions comme dépréciées et ajoutez une raison
                  pour informer les utilisateurs. Les versions dépréciées
                  restent disponibles mais ne sont plus recommandées.
                </p>

                <div className="deprecation-list">
                  <table className="deprecation-table">
                    <thead>
                      <tr>
                        <th>Fonctionnalité</th>
                        <th>Version</th>
                        <th>Date de sortie</th>
                        <th>Statut</th>
                        <th>Raison de dépréciation</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {features.map((feature) => {
                        const featureVersions = versions.filter(
                          (v) => v.featureId === feature.id
                        );
                        return featureVersions.map((version) => (
                          <tr
                            key={`${feature.id}-${version.id}`}
                            className={version.isDeprecated ? "deprecated" : ""}
                          >
                            <td>{feature.name}</td>
                            <td>
                              {version.versionNumber}
                              {version.isLatest && (
                                <span className="latest-badge">Latest</span>
                              )}
                            </td>
                            <td>{version.releaseDate}</td>
                            <td>
                              {version.isDeprecated ? (
                                <span className="deprecated-status">
                                  Dépréciée
                                </span>
                              ) : (
                                <span className="active-status">Active</span>
                              )}
                            </td>
                            <td>
                              {version.isDeprecated ? (
                                <textarea
                                  value={version.deprecationReason}
                                  onChange={(e) =>
                                    handleDeprecationReasonChange(
                                      version.id,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Raison de dépréciation"
                                  className={
                                    theme === "dark" ? "dark-input" : ""
                                  }
                                  rows="2"
                                ></textarea>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              <button
                                className={`toggle-deprecation ${
                                  version.isDeprecated
                                    ? "undeprecate"
                                    : "deprecate"
                                }`}
                                onClick={() =>
                                  handleToggleDeprecation(version.id)
                                }
                              >
                                {version.isDeprecated
                                  ? "Réactiver"
                                  : "Déprécier"}
                              </button>
                            </td>
                          </tr>
                        ));
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionManager;
