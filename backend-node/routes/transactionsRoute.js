const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionsController');

router.get('/', transactionController.getAllTransactions); 
router.post('/', transactionController.createTransaction);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.get('/category/:cat', transactionController.getTransactionsByCategory);

module.exports = router;