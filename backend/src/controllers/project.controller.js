const Project = require("../models/project.model");
const { validationResult } = require("express-validator");

// Lister tous les projets
exports.getAll = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des projets",
      error: error.message,
    });
  }
};

// Détail d'un projet
exports.getById = async (req, res) => {
  try {
    const project = await Project.getById(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du projet",
      error: error.message,
    });
  }
};

// Créer un projet
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const projectId = await Project.create(req.body);
    res.status(201).json({ message: "Projet créé", id: projectId });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du projet",
      error: error.message,
    });
  }
};

// Modifier un projet
exports.update = async (req, res) => {
  try {
    const success = await Project.update(req.params.id, req.body);
    if (!success) return res.status(404).json({ message: "Projet non trouvé" });
    res.status(200).json({ message: "Projet mis à jour" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

// Supprimer un projet
exports.delete = async (req, res) => {
  try {
    const success = await Project.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Projet non trouvé" });
    res.status(200).json({ message: "Projet supprimé" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression", error: error.message });
  }
};
