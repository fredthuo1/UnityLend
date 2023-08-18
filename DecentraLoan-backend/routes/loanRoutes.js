const express = require('express');
const loanController = require('../controllers/loanController');
const authenticate = require('../middleware/authenticate');
const xrpMiddleware = require('../middleware/xrpMiddleware');

const router = express.Router();

router.use(authenticate);  // apply the authentication middleware to all loan routes

router.post('/create', xrpMiddleware, loanController.createLoan);  // ensure user has enough XRP before creating a loan
router.get('/:id', loanController.getLoan);
router.put('/:id/update', xrpMiddleware, loanController.updateLoan);  // ensure user has enough XRP before updating a loan
router.delete('/:id/delete', loanController.deleteLoan);

module.exports = router;
