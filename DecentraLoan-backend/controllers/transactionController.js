const Transaction = require('../models/transaction');
const {
    sendTransaction,
    getTransactionDetails,
    updateRippleTransaction
} = require('../utils/xrp-utils');

exports.createTransaction = async (req, res) => {
    try {
        // Record the transaction in the Ripple ledger first
        const xrpTransactionId = await sendTransaction(req.body.fromUserXrpAccount, req.body.toUserXrpAccount, req.body.amount);

        // Store the Ripple transaction ID in your database
        req.body.xrpTransactionId = xrpTransactionId;

        const newTransaction = await Transaction.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newTransaction
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        // Fetch transaction details from the Ripple ledger
        if (transaction.xrpTransactionId) {
            const xrpTransactionDetails = await getTransactionDetails(transaction.xrpTransactionId);
            transaction.xrpDetails = xrpTransactionDetails;
        }

        res.status(200).json({
            status: 'success',
            data: transaction
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Transaction not found'
        });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        // Update the transaction on the Ripple ledger first
        const rippleUpdateStatus = await updateRippleTransaction(req.body.xrpTransactionId, req.body);

        if (!rippleUpdateStatus.success) {
            throw new Error('Failed to update transaction on the Ripple ledger.');
        }

        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: transaction
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        // Please note that transactions in Ripple ledger are immutable. 
        // You can't "delete" them, but you might want to mark them in some way if your use case requires it.
        // Depending on your business logic, you might want to send a "reversal" or "cancellation" transaction instead.

        await Transaction.findByIdAndDelete(req.params.id);
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
