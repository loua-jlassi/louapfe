import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaPlus, FaTrash, FaInfoCircle, FaSave, FaUndo } from "react-icons/fa";
import { select } from "d3-selection";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
} from "d3-force";
import { drag } from "d3-drag";
import "../styles/DependencyVisualization.css";

const DependencyVisualization = () => {
  const { darkMode } = useTheme();
  const [modules, setModules] = useState([
    { id: 1, name: "Module Principal", type: "core" },
    { id: 2, name: "Authentification", type: "security" },
    { id: 3, name: "Gestion des Utilisateurs", type: "core" },
    { id: 4, name: "Gestion des Fonctionnalités", type: "feature" },
    { id: 5, name: "Analytique", type: "analytics" },
    { id: 6, name: "Notifications", type: "communication" },
    { id: 7, name: "Export de Données", type: "utility" },
    { id: 8, name: "Générateur de Rapports", type: "analytics" },
  ]);

  const [dependencies, setDependencies] = useState([
    { source: 1, target: 2, strength: "high" },
    { source: 1, target: 3, strength: "high" },
    { source: 1, target: 4, strength: "high" },
    { source: 3, target: 2, strength: "medium" },
    { source: 4, target: 3, strength: "low" },
    { source: 5, target: 3, strength: "medium" },
    { source: 5, target: 4, strength: "medium" },
    { source: 6, target: 2, strength: "medium" },
    { source: 6, target: 3, strength: "low" },
    { source: 7, target: 5, strength: "high" },
    { source: 8, target: 5, strength: "high" },
    { source: 8, target: 7, strength: "medium" },
  ]);

  const [newModule, setNewModule] = useState({ name: "", type: "core" });
  const [newDependency, setNewDependency] = useState({
    source: "",
    target: "",
    strength: "medium",
  });
  const [selectedModule, setSelectedModule] = useState(null);
  const [impactAnalysis, setImpactAnalysis] = useState(null);
  const [backupState, setBackupState] = useState(null);
  const [simulationMode, setSimulationMode] = useState(false);

  const svgRef = useRef();
  const tooltipRef = useRef();

  // Types de modules et leur couleur associée
  const moduleTypes = {
    core: { label: "Core", color: "#4e73df" },
    security: { label: "Sécurité", color: "#e74a3b" },
    feature: { label: "Fonctionnalité", color: "#1cc88a" },
    analytics: { label: "Analytique", color: "#f6c23e" },
    communication: { label: "Communication", color: "#36b9cc" },
    utility: { label: "Utilitaire", color: "#6f42c1" },
  };

  const strengthOptions = [
    { value: "low", label: "Faible", color: "#1cc88a" },
    { value: "medium", label: "Moyenne", color: "#f6c23e" },
    { value: "high", label: "Forte", color: "#e74a3b" },
  ];

  // Analyser l'impact de la suppression d'un module
  const analyzeImpact = (moduleId) => {
    const affectedModules = [];
    const affectedDependencies = [];

    // Trouver les dépendances directes
    dependencies.forEach((dep) => {
      if (dep.source === moduleId || dep.target === moduleId) {
        affectedDependencies.push(dep);
        const otherId = dep.source === moduleId ? dep.target : dep.source;
        if (!affectedModules.some((m) => m.id === otherId)) {
          const module = modules.find((m) => m.id === otherId);
          if (module) {
            affectedModules.push({
              ...module,
              impact: dep.source === moduleId ? "fournisseur" : "dépendant",
            });
          }
        }
      }
    });

    // Trouver les modules avec dépendances indirectes
    const findIndirectDependencies = (id, chain = []) => {
      const direct = dependencies.filter(
        (d) => d.source === id && !chain.includes(d.target)
      );

      direct.forEach((dep) => {
        if (
          !affectedModules.some((m) => m.id === dep.target) &&
          dep.target !== moduleId
        ) {
          const module = modules.find((m) => m.id === dep.target);
          if (module) {
            affectedModules.push({
              ...module,
              impact: "indirect",
            });
          }
          findIndirectDependencies(dep.target, [...chain, dep.target]);
        }
      });
    };

    findIndirectDependencies(moduleId);

    setImpactAnalysis({
      moduleId,
      moduleName: modules.find((m) => m.id === moduleId)?.name,
      affectedModules,
      affectedDependencies,
    });
  };

  // Démarrer une simulation de suppression
  const startSimulation = (moduleId) => {
    if (!backupState) {
      setBackupState({
        modules: [...modules],
        dependencies: [...dependencies],
      });
    }

    setSimulationMode(true);

    // Simuler la suppression du module
    const updatedDependencies = dependencies.filter(
      (dep) => dep.source !== moduleId && dep.target !== moduleId
    );

    setDependencies(updatedDependencies);
  };

  // Arrêter la simulation et restaurer l'état original
  const stopSimulation = () => {
    if (backupState) {
      setModules(backupState.modules);
      setDependencies(backupState.dependencies);
      setBackupState(null);
    }
    setSimulationMode(false);
    setImpactAnalysis(null);
  };

  // Appliquer les changements de la simulation
  const applySimulation = () => {
    setBackupState(null);
    setSimulationMode(false);
    setImpactAnalysis(null);

    // Si nous sommes en train de supprimer un module dans la simulation
    if (selectedModule) {
      const updatedModules = modules.filter((m) => m.id !== selectedModule);
      setModules(updatedModules);
      setSelectedModule(null);
    }
  };

  // Ajouter un nouveau module
  const addModule = () => {
    if (newModule.name.trim() === "") return;

    const newId =
      modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1;
    const moduleToAdd = {
      id: newId,
      name: newModule.name.trim(),
      type: newModule.type,
    };

    setModules([...modules, moduleToAdd]);
    setNewModule({ name: "", type: "core" });
  };

  // Ajouter une nouvelle dépendance
  const addDependency = () => {
    if (
      newDependency.source === "" ||
      newDependency.target === "" ||
      newDependency.source === newDependency.target
    ) {
      return;
    }

    // Vérifier si la dépendance crée un cycle
    if (
      checkForCycle(Number(newDependency.source), Number(newDependency.target))
    ) {
      alert("Cette dépendance créerait un cycle. Opération annulée.");
      return;
    }

    // Vérifier si la dépendance existe déjà
    const exists = dependencies.some(
      (d) =>
        d.source === Number(newDependency.source) &&
        d.target === Number(newDependency.target)
    );

    if (exists) {
      alert("Cette dépendance existe déjà");
      return;
    }

    const dependencyToAdd = {
      source: Number(newDependency.source),
      target: Number(newDependency.target),
      strength: newDependency.strength,
    };

    setDependencies([...dependencies, dependencyToAdd]);
    setNewDependency({ source: "", target: "", strength: "medium" });
  };

  // Vérifier si l'ajout d'une dépendance crée un cycle
  const checkForCycle = (source, target) => {
    // DFS pour trouver un chemin de target à source
    const visited = new Set();

    const dfs = (node) => {
      if (node === source) return true;
      if (visited.has(node)) return false;

      visited.add(node);

      for (const dep of dependencies) {
        if (dep.source === node) {
          if (dfs(dep.target)) return true;
        }
      }

      return false;
    };

    return dfs(target);
  };

  // Créer le graphique D3
  useEffect(() => {
    if (!svgRef.current || modules.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = 500;

    // Supprimer l'ancien graphique
    select(svgRef.current).selectAll("*").remove();

    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Créer les données pour D3
    const nodes = modules.map((m) => ({ ...m }));
    const links = dependencies.map((d) => ({
      source: nodes.findIndex((n) => n.id === d.source),
      target: nodes.findIndex((n) => n.id === d.target),
      strength: d.strength,
    }));

    // Couleurs pour les liens en fonction de leur force
    const linkColor = (d) => {
      const strength = strengthOptions.find((s) => s.value === d.strength);
      return strength ? strength.color : "#999";
    };

    // Créer la simulation de force
    const simulation = forceSimulation(nodes)
      .force("link", forceLink(links).distance(100))
      .force("charge", forceManyBody().strength(-300))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide().radius(50));

    // Dessiner les liens
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", linkColor)
      .attr("stroke-width", 2);

    // Créer les groupes de nœuds
    const node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        drag().on("start", dragStarted).on("drag", dragged).on("end", dragEnded)
      );

    // Ajouter les cercles pour les nœuds
    node
      .append("circle")
      .attr("r", 25)
      .attr("fill", (d) => moduleTypes[d.type]?.color || "#999")
      .attr("stroke", darkMode ? "#fff" : "#333")
      .attr("stroke-width", 1.5)
      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip)
      .on("click", selectModule);

    // Ajouter les labels pour les nœuds
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#fff")
      .text((d) => d.id);

    // Fonction pour gérer le glisser-déposer
    function dragStarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Fonctions pour l'infobulle
    function showTooltip(event, d) {
      const tooltip = select(tooltipRef.current);
      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 20 + "px")
        .style("display", "block").html(`
          <strong>${d.name}</strong><br/>
          Type: ${moduleTypes[d.type]?.label || d.type}<br/>
          ID: ${d.id}
        `);
    }

    function hideTooltip() {
      select(tooltipRef.current).style("display", "none");
    }

    // Fonction pour sélectionner un module
    function selectModule(event, d) {
      setSelectedModule(d.id);
      analyzeImpact(d.id);
    }

    // Mettre à jour les positions à chaque tick de la simulation
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [modules, dependencies, darkMode]);

  return (
    <div className={`dependency-visualization ${darkMode ? "dark" : "light"}`}>
      <div className="visualization-header">
        <h1>Visualisation des Dépendances entre Modules</h1>
        <p>
          Ce tableau de bord permet de visualiser et de gérer les dépendances
          entre les différents modules du système.
        </p>
      </div>

      <div className="visualization-container">
        <div className="graph-container">
          <div className="graph-legend">
            <h3>Légende</h3>
            <div className="legend-section">
              <h4>Types de Modules</h4>
              <div className="legend-items">
                {Object.entries(moduleTypes).map(([key, { label, color }]) => (
                  <div key={key} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="legend-section">
              <h4>Force des Dépendances</h4>
              <div className="legend-items">
                {strengthOptions.map(({ value, label, color }) => (
                  <div key={value} className="legend-item">
                    <span
                      className="legend-line"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="graph-visualization">
            <svg ref={svgRef}></svg>
            <div ref={tooltipRef} className="graph-tooltip"></div>

            {simulationMode && (
              <div className="simulation-controls">
                <button onClick={stopSimulation} className="btn-cancel">
                  <FaUndo /> Annuler
                </button>
                <button onClick={applySimulation} className="btn-apply">
                  <FaSave /> Appliquer
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="controls-container">
          <div className="add-module-section">
            <h3>Ajouter un Module</h3>
            <div className="form-group">
              <label>Nom du Module</label>
              <input
                type="text"
                value={newModule.name}
                onChange={(e) =>
                  setNewModule({ ...newModule, name: e.target.value })
                }
                placeholder="Nom du module"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={newModule.type}
                onChange={(e) =>
                  setNewModule({ ...newModule, type: e.target.value })
                }
              >
                {Object.entries(moduleTypes).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={addModule} className="btn-add">
              <FaPlus /> Ajouter le Module
            </button>
          </div>

          <div className="add-dependency-section">
            <h3>Ajouter une Dépendance</h3>
            <div className="form-group">
              <label>Module Source</label>
              <select
                value={newDependency.source}
                onChange={(e) =>
                  setNewDependency({ ...newDependency, source: e.target.value })
                }
              >
                <option value="">Sélectionnez un module</option>
                {modules.map((module) => (
                  <option key={`source-${module.id}`} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Module Cible</label>
              <select
                value={newDependency.target}
                onChange={(e) =>
                  setNewDependency({ ...newDependency, target: e.target.value })
                }
              >
                <option value="">Sélectionnez un module</option>
                {modules.map((module) => (
                  <option key={`target-${module.id}`} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Force de la Dépendance</label>
              <select
                value={newDependency.strength}
                onChange={(e) =>
                  setNewDependency({
                    ...newDependency,
                    strength: e.target.value,
                  })
                }
              >
                {strengthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={addDependency} className="btn-add">
              <FaPlus /> Ajouter la Dépendance
            </button>
          </div>
        </div>
      </div>

      {impactAnalysis && (
        <div className="impact-analysis">
          <h2>Analyse d'Impact</h2>
          <div className="impact-header">
            <p>
              <strong>Module :</strong> {impactAnalysis.moduleName} (ID:{" "}
              {impactAnalysis.moduleId})
            </p>
            {!simulationMode && (
              <button
                onClick={() => startSimulation(impactAnalysis.moduleId)}
                className="btn-simulate"
              >
                Simuler la suppression
              </button>
            )}
          </div>

          <div className="impact-details">
            <div className="affected-modules">
              <h3>
                Modules Affectés ({impactAnalysis.affectedModules.length})
              </h3>
              {impactAnalysis.affectedModules.length > 0 ? (
                <table className="impact-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Type</th>
                      <th>Relation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {impactAnalysis.affectedModules.map((module) => (
                      <tr key={module.id}>
                        <td>{module.id}</td>
                        <td>{module.name}</td>
                        <td>
                          {moduleTypes[module.type]?.label || module.type}
                        </td>
                        <td>
                          <span className={`impact-type ${module.impact}`}>
                            {module.impact === "fournisseur"
                              ? "Dépend de ce module"
                              : module.impact === "dépendant"
                              ? "Utilisé par ce module"
                              : "Dépendance indirecte"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-impact">Aucun module n'est affecté</p>
              )}
            </div>

            <div className="impact-summary">
              <h3>Résumé de l'Impact</h3>
              <div className="impact-metrics">
                <div className="metric">
                  <span className="metric-value">
                    {impactAnalysis.affectedModules.length}
                  </span>
                  <span className="metric-label">Modules Affectés</span>
                </div>
                <div className="metric">
                  <span className="metric-value">
                    {
                      impactAnalysis.affectedModules.filter(
                        (m) => m.impact === "fournisseur"
                      ).length
                    }
                  </span>
                  <span className="metric-label">Dépendent de ce module</span>
                </div>
                <div className="metric">
                  <span className="metric-value">
                    {
                      impactAnalysis.affectedModules.filter(
                        (m) => m.impact === "dépendant"
                      ).length
                    }
                  </span>
                  <span className="metric-label">Utilisés par ce module</span>
                </div>
                <div className="metric">
                  <span className="metric-value">
                    {
                      impactAnalysis.affectedModules.filter(
                        (m) => m.impact === "indirect"
                      ).length
                    }
                  </span>
                  <span className="metric-label">Impact Indirect</span>
                </div>
              </div>

              <div className="impact-recommendation">
                <h4>
                  <FaInfoCircle /> Recommandation
                </h4>
                {impactAnalysis.affectedModules.filter(
                  (m) => m.impact === "fournisseur"
                ).length > 0 ? (
                  <p className="warning">
                    La suppression de ce module affectera des modules qui en
                    dépendent. Il est recommandé de résoudre ces dépendances
                    avant de supprimer ce module.
                  </p>
                ) : (
                  <p className="success">
                    Ce module peut être supprimé sans affecter de dépendants
                    directs. Vérifiez tout de même les dépendances indirectes
                    avant de procéder.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modules-table">
        <h2>Liste des Modules</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr
                key={module.id}
                className={selectedModule === module.id ? "selected" : ""}
              >
                <td>{module.id}</td>
                <td>{module.name}</td>
                <td>{moduleTypes[module.type]?.label || module.type}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedModule(module.id);
                      analyzeImpact(module.id);
                    }}
                    className="btn-info"
                  >
                    <FaInfoCircle /> Analyser
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DependencyVisualization;
