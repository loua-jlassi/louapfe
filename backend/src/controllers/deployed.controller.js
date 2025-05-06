const db = require("../config/db");

// Récupérer toutes les fonctionnalités et versions actives
exports.getDeployed = async (req, res) => {
  try {
    const query = `
      SELECT f.id AS feature_id, f.name AS feature_name, f.description AS feature_description,
             v.id AS version_id, v.version_number, v.status AS version_status, v.release_date
      FROM features f
      LEFT JOIN versions v ON v.feature_id = f.id
      WHERE f.status = 'active' AND (v.status = 'active' OR v.status IS NULL)
      ORDER BY f.name, v.version_number
    `;
    db.query(query, (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({
            message:
              "Erreur lors de la récupération des fonctionnalités déployées",
            error: error.message,
          });
      }
      // Regrouper par feature
      const deployed = {};
      results.forEach((row) => {
        if (!deployed[row.feature_id]) {
          deployed[row.feature_id] = {
            id: row.feature_id,
            name: row.feature_name,
            description: row.feature_description,
            versions: [],
          };
        }
        if (row.version_id) {
          deployed[row.feature_id].versions.push({
            id: row.version_id,
            version_number: row.version_number,
            status: row.version_status,
            release_date: row.release_date,
          });
        }
      });
      res.json(Object.values(deployed));
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
