const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  // user_id (FK a users)
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // account_id (FK a accounts)
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // type (Gasto o Ingreso)
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // category (Ej: "Alimentos", "Transporte", "Suscripción", ...)
  category: {
    type: DataTypes.STRING
  },
  // amount
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  // date
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  // description
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Transaction;
