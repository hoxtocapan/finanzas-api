const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,            // Nombre de la BD
  process.env.DB_USER,            // Usuario
  process.env.DB_PASSWORD,        // Contraseña
  {
    host: process.env.DB_HOST,    // Host
    dialect: 'postgres',
    port: process.env.DB_PORT,    // Puerto
    logging: false,
  }
);

module.exports = sequelize;
