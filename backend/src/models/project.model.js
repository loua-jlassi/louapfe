const db = require("../config/db");

class Project {
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM projects", (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM projects WHERE id = ?",
        [id],
        (error, results) => {
          if (error) reject(error);
          resolve(results[0]);
        }
      );
    });
  }

  static async create(project) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO projects (name, package_name, spring_version, description) VALUES (?, ?, ?, ?)",
        [
          project.name,
          project.package_name,
          project.spring_version,
          project.description,
        ],
        (error, results) => {
          if (error) reject(error);
          resolve(results.insertId);
        }
      );
    });
  }

  static async update(id, project) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE projects SET name = ?, package_name = ?, spring_version = ?, description = ? WHERE id = ?",
        [
          project.name,
          project.package_name,
          project.spring_version,
          project.description,
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
      db.query("DELETE FROM projects WHERE id = ?", [id], (error, results) => {
        if (error) reject(error);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Project;
