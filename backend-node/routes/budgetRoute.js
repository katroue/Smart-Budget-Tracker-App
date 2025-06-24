const express = require('express');
const router = express.Router();
const budgetCtrl = require('../controllers/budgetController');

router.post('/', budgetCtrl.createBudget);

// READ 1  →  GET  /api/budgets/:category
// Params: category
// Body  : { userId }   (or req.user from auth middleware)
router.get('/:category', budgetCtrl.getBudget);

// READ all → GET /api/budgets
// Requires userId in body or req.user injected by auth middleware
router.get('/', budgetCtrl.getAllBudgets);

// UPDATE   → PATCH /api/budgets/:category
// Params: category
// Body:   { userId, limit_amount }
router.patch('/:category', budgetCtrl.modifyLimitAmount);

// DELETE   → DELETE /api/budgets/:category
// Params: category
// Body:   { userId }
router.delete('/:category', budgetCtrl.deleteBudget);

module.exports = router;