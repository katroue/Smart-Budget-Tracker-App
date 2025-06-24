const db = require('../db');

async function createBudget(userId, category, period, limit_amount, start_month) {
    await db.execute(
        'INSERT INTO budget (userId, category, period, limit_amount, start_month) VALUES ?, ?, ?, ?, ?',
        [userId, category, period, limit_amount, start_month]
    );
}

async function getBudget(user_id, category, period) {
    const [rows] = await db.execute(
        'SELECT * FROM budget WHERE user_id = ? AND category = ? AND period = ?',
        [user_id, category, period]
    );
    return rows.length ? rows[0] : null;
}

async function getAllBudgets(user_id) {
    const [rows] = await db.execute(
        'SELECT * FROM budget WHERE user_id = ?',
        [user_id]
    );
    return rows.length ? [rows] : null;
}

async function deleteBudget(user_id, category) {
    const [result] = await db.execute(
        'DELETE * FROM budget WHERE user_id = ? AND category = ?',
        [user_id, category]
    );
    return result.affectedRows;
}

async function modifyLimitAmount(user_id, category, limit_amount) {
    const [result] = await db.execute(
        'UPDATE budget SET limit_amount = ? WHERE user_id = ? AND category = ?',
        [limit_amount, user_id, category]
    );
    return result.affectedRows;
}

module.exports = {
    createBudget,
    getBudget,
    getAllBudgets,
    deleteBudget,
    modifyLimitAmount,
};