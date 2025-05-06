const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Import des routes
const featureRoutes = require("./src/routes/feature.routes");
const versionRoutes = require("./src/routes/version.routes");
const projectRoutes = require("./src/routes/project.routes");
const projectFeatureRoutes = require("./src/routes/projectFeature.routes");
const deployedRoutes = require("./src/routes/deployed.routes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API Feature Catalog" });
});

// Route de test
app.get("/test", (req, res) => {
  res.json({ message: "Test réussi ! Le serveur fonctionne correctement." });
});

// Utilisation des routes
app.use("/api/features", featureRoutes);
app.use("/api", versionRoutes);
app.use("/api", projectRoutes);
app.use("/api", projectFeatureRoutes);
app.use("/api", deployedRoutes);

// Port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
