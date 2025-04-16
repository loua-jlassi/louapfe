import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaCrown,
  FaChartLine,
  FaRegChartBar,
  FaPuzzlePiece,
  FaRegStar,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaDatabase,
} from "react-icons/fa";
import "./DashboardStats.css";

const DashboardStats = ({ stats, chartData }) => {
  const [timeFrame, setTimeFrame] = useState("thisMonth");
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    // Animation des statistiques au chargement
    setAnimateStats(true);

    // Réinitialiser l'animation si les statistiques changent
    return () => setAnimateStats(false);
  }, [stats]);

  const getRandomData = (baseValue, range) => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push(baseValue + Math.floor(Math.random() * range));
    }
    return data;
  };

  // Générer des données aléatoires pour les mini-charts
  const userMiniData = getRandomData(
    stats.totalUsers * 0.8,
    stats.totalUsers * 0.4
  );
  const revenueMiniData = getRandomData(
    stats.revenueStats.total * 0.8,
    stats.revenueStats.total * 0.4
  );

  return (
    <>
      {/* Sélecteur de période */}
      <div className="stats-selector-container">
        <div className="stats-timeframe">
          <span className="stats-label">Période :</span>
          <select
            className="stats-timeframe-select"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value="today">Aujourd'hui</option>
            <option value="thisWeek">Cette semaine</option>
            <option value="thisMonth">Ce mois</option>
            <option value="lastMonth">Mois dernier</option>
            <option value="thisYear">Cette année</option>
          </select>
        </div>
        <div className="stats-view-options">
          <button className="view-option active">
            <FaChartLine /> Graphiques
          </button>
          <button className="view-option">
            <FaDatabase /> Données
          </button>
        </div>
      </div>

      {/* Grille principale de statistiques */}
      <div className={`admin-stats-grid ${animateStats ? "animate" : ""}`}>
        {/* Statistiques des utilisateurs */}
        <div className="admin-stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-actions">
              <span className="stat-badge">Actif</span>
            </div>
          </div>
          <div className="stat-content">
            <h3>Utilisateurs</h3>
            <div className="stat-value-container">
              <div className="stat-value">{stats.totalUsers}</div>
              <div className="stat-growth positive">
                <FaArrowUp />
                <span>{stats.userStats.growth}%</span>
              </div>
            </div>
            <div className="stat-details">
              <div className="stat-detail">
                <span className="detail-label">Actifs</span>
                <span className="detail-value">{stats.activeUsers}</span>
              </div>
              <div className="stat-detail">
                <span className="detail-label">Nouveaux</span>
                <span className="detail-value">{stats.newUsers}</span>
              </div>
            </div>
          </div>
          <div className="stat-chart">
            <div className="mini-sparkline">
              {userMiniData.map((value, index) => (
                <div
                  key={index}
                  className="sparkline-bar"
                  style={{
                    height: `${(value / Math.max(...userMiniData)) * 100}%`,
                    backgroundColor:
                      index % 2 === 0
                        ? "var(--primary-color)"
                        : "var(--primary-dark)",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistiques premium */}
        <div className="admin-stat-card premium-card">
          <div className="stat-header">
            <div className="stat-icon premium-icon">
              <FaCrown />
            </div>
            <div className="stat-actions">
              <span className="stat-badge premium">Premium</span>
            </div>
          </div>
          <div className="stat-content">
            <h3>Utilisateurs Premium</h3>
            <div className="stat-value-container">
              <div className="stat-value">{stats.premiumUsers}</div>
              <div className="stat-percentage">
                {stats.totalUsers
                  ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1)
                  : 0}
                %
              </div>
            </div>
            <div className="conversion-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      stats.totalUsers
                        ? (stats.premiumUsers / stats.totalUsers) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
              <div className="progress-label">Taux de conversion</div>
            </div>
          </div>
        </div>

        {/* Statistiques des revenus */}
        <div className="admin-stat-card revenue-card">
          <div className="stat-header">
            <div className="stat-icon revenue-icon">
              <FaRegChartBar />
            </div>
            <div className="stat-actions">
              <span className="stat-badge revenue">Revenu</span>
            </div>
          </div>
          <div className="stat-content">
            <h3>Revenu Total</h3>
            <div className="stat-value-container">
              <div className="stat-value">
                {stats.revenueStats.total.toLocaleString()} €
              </div>
              <div className="stat-growth positive">
                <FaArrowUp />
                <span>{stats.revenueStats.growth}%</span>
              </div>
            </div>
            <div className="stat-details">
              <div className="stat-detail">
                <span className="detail-label">Mois précédent</span>
                <span className="detail-value">
                  {stats.revenueStats.previous.toLocaleString()} €
                </span>
              </div>
            </div>
          </div>
          <div className="stat-chart">
            <div className="mini-sparkline">
              {revenueMiniData.map((value, index) => (
                <div
                  key={index}
                  className="sparkline-bar"
                  style={{
                    height: `${(value / Math.max(...revenueMiniData)) * 100}%`,
                    backgroundColor: index % 2 === 0 ? "#34c759" : "#32b350",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistiques des fonctionnalités */}
        <div className="admin-stat-card feature-card">
          <div className="stat-header">
            <div className="stat-icon feature-icon">
              <FaPuzzlePiece />
            </div>
            <div className="stat-actions">
              <span className="stat-badge feature">Fonctionnalités</span>
            </div>
          </div>
          <div className="stat-content">
            <h3>Fonctionnalités</h3>
            <div className="stat-value-container">
              <div className="stat-value">{stats.totalFeatures}</div>
            </div>
            <div className="features-distribution">
              <div className="feature-type">
                <div className="feature-icon premium">
                  <FaCrown />
                </div>
                <div className="feature-info">
                  <span className="feature-label">Premium</span>
                  <span className="feature-count">{stats.premiumFeatures}</span>
                </div>
                <div className="feature-percent">
                  {stats.totalFeatures
                    ? (
                        (stats.premiumFeatures / stats.totalFeatures) *
                        100
                      ).toFixed(0)
                    : 0}
                  %
                </div>
              </div>
              <div className="feature-type">
                <div className="feature-icon free">
                  <FaRegStar />
                </div>
                <div className="feature-info">
                  <span className="feature-label">Gratuites</span>
                  <span className="feature-count">{stats.freeFeatures}</span>
                </div>
                <div className="feature-percent">
                  {stats.totalFeatures
                    ? (
                        (stats.freeFeatures / stats.totalFeatures) *
                        100
                      ).toFixed(0)
                    : 0}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
