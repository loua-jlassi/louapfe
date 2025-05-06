const express = require("express");
const router = express.Router();
const versionController = require("../controllers/version.controller");
const { body } = require("express-validator");

// Lister toutes les versions d'une fonctionnalité
router.get("/features/:featureId/versions", versionController.getAllByFeature);

// Ajouter une version à une fonctionnalité
router.post(
  "/features/:featureId/versions",
  [
    body("version_number")
      .notEmpty()
      .withMessage("Le numéro de version est obligatoire"),
    body("description")
      .isString()
      .withMessage("La description doit être une chaîne de caractères"),
    body("status")
      .optional()
      .isIn(["active", "deprecated"])
      .withMessage('Le statut doit être "active" ou "deprecated"'),
    body("release_date")
      .optional()
      .isISO8601()
      .withMessage("La date de release doit être une date valide (YYYY-MM-DD)"),
  ],
  versionController.create
);

// Détail d'une version
router.get("/versions/:id", versionController.getById);

// Modifier une version
router.put("/versions/:id", versionController.update);

// Supprimer une version
router.delete("/versions/:id", versionController.delete);

module.exports = router;
