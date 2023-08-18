module.exports = (role) => {
    return (req, res, next) => {
        // In a real-world application, fetch the user's role from the database using req.userId
        const userRole = "admin";  // mocked
        if (userRole !== role) {
            return res.status(403).json({
                status: 'error',
                message: 'You do not have the required role'
            });
        }
        next();
    }
};
