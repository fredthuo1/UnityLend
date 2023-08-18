const express = require('express');
const transactionController = require('../controllers/transactionController');
const authenticate = require('../middleware/authenticate');
const xrpMiddleware = require('../middleware/xrpMiddleware');

const router = express.Router();

router.use(authenticate);  // apply the authentication middleware to all transaction routes

router.post('/create', xrpMiddleware, transactionController.createTransaction);  // ensure XRP checks before creating a transaction
router.get('/:id', transactionController.getTransaction);
router.put('/:id/update', xrpMiddleware, transactionController.updateTransaction);  // ensure XRP checks before updating a transaction
router.delete('/:id/delete', xrpMiddleware, transactionController.deleteTransaction);  // ensure XRP checks before deleting a transaction

module.exports = router;
