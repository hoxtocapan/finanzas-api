const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionsController');

// Proteger todas las rutas con authMiddleware
router.use(authMiddleware);

// POST /transactions -> crear transacción
router.post('/', createTransaction);

// GET /transactions -> listar todas las transacciones del usuario
router.get('/', getTransactions);

// GET /transactions/:id -> obtener una transacción específica
router.get('/:id', getTransactionById);

// PUT /transactions/:id -> actualizar transacción
router.put('/:id', updateTransaction);

// DELETE /transactions/:id -> eliminar transacción
router.delete('/:id', deleteTransaction);

module.exports = router;
