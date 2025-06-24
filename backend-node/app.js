// Express app (for testing)

const express = require('express');
const cors = require('cors');

// const transactionRoute = require('./routes/transactionRoute');
const authRoute = require('/routes/authRoute');
const budgetRoute = require('/routes/budgetRoute')

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'test') {
  app.use((req, res, next) => {
    req.user = { id: 1 };      // utilisateur factice
    next();
  });
}

app.use('/api/transactions', require('./routes/transactionRoute'));
app.use('/api/auth', authRoute);
app.use('/api/budgets', budgetRoute);

app.get('/', (req, res) => {
  res.send('Smart Budget Tracker API');
});

module.exports = app;
