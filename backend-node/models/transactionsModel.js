const db = require('../db');

async function getAllTransactions(userId) {
    const [rows] = await db.execute(
        'SELECT * FROM transactions WHERE user_id = ?',
        [userId]
    );
    return rows;
}

async function createTransaction(userId, type, category, amount, date) {
  const [result] = await db.execute(
    'INSERT INTO transactions (user_id, type, category, amount, date) VALUES (?, ?, ?, ?, ?)',
    [userId, type, category, amount, date]
  );
  return result.insertId;
}

async function updateTransaction(idTrans, type, category, amount) {
  cont [result] = await db.execute(
    'UPDATE transactions SET type = ?, category = ?, amount = ? WHERE id = ?',
    [type, category, amount, idTrans]
  );
  return result.affectedRows; // 0 (not found) or 1 (updated)
}

async function deleteTransaction(idTrans, userId) {
  const [result] = await db.execute(
    'DELETE FROM transactions WHERE id = ? AND WHERE = userId = ?',
    [idTrans, userId]
  );
  return result.affectedRows; // 0 (not found) or 1 (deleted)
}

async function getTransactionByCategory(userId, category) {
  const [rows] = await db.execute(
    'SELECT * FROM transactions WHERE userId = ? AND category = ?',
    [userId, category]
  );
  return rows;
}

module.exports = {
    // function names
    createTransaction,
    getAllTransactions,
    updateTransaction,
    deleteTransaction,
    getTransactionByCategory,
};