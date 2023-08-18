const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    repaymentAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Disbursed', 'Repaid'],
        default: 'Pending'
    },
    dateApplied: {
        type: Date,
        default: Date.now
    },
    repaymentDate: {
        type: Date
    },
    xrpLoanTransactionId: String, 
    loanReason: String,
    repaymentStatus: {
        type: String,
        enum: ['NotDue', 'Repaid', 'Overdue'],
        default: 'NotDue'
    },
    loanTerms: String 
});

module.exports = mongoose.model('Loan', loanSchema);
