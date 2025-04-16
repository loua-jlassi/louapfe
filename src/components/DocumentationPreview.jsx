import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import ReactMarkdown from "react-markdown";
import "./DocumentationPreview.css";
import { FaEye, FaCode, FaMarkdown, FaGitlab, FaCopy } from "react-icons/fa";

const DocumentationPreview = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("readme");
  const [readmeView, setReadmeView] = useState("preview"); // "preview" ou "source"
  const [projectName, setProjectName] = useState("Mon Projet");
  const [projectDescription, setProjectDescription] = useState(
    "Description du projet"
  );
  const [technologies, setTechnologies] = useState([
    "React",
    "Node.js",
    "Express",
  ]);
  const [installSteps, setInstallSteps] = useState([
    "npm install",
    "npm start",
  ]);
  const [gitlab, setGitlab] = useState({
    image: "node:14",
    stages: ["build", "test", "deploy"],
    cache: true,
    buildScript: "npm install && npm run build",
    testScript: "npm test",
    deployScript: 'echo "Deployment would happen here"',
  });

  // Générer le contenu README.md
  const generateReadme = () => {
    return `# ${projectName}

## Description
${projectDescription}

## Technologies utilisées
${technologies.map((tech) => `- ${tech}`).join("\n")}

## Installation
${installSteps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Utilisation
Après l'installation, l'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

## Contribuer
Les contributions sont les bienvenues ! Veuillez créer une pull request pour toute modification.

## Licence
MIT
`;
  };

  // Générer le contenu gitlab-ci.yml
  const generateGitlabCI = () => {
    return `image: ${gitlab.image}

stages:
${gitlab.stages.map((stage) => `  - ${stage}`).join("\n")}

cache:
  paths:
    - node_modules/

build:
  stage: build
  script:
    - ${gitlab.buildScript}
  artifacts:
    paths:
      - build/

test:
  stage: test
  script:
    - ${gitlab.testScript}

deploy:
  stage: deploy
  script:
    - ${gitlab.deployScript}
  only:
    - master
`;
  };

  const [readmeContent, setReadmeContent] = useState("");
  const [gitlabContent, setGitlabContent] = useState("");

  useEffect(() => {
    setReadmeContent(generateReadme());
    setGitlabContent(generateGitlabCI());
  }, [projectName, projectDescription, technologies, installSteps, gitlab]);

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    alert("Contenu copié dans le presse-papier !");
  };

  const toggleReadmeView = (view) => {
    setReadmeView(view);
  };

  return (
    <div
      className={`documentation-preview ${theme === "dark" ? "dark-mode" : ""}`}
    >
      <div className="doc-preview-header">
        <h1>Prévisualisation de Documentation</h1>
        <p>Visualisez comment vos fichiers de documentation seront générés</p>
      </div>

      <div className="doc-preview-content">
        <div className="doc-sidebar">
          <h2>Paramètres</h2>

          <div className="doc-form-group">
            <label>Nom du projet</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={theme === "dark" ? "dark-input" : ""}
            />
          </div>

          <div className="doc-form-group">
            <label>Description</label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className={theme === "dark" ? "dark-input" : ""}
              rows="3"
            />
          </div>

          <div className="doc-form-group">
            <label>Technologies (séparées par des virgules)</label>
            <input
              type="text"
              value={technologies.join(", ")}
              onChange={(e) =>
                setTechnologies(
                  e.target.value.split(",").map((tech) => tech.trim())
                )
              }
              className={theme === "dark" ? "dark-input" : ""}
            />
          </div>

          <div className="doc-form-group">
            <label>Étapes d'installation (séparées par des virgules)</label>
            <input
              type="text"
              value={installSteps.join(", ")}
              onChange={(e) =>
                setInstallSteps(
                  e.target.value.split(",").map((step) => step.trim())
                )
              }
              className={theme === "dark" ? "dark-input" : ""}
            />
          </div>

          <h3>Paramètres GitLab CI</h3>
          <div className="doc-form-group">
            <label>Image Docker</label>
            <input
              type="text"
              value={gitlab.image}
              onChange={(e) => setGitlab({ ...gitlab, image: e.target.value })}
              className={theme === "dark" ? "dark-input" : ""}
            />
          </div>

          <div className="doc-form-group">
            <label>Script de build</label>
            <input
              type="text"
              value={gitlab.buildScript}
              onChange={(e) =>
                setGitlab({ ...gitlab, buildScript: e.target.value })
              }
              className={theme === "dark" ? "dark-input" : ""}
            />
          </div>

          <div className="doc-form-group">
            <label>Script de test</label>
            <input
              type="text"
              value={gitlab.testScript}
              onChange={(e) =>
                setGitlab({ ...gitlab, testScript: e.target.value })
              }
              className={theme === "dark" ? "dark-input" : ""}
            />
          </div>

          <div className="doc-form-group">
            <label>Script de déploiement</label>
            <input
              type="text"
              value={gitlab.deployScript}
              onChange={(e) =>
                setGitlab({ ...gitlab, deployScript: e.target.value })
              }
              className={theme === "dark" ? "dark-input" : ""}
            />
          </div>
        </div>

        <div className="doc-preview-panel">
          <div className="doc-tabs">
            <button
              className={`doc-tab ${activeTab === "readme" ? "active" : ""}`}
              onClick={() => setActiveTab("readme")}
            >
              <FaMarkdown /> README.md
            </button>
            <button
              className={`doc-tab ${activeTab === "gitlab" ? "active" : ""}`}
              onClick={() => setActiveTab("gitlab")}
            >
              <FaGitlab /> gitlab-ci.yml
            </button>
          </div>

          {activeTab === "readme" && (
            <div className="doc-preview-container">
              <div className="doc-preview-actions">
                <button
                  className="doc-action-button"
                  onClick={() => copyToClipboard(readmeContent)}
                  title="Copier le contenu"
                >
                  <FaCopy /> Copier
                </button>
              </div>
              <div className="doc-view-tabs">
                <button
                  className={`doc-view-tab ${
                    readmeView === "preview" ? "active" : ""
                  }`}
                  onClick={() => toggleReadmeView("preview")}
                  title="Aperçu"
                >
                  <FaEye /> Aperçu
                </button>
                <button
                  className={`doc-view-tab ${
                    readmeView === "source" ? "active" : ""
                  }`}
                  onClick={() => toggleReadmeView("source")}
                  title="Code Source"
                >
                  <FaCode /> Source
                </button>
              </div>
              <div className="doc-preview-content-view">
                {readmeView === "preview" ? (
                  <div className="markdown-wrapper">
                    <ReactMarkdown
                      components={{
                        // Appliquer les styles aux composants Markdown
                        p: ({ node, ...props }) => (
                          <p className="markdown-preview-p" {...props} />
                        ),
                        h1: ({ node, ...props }) => (
                          <h1 className="markdown-preview-h1" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="markdown-preview-h2" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="markdown-preview-h3" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className="markdown-preview-ul" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="markdown-preview-li" {...props} />
                        ),
                        a: ({ node, ...props }) => (
                          <a className="markdown-preview-a" {...props} />
                        ),
                        code: ({ node, ...props }) => (
                          <code className="markdown-preview-code" {...props} />
                        ),
                      }}
                    >
                      {readmeContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <pre className="code-preview">{readmeContent}</pre>
                )}
              </div>
            </div>
          )}

          {activeTab === "gitlab" && (
            <div className="doc-preview-container">
              <div className="doc-preview-actions">
                <button
                  className="doc-action-button"
                  onClick={() => copyToClipboard(gitlabContent)}
                  title="Copier le contenu"
                >
                  <FaCopy /> Copier
                </button>
              </div>
              <div className="doc-view-tabs">
                <button
                  className="doc-view-tab active"
                  onClick={() => {}}
                  title="Source"
                >
                  <FaCode /> Source
                </button>
              </div>
              <div className="doc-preview-content-view">
                <pre className="code-preview">{gitlabContent}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentationPreview;
