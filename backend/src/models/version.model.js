const db = require("../config/db");

class Version {
  static async getAllByFeature(featureId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM versions WHERE feature_id = ?",
        [featureId],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM versions WHERE id = ?",
        [id],
        (error, results) => {
          if (error) reject(error);
          resolve(results[0]);
        }
      );
    });
  }

  static async create(featureId, version) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO versions (feature_id, version_number, description, status, release_date) VALUES (?, ?, ?, ?, ?)",
        [
          featureId,
          version.version_number,
          version.description,
          version.status || "active",
          version.release_date,
        ],
        (error, results) => {
          if (error) reject(error);
          resolve(results.insertId);
        }
      );
    });
  }

  static async update(id, version) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE versions SET version_number = ?, description = ?, status = ?, release_date = ? WHERE id = ?",
        [
          version.version_number,
          version.description,
          version.status,
          version.release_date,
          id,
        ],
        (error, results) => {
          if (error) reject(error);
          resolve(results.affectedRows > 0);
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM versions WHERE id = ?", [id], (error, results) => {
        if (error) reject(error);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Version;
