// utils/tokenGenerator.js
const jwt = require('jsonwebtoken');

exports.generateToken = (userId, expiresIn = '1h') => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

exports.decodeToken = (token) => {
    return jwt.decode(token);
};
