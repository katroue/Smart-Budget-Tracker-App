const TransactionModel = require('../models/transactionsModel');

// GET /api/transactions
exports.getAllTransactions = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const rows = await TransactionModel.getAllTransactions(userId);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// POST /api/transactions
exports.createTransaction = async (req, res) => {
  const { type, category, amount, date } = req.body;
  const userId = req.user?.id; // Get the user ID from authenticated request // to do with login

  if (!type || !category || !amount || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transID = await TransactionModel.createTransaction(userId, type, category, amount, date);
    res.status(201).json({ id: transId, user_id: userId, type, category, amount, date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};
