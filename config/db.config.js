require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root@localhost",
  PASSWORD: process.env.DB_PASSWORD || "foulou2025.",
  DB: process.env.DB_NAME || "feature_catalog",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
