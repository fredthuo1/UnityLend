const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const xrpMiddleware = require('../middleware/xrpMiddleware');

const router = express.Router();

router.use(authenticate);  // Apply the authentication middleware to all user routes

router.post('/create', xrpMiddleware, userController.createUser);  // Ensure XRP checks before creating a user (e.g., account setup)
router.get('/:id', userController.getUser);
router.put('/:id/update', xrpMiddleware, userController.updateUser);  // Ensure XRP checks before updating a user (e.g., account balance updates)
router.delete('/:id/delete', xrpMiddleware, userController.deleteUser);  // Ensure XRP checks before deleting a user (e.g., reverting transactions)

module.exports = router;
