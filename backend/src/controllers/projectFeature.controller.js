const ProjectFeature = require("../models/projectFeature.model");

// Ajouter une fonctionnalité/version à un projet
exports.addFeatureToProject = async (req, res) => {
  try {
    const { featureId, versionId } = req.body;
    const { projectId } = req.params;
    const id = await ProjectFeature.addFeatureToProject(
      projectId,
      featureId,
      versionId
    );
    res.status(201).json({ message: "Fonctionnalité ajoutée au projet", id });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de l'ajout de la fonctionnalité au projet",
        error: error.message,
      });
  }
};

// Lister les fonctionnalités d'un projet
exports.getFeaturesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const features = await ProjectFeature.getFeaturesByProject(projectId);
    res.status(200).json(features);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des fonctionnalités du projet",
        error: error.message,
      });
  }
};
