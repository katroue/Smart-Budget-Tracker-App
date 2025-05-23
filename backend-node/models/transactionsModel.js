const db = require('../db');

async function getAllTransactions(userId) {
    const [rows] = await db.execute(
        'SELECT * FROM transactions WHERE user_id = ?',
        [userId]
    );
    return rows;
}

// functions for transactions
async function createTransaction(userId, type, category, amount, date) {
  const [result] = await db.execute(
    'INSERT INTO transactions (user_id, type, category, amount, date) VALUES (?, ?, ?, ?, ?)',
    [userId, type, category, amount, date]
  );
  return result.insertId;
}

module.exports = {
    // function names
    createTransaction,
    getAllTransactions,
};