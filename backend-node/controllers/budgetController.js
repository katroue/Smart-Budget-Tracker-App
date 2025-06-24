const BudgetModel = require('../models/budgetModel');

exports.createBudget = async (req, res) => {
    const { userId, category, period, limit_amount, start_month } = req.body;

    // to continue ...
}