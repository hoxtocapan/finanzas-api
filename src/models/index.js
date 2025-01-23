// src/models/index.js
const User = require('./User');
const Account = require('./Account');
const Transaction = require('./Transaction');

// Un user tiene muchas transacciones
User.hasMany(Transaction, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Una cuenta tiene muchas transacciones
Account.hasMany(Transaction, { foreignKey: 'account_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Account, { foreignKey: 'account_id', onDelete: 'CASCADE' });

module.exports = {
  User,
  Account,
  Transaction
};
