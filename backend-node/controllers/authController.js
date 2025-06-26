console.log

const bcrypt = require('bcrypt'); // to hash passwords
const UserModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
exports.register = async (req, res) => {
  console.log('We were here'); // test to see if the route is hit
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await UserModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
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
  if (!hash) return res.status(401).json({ error: 'User doesn\'t exist' });

  const ok = await bcrypt.compare(password, hash);

  if (!ok) return res.status(401).json({ error: 'Wrong password' });

  // Génère un JWT
  const token = jwt.sign({ username }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "1h" });

  res.json({ token });
};

exports.delete = async (req, res) => {
  const { username, password } = req.body;

  const hash = await UserModel.getPasswordHash(username);
  if (!hash) return res.status(401).json({ error: 'Invalid credentials' });

  // checking to see if the password is correct
  const ok = await bcrypt.compare(password, hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  
  const rows = await UserModel.deleteUser(username);
  if (!rows) return res.status(404).json({ error: 'User not found' }); // checking to see if the user exists

  res.json({message : 'Account succesfully deleted' }); // if yes, deletes
};

exports.modify = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  const hash = await UserModel.getPasswordHash(username);
  if (!hash) return res.status(401).json({ error: 'Invalid credentials' });

  // checking to see if the password is correct
  const ok = await bcrypt.compare(oldPassword, hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  await UserModel.modifyPassword(username, newPassword);

  res.json({message : 'Password successfully changed' });
}
