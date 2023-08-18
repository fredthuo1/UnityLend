// config/ripple-config.js

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    // Switch between the public ripple server or your own deployment
    server: isProduction
        ? 'wss://s1.ripple.com' // Mainnet
        : 'wss://s.altnet.rippletest.net:51233', // Testnet

    // If you need to use a local/private server that requires authentication
    // authentication: {
    //     username: 'yourUsername',
    //     password: 'yourPassword'
    // },

    // Your XRP Wallet details (for test purposes only, store securely in real-world scenarios)
    wallet: {
        address: process.env.RIPPLE_WALLET_ADDRESS || 'rYourTestnetAddress',
        secret: process.env.RIPPLE_WALLET_SECRET || 'sYourTestnetSecret'
    }
};

