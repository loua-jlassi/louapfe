const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { body } = require("express-validator");

// Lister tous les projets
router.get("/projects", projectController.getAll);

// Détail d'un projet
router.get("/projects/:id", projectController.getById);

// Créer un projet
router.post(
  "/projects",
  [
    body("name").notEmpty().withMessage("Le nom du projet est obligatoire"),
    body("package_name")
      .notEmpty()
      .withMessage("Le package name est obligatoire"),
    body("spring_version")
      .notEmpty()
      .withMessage("La version Spring est obligatoire"),
    body("description")
      .optional()
      .isString()
      .withMessage("La description doit être une chaîne de caractères"),
  ],
  projectController.create
);

// Modifier un projet
router.put("/projects/:id", projectController.update);

// Supprimer un projet
router.delete("/projects/:id", projectController.delete);

module.exports = router;
