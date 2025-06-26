const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', (req, res, next) => {
  console.log('Route /register hit');
  next();
}, authController.register);
router.post('/login', authController.login);
router.delete('/delete', authController.delete);
router.put('/modify', authController.modify);

module.exports = router;