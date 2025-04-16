import React, { useState, useEffect } from "react";
import {
  FaChartLine,
  FaChartBar,
  FaChartArea,
  FaRegFileAlt,
  FaDownload,
  FaExpand,
  FaInfoCircle,
  FaFilter,
} from "react-icons/fa";
import "./DashboardCharts.css";

const DashboardCharts = ({ chartData, topFeatures, stats }) => {
  const [activeTab, setActiveTab] = useState("users");
  const [chartView, setChartView] = useState("bars");
  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    // Animation des graphiques au chargement
    setAnimateCharts(true);

    // Réinitialiser l'animation si les données changent
    return () => setAnimateCharts(false);
  }, [chartData]);

  // Assigner des couleurs aux catégories pour les graphiques
  const getColorForCategory = (index) => {
    const colors = [
      "rgba(75, 192, 192, 1)", // Turquoise
      "rgba(255, 159, 64, 1)", // Orange
      "rgba(54, 162, 235, 1)", // Bleu
      "rgba(255, 99, 132, 1)", // Rose
      "rgba(153, 102, 255, 1)", // Violet
      "rgba(255, 205, 86, 1)", // Jaune
      "rgba(201, 203, 207, 1)", // Gris
    ];
    return colors[index % colors.length];
  };

  // Calculer les données pour la croissance progressive des utilisateurs
  const calculateCumulativeData = (data) => {
    const cumulativeData = [];
    let sum = 0;
    for (const value of data) {
      sum += value;
      cumulativeData.push(sum);
    }
    return cumulativeData;
  };

  const cumulativeUserGrowth = calculateCumulativeData(chartData.userGrowth);

  return (
    <div className={`dashboard-charts ${animateCharts ? "animate" : ""}`}>
      {/* En-tête avec onglets */}
      <div className="charts-header">
        <div className="charts-tabs">
          <button
            className={`chart-tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <FaChartLine /> Utilisateurs
          </button>
          <button
            className={`chart-tab ${activeTab === "revenue" ? "active" : ""}`}
            onClick={() => setActiveTab("revenue")}
          >
            <FaChartBar /> Revenus
          </button>
          <button
            className={`chart-tab ${activeTab === "features" ? "active" : ""}`}
            onClick={() => setActiveTab("features")}
          >
            <FaChartArea /> Fonctionnalités
          </button>
        </div>
        <div className="charts-actions">
          <button className="chart-action-btn">
            <FaFilter /> Filtrer
          </button>
          <button className="chart-action-btn">
            <FaDownload /> Exporter
          </button>
          <div className="chart-view-toggle">
            <button
              className={`view-toggle-btn ${
                chartView === "bars" ? "active" : ""
              }`}
              onClick={() => setChartView("bars")}
            >
              <FaChartBar />
            </button>
            <button
              className={`view-toggle-btn ${
                chartView === "line" ? "active" : ""
              }`}
              onClick={() => setChartView("line")}
            >
              <FaChartLine />
            </button>
            <button
              className={`view-toggle-btn ${
                chartView === "area" ? "active" : ""
              }`}
              onClick={() => setChartView("area")}
            >
              <FaChartArea />
            </button>
          </div>
        </div>
      </div>

      {/* Contenu de l'onglet Utilisateurs */}
      {activeTab === "users" && (
        <div className="chart-content user-chart">
          <div className="chart-info">
            <div className="chart-title">
              <h4>Évolution des Utilisateurs</h4>
              <div className="chart-subtitle">
                <FaInfoCircle /> Croissance mensuelle du nombre d'utilisateurs
              </div>
            </div>
            <div className="chart-stats">
              <div className="chart-stat">
                <div className="stat-title">Total Utilisateurs</div>
                <div className="stat-value">{stats.totalUsers}</div>
              </div>
              <div className="chart-stat">
                <div className="stat-title">Croissance</div>
                <div className="stat-value positive">
                  +{stats.userStats.growth}%
                </div>
              </div>
              <div className="chart-stat">
                <div className="stat-title">Nouveaux ce mois</div>
                <div className="stat-value">{stats.newUsers}</div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            {chartView === "bars" && (
              <div className="chart-bars-container">
                <div className="advanced-chart-bars">
                  {chartData.userGrowth.map((value, index) => (
                    <div className="advanced-chart-bar-group" key={index}>
                      <div
                        className="advanced-chart-bar"
                        style={{
                          height: `${
                            (value / Math.max(...chartData.userGrowth)) * 100
                          }%`,
                          backgroundColor: `rgba(74, 108, 247, ${
                            0.7 + (index / chartData.userGrowth.length) * 0.3
                          })`,
                        }}
                      >
                        <div className="bar-value">{value}</div>
                      </div>
                      <div className="bar-label">
                        {
                          [
                            "J",
                            "F",
                            "M",
                            "A",
                            "M",
                            "J",
                            "J",
                            "A",
                            "S",
                            "O",
                            "N",
                            "D",
                          ][index]
                        }
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chart-axis-y">
                  {[0, 25, 50, 75, 100].map((value, index) => (
                    <div className="axis-mark" key={index}>
                      <div className="axis-line"></div>
                      <div className="axis-value">
                        {Math.round(
                          (value / 100) * Math.max(...chartData.userGrowth)
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {chartView === "line" && (
              <div className="chart-line-container">
                <svg className="line-chart" viewBox="0 0 1000 400">
                  {/* Grille */}
                  {[0, 100, 200, 300, 400].map((y, i) => (
                    <line
                      key={`grid-${i}`}
                      x1="0"
                      y1={y}
                      x2="1000"
                      y2={y}
                      stroke="#e0e0e0"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  ))}

                  {/* Lignes pour les données */}
                  <polyline
                    fill="none"
                    stroke="var(--primary-color)"
                    strokeWidth="3"
                    points={chartData.userGrowth
                      .map((value, index) => {
                        const x =
                          (index / (chartData.userGrowth.length - 1)) * 1000;
                        const y =
                          400 -
                          (value / Math.max(...chartData.userGrowth)) * 400;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  {/* Points sur la ligne */}
                  {chartData.userGrowth.map((value, index) => {
                    const x =
                      (index / (chartData.userGrowth.length - 1)) * 1000;
                    const y =
                      400 - (value / Math.max(...chartData.userGrowth)) * 400;
                    return (
                      <circle
                        key={`point-${index}`}
                        cx={x}
                        cy={y}
                        r="6"
                        fill="white"
                        stroke="var(--primary-color)"
                        strokeWidth="2"
                      />
                    );
                  })}

                  {/* Labels */}
                  {chartData.userGrowth.map((value, index) => {
                    const x =
                      (index / (chartData.userGrowth.length - 1)) * 1000;
                    return (
                      <text
                        key={`label-${index}`}
                        x={x}
                        y="430"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#666"
                      >
                        {
                          [
                            "J",
                            "F",
                            "M",
                            "A",
                            "M",
                            "J",
                            "J",
                            "A",
                            "S",
                            "O",
                            "N",
                            "D",
                          ][index]
                        }
                      </text>
                    );
                  })}
                </svg>
              </div>
            )}

            {chartView === "area" && (
              <div className="chart-area-container">
                <svg className="area-chart" viewBox="0 0 1000 400">
                  {/* Grille */}
                  {[0, 100, 200, 300, 400].map((y, i) => (
                    <line
                      key={`grid-${i}`}
                      x1="0"
                      y1={y}
                      x2="1000"
                      y2={y}
                      stroke="#e0e0e0"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  ))}

                  {/* Aire sous la courbe */}
                  <path
                    fill="rgba(74, 108, 247, 0.2)"
                    d={`
                      M0,400
                      ${cumulativeUserGrowth
                        .map((value, index) => {
                          const x =
                            (index / (cumulativeUserGrowth.length - 1)) * 1000;
                          const y =
                            400 -
                            (value / Math.max(...cumulativeUserGrowth)) * 300;
                          return `L${x},${y}`;
                        })
                        .join(" ")}
                      L1000,400
                      Z
                    `}
                  />

                  {/* Ligne pour les données */}
                  <polyline
                    fill="none"
                    stroke="var(--primary-color)"
                    strokeWidth="3"
                    points={cumulativeUserGrowth
                      .map((value, index) => {
                        const x =
                          (index / (cumulativeUserGrowth.length - 1)) * 1000;
                        const y =
                          400 -
                          (value / Math.max(...cumulativeUserGrowth)) * 300;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  {/* Points sur la ligne */}
                  {cumulativeUserGrowth.map((value, index) => {
                    const x =
                      (index / (cumulativeUserGrowth.length - 1)) * 1000;
                    const y =
                      400 - (value / Math.max(...cumulativeUserGrowth)) * 300;
                    return (
                      <circle
                        key={`point-${index}`}
                        cx={x}
                        cy={y}
                        r="6"
                        fill="white"
                        stroke="var(--primary-color)"
                        strokeWidth="2"
                      />
                    );
                  })}

                  {/* Labels */}
                  {cumulativeUserGrowth.map((value, index) => {
                    const x =
                      (index / (cumulativeUserGrowth.length - 1)) * 1000;
                    return (
                      <text
                        key={`label-${index}`}
                        x={x}
                        y="430"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#666"
                      >
                        {
                          [
                            "J",
                            "F",
                            "M",
                            "A",
                            "M",
                            "J",
                            "J",
                            "A",
                            "S",
                            "O",
                            "N",
                            "D",
                          ][index]
                        }
                      </text>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contenu de l'onglet Revenus */}
      {activeTab === "revenue" && (
        <div className="chart-content revenue-chart">
          <div className="chart-info">
            <div className="chart-title">
              <h4>Revenus Mensuels</h4>
              <div className="chart-subtitle">
                <FaInfoCircle /> Évolution des revenus sur la période
              </div>
            </div>
            <div className="chart-stats">
              <div className="chart-stat">
                <div className="stat-title">Total Revenus</div>
                <div className="stat-value">
                  {stats.revenueStats.total.toLocaleString()} €
                </div>
              </div>
              <div className="chart-stat">
                <div className="stat-title">Croissance</div>
                <div className="stat-value positive">
                  +{stats.revenueStats.growth}%
                </div>
              </div>
              <div className="chart-stat">
                <div className="stat-title">Mois précédent</div>
                <div className="stat-value">
                  {stats.revenueStats.previous.toLocaleString()} €
                </div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="advanced-chart-bars">
              {chartData.monthlyRevenue.map((value, index) => (
                <div className="advanced-chart-bar-group" key={index}>
                  <div
                    className="advanced-chart-bar"
                    style={{
                      height: `${
                        (value / Math.max(...chartData.monthlyRevenue)) * 100
                      }%`,
                      backgroundColor: `rgba(52, 199, 89, ${
                        0.7 + (index / chartData.monthlyRevenue.length) * 0.3
                      })`,
                    }}
                  >
                    <div className="bar-value">{value.toLocaleString()} €</div>
                  </div>
                  <div className="bar-label">
                    {
                      [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                      ][index]
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contenu de l'onglet Fonctionnalités */}
      {activeTab === "features" && (
        <div className="chart-content features-chart">
          <div className="chart-info">
            <div className="chart-title">
              <h4>Utilisation des Fonctionnalités</h4>
              <div className="chart-subtitle">
                <FaInfoCircle /> Top fonctionnalités par taux d'utilisation
              </div>
            </div>
            <div className="chart-stats">
              <div className="chart-stat">
                <div className="stat-title">Total Fonctionnalités</div>
                <div className="stat-value">{stats.totalFeatures}</div>
              </div>
              <div className="chart-stat">
                <div className="stat-title">Premium</div>
                <div className="stat-value">{stats.premiumFeatures}</div>
              </div>
              <div className="chart-stat">
                <div className="stat-title">Gratuites</div>
                <div className="stat-value">{stats.freeFeatures}</div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="usage-chart">
              {topFeatures.map((feature, index) => (
                <div key={index} className="usage-item-advanced">
                  <div className="usage-rank">{index + 1}</div>
                  <div className="usage-info">
                    <div className="usage-name">{feature.name}</div>
                    <div className="usage-meta">
                      <span className={`usage-trend ${feature.trend}`}>
                        {feature.trend === "up" ? (
                          <FaChartLine className="trend-icon up" />
                        ) : feature.trend === "down" ? (
                          <FaChartLine className="trend-icon down" />
                        ) : (
                          <FaChartLine className="trend-icon stable" />
                        )}
                        {feature.trend === "up"
                          ? "Progression"
                          : feature.trend === "down"
                          ? "Déclin"
                          : "Stable"}
                      </span>
                    </div>
                  </div>
                  <div className="usage-progress-container">
                    <div className="usage-progress-bar">
                      <div
                        className="usage-progress-fill"
                        style={{
                          width: `${feature.usage}%`,
                          backgroundColor:
                            index === 0
                              ? "#4a6cf7"
                              : index === 1
                              ? "#34c759"
                              : index === 2
                              ? "#ff9500"
                              : `hsl(${220 + index * 30}, 70%, 60%)`,
                        }}
                      ></div>
                    </div>
                    <div className="usage-value">{feature.usage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCharts;
