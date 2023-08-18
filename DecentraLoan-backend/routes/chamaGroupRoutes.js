const express = require('express');
const chamaGroupController = require('../controllers/chamaGroupController');
const authenticate = require('../middleware/authenticate');
const xrpMiddleware = require('../middleware/xrpMiddleware');

const router = express.Router();

router.use(authenticate);  // apply the authentication middleware to all chama group routes

router.post('/create', xrpMiddleware, chamaGroupController.createChamaGroup);  // ensure liquidity before creating a group
router.get('/:id', chamaGroupController.getChamaGroup);
router.put('/:id/update', xrpMiddleware, chamaGroupController.updateChamaGroup);  // ensure funds are safely transferred before updating the group
router.delete('/:id/delete', xrpMiddleware, chamaGroupController.deleteChamaGroup);  // ensure funds are safely transferred before deleting the group

module.exports = router;
