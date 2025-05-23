const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionsController');

router.get('/', transactionController.getAllTransactions); 

module.exports = router;