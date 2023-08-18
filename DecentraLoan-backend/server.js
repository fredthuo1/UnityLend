const express = require('express');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');
const chamaGroupRoutes = require('./routes/chamaGroupRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');

const app = express();

require('dotenv').config();

// Middleware
app.use(express.json());

app.use(logger); // log all requests
app.use(authenticate); // mock authentication for all routes

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/loans', loanRoutes);
app.use('/api/v1/chama-groups', chamaGroupRoutes);
app.use('/api/v1/transactions', transactionRoutes);

// This should be the LAST middleware added to the stack.
app.use(errorHandler);

// Basic Middleware for Handling Errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

// Starting the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; // in case you need to export for tests or other purposes
