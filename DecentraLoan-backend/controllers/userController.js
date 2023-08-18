const User = require('../models/user');
const {
    rippleConnection, // Import the rippleConnection instance
    generateNewWallet,
    sendTransaction
} = require('../utils/xrp-utils');

exports.createUser = async (req, res) => {
    try {
        console.log("New User: ---------------------------------")

        // You can still perform other checks and validations on the user data here

        const newUser = await User.create(req.body);

        console.log("New Userssssssssssssssssssssssssssssssss: ---------------------------------")

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user.xrpAccount) {
            user.xrpBalance = await getAccountBalance(user.xrpAccount);
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        if (req.body.transferXrpTo) {
            const userToUpdate = await User.findById(req.params.id);
            await sendTransaction(userToUpdate.xrpAccount, req.body.transferXrpTo, req.body.transferAmount);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: updatedUser
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user.xrpAccount) {
            user.xrpBalanceBeforeDeletion = await getAccountBalance(user.xrpAccount);
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: {
                deletedUser: user,
                balanceBeforeDeletion: user.xrpBalanceBeforeDeletion
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
