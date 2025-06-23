const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController.')

router.post('/register', AuthenticatorResponseController.register);
router.get('/login', AuthController.login);
router.delete('/delete', AuthController.delete);
router.put('/modify', AuthController.modify);

module.exports = router;