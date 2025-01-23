const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const sequelize = require('./config/database');

// Rutas
const authRoutes = require('./routes/auth');
const accountsRoutes = require('./routes/accounts');
const transactionsRoutes = require('./routes/transactions');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de cuentas
app.use('/accounts', accountsRoutes);

// Rutas de transacciones
app.use('/transactions', transactionsRoutes);

// Probar conexión a la BD
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la BD exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a la BD:', error);
  });

// Sincronizar modelos
sequelize.sync().then(() => {
  console.log('Sequelize models synchronized');
});

module.exports = app;
