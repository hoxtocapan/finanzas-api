const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount
} = require('../controllers/accountsController');

// Aplica authMiddleware a todas las rutas de cuentas
router.use(authMiddleware);

// POST /accounts (crear cuenta)
router.post('/', createAccount);

// GET /accounts (listar todas las cuentas del usuario)
router.get('/', getAccounts);

// GET /accounts/:id (obtener una cuenta específica)
router.get('/:id', getAccountById);

// PUT /accounts/:id (actualizar cuenta)
router.put('/:id', updateAccount);

// DELETE /accounts/:id (eliminar cuenta)
router.delete('/:id', deleteAccount);

module.exports = router;
