const db = require('../db');

async function register(username, email, passwordHash) {
    const [result] = await db.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, passwordHash]
    );
    return [result];
}

async function getPasswordHash(username) {
    const [rows] = await db.execute(
        'SELECT password_hash FROM users WHERE username = ?',
        [username]
    );
    return rows.length ? rows[0].password_hash : null;
}

async function deleteUser(username) {
  const [result] = await db.execute(
    'DELETE FROM users WHERE username = ?',
    [username]
  );
  return result.affectedRows;   // 0 = not found, 1 = deleted
}
    
async function modifyPassword(username, newPassword) {
    await db.execute(
        'UPDATE users SET password_hash = ? WHERE username = ?',
        [newPassword, username]
    );
}

module.exports = {
    // function names
    register,
    getPasswordHash,
    deleteUser,
    modifyPassword,
};