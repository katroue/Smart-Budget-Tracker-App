// Express app (for testing)

const express = require('express');
const cors = require('cors');
const transactionsRouter = require('./routes/transactionsRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// Example middleware (optional if you have auth)
// app.use(authMiddleware);

app.use('/api/transactions', transactionsRouter);

app.get('/', (req, res) => {
  res.send('Smart Budget Tracker API');
});

module.exports = app;
