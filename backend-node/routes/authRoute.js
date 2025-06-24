const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.get('/login', authController.login);
router.delete('/delete', authController.delete);
router.put('/modify', authController.modify);

module.exports = router;