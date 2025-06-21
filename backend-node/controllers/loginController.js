// controllers/loginController.js
const bcrypt = require('bcrypt'); // to hash passwords
const UserModel = require('../models/loginModel');   // adjusts to your path

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
    const [result] = await UserModel.createUser(username, email, hash);

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
