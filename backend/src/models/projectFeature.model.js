const db = require("../config/db");

class ProjectFeature {
  static async addFeatureToProject(projectId, featureId, versionId) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO project_features (project_id, feature_id, version_id) VALUES (?, ?, ?)",
        [projectId, featureId, versionId],
        (error, results) => {
          if (error) reject(error);
          resolve(results.insertId);
        }
      );
    });
  }

  static async getFeaturesByProject(projectId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM project_features WHERE project_id = ?",
        [projectId],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}

module.exports = ProjectFeature;
