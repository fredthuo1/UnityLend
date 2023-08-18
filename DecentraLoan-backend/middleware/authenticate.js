module.exports = (req, res, next) => {
    try {
        // Mock authentication
        console.log("Mock authentication middleware triggered");
        req.userId = 1;

        // Retrieving XRP account associated with the user (for this mock, let's assume it's a fixed account)
        req.xrpAccount = "rDQp5Mipg21H5KNijt24DeAtRcmzUu93a7";

        next();
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Authentication error'
        });
    }
};
