const ChamaGroup = require('../models/chamaGroup');
const { sendTransaction, getAccountBalance } = require('../utils/xrp-utils');

exports.createChamaGroup = async (req, res) => {
    try {
        // Optionally check XRP balance to ensure group liquidity
        const bankXrpBalance = await getAccountBalance(process.env.XRP_BANK_ACCOUNT);

        // Logic could be added here to ensure the group's initial liquidity
        // For instance: 
       if (bankXrpBalance < INITIAL_GROUP_LIQUIDITY) {
           return res.status(400).json({
               status: 'fail',
               message: 'Insufficient XRP liquidity for group creation'
           });
       }

        const newGroup = await ChamaGroup.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newGroup
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getChamaGroup = async (req, res) => {
    try {
        const group = await ChamaGroup.findById(req.params.id).populate('members');

        // Fetching and displaying the XRP balance of the group
        if (group.xrpAccount) {
            const groupXrpBalance = await getAccountBalance(group.xrpAccount);
            group.groupXrpBalance = groupXrpBalance;
        }

        res.status(200).json({
            status: 'success',
            data: group
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Group not found'
        });
    }
};

exports.updateChamaGroup = async (req, res) => {
    try {
        const groupToUpdate = await ChamaGroup.findById(req.params.id);

        // If funds are added/removed, update group's XRP account accordingly
        if (req.body.transactionType === 'contribution') {
            await sendTransaction(process.env.XRP_BANK_ACCOUNT, groupToUpdate.xrpAccount, req.body.amount);
        } else if (req.body.transactionType === 'payout') {
            await sendTransaction(groupToUpdate.xrpAccount, req.body.destinationAccount, req.body.amount);
        }

        const updatedGroup = await ChamaGroup.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: updatedGroup
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteChamaGroup = async (req, res) => {
    try {
        const group = await ChamaGroup.findById(req.params.id);

        // Logic to ensure funds are safely transferred before deleting the group
        // For instance: 
        // if (group.groupXrpBalance > 0) {
        //     await sendTransaction(group.xrpAccount, SAFE_DESTINATION_ACCOUNT, group.groupXrpBalance);
        // }

        await ChamaGroup.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
