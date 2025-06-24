const express = require('express');
const app = express();

const transactionRoute = require('./routes/transactionRoute');
const authRoute = require('./routes/authRoute');
const budgetRoute = require('./routes/budgetRoute')

const cors = require('cors');

app.use(cors());
app.use(express.json());

// TEMP dev user stub
app.use((req, res, next) => {
  req.user = { id: 1 };
  next();
});

app.use('/api/transactions', transactionRoute);
app.use('/api/auth', authRoute);
app.use('/api/budgets', budgetRoute);


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
