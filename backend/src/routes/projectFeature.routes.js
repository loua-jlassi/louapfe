const express = require("express");
const router = express.Router();
const projectFeatureController = require("../controllers/projectFeature.controller");

// Ajouter une fonctionnalité/version à un projet
router.post(
  "/projects/:projectId/features",
  projectFeatureController.addFeatureToProject
);

// Lister les fonctionnalités d'un projet
router.get(
  "/projects/:projectId/features",
  projectFeatureController.getFeaturesByProject
);

module.exports = router;
