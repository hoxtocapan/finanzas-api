const { Transaction, Account } = require('../models'); 
// Si tienes un index.js con { Transaction, Account }, úsalo. 
// Si no, importa cada modelo por separado: 
// const Transaction = require('../models/Transaction');
// const Account = require('../models/Account');

async function createTransaction(req, res) {
  try {
    const userId = req.user.userId;  // tomado del token en authMiddleware
    const { account_id, type, category, amount, date, description } = req.body;

    // Verificar que la cuenta pertenezca al usuario
    const account = await Account.findOne({
      where: {
        id: account_id,
        user_id: userId
      }
    });
    if (!account) {
      return res.status(404).json({ message: 'La cuenta no existe o no pertenece al usuario' });
    }

    // Crear la transacción
    const transaction = await Transaction.create({
      user_id: userId,
      account_id,
      type,
      category,
      amount,
      date: date || new Date(), // si no viene date, pon fecha actual
      description
    });

    return res.status(201).json({
      message: 'Transacción creada con éxito',
      transaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la transacción' });
  }
}

async function getTransactions(req, res) {
  try {
    const userId = req.user.userId;

    // Opcional: filtrar por query params (p.e. por cuenta, por fecha, etc.)
    // Por ejemplo: ?account_id=1
    const { account_id } = req.query;

    const whereClause = { user_id: userId };
    if (account_id) {
      whereClause.account_id = account_id;
    }

    const transactions = await Transaction.findAll({ 
      where: whereClause,
      order: [['date', 'DESC']] // ordenar las más recientes primero, opcional
    });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener transacciones' });
  }
}

async function getTransactionById(req, res) {
  try {
    const userId = req.user.userId;
    const transactionId = req.params.id;

    const transaction = await Transaction.findOne({
      where: {
        id: transactionId,
        user_id: userId
      }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la transacción' });
  }
}

async function updateTransaction(req, res) {
  try {
    const userId = req.user.userId;
    const transactionId = req.params.id;
    const { account_id, type, category, amount, date, description } = req.body;

    // 1. Buscar la transacción
    const transaction = await Transaction.findOne({
      where: {
        id: transactionId,
        user_id: userId
      }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    // 2. Si el usuario desea cambiar de cuenta, verificar que sea una cuenta suya
    if (account_id && account_id !== transaction.account_id) {
      const account = await Account.findOne({
        where: {
          id: account_id,
          user_id: userId
        }
      });
      if (!account) {
        return res.status(404).json({ message: 'La cuenta no existe o no pertenece al usuario' });
      }
      transaction.account_id = account_id;
    }

    // 3. Actualizar otros campos
    if (type !== undefined) transaction.type = type;
    if (category !== undefined) transaction.category = category;
    if (amount !== undefined) transaction.amount = amount;
    if (date !== undefined) transaction.date = date;
    if (description !== undefined) transaction.description = description;

    // 4. Guardar cambios
    await transaction.save();

    return res.status(200).json({
      message: 'Transacción actualizada correctamente',
      transaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la transacción' });
  }
}

async function deleteTransaction(req, res) {
  try {
    const userId = req.user.userId;
    const transactionId = req.params.id;

    const transaction = await Transaction.findOne({
      where: {
        id: transactionId,
        user_id: userId
      }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    await transaction.destroy();
    return res.status(200).json({ message: 'Transacción eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la transacción' });
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};
