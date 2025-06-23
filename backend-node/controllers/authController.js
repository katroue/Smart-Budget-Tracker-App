// controllers/loginController.js
const bcrypt = require('bcrypt'); // to hash passwords
const UserModel = require('../models/authModel');   // adjusts to your path

// POST /api/auth/register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // 1) basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 2) hash the password (12 rounds is a good default)
    const hash = await bcrypt.hash(password, 12);

    // 3) call the model
    const [result] = await UserModel.register(username, email, hash);

    // MySQL returns { insertId, affectedRows, … }
    return res.status(201).json({
      id: result.insertId,
      username,
      email
    });
  } catch (err) {
    console.error(err);
    // duplicate e-mail / username => MySQL error 1062
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'User already exists' });
    }
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

exports.delete = async (req, res0) => {
  const { username, password } = req.body;

  const hash = await UserModel/UserModel.getPasswordHash(username);
  if (!hash) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const result = await UserModel.deleteUser(username);

  res.json({message : 'Account succesfully deleted' });
})
