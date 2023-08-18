const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {  
        type: String,
        required: true
    },
    rippleAddress: { 
        type: String,
        unique: true, 
        sparse: true  
    },
    rippleSecret: {
        type: String,
        select: false, 
    },
    chamaGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChamaGroup'
    }
});

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.rippleSecret;
    return obj;
}

module.exports = mongoose.model('User', userSchema);
