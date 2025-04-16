import React, { useState, useEffect } from "react";
import {
  FaRegCalendarAlt,
  FaEye,
  FaUserCheck,
  FaPuzzlePiece,
  FaCrown,
  FaCheckCircle,
  FaTachometerAlt,
  FaCog,
  FaSyncAlt,
  FaServer,
  FaDatabase,
  FaShieldAlt,
  FaCreditCard,
  FaBell,
  FaHistory,
  FaFilter,
  FaCalendarDay,
  FaExclamationTriangle,
  FaChartLine,
  FaClock,
  FaUser,
  FaBolt,
  FaCalendarAlt,
} from "react-icons/fa";
import "./DashboardActivity.css";

const DashboardActivity = () => {
  const [activityFilter, setActivityFilter] = useState("all");
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [activities, setActivities] = useState([]);
  const [todaysActions, setTodaysActions] = useState([]);

  // Simulate fetching activities from an API
  useEffect(() => {
    // Mock data for activities
    const mockActivities = [
      {
        id: 1,
        type: "user",
        message: "Jean Dupont a mis à jour les paramètres de son compte",
        time: "2 heures",
        user: "Jean Dupont",
        icon: <FaUser />,
      },
      {
        id: 2,
        type: "feature",
        message: 'Fonctionnalité "Tableau de bord analytique" mise à jour',
        time: "3 heures",
        user: "Admin",
        icon: <FaChartLine />,
      },
      {
        id: 3,
        type: "system",
        message: "Maintenance système programmée pour demain 22h",
        time: "5 heures",
        user: "Système",
        icon: <FaBolt />,
      },
      {
        id: 4,
        type: "user",
        message: "Marie Martin a créé un nouveau compte utilisateur",
        time: "6 heures",
        user: "Marie Martin",
        icon: <FaUser />,
      },
      {
        id: 5,
        type: "feature",
        message: 'Nouvelle fonctionnalité "Gestion des notifications" déployée',
        time: "1 jour",
        user: "Admin",
        icon: <FaChartLine />,
      },
    ];

    // Mock data for today's actions
    const mockTodaysActions = [
      {
        id: 1,
        title: "Mettre à jour la documentation",
        description: "Ajouter les nouvelles fonctionnalités",
        status: "completed",
        completed: true,
      },
      {
        id: 2,
        title: "Réviser les demandes d'accès",
        description: "3 nouvelles demandes à traiter",
        status: "pending",
        completed: false,
      },
      {
        id: 3,
        title: "Déployer la version 2.5",
        description: "Mise à jour des modules principaux",
        status: "in-progress",
        completed: false,
      },
    ];

    setActivities(mockActivities);
    setTodaysActions(mockTodaysActions);
  }, []);

  // Filter activities based on selected filter
  const filteredActivities = activities.filter((activity) => {
    if (activityFilter === "all") return true;
    return activity.type === activityFilter;
  });

  // Limiter le nombre d'activités affichées sauf si showAllActivity est true
  const displayedActivity = showAllActivity
    ? filteredActivities
    : filteredActivities.slice(0, 4);

  // System status mock data
  const systemStatus = {
    api: {
      name: "API Gateway",
      uptime: "99.99%",
      requests: "1.2K/min",
      performance: "45ms",
    },
    database: {
      name: "Database Cluster",
      uptime: "99.95%",
      queries: "3.5K/min",
      responseTime: "12ms",
    },
    payment: {
      name: "Payment System",
      transactions: "250/jour",
      successRate: "99.7%",
    },
  };

  // Dernière mise à jour du système
  const lastUpdate = new Date();
  lastUpdate.setMinutes(lastUpdate.getMinutes() - 5);

  return (
    <div className="dashboard-activity">
      {/* Section Today's Actions */}
      <div className="activity-section todays-actions">
        <div className="activity-header">
          <h3 className="activity-title">
            <FaCalendarAlt />
            Actions du jour
          </h3>
        </div>
        <div className="actions-list">
          {todaysActions.map((action) => (
            <div key={action.id} className="action-item">
              <div className="action-left">
                <div
                  className={`action-checkbox ${
                    action.completed ? "completed" : ""
                  }`}
                >
                  {action.completed && <FaCheckCircle />}
                </div>
                <div className="action-info">
                  <div className="action-title">{action.title}</div>
                  <div className="action-desc">{action.description}</div>
                </div>
              </div>
              <div className={`action-status ${action.status}`}>
                {action.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Recent Activity */}
      <div className="activity-section">
        <div className="activity-header">
          <h3 className="activity-title">
            <FaChartLine />
            Activité récente
          </h3>
          <div className="activity-filter">
            <button
              className={activityFilter === "all" ? "active" : ""}
              onClick={() => setActivityFilter("all")}
            >
              Tout
            </button>
            <button
              className={activityFilter === "user" ? "active" : ""}
              onClick={() => setActivityFilter("user")}
            >
              Utilisateurs
            </button>
            <button
              className={activityFilter === "feature" ? "active" : ""}
              onClick={() => setActivityFilter("feature")}
            >
              Fonctionnalités
            </button>
            <button
              className={activityFilter === "system" ? "active" : ""}
              onClick={() => setActivityFilter("system")}
            >
              Système
            </button>
          </div>
        </div>
        <div className="activity-list">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <div className="activity-message">{activity.message}</div>
                <div className="activity-meta">
                  <div className="activity-time">
                    <FaClock /> {activity.time}
                  </div>
                  <div className="activity-user">
                    <FaUser /> {activity.user}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section System Status */}
      <div className="activity-section">
        <div className="activity-header">
          <h3 className="activity-title">
            <FaBolt />
            Statut système
          </h3>
        </div>
        <div className="system-status">
          <div className="status-card">
            <div className="status-header">
              <div className="status-icon api">
                <FaBolt />
              </div>
              <div className="status-info">
                <div className="status-name">API</div>
                <div className="status-indicator">
                  <span className="status-dot operational"></span>
                  <span className="status-text">Opérationnelle</span>
                </div>
              </div>
            </div>
            <div className="status-metrics">
              <div className="metric">
                <span className="metric-name">Temps de réponse</span>
                <span className="metric-value good">120ms</span>
              </div>
              <div className="metric">
                <span className="metric-name">Disponibilité</span>
                <span className="metric-value good">99.9%</span>
              </div>
              <div className="metric">
                <span className="metric-name">Requêtes/min</span>
                <span className="metric-value">1,250</span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-header">
              <div className="status-icon database">
                <FaDatabase />
              </div>
              <div className="status-info">
                <div className="status-name">Base de données</div>
                <div className="status-indicator">
                  <span className="status-dot issues"></span>
                  <span className="status-text">Problèmes mineurs</span>
                </div>
              </div>
            </div>
            <div className="status-metrics">
              <div className="metric">
                <span className="metric-name">Latence</span>
                <span className="metric-value warning">230ms</span>
              </div>
              <div className="metric">
                <span className="metric-name">Charge CPU</span>
                <span className="metric-value warning">78%</span>
              </div>
              <div className="metric">
                <span className="metric-name">Espace disque</span>
                <span className="metric-value">65%</span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-header">
              <div className="status-icon payment">
                <FaCreditCard />
              </div>
              <div className="status-info">
                <div className="status-name">Système de paiement</div>
                <div className="status-indicator">
                  <span className="status-dot operational"></span>
                  <span className="status-text">Opérationnel</span>
                </div>
              </div>
            </div>
            <div className="status-metrics">
              <div className="metric">
                <span className="metric-name">Transactions/h</span>
                <span className="metric-value">523</span>
              </div>
              <div className="metric">
                <span className="metric-name">Taux de réussite</span>
                <span className="metric-value good">99.5%</span>
              </div>
              <div className="metric">
                <span className="metric-name">Temps moyen</span>
                <span className="metric-value good">1.8s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardActivity;
