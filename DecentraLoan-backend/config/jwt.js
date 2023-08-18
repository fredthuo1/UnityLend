module.exports = {
    SECRET: process.env.JWT_SECRET || 'default_secret',
    EXPIRES_IN: '1h'
};
