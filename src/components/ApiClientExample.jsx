import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaSpinner, FaCode, FaExclamationTriangle } from "react-icons/fa";
import "../styles/ApiClientExample.css";

const ApiClientExample = () => {
  const { darkMode } = useTheme();
  const [endpoint, setEndpoint] = useState("/api/users");
  const [method, setMethod] = useState("GET");
  const [payload, setPayload] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNotice, setShowNotice] = useState(true);

  // Exemples de requêtes prédéfinies
  const requestExamples = {
    "GET /api/users": {
      method: "GET",
      endpoint: "/api/users",
      payload: "",
    },
    "GET /api/features": {
      method: "GET",
      endpoint: "/api/features",
      payload: "",
    },
    "POST /api/users": {
      method: "POST",
      endpoint: "/api/users",
      payload: JSON.stringify(
        {
          name: "Nouveau Utilisateur",
          email: "nouveau@example.com",
          password: "MotDePasse123",
          accountType: "free",
        },
        null,
        2
      ),
    },
    "GET /api/analytics/users": {
      method: "GET",
      endpoint: "/api/analytics/users",
      payload: JSON.stringify(
        {
          startDate: "2023-07-01",
          endDate: "2023-07-31",
        },
        null,
        2
      ),
    },
  };

  // Fonction qui simule un appel API
  const mockApiCall = async () => {
    setLoading(true);
    setError(null);

    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Réponses "mock" basées sur l'endpoint
      const mockResponses = {
        "/api/users": {
          GET: [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              accountType: "premium",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane@example.com",
              accountType: "free",
            },
          ],
          POST: {
            id: 3,
            name: "Nouveau Utilisateur",
            email: "nouveau@example.com",
            accountType: "free",
            createdAt: new Date().toISOString(),
          },
        },
        "/api/features": {
          GET: [
            {
              id: 1,
              title: "Analyse de Données",
              description: "Outils avancés d'analyse",
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
        },
        "/api/analytics/users": {
          GET: {
            totalUsers: 1250,
            newUsers: 125,
            activeUsers: 980,
            premiumUsers: 420,
            userGrowth: 10.5,
            dailyActiveUsers: [
              { date: "2023-07-01", count: 750 },
              { date: "2023-07-02", count: 780 },
            ],
          },
        },
      };

      // Si nous avons une réponse mockée pour cet endpoint et méthode
      if (mockResponses[endpoint] && mockResponses[endpoint][method]) {
        setResponse(mockResponses[endpoint][method]);
      } else {
        // Sinon, simuler une erreur 404
        throw new Error("Endpoint non trouvé");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleSelect = (exampleKey) => {
    const example = requestExamples[exampleKey];
    setMethod(example.method);
    setEndpoint(example.endpoint);
    setPayload(example.payload);
  };

  return (
    <div className={`api-client ${darkMode ? "dark" : "light"}`}>
      <div className="api-client-header">
        <h2>
          <FaCode /> Client API Exemple
        </h2>
        <p>
          Cet exemple montre comment les futurs appels d'API pourraient être
          implémentés dans votre application.
        </p>
      </div>

      {showNotice && (
        <div className="api-notice">
          <FaExclamationTriangle /> <strong>Note:</strong> Ceci est un exemple
          de simulation. Les appels à l'API réelle seront disponibles lorsque le
          backend sera implémenté.
          <button onClick={() => setShowNotice(false)}>Fermer</button>
        </div>
      )}

      <div className="api-client-container">
        <div className="api-request-panel">
          <h3>Requête</h3>

          <div className="example-selector">
            <label>Exemples prédéfinis :</label>
            <select onChange={(e) => handleExampleSelect(e.target.value)}>
              <option value="">-- Sélectionner un exemple --</option>
              {Object.keys(requestExamples).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Méthode :</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div className="form-group">
            <label>Endpoint :</label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/resource"
            />
          </div>

          <div className="form-group">
            <label>Payload (pour POST/PUT) :</label>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              placeholder="Entrez les données JSON ici..."
              disabled={method === "GET" || method === "DELETE"}
            />
          </div>

          <button
            className="send-button"
            onClick={mockApiCall}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" /> Envoi en cours...
              </>
            ) : (
              "Envoyer la requête"
            )}
          </button>
        </div>

        <div className="api-response-panel">
          <h3>Réponse</h3>
          {loading ? (
            <div className="loading-container">
              <FaSpinner className="spinner" />
              <p>Chargement de la réponse...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          ) : response ? (
            <pre className="response-data">
              {JSON.stringify(response, null, 2)}
            </pre>
          ) : (
            <div className="empty-response">
              <p>
                Aucune réponse. Cliquez sur "Envoyer la requête" pour tester.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="api-client-footer">
        <h4>Comment utiliser cette API dans votre code</h4>
        <pre className="code-example">
          <code>{`
// Fonction pour appeler l'API
async function callApi(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${localStorage.getItem('authToken')}\`
      }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(\`/api\${endpoint}\`, options);
    
    if (!response.ok) {
      throw new Error(\`Erreur \${response.status}: \${response.statusText}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}
          `}</code>
        </pre>
      </div>
    </div>
  );
};

export default ApiClientExample;
