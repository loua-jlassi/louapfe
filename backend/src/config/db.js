const mysql = require("mysql2");
const dbConfig = require("./db.config");

// Création de la connexion
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

// Connexion à la base de données
connection.connect((error) => {
  if (error) {
    console.error("Erreur de connexion à la base de données:", error);
    return;
  }
  console.log("Connecté à la base de données MySQL.");
});

module.exports = connection;
