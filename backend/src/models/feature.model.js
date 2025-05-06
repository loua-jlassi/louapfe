const db = require("../config/db");

class Feature {
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM features", (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM features WHERE id = ?",
        [id],
        (error, results) => {
          if (error) reject(error);
          resolve(results[0]);
        }
      );
    });
  }

  static async create(feature) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO features (name, description, status) VALUES (?, ?, ?)",
        [feature.name, feature.description, feature.status || "active"],
        (error, results) => {
          if (error) reject(error);
          resolve(results.insertId);
        }
      );
    });
  }

  static async update(id, feature) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE features SET name = ?, description = ?, status = ? WHERE id = ?",
        [feature.name, feature.description, feature.status, id],
        (error, results) => {
          if (error) reject(error);
          resolve(results.affectedRows > 0);
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM features WHERE id = ?", [id], (error, results) => {
        if (error) reject(error);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Feature;
