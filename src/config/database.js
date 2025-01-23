const { Sequelize } = require('sequelize');

// Usando la URL de la base de datos directamente desde el archivo .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,            // Requiere SSL
      rejectUnauthorized: false // Opcional dependiendo de tu configuración de base de datos
    }
  }
});

module.exports = sequelize;
