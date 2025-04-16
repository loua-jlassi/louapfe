import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  FaSearch,
  FaClone,
  FaEdit,
  FaDownload,
  FaTrash,
  FaTag,
  FaCalendarAlt,
  FaCode,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import "./ProjectHistory.css";

const ProjectHistory = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [filterTag, setFilterTag] = useState("all");
  const [availableTags, setAvailableTags] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Simuler la récupération des projets de l'utilisateur
  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        name: "E-commerce API",
        description: "API REST pour application e-commerce",
        packageName: "com.example.ecommerce",
        javaVersion: "11",
        springVersion: "2.7.0",
        features: [
          { id: 1, name: "User Authentication", version: "2.0.0" },
          { id: 2, name: "RESTful API", version: "1.3.0" },
          { id: 3, name: "Database Integration", version: "2.0.0" },
        ],
        createdAt: "2023-06-15T14:30:00Z",
        lastModified: "2023-06-15T14:30:00Z",
        tags: ["api", "e-commerce"],
        isFavorite: true,
      },
      {
        id: 2,
        name: "Blog Backend",
        description: "Système de gestion de blog",
        packageName: "com.example.blog",
        javaVersion: "17",
        springVersion: "3.0.0",
        features: [
          { id: 1, name: "User Authentication", version: "2.0.0" },
          { id: 2, name: "RESTful API", version: "1.3.0" },
          { id: 4, name: "Email Service", version: "1.1.0" },
          { id: 5, name: "File Upload", version: "1.0.0" },
        ],
        createdAt: "2023-07-22T09:15:00Z",
        lastModified: "2023-08-01T11:20:00Z",
        tags: ["blog", "cms"],
        isFavorite: false,
      },
      {
        id: 3,
        name: "Task Manager API",
        description: "API pour une application de gestion de tâches",
        packageName: "com.example.taskmanager",
        javaVersion: "11",
        springVersion: "2.7.0",
        features: [
          { id: 1, name: "User Authentication", version: "2.0.0" },
          { id: 2, name: "RESTful API", version: "1.3.0" },
          { id: 3, name: "Database Integration", version: "2.0.0" },
        ],
        createdAt: "2023-08-05T16:45:00Z",
        lastModified: "2023-08-05T16:45:00Z",
        tags: ["api", "productivity"],
        isFavorite: true,
      },
      {
        id: 4,
        name: "Inventory System",
        description: "Système de gestion d'inventaire",
        packageName: "com.example.inventory",
        javaVersion: "17",
        springVersion: "3.0.0",
        features: [
          { id: 1, name: "User Authentication", version: "2.0.0" },
          { id: 2, name: "RESTful API", version: "1.3.0" },
          { id: 3, name: "Database Integration", version: "2.0.0" },
          { id: 5, name: "File Upload", version: "1.0.0" },
        ],
        createdAt: "2023-09-10T10:30:00Z",
        lastModified: "2023-09-12T14:20:00Z",
        tags: ["inventory", "business"],
        isFavorite: false,
      },
    ];

    setProjects(mockProjects);
    setFilteredProjects(mockProjects);

    // Extraire les tags uniques
    const tags = new Set();
    mockProjects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    setAvailableTags(Array.from(tags));
  }, []);

  // Filtrer les projets en fonction du terme de recherche et du tag
  useEffect(() => {
    let results = projects;

    // Filtrer par terme de recherche
    if (searchTerm) {
      results = results.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.packageName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par tag
    if (filterTag !== "all") {
      results = results.filter((project) => project.tags.includes(filterTag));
    }

    // Trier les résultats
    results = [...results].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredProjects(results);
  }, [searchTerm, filterTag, sortConfig, projects]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagChange = (e) => {
    setFilterTag(e.target.value);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloneProject = (project) => {
    // Dans une application réelle, cette fonction
    // ferait un appel API pour cloner le projet
    console.log("Cloning project:", project);
    const clonedProject = {
      ...project,
      id: Date.now(), // Simuler un nouvel ID
      name: `${project.name} (clone)`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      isFavorite: false,
    };

    setProjects([...projects, clonedProject]);

    // Simuler un délai comme si l'appel API prenait du temps
    setTimeout(() => {
      alert(`Le projet "${project.name}" a été cloné avec succès.`);
    }, 500);
  };

  const handleEditProject = (project) => {
    // Dans une application réelle, nous redirigerions vers
    // le générateur de projet avec les paramètres pré-remplis
    console.log("Editing project:", project);
    navigate("/project-generator", { state: { project } });
  };

  const handleDeleteConfirmation = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const handleDeleteProject = () => {
    if (!projectToDelete) return;

    // Dans une application réelle, cette fonction
    // ferait un appel API pour supprimer le projet
    const updatedProjects = projects.filter((p) => p.id !== projectToDelete.id);
    setProjects(updatedProjects);
    setShowDeleteModal(false);
    setProjectToDelete(null);

    // Si le projet supprimé était sélectionné, désélectionner
    if (selectedProject && selectedProject.id === projectToDelete.id) {
      setSelectedProject(null);
    }
  };

  const handleDownloadProject = (project) => {
    // Dans une application réelle, cette fonction
    // déclencherait le téléchargement du projet
    console.log("Downloading project:", project);
    alert(`Téléchargement du projet "${project.name}" commencé.`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderProjectCount = () => {
    const count = filteredProjects.length;
    const total = projects.length;
    if (count === total) {
      return `${count} projet${count !== 1 ? "s" : ""}`;
    }
    return `${count} sur ${total} projet${total !== 1 ? "s" : ""}`;
  };

  return (
    <div className={`project-history-container ${darkMode ? "dark" : "light"}`}>
      <div className="history-header">
        <h1>Historique des Projets</h1>
        <p>
          Consultez, clonez ou modifiez les projets que vous avez précédemment
          générés
        </p>
      </div>

      <div className="history-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par nom, description, package..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-controls">
          <div className="tag-filter">
            <label>Filtrer par tag:</label>
            <select value={filterTag} onChange={handleTagChange}>
              <option value="all">Tous les tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className="project-count">{renderProjectCount()}</div>
        </div>
      </div>

      <div className="history-content">
        <div className="projects-list-container">
          <table className="projects-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort("name")}>
                  Nom {getSortIcon("name")}
                </th>
                <th>Description</th>
                <th
                  className="sortable"
                  onClick={() => handleSort("createdAt")}
                >
                  Créé le {getSortIcon("createdAt")}
                </th>
                <th
                  className="sortable"
                  onClick={() => handleSort("lastModified")}
                >
                  Modifié le {getSortIcon("lastModified")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className={
                      selectedProject && selectedProject.id === project.id
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleSelectProject(project)}
                  >
                    <td className="project-name">
                      {project.isFavorite && (
                        <span className="favorite-star">★</span>
                      )}
                      {project.name}
                    </td>
                    <td className="project-description">
                      {project.description}
                    </td>
                    <td>{formatDate(project.createdAt)}</td>
                    <td>{formatDate(project.lastModified)}</td>
                    <td className="project-actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProject(project);
                        }}
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn clone-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloneProject(project);
                        }}
                        title="Cloner"
                      >
                        <FaClone />
                      </button>
                      <button
                        className="action-btn download-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadProject(project);
                        }}
                        title="Télécharger"
                      >
                        <FaDownload />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConfirmation(project);
                        }}
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-projects">
                    Aucun projet ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedProject && (
          <div className="project-details">
            <h2>{selectedProject.name}</h2>
            <p className="description">{selectedProject.description}</p>

            <div className="detail-section">
              <h3>Informations</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Package:</span>
                  <span className="detail-value">
                    {selectedProject.packageName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Java:</span>
                  <span className="detail-value">
                    {selectedProject.javaVersion}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Spring Boot:</span>
                  <span className="detail-value">
                    {selectedProject.springVersion}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Créé le:</span>
                  <span className="detail-value">
                    {formatDate(selectedProject.createdAt)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Modifié le:</span>
                  <span className="detail-value">
                    {formatDate(selectedProject.lastModified)}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Fonctionnalités</h3>
              <ul className="features-list">
                {selectedProject.features.map((feature) => (
                  <li key={feature.id} className="feature-item">
                    <span className="feature-name">{feature.name}</span>
                    <span className="feature-version">v{feature.version}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3>Tags</h3>
              <div className="tags-container">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-actions">
              <button
                className="detail-btn edit-btn"
                onClick={() => handleEditProject(selectedProject)}
              >
                <FaEdit /> Modifier
              </button>
              <button
                className="detail-btn clone-btn"
                onClick={() => handleCloneProject(selectedProject)}
              >
                <FaClone /> Cloner
              </button>
              <button
                className="detail-btn download-btn"
                onClick={() => handleDownloadProject(selectedProject)}
              >
                <FaDownload /> Télécharger
              </button>
              <button
                className="detail-btn delete-btn"
                onClick={() => handleDeleteConfirmation(selectedProject)}
              >
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>Confirmer la suppression</h3>
            <p>
              Êtes-vous sûr de vouloir supprimer le projet "
              <strong>{projectToDelete?.name}</strong>" ?
            </p>
            <p className="warning">Cette action est irréversible.</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setProjectToDelete(null);
                }}
              >
                Annuler
              </button>
              <button className="confirm-btn" onClick={handleDeleteProject}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectHistory;
