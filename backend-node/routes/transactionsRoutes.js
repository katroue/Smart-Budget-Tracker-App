const express = require('express');
const router = express.Router();
const { transactionController } = require('../controllers/transactionsController');

router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);

module.exports = router;