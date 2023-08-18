const Loan = require('../models/loan');
const User = require('../models/user');
const { sendTransaction, getAccountBalance } = require('../utils/xrp-utils');

exports.createLoan = async (req, res) => {
    try {
        // Optionally check XRP balance to ensure liquidity
        const bankXrpBalance = await getAccountBalance(process.env.XRP_BANK_ACCOUNT);

        // If balance is lower than the loan request + buffer, reject or handle accordingly
        if (bankXrpBalance < req.body.amount + process.env.XRP_BUFFER_AMOUNT) {
            return res.status(400).json({
                status: 'fail',
                message: 'Insufficient XRP liquidity'
            });
        }

        const newLoan = await Loan.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newLoan
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id).populate('user');

        if (loan.status === 'Approved' && loan.user.xrpAccount) {
            const userXrpBalance = await getAccountBalance(loan.user.xrpAccount);
            loan.userXrpBalance = userXrpBalance;  // Append XRP balance if loan was approved
        }

        res.status(200).json({
            status: 'success',
            data: loan
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Loan not found'
        });
    }
};

exports.updateLoan = async (req, res) => {
    try {
        const loanToUpdate = await Loan.findById(req.params.id).populate('user');

        if (req.body.status === 'Approved' && loanToUpdate.status !== 'Approved') {
            if (loanToUpdate.user.xrpAccount) {
                await sendTransaction(process.env.XRP_BANK_ACCOUNT, loanToUpdate.user.xrpAccount, loanToUpdate.amount);
            }
        } else if (req.body.status === 'Rejected' || req.body.status === 'PaidBack') {
            // Handle logic if loan is rejected or paid back. 
            // This could involve reverting a transaction or notifying the user.
        }

        const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: updatedLoan
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);

        // Check if the loan was approved and XRP was sent
        if (loan.status === 'Approved') {
            return res.status(400).json({
                status: 'fail',
                message: 'Cannot delete an approved loan.'
            });
        }

        await Loan.findByIdAndDelete(req.params.id);
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
