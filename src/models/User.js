const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  // id se auto-crea con SERIAL si no lo configuras
  // pero puedes personalizarlo con un { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'users',         // Asegúrate que coincida con tu tabla
  timestamps: true,           // Para createdAt, updatedAt
  createdAt: 'created_at',    // si prefieres, renombra las columnas
  updatedAt: 'updated_at'
});

module.exports = User;
