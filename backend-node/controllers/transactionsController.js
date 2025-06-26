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
    const transId = await TransactionModel.createTransaction(userId, type, category, amount, date);
    res.status(201).json({ id: transId, user_id: userId, type, category, amount, date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

// PUT /api/transactions/:id -> update one transaction
exports.updateTransaction = async (req, res) => {
  const userId = req.user?.id;      // if you store the owner check in SQL
  const { id } = req.params;
  const { type, category, amount } = req.body;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!type || !category || amount === undefined)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    // you could add userId to the WHERE clause in the model for extra safety
    const rowsChanged = await TransactionModel.updateTransaction(
      id,
      type,
      category,
      amount
    );

    if (rowsChanged === 0) return res.status(404).json({ error: 'Not found' });

    return res.json({ message: 'Transaction updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /api/transactions/:id        → delete one transaction
exports.deleteTransaction = async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const rowsDeleted = await TransactionModel.deleteTransaction(id, userId);

    if (rowsDeleted === 0) return res.status(404).json({ error: 'Not found' });

    return res.status(204).end(); // No Content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET api/transactions/category/:cat
exports.getTransactionsByCategory = async (req, res) => {
  const userId = req.user?.id;
  const { cat } = req.params; // example route: /category/food

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const rows = await TransactionModel.getTransactionByCategory(userId, cat);
    return res.json(rows);           // could be [] if none
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};