const express = require('express');
const router = express.Router();
const BudgetController = require('../controllers/budgetController');

router.post('/createBudget', BudgetController.createBudget);

module.exports = router;