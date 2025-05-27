const express = require('express');
const app = express();
const transactionRoute = require('./routes/transactionsRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// TEMP dev user stub
app.use((req, res, next) => {
  req.user = { id: 1 };
  next();
});
app.use('/api/transactions', transactionRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
