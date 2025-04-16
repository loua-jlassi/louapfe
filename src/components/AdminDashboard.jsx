import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./AdminDashboard.css";
import "./DashboardLayout.css";
import {
  FaUsers,
  FaCogs,
  FaListAlt,
  FaChartLine,
  FaUserPlus,
  FaFeather,
  FaRocket,
  FaLock,
  FaDatabase,
  FaDesktop,
  FaPlusCircle,
  FaToolbox,
  FaUserCog,
  FaUserShield,
  FaPuzzlePiece,
  FaChartBar,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaUsersCog,
  FaCog,
  FaHistory,
  FaRegListAlt,
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
  FaClipboardList,
  FaUser,
  FaCrown,
  FaThList,
  FaTachometerAlt,
  FaRegFileAlt,
  FaRegChartBar,
  FaRegCalendarAlt,
  FaRegStar,
  FaUserCheck,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaRegSmile,
  FaEye,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaServer,
  FaCreditCard,
} from "react-icons/fa";
import NewAdminFooter from "./NewAdminFooter";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import DashboardActivity from "./DashboardActivity";
import NotificationsPanel from "./NotificationsPanel";
import AdminSidebar from "./AdminSidebar";
import DashboardHeader from "./DashboardHeader";
import MessagesManagement from "./MessagesManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAdmin } = useAuth();
  const { theme, isDarkMode } = useTheme();
  const [features, setFeatures] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalFeatures: 0,
    premiumFeatures: 0,
    freeFeatures: 0,
    totalUsers: 0,
    premiumUsers: 0,
    freeUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    featuresPerCategory: {},
    revenueStats: {
      total: 12500,
      previous: 9800,
      growth: 27.55,
      monthly: [
        4200, 4850, 5100, 5300, 5700, 6100, 6400, 6800, 7200, 7800, 8300, 8900,
      ],
    },
    userStats: {
      total: 0,
      growth: 18.2,
      monthly: [120, 145, 165, 180, 210, 240, 280, 310, 350, 390, 430, 470],
    },
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddFeatureForm, setShowAddFeatureForm] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newFeature, setNewFeature] = useState({
    id: "",
    title: "",
    description: "",
    icon: "",
    category: "general",
    isPremium: false,
    version: "1.0.0",
    tags: [],
    status: "active",
    documentation: "",
    demoLink: "",
  });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Nouvel utilisateur inscrit: Marie Dupont",
      time: "il y a 10 minutes",
      read: false,
      priority: "medium",
    },
    {
      id: 2,
      text: "5 nouveaux abonnements premium ce mois-ci",
      time: "il y a 1 heure",
      read: false,
      priority: "high",
    },
    {
      id: 3,
      text: "Maintenance système programmée pour demain à 02h00",
      time: "il y a 2 jours",
      read: true,
      priority: "low",
    },
  ]);

  // Add recentActivity data
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "user",
      time: "il y a 3 jours",
      text: "Nouvel utilisateur: Emma Richard",
      details: "Compte premium",
    },
    {
      id: 2,
      type: "feature",
      time: "il y a 5 jours",
      text: "Mise à jour de la fonctionnalité: API RESTful",
      details: "Version 2.1.0",
    },
    {
      id: 3,
      type: "subscription",
      time: "il y a 1 semaine",
      text: "Nouvelle souscription premium: Pierre Durand",
      details: "Plan Annuel",
    },
    {
      id: 4,
      type: "feature",
      time: "il y a 2 semaines",
      text: "Nouvelle fonctionnalité: Gestion de fichiers",
      details: "Intégration cloud",
    },
  ]);

  const [topFeatures, setTopFeatures] = useState([
    { name: "Authentification", usage: 92, trend: "up" },
    { name: "Tableau de bord", usage: 86, trend: "up" },
    { name: "Gestion utilisateurs", usage: 79, trend: "up" },
    { name: "API intégration", usage: 75, trend: "down" },
    { name: "Notitifications", usage: 68, trend: "stable" },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // Data for charts
  const [chartData, setChartData] = useState({
    userGrowth: [42, 53, 66, 70, 81, 90, 103, 110, 123, 135, 146, 158],
    featureUsage: [65, 72, 78, 85, 82, 90, 94],
    categories: ["Admin", "UI", "Auth", "Data", "API", "Notify", "Export"],
    monthlyRevenue: [
      4200, 4850, 5100, 5300, 5700, 6100, 6400, 6800, 7200, 7800, 8300, 8900,
    ],
  });

  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    id: null,
    name: "",
    email: "",
    accountType: "free",
    role: "user",
  });

  const [viewMode, setViewMode] = useState("table");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [featureFilter, setFeatureFilter] = useState({
    category: "",
    status: "",
    type: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState(null);

  useEffect(() => {
    console.log("AdminDashboard useEffect - Checking admin status");

    // Si l'utilisateur n'est pas admin, rediriger vers la page des fonctionnalités
    if (!isAdmin) {
      console.log("Not admin, redirecting...");
      navigate("/features");
      return;
    }

    // Indiquer que le chargement commence
    setIsLoading(true);

    // Charger les fonctionnalités et les utilisateurs
    loadFeatures();
    loadUsers();

    // Une fois les données chargées, mettre à jour l'état isLoading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [isAdmin, navigate]);

  useEffect(() => {
    calculateStats();
  }, [features, users]);

  const loadFeatures = () => {
    console.log("Loading features");
    try {
      let storedFeatures = JSON.parse(localStorage.getItem("features") || "[]");

      // Ajouter des fonctionnalités par défaut si aucune n'existe
      if (storedFeatures.length === 0) {
        console.log("No features found, adding defaults");
        storedFeatures = [
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
          {
            id: 3,
            title: "Système de notifications",
            description: "Notifications en temps réel pour les utilisateurs.",
            category: "Communication",
            icon: "🔔",
            isPremium: false,
          },
          {
            id: 4,
            title: "Gestion de contenu",
            description: "Création et gestion de contenu dynamique.",
            category: "Contenu",
            icon: "📝",
            isPremium: false,
          },
          {
            id: 5,
            title: "Intégration API",
            description: "Connexion avec des services tiers via API.",
            category: "Intégration",
            icon: "🔌",
            isPremium: true,
          },
        ];
        localStorage.setItem("features", JSON.stringify(storedFeatures));
      }

      setFeatures(storedFeatures);
      console.log("Features loaded:", storedFeatures.length);
    } catch (error) {
      console.error("Error loading features:", error);
    }
  };

  const loadUsers = () => {
    console.log("Loading users");
    try {
      let storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Ajouter des utilisateurs par défaut si aucun n'existe
      if (storedUsers.length === 0) {
        console.log("No users found, adding defaults");
        storedUsers = [
          {
            id: 1,
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            accountType: "premium",
            role: "admin",
          },
          {
            id: 2,
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            accountType: "premium",
            role: "user",
          },
          {
            id: 3,
            name: "Jane Smith",
            email: "jane@example.com",
            password: "password123",
            accountType: "free",
            role: "user",
          },
        ];
        localStorage.setItem("users", JSON.stringify(storedUsers));
      }

      setUsers(storedUsers);
      console.log("Users loaded:", storedUsers.length);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const calculateStats = () => {
    if (features.length === 0 || users.length === 0) return;

    const premiumFeatures = features.filter((f) => f.isPremium).length;
    const freeFeatures = features.length - premiumFeatures;
    const premiumUsers = users.filter(
      (u) => u.accountType === "premium"
    ).length;
    const freeUsers = users.length - premiumUsers;
    const activeUsers = Math.floor(users.length * 0.85); // Simulation
    const newUsers = Math.floor(users.length * 0.15); // Simulation

    // Calculer les fonctionnalités par catégorie
    const featuresPerCategory = {};
    features.forEach((feature) => {
      if (!featuresPerCategory[feature.category]) {
        featuresPerCategory[feature.category] = 0;
      }
      featuresPerCategory[feature.category]++;
    });

    // Mise à jour des statistiques utilisateurs
    const updatedUserStats = {
      ...stats.userStats,
      total: users.length,
    };

    setStats({
      ...stats,
      totalFeatures: features.length,
      premiumFeatures,
      freeFeatures,
      totalUsers: users.length,
      premiumUsers,
      freeUsers,
      activeUsers,
      newUsers,
      featuresPerCategory,
      userStats: updatedUserStats,
    });
  };

  const handleFeatureInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewFeature({
      ...newFeature,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveFeature = (e) => {
    e.preventDefault();
    let updatedFeatures = [];

    if (editingFeature) {
      updatedFeatures = features.map((feature) =>
        feature.id === editingFeature.id
          ? { ...newFeature, id: feature.id }
          : feature
      );
    } else {
      const featureId = Date.now().toString();
      updatedFeatures = [...features, { ...newFeature, id: featureId }];
    }

    localStorage.setItem("features", JSON.stringify(updatedFeatures));
    setFeatures(updatedFeatures);
    resetFeatureForm();
  };

  const handleDeleteFeature = (featureId) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette fonctionnalité ?"
      )
    ) {
      const updatedFeatures = features.filter(
        (feature) => feature.id !== featureId
      );
      localStorage.setItem("features", JSON.stringify(updatedFeatures));
      setFeatures(updatedFeatures);
    }
  };

  const handleEditFeature = (feature) => {
    setEditingFeature(feature);
    setNewFeature({
      id: feature.id,
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      category: feature.category || "general",
      isPremium: feature.isPremium || false,
      version: feature.version || "1.0.0",
      tags: feature.tags || [],
      status: feature.status || "active",
      documentation: feature.documentation || "",
      demoLink: feature.demoLink || "",
    });
    setShowAddFeatureForm(true);
  };

  const resetFeatureForm = () => {
    setEditingFeature(null);
    setNewFeature({
      id: "",
      title: "",
      description: "",
      icon: "",
      category: "general",
      isPremium: false,
      version: "1.0.0",
      tags: [],
      status: "active",
      documentation: "",
      demoLink: "",
    });
    setShowAddFeatureForm(false);
  };

  const handleCancelForm = () => {
    resetFeatureForm();
  };

  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();

    let updatedUsers;

    if (userFormData.id) {
      updatedUsers = users.map((user) =>
        user.id === userFormData.id ? { ...userFormData } : user
      );
    } else {
      const newUser = {
        ...userFormData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      updatedUsers = [...users, newUser];
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    resetUserForm();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      accountType: user.accountType || "free",
      role: user.role || "user",
    });
    setShowUserForm(true);
  };

  const handleDeleteUser = (userId) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  const resetUserForm = () => {
    setSelectedUser(null);
    setUserFormData({
      id: null,
      name: "",
      email: "",
      accountType: "free",
      role: "user",
    });
    setShowUserForm(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFeatureFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreview = (feature) => {
    setSelectedFeature(feature);
    setViewMode("details");
  };

  const handleDeleteConfirmation = (featureId) => {
    setFeatureToDelete(featureId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (featureToDelete) {
      const updatedFeatures = features.filter(
        (feature) => feature.id !== featureToDelete
      );
      localStorage.setItem("features", JSON.stringify(updatedFeatures));
      setFeatures(updatedFeatures);
      setShowDeleteConfirmation(false);
      setFeatureToDelete(null);
    }
  };

  const getFilteredFeatures = () => {
    return features.filter((feature) => {
      // Filtre de recherche textuelle
      const matchesSearch =
        feature.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (feature.tags &&
          feature.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      // Filtre par catégorie
      const matchesCategory =
        !featureFilter.category || feature.category === featureFilter.category;

      // Filtre par statut
      const matchesStatus =
        !featureFilter.status || feature.status === featureFilter.status;

      // Filtre par type (premium/gratuit)
      const matchesType =
        !featureFilter.type ||
        (featureFilter.type === "premium" && feature.isPremium) ||
        (featureFilter.type === "free" && !feature.isPremium);

      return matchesSearch && matchesCategory && matchesStatus && matchesType;
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newFeature.tags.includes(tagInput.trim())) {
      setNewFeature({
        ...newFeature,
        tags: [...newFeature.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewFeature({
      ...newFeature,
      tags: newFeature.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const renderFeaturesManagement = () => {
    const filteredFeatures = getFilteredFeatures();

    return (
      <div className="features-management">
        <div className="management-header">
          <div className="header-actions">
            <div className="filters">
              <select
                name="category"
                value={featureFilter.category}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Toutes les catégories</option>
                <option value="general">Général</option>
                <option value="productivity">Productivité</option>
                <option value="analytics">Analyse</option>
                <option value="communication">Communication</option>
                <option value="security">Sécurité</option>
                <option value="integration">Intégration</option>
                <option value="ai">Intelligence Artificielle</option>
              </select>

              <select
                name="status"
                value={featureFilter.status}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="beta">Bêta</option>
                <option value="development">En développement</option>
                <option value="deprecated">Déprécié</option>
              </select>

              <select
                name="type"
                value={featureFilter.type}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Tous les types</option>
                <option value="premium">Premium</option>
                <option value="free">Gratuit</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
              >
                <FaThList /> Tableau
              </button>
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <FaRegListAlt /> Grille
              </button>
            </div>

            <button
              className="add-feature-btn"
              onClick={() => setShowAddFeatureForm(true)}
            >
              <FaPlus /> Ajouter une fonctionnalité
            </button>
          </div>
        </div>

        {viewMode === "table" ? (
          <div className="features-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Catégorie</th>
                  <th>Type</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeatures.map((feature) => (
                  <tr key={feature.id}>
                    <td>{feature.id}</td>
                    <td>{feature.title}</td>
                    <td>{feature.description.substring(0, 50)}...</td>
                    <td>{feature.category}</td>
                    <td>{feature.isPremium ? "Premium" : "Gratuit"}</td>
                    <td>
                      <span className={`status-badge ${feature.status}`}>
                        {feature.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="action-btn preview"
                        onClick={() => handlePreview(feature)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditFeature(feature)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteConfirmation(feature.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="features-grid">
            {filteredFeatures.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description.substring(0, 100)}...</p>
                  <div className="feature-meta">
                    <span className={`status-badge ${feature.status}`}>
                      {feature.status}
                    </span>
                    <span className="type-badge">
                      {feature.isPremium ? "Premium" : "Gratuit"}
                    </span>
                  </div>
                </div>
                <div className="feature-actions">
                  <button
                    className="action-btn preview"
                    onClick={() => handlePreview(feature)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => handleEditFeature(feature)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteConfirmation(feature.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddFeatureForm && renderFeatureForm()}

        {showDeleteConfirmation && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <h3>Confirmation de suppression</h3>
              <p>Êtes-vous sûr de vouloir supprimer cette fonctionnalité?</p>
              <div className="confirmation-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Annuler
                </button>
                <button className="confirm-btn" onClick={confirmDelete}>
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedFeature && viewMode === "details" && (
          <div className="feature-details-overlay">
            <div className="feature-details">
              <div className="details-header">
                <button
                  className="back-btn"
                  onClick={() => {
                    setSelectedFeature(null);
                    setViewMode("table");
                  }}
                >
                  <FaArrowLeft /> Retour
                </button>
                <h2>{selectedFeature.title}</h2>
              </div>

              <div className="details-content">
                <div className="details-main">
                  <div className="details-icon">{selectedFeature.icon}</div>
                  <div className="details-meta">
                    <span className={`status-badge ${selectedFeature.status}`}>
                      {selectedFeature.status}
                    </span>
                    <span className="type-badge">
                      {selectedFeature.isPremium ? "Premium" : "Gratuit"}
                    </span>
                    <span className="category-badge">
                      {selectedFeature.category}
                    </span>
                  </div>
                  <p className="details-description">
                    {selectedFeature.description}
                  </p>

                  {selectedFeature.tags && selectedFeature.tags.length > 0 && (
                    <div className="details-tags">
                      <h4>Tags</h4>
                      <div className="tags-list">
                        {selectedFeature.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="details-side">
                  <div className="details-section">
                    <h4>Informations techniques</h4>
                    <div className="details-info">
                      <div className="info-item">
                        <span className="info-label">Version</span>
                        <span className="info-value">
                          {selectedFeature.version || "1.0.0"}
                        </span>
                      </div>
                      {selectedFeature.documentation && (
                        <div className="info-item">
                          <span className="info-label">Documentation</span>
                          <a
                            href={selectedFeature.documentation}
                            target="_blank"
                            rel="noreferrer"
                            className="info-link"
                          >
                            Voir la documentation <FaExternalLinkAlt />
                          </a>
                        </div>
                      )}
                      {selectedFeature.demoLink && (
                        <div className="info-item">
                          <span className="info-label">Démo</span>
                          <a
                            href={selectedFeature.demoLink}
                            target="_blank"
                            rel="noreferrer"
                            className="info-link"
                          >
                            Voir la démo <FaExternalLinkAlt />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="details-actions">
                <button
                  className="edit-btn"
                  onClick={() => {
                    handleEditFeature(selectedFeature);
                    setViewMode("table");
                  }}
                >
                  <FaEdit /> Modifier
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    handleDeleteConfirmation(selectedFeature.id);
                    setViewMode("table");
                  }}
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderUsersManagement = () => {
    // Filtrer les utilisateurs selon le terme de recherche
    const filteredUsers = users.filter((user) => {
      return (
        (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.accountType?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (user.role?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    });

    return (
      <div className="users-management-container">
        <div className="management-header">
          <div className="header-title-section">
            <h2>
              <FaUsers /> Gestion des utilisateurs
            </h2>
            <p>
              Gérez les comptes utilisateurs, leurs rôles et leurs permissions.
            </p>
          </div>
          <div className="header-actions">
            <button
              className="add-user-btn primary-btn"
              onClick={() => setShowUserForm(true)}
            >
              <FaUserPlus /> Ajouter un utilisateur
            </button>
          </div>
        </div>

        <div className="users-stats-cards">
          <div className="user-stat-card">
            <div className="stat-icon">
              <FaUserCircle />
            </div>
            <div className="stat-content">
              <h3>{users.length}</h3>
              <p>Total utilisateurs</p>
            </div>
          </div>
          <div className="user-stat-card">
            <div className="stat-icon premium">
              <FaCrown />
            </div>
            <div className="stat-content">
              <h3>{users.filter((u) => u.accountType === "premium").length}</h3>
              <p>Utilisateurs premium</p>
            </div>
          </div>
          <div className="user-stat-card">
            <div className="stat-icon admin">
              <FaUserShield />
            </div>
            <div className="stat-content">
              <h3>{users.filter((u) => u.role === "admin").length}</h3>
              <p>Administrateurs</p>
            </div>
          </div>
          <div className="user-stat-card">
            <div className="stat-icon recent">
              <FaUserCheck />
            </div>
            <div className="stat-content">
              <h3>{Math.ceil(users.length * 0.2)}</h3>
              <p>Nouveaux utilisateurs</p>
            </div>
          </div>
        </div>

        <div className="users-table-container">
          <div className="table-header-actions">
            <div className="table-filters">
              <select
                className="user-filter"
                onChange={(e) =>
                  setSearchTerm(e.target.value === "all" ? "" : e.target.value)
                }
              >
                <option value="all">Tous les types de compte</option>
                <option value="premium">Premium</option>
                <option value="free">Gratuit</option>
              </select>
              <select
                className="user-filter"
                onChange={(e) =>
                  setSearchTerm(e.target.value === "all" ? "" : e.target.value)
                }
              >
                <option value="all">Tous les rôles</option>
                <option value="admin">Administrateurs</option>
                <option value="user">Utilisateurs</option>
              </select>
            </div>
            <div className="table-actions">
              <button className="action-btn">
                <FaRegFileAlt /> Exporter
              </button>
              <button className="action-btn">
                <FaRegChartBar /> Statistiques
              </button>
            </div>
          </div>

          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Type de compte</th>
                  <th>Rôle</th>
                  <th>Dernière connexion</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="user-cell">
                      <div className="user-avatar">
                        <FaUserCircle size={32} />
                      </div>
                      <div className="user-info">
                        <span className="user-name">
                          {user.name || "Sans nom"}
                        </span>
                        <span className="user-id">ID: {user.id}</span>
                      </div>
                    </td>
                    <td>{user.email || "Email non défini"}</td>
                    <td>
                      <span
                        className={`account-badge ${
                          user.accountType || "free"
                        }`}
                      >
                        {user.accountType === "premium" ? (
                          <>
                            <FaCrown /> Premium
                          </>
                        ) : (
                          <>Gratuit</>
                        )}
                      </span>
                    </td>
                    <td>
                      <span className={`role-badge ${user.role || "user"}`}>
                        {user.role === "admin" ? (
                          <>
                            <FaUserShield /> Administrateur
                          </>
                        ) : (
                          <>
                            <FaUser /> Utilisateur
                          </>
                        )}
                      </span>
                    </td>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td className="actions">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditUser(user)}
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button className="action-btn view" title="Voir détails">
                        <FaEye />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button className="pagination-btn">
              <FaArrowLeft /> Précédent
            </button>
            <div className="pagination-info">Page 1 sur 1</div>
            <button className="pagination-btn">
              Suivant <FaArrowLeft style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
        </div>

        {showUserForm && (
          <div className="form-overlay">
            <div className="user-form-container">
              <div className="form-header">
                <h3>
                  {selectedUser ? (
                    <>
                      <FaEdit /> Modifier l'utilisateur
                    </>
                  ) : (
                    <>
                      <FaUserPlus /> Ajouter un utilisateur
                    </>
                  )}
                </h3>
                <button className="close-btn" onClick={resetUserForm}>
                  ×
                </button>
              </div>
              <form onSubmit={handleUserFormSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FaUser /> Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Entrez le nom complet"
                      value={userFormData.name}
                      onChange={handleUserFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <FaRegFileAlt /> Adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Entrez l'adresse email"
                      value={userFormData.email}
                      onChange={handleUserFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="accountType">
                      <FaCrown /> Type de compte
                    </label>
                    <select
                      id="accountType"
                      name="accountType"
                      value={userFormData.accountType}
                      onChange={handleUserFormChange}
                    >
                      <option value="free">Gratuit</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">
                      <FaUserShield /> Rôle
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={userFormData.role}
                      onChange={handleUserFormChange}
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>

                  {!selectedUser && (
                    <>
                      <div className="form-group">
                        <label htmlFor="password">
                          <FaLock /> Mot de passe
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Entrez le mot de passe"
                          value={userFormData.password || ""}
                          onChange={handleUserFormChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FaCheckCircle /> Activer le compte
                        </label>
                        <div className="toggle-switch">
                          <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={userFormData.isActive !== false}
                            onChange={(e) =>
                              setUserFormData({
                                ...userFormData,
                                isActive: e.target.checked,
                              })
                            }
                          />
                          <label htmlFor="isActive"></label>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={resetUserForm}
                  >
                    <FaTrash /> Annuler
                  </button>
                  <button type="submit" className="save-button">
                    <FaCheckCircle />{" "}
                    {selectedUser ? "Mettre à jour" : "Créer l'utilisateur"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFeatureForm = () => (
    <div className="form-overlay">
      <div className="form-container">
        <h3>
          {editingFeature
            ? "Modifier la fonctionnalité"
            : "Ajouter une fonctionnalité"}
        </h3>
        <form onSubmit={handleSaveFeature}>
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newFeature.title}
                  onChange={handleFeatureInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newFeature.description}
                  onChange={handleFeatureInputChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="icon">Icône</label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={newFeature.icon}
                  onChange={handleFeatureInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Catégorie</label>
                <select
                  id="category"
                  name="category"
                  value={newFeature.category}
                  onChange={handleFeatureInputChange}
                >
                  <option value="general">Général</option>
                  <option value="productivity">Productivité</option>
                  <option value="analytics">Analyse</option>
                  <option value="communication">Communication</option>
                  <option value="security">Sécurité</option>
                  <option value="integration">Intégration</option>
                  <option value="ai">Intelligence Artificielle</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label htmlFor="version">Version</label>
                <input
                  type="text"
                  id="version"
                  name="version"
                  value={newFeature.version}
                  onChange={handleFeatureInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Statut</label>
                <select
                  id="status"
                  name="status"
                  value={newFeature.status}
                  onChange={handleFeatureInputChange}
                >
                  <option value="active">Actif</option>
                  <option value="beta">Bêta</option>
                  <option value="development">En développement</option>
                  <option value="deprecated">Déprécié</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="isPremium">Premium</label>
                <input
                  type="checkbox"
                  id="isPremium"
                  name="isPremium"
                  checked={newFeature.isPremium}
                  onChange={handleFeatureInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="demoLink">Lien de démo</label>
                <input
                  type="text"
                  id="demoLink"
                  name="demoLink"
                  value={newFeature.demoLink}
                  onChange={handleFeatureInputChange}
                />
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelForm}
            >
              Annuler
            </button>
            <button type="submit" className="save-button">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Fonction pour le contenu du dashboard
  const DashboardContent = ({
    stats,
    chartData,
    topFeatures,
    recentActivity,
  }) => (
    <div className="dashboard-content">
      <h2 className="dashboard-title">Tableau de Bord</h2>
      <p className="dashboard-subtitle">
        Aperçu des performances et statistiques
      </p>

      <DashboardStats stats={stats} chartData={chartData} />

      <DashboardCharts
        chartData={chartData}
        topFeatures={topFeatures}
        stats={stats}
      />

      <DashboardActivity recentActivity={recentActivity} />

      <SystemStatus />
    </div>
  );

  // Add SystemStatus component
  const SystemStatus = () => {
    return (
      <div className="system-status-wrapper">
        <h3>État du système</h3>
        <div className="system-status-grid">
          <div className="status-card">
            <div className="status-header">
              <FaServer /> API
            </div>
            <div className="status-info">
              <div className="status-indicator online">
                <FaCheckCircle /> En ligne
              </div>
              <div className="status-details">
                <div className="status-metric">
                  <span>Temps de réponse</span>
                  <span>45ms</span>
                </div>
                <div className="status-metric">
                  <span>Disponibilité</span>
                  <span>99.9%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-header">
              <FaDatabase /> Base de données
            </div>
            <div className="status-info">
              <div className="status-indicator online">
                <FaCheckCircle /> En ligne
              </div>
              <div className="status-details">
                <div className="status-metric">
                  <span>Requêtes/sec</span>
                  <span>124</span>
                </div>
                <div className="status-metric">
                  <span>Disponibilité</span>
                  <span>99.8%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-header">
              <FaCreditCard /> Système de paiement
            </div>
            <div className="status-info">
              <div className="status-indicator online">
                <FaCheckCircle /> En ligne
              </div>
              <div className="status-details">
                <div className="status-metric">
                  <span>Transactions réussies</span>
                  <span>98.7%</span>
                </div>
                <div className="status-metric">
                  <span>Temps de traitement</span>
                  <span>1.2s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add renderSettings function
  const renderSettings = () => {
    return (
      <div className="settings-section">
        <div className="settings-header">
          <h2>Paramètres</h2>
          <p>Configurer les paramètres de l'application</p>
        </div>

        <div className="settings-grid">
          <div className="settings-card">
            <h3>
              <FaCogs /> Paramètres généraux
            </h3>
            <form className="settings-form">
              <div className="form-group">
                <label>Nom du site</label>
                <input type="text" defaultValue="Gestion des fonctionnalités" />
              </div>
              <div className="form-group">
                <label>Logo du site</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label>Langue par défaut</label>
                <select defaultValue="fr">
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                  <option value="es">Espagnol</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fuseau horaire</label>
                <select defaultValue="europe_paris">
                  <option value="europe_paris">Europe/Paris</option>
                  <option value="europe_london">Europe/London</option>
                  <option value="america_new_york">America/New York</option>
                </select>
              </div>
              <button type="submit" className="save-button">
                Enregistrer les modifications
              </button>
            </form>
          </div>

          <div className="settings-card">
            <h3>
              <FaShieldAlt /> Sécurité
            </h3>
            <form className="settings-form">
              <div className="form-group">
                <label>Authentification à deux facteurs</label>
                <div className="toggle-switch">
                  <input type="checkbox" id="twoFactor" />
                  <label htmlFor="twoFactor"></label>
                </div>
              </div>
              <div className="form-group">
                <label>Expiration de session (minutes)</label>
                <input type="number" defaultValue="30" />
              </div>
              <div className="form-group">
                <label>Tentatives de connexion maximales</label>
                <input type="number" defaultValue="5" />
              </div>
              <div className="form-group">
                <label>Complexité du mot de passe</label>
                <select defaultValue="medium">
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Élevée</option>
                </select>
              </div>
              <button type="submit" className="save-button">
                Enregistrer les modifications
              </button>
            </form>
          </div>

          <div className="settings-card">
            <h3>
              <FaBell /> Notifications
            </h3>
            <form className="settings-form">
              <div className="form-group">
                <label>Notifications par email</label>
                <div className="toggle-switch">
                  <input type="checkbox" id="emailNotif" defaultChecked />
                  <label htmlFor="emailNotif"></label>
                </div>
              </div>
              <div className="form-group">
                <label>Notifications dans l'application</label>
                <div className="toggle-switch">
                  <input type="checkbox" id="appNotif" defaultChecked />
                  <label htmlFor="appNotif"></label>
                </div>
              </div>
              <div className="form-group">
                <label>Résumé quotidien</label>
                <div className="toggle-switch">
                  <input type="checkbox" id="dailySummary" />
                  <label htmlFor="dailySummary"></label>
                </div>
              </div>
              <div className="form-group">
                <label>Limite de notifications</label>
                <input type="number" defaultValue="50" />
              </div>
              <button type="submit" className="save-button">
                Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Fonction de rendu du contenu en fonction de l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardContent
            stats={stats}
            chartData={chartData}
            topFeatures={topFeatures}
            recentActivity={recentActivity}
          />
        );
      case "features":
        return renderFeaturesManagement();
      case "users":
        return renderUsersManagement();
      case "messages":
        return <MessagesManagement />;
      case "settings":
        return renderSettings();
      default:
        return <div>Page non trouvée</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du tableau de bord administrateur...</p>
      </div>
    );
  }

  // Fonction pour marquer une notification comme lue
  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  // Fonction pour marquer toutes les notifications comme lues
  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Modification du rendu principal
  return (
    <div className={`admin-container ${isDarkMode ? "dark-mode" : ""}`}>
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={[
          { id: "dashboard", icon: "dashboard", label: "Tableau de bord" },
          {
            id: "features",
            icon: "features",
            label: "Gestion des fonctionnalités",
          },
          { id: "users", icon: "users", label: "Gestion des utilisateurs" },
          { id: "messages", icon: "messages", label: "Messages" },
          { id: "settings", icon: "settings", label: "Paramètres" },
        ]}
      />
      <div className="admin-main">
        <DashboardHeader
          title={
            activeTab === "dashboard"
              ? "Tableau de bord"
              : activeTab === "features"
              ? "Gestion des fonctionnalités"
              : activeTab === "users"
              ? "Gestion des utilisateurs"
              : activeTab === "messages"
              ? "Messages"
              : "Paramètres"
          }
          setShowNotifications={setShowNotifications}
          showNotifications={showNotifications}
          notifications={notifications}
          markNotificationAsRead={markNotificationAsRead}
          markAllNotificationsAsRead={markAllNotificationsAsRead}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="admin-content-wrapper">{renderContent()}</div>
        <NewAdminFooter />
      </div>

      {showNotifications && (
        <NotificationsPanel
          notifications={notifications}
          markNotificationAsRead={markNotificationAsRead}
          markAllNotificationsAsRead={markAllNotificationsAsRead}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
