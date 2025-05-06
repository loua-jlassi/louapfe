const Feature = require("../models/feature.model");
const { validationResult } = require("express-validator");

// Récupérer toutes les fonctionnalités
exports.getAll = async (req, res) => {
  try {
    const features = await Feature.getAll();
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des fonctionnalités",
      error: error.message,
    });
  }
};

// Récupérer une fonctionnalité par son ID
exports.getById = async (req, res) => {
  try {
    const feature = await Feature.getById(req.params.id);
    if (!feature) {
      return res.status(404).json({ message: "Fonctionnalité non trouvée" });
    }
    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la fonctionnalité",
      error: error.message,
    });
  }
};

// Créer une nouvelle fonctionnalité
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const featureId = await Feature.create(req.body);
    res.status(201).json({
      message: "Fonctionnalité créée avec succès",
      id: featureId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la fonctionnalité",
      error: error.message,
    });
  }
};

// Mettre à jour une fonctionnalité
exports.update = async (req, res) => {
  try {
    const success = await Feature.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: "Fonctionnalité non trouvée" });
    }
    res.status(200).json({ message: "Fonctionnalité mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la fonctionnalité",
      error: error.message,
    });
  }
};

// Supprimer une fonctionnalité
exports.delete = async (req, res) => {
  try {
    const success = await Feature.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Fonctionnalité non trouvée" });
    }
    res.status(200).json({ message: "Fonctionnalité supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la fonctionnalité",
      error: error.message,
    });
  }
};
