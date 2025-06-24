// controllers/loginController.js
const bcrypt = require('bcrypt'); // to hash passwords
// controllers/loginController.js
const UserModel = require('../models/authModel');  // ← même nom, même casse

// POST /api/auth/register
// controllers/authController.js
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const hash   = await bcrypt.hash(password, 12);
    const result = await UserModel.register(username, email, hash);

    return res.status(201).json({
      id: result.insertId,
      username,
      email
    });
  } catch (err) {
    /* duplicate key → 1062 */
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'User already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  const hash = await UserModel.getPasswordHash(username);
  if (!hash) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  // issue JWT, set cookie, etc.
  res.json({ message: 'Login OK' });
};

exports.delete = async (req, res) => {
  const { username, password } = req.body;

  const hash = await UserModel/UserModel.getPasswordHash(username);
  if (!hash) return res.status(401).json({ error: 'Invalid credentials' });

  // checking to see if the password is correct
  const ok = await bcrypt.compare(password, hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  
  const rows = await UserModel.deleteUser(username);
  if (!rows) return res.status(404).json({ error: 'User not found' }); // checking to see if the user exists

  res.json({message : 'Account succesfully deleted' }); // if yes, deletes
};

exports.modify = async (req, res) => {
  const { username, oldPassword, newPassord } = req.body;

  const hash = await UserModel/UserModel.getPasswordHash(username);
  if (!hash) return res.status(401).json({ error: 'Invalid credentials' });

  // checking to see if the password is correct
  const ok = await bcrypt.compare(oldPassword, hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  await UserModel.modifyPassword(username, newPassord);

  res.json({message : 'Password successfully changed' });
}
