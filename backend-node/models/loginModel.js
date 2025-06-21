const db = require('../db');

async function createUser(username, email, passwordHash) {
    consut [result] = await db.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, passwordHash]
    );
    return result;
}

module.exports = {
    // function names
    createUser,
};