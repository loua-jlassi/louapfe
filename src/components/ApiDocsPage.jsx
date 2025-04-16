import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaCode, FaCopy, FaCheckCircle, FaLaptopCode } from "react-icons/fa";
import "../styles/ApiDocsPage.css";
import ApiClientExample from "./ApiClientExample";

const ApiDocsPage = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("users");
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const [showClientExample, setShowClientExample] = useState(false);

  const copyToClipboard = (text, endpointId) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpointId);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  // Les endpoints API regroupés par catégorie
  const apiEndpoints = {
    users: [
      {
        id: "get-users",
        method: "GET",
        endpoint: "/api/users",
        description: "Récupère la liste de tous les utilisateurs",
        requestExample: "{}",
        responseExample: JSON.stringify(
          [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              accountType: "premium",
              createdAt: "2023-06-15T10:30:45Z",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane@example.com",
              accountType: "free",
              createdAt: "2023-07-22T14:15:30Z",
            },
          ],
          null,
          2
        ),
      },
      {
        id: "get-user",
        method: "GET",
        endpoint: "/api/users/{id}",
        description: "Récupère les détails d'un utilisateur spécifique",
        requestExample: "{}",
        responseExample: JSON.stringify(
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            accountType: "premium",
            createdAt: "2023-06-15T10:30:45Z",
            lastLogin: "2023-08-10T09:45:12Z",
            preferences: {
              notifications: true,
              theme: "dark",
            },
          },
          null,
          2
        ),
      },
      {
        id: "create-user",
        method: "POST",
        endpoint: "/api/users",
        description: "Crée un nouvel utilisateur",
        requestExample: JSON.stringify(
          {
            name: "New User",
            email: "newuser@example.com",
            password: "securepassword123",
            accountType: "free",
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            id: 3,
            name: "New User",
            email: "newuser@example.com",
            accountType: "free",
            createdAt: "2023-08-12T11:20:15Z",
          },
          null,
          2
        ),
      },
      {
        id: "update-user",
        method: "PUT",
        endpoint: "/api/users/{id}",
        description: "Met à jour les informations d'un utilisateur",
        requestExample: JSON.stringify(
          {
            name: "Updated Name",
            email: "updated@example.com",
            accountType: "premium",
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            id: 1,
            name: "Updated Name",
            email: "updated@example.com",
            accountType: "premium",
            createdAt: "2023-06-15T10:30:45Z",
            updatedAt: "2023-08-12T16:40:22Z",
          },
          null,
          2
        ),
      },
      {
        id: "delete-user",
        method: "DELETE",
        endpoint: "/api/users/{id}",
        description: "Supprime un utilisateur",
        requestExample: "{}",
        responseExample: JSON.stringify(
          {
            success: true,
            message: "User deleted successfully",
          },
          null,
          2
        ),
      },
    ],
    features: [
      {
        id: "get-features",
        method: "GET",
        endpoint: "/api/features",
        description: "Récupère la liste de toutes les fonctionnalités",
        requestExample: "{}",
        responseExample: JSON.stringify(
          [
            {
              id: 1,
              title: "Analyse de Données",
              description: "Outils avancés d'analyse de données",
              category: "analytics",
              isPremium: true,
            },
            {
              id: 2,
              title: "Notes Partagées",
              description: "Créer et partager des notes",
              category: "productivity",
              isPremium: false,
            },
          ],
          null,
          2
        ),
      },
      {
        id: "get-feature",
        method: "GET",
        endpoint: "/api/features/{id}",
        description: "Récupère les détails d'une fonctionnalité spécifique",
        requestExample: "{}",
        responseExample: JSON.stringify(
          {
            id: 1,
            title: "Analyse de Données",
            description: "Outils avancés d'analyse de données",
            category: "analytics",
            isPremium: true,
            details: {
              version: "2.1",
              releaseDate: "2023-05-10",
              dependencies: ["Database Module", "Chart Library"],
            },
          },
          null,
          2
        ),
      },
      {
        id: "create-feature",
        method: "POST",
        endpoint: "/api/features",
        description: "Crée une nouvelle fonctionnalité",
        requestExample: JSON.stringify(
          {
            title: "Nouvelle Fonctionnalité",
            description: "Description de la nouvelle fonctionnalité",
            category: "productivity",
            isPremium: false,
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            id: 3,
            title: "Nouvelle Fonctionnalité",
            description: "Description de la nouvelle fonctionnalité",
            category: "productivity",
            isPremium: false,
            createdAt: "2023-08-12T14:30:10Z",
          },
          null,
          2
        ),
      },
    ],
    analytics: [
      {
        id: "get-user-stats",
        method: "GET",
        endpoint: "/api/analytics/users",
        description:
          "Récupère les statistiques d'utilisation par les utilisateurs",
        requestExample: JSON.stringify(
          {
            startDate: "2023-07-01",
            endDate: "2023-07-31",
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            totalUsers: 1250,
            newUsers: 125,
            activeUsers: 980,
            premiumUsers: 420,
            userGrowth: 10.5,
            dailyActiveUsers: [
              { date: "2023-07-01", count: 750 },
              { date: "2023-07-02", count: 780 },
              // ... autres jours
            ],
          },
          null,
          2
        ),
      },
      {
        id: "get-feature-stats",
        method: "GET",
        endpoint: "/api/analytics/features",
        description:
          "Récupère les statistiques d'utilisation des fonctionnalités",
        requestExample: JSON.stringify(
          {
            startDate: "2023-07-01",
            endDate: "2023-07-31",
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            mostUsedFeatures: [
              { id: 1, title: "Analyse de Données", usageCount: 4250 },
              { id: 5, title: "Générateur de Rapports", usageCount: 3120 },
            ],
            featureUsageByCategory: {
              analytics: 7500,
              productivity: 5200,
              communication: 3800,
            },
            featureUsageByDay: [
              { date: "2023-07-01", count: 950 },
              { date: "2023-07-02", count: 1020 },
            ],
          },
          null,
          2
        ),
      },
    ],
  };

  return (
    <div className={`api-docs-container ${darkMode ? "dark" : "light"}`}>
      <div className="api-docs-header">
        <h1>
          <FaCode /> Documentation API
        </h1>
        <p>
          Cette page fournit la documentation pour l'API REST du projet. Vous
          trouverez ici tous les endpoints disponibles, leurs descriptions,
          exemples de requêtes et réponses.
        </p>
        <button
          className="toggle-example-btn"
          onClick={() => setShowClientExample(!showClientExample)}
        >
          <FaLaptopCode /> {showClientExample ? "Masquer" : "Afficher"}{" "}
          l'exemple de client API
        </button>
      </div>

      {showClientExample && <ApiClientExample />}

      <div className="api-tabs">
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Utilisateurs
        </button>
        <button
          className={activeTab === "features" ? "active" : ""}
          onClick={() => setActiveTab("features")}
        >
          Fonctionnalités
        </button>
        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          Analytiques
        </button>
      </div>

      <div className="api-endpoints">
        {apiEndpoints[activeTab].map((endpoint) => (
          <div key={endpoint.id} className="endpoint-card">
            <div className="endpoint-header">
              <span className={`method ${endpoint.method.toLowerCase()}`}>
                {endpoint.method}
              </span>
              <span className="endpoint-path">
                {endpoint.endpoint}
                <button
                  className="copy-btn"
                  onClick={() =>
                    copyToClipboard(endpoint.endpoint, endpoint.id)
                  }
                  title="Copier l'endpoint"
                >
                  {copiedEndpoint === endpoint.id ? (
                    <FaCheckCircle />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </span>
            </div>

            <div className="endpoint-description">{endpoint.description}</div>

            <div className="endpoint-examples">
              <div className="example-section">
                <h4>Exemple de Requête</h4>
                <pre className="code-block">
                  <code>{endpoint.requestExample}</code>
                </pre>
              </div>

              <div className="example-section">
                <h4>Exemple de Réponse</h4>
                <pre className="code-block">
                  <code>{endpoint.responseExample}</code>
                </pre>
              </div>
            </div>

            <div className="implementation-note">
              <p>
                <strong>Note d'implémentation :</strong> Cet endpoint sera
                disponible lorsque le backend sera implémenté. Pour l'instant,
                vous pouvez utiliser l'exemple de réponse pour développer
                l'interface utilisateur.
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="api-docs-footer">
        <h3>Comment utiliser ces API</h3>
        <p>Pour appeler ces API lorsqu'elles seront implémentées :</p>
        <ol>
          <li>
            Assurez-vous que le backend est en cours d'exécution à l'URL de base
          </li>
          <li>
            Utilisez l'URL de base + le chemin de l'endpoint pour construire vos
            requêtes
          </li>
          <li>
            Incluez les en-têtes appropriés (Content-Type: application/json)
          </li>
          <li>
            Pour les endpoints authentifiés, ajoutez un token JWT dans l'en-tête
            Authorization
          </li>
        </ol>

        <div className="code-example">
          <h4>Exemple de code pour appeler l'API :</h4>
          <pre className="code-block">
            <code>{`
// Exemple fetch en JavaScript
async function getUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${localStorage.getItem('authToken')}\`
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
            `}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPage;
