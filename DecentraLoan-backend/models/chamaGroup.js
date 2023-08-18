const mongoose = require('mongoose');

const chamaGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    adminUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    totalFunds: {
        type: Number,
        default: 0
    },
    xrpGroupWalletId: String,  
    contributions: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        amount: Number,
        xrpTransactionId: String, 
        date: {
            type: Date,
            default: Date.now
        }
    }],
    groupRules: String,   
    groupDescription: String 
});

module.exports = mongoose.model('ChamaGroup', chamaGroupSchema);
