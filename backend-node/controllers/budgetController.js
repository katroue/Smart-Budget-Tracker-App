const BudgetModel = require('../models/budgetModel');

exports.createBudget = async (req, res) => {
    const { userId, category, period, limit_amount, start_month } = req.body;

    if (!userId || !category || !period || !limit_amount | !start_month) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await BudgetModel.createBudget(userId, category, period, limit_amount, start_month);
        res.json({message : 'Budget successfully created'}); // success
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getBudget = async (req, res) => {
    const { userId, category } = req.body;

    if (!userId || !category) {
        return res.status(400).json({ error: 'Please provide your user ID, category and period of the budget' });
    }

    try {
        const budget = await BudgetModel.getBudget(userId, category);

        if (!budget) {
            return res
            .status(404)
            .json({ error: "Budget for that category doesn't exist" });
        }

        // success
        return res.json(budget);          // 200 OK with the budget object
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllBudgets = async (req, res) => {
  const userId = req.user?.id ?? req.body.userId;         // JWT or body

  if (!userId) {
    return res.status(400).json({ error: 'Missing user ID' });
  }

  try {
    const rows = await BudgetModel.getAllBudgets(userId); // array | null

    if (!rows) {
      return res.status(404).json({ error: 'No budgets found' });
    }
    return res.json(rows);                                // 200 OK
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBudget = async (req, res) => {
  const userId   = req.user?.id ?? req.body.userId;
  const category = req.params.category || req.body.category;

  if (!userId || !category) {
    return res.status(400).json({ error: 'userId and category required' });
  }

  try {
    const rowsDeleted = await BudgetModel.deleteBudget(userId, category);

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    return res.status(204).end();                         // No Content
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.modifyLimitAmount = async (req, res) => {
  const userId      = req.user?.id ?? req.body.userId;
  const category    = req.params.category || req.body.category;
  const limitAmount = req.body.limit_amount;

  if (!userId || !category || limitAmount === undefined) {
    return res.status(400).json({ error: 'userId, category and limit_amount required' });
  }

  try {
    const rowsChanged = await BudgetModel.modifyLimitAmount(
      userId,
      category,
      limitAmount
    );

    if (rowsChanged === 0) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    return res.json({
      message: 'Budget updated',
      category,
      limit_amount: limitAmount
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};