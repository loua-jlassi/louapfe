const Version = require("../models/version.model");
const { validationResult } = require("express-validator");

// Lister toutes les versions d'une fonctionnalité
exports.getAllByFeature = async (req, res) => {
  try {
    const versions = await Version.getAllByFeature(req.params.featureId);
    res.status(200).json(versions);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des versions",
      error: error.message,
    });
  }
};

// Détail d'une version
exports.getById = async (req, res) => {
  try {
    const version = await Version.getById(req.params.id);
    if (!version)
      return res.status(404).json({ message: "Version non trouvée" });
    res.status(200).json(version);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la version",
      error: error.message,
    });
  }
};

// Créer une version
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const versionId = await Version.create(req.params.featureId, req.body);
    res.status(201).json({ message: "Version créée", id: versionId });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la version",
      error: error.message,
    });
  }
};

// Modifier une version
exports.update = async (req, res) => {
  try {
    const success = await Version.update(req.params.id, req.body);
    if (!success)
      return res.status(404).json({ message: "Version non trouvée" });
    res.status(200).json({ message: "Version mise à jour" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

// Supprimer une version
exports.delete = async (req, res) => {
  try {
    const success = await Version.delete(req.params.id);
    if (!success)
      return res.status(404).json({ message: "Version non trouvée" });
    res.status(200).json({ message: "Version supprimée" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression", error: error.message });
  }
};
