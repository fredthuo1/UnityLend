// config/ripple-config.js

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    // Switch between the public ripple server or your own deployment
    server: 'wss://s.altnet.rippletest.net:51233',
   // server: isProduction
   //     ? 'wss://s1.ripple.com' // Mainnet
   //     : 'wss://s.altnet.rippletest.net:51233', // Testnet

    // If you need to use a local/private server that requires authentication
    // authentication: {
    //     username: 'yourUsername',
    //     password: 'yourPassword'
    // },

    // Your XRP Wallet details (for test purposes only, store securely in real-world scenarios)
    wallet: {
        address: process.env.RIPPLE_WALLET_ADDRESS || 'rDQp5Mipg21H5KNijt24DeAtRcmzUu93a7',
        secret: process.env.RIPPLE_WALLET_SECRET || 'sEdTpQJZMHky8B58WdnLSDArQKUyAmv'
    }
};
