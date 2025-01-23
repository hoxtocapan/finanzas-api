const Account = require('../models/Account');
const User = require('../models/User');

// Crear cuenta
async function createAccount(req, res) {
  try {
    const { name, type, balance } = req.body;
    const userId = req.user.userId;  // viene del token (authMiddleware)

    // Valida datos mínimos
    if (!name || !type) {
      return res.status(400).json({ message: 'Faltan datos de la cuenta' });
    }

    // Crear la cuenta asociada al usuario logueado
    const account = await Account.create({
        user_id: userId,   // IMPORTANTE para no insertar NULL
        name,
        type,
        balance: balance || 0
      });
      
    return res.status(201).json({
      message: 'Cuenta creada exitosamente',
      account
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear cuenta' });
  }
}

// Listar cuentas del usuario
async function getAccounts(req, res) {
  try {
    const userId = req.user.userId;

    // Traer todas las cuentas pertenecientes a este userId
    const accounts = await Account.findAll({
      where: { user_id: userId }
    });

    return res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cuentas' });
  }
}

// Obtener una cuenta por ID
async function getAccountById(req, res) {
  try {
    const userId = req.user.userId;
    const accountId = req.params.id;

    const account = await Account.findOne({
      where: {
        id: accountId,
        user_id: userId
      }
    });

    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }

    return res.status(200).json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cuenta' });
  }
}

// Actualizar cuenta
async function updateAccount(req, res) {
  try {
    const userId = req.user.userId;
    const accountId = req.params.id;
    const { name, type, balance } = req.body;

    // Verificamos si la cuenta existe y pertenece al usuario
    const account = await Account.findOne({
      where: {
        id: accountId,
        user_id: userId
      }
    });

    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada o no pertenece al usuario' });
    }

    // Actualiza los campos
    if (name !== undefined) account.name = name;
    if (type !== undefined) account.type = type;
    if (balance !== undefined) account.balance = balance;

    await account.save();

    return res.status(200).json({
      message: 'Cuenta actualizada correctamente',
      account
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar cuenta' });
  }
}

// Eliminar cuenta
async function deleteAccount(req, res) {
  try {
    const userId = req.user.userId;
    const accountId = req.params.id;

    const account = await Account.findOne({
      where: {
        id: accountId,
        user_id: userId
      }
    });

    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada o no pertenece al usuario' });
    }

    await account.destroy();
    return res.status(200).json({ message: 'Cuenta eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar cuenta' });
  }
}

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount
};
