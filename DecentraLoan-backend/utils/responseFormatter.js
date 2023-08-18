// utils/responseFormatter.js

exports.successResponse = (res, data, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data
    });
};

exports.errorResponse = (res, message = "Error", statusCode = 500) => {
    res.status(statusCode).json({
        status: 'error',
        message
    });
};
