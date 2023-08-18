const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'XRP'
    },
    xrpTransactionId: {
        type: String,
        unique: true  
    },
    destinationTag: Number, 
    fee: Number, 
    type: {
        type: String,
        enum: ['IntraChama', 'LoanRepayment', 'Other'],
        default: 'Other'
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
