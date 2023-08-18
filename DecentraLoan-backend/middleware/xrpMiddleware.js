const { getAccountBalance } = require('../utils/xrp-utils');

module.exports = async (req, res, next) => {
    try {
        // Check if the user has sufficient XRP balance
        const xrpBalance = await getAccountBalance(req.xrpAccount);
        if (xrpBalance < someThresholdAmount) {  // Define a threshold amount
            return res.status(400).json({
                status: 'fail',
                message: 'Insufficient XRP balance'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve XRP balance'
        });
    }
};
