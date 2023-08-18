const RippleAPI = require('ripple-lib').RippleAPI;
const config = require('../config/ripple-config');

class RippleConnection {
    constructor() {
        this.api = new RippleAPI({
            server: config.server
        });
    }

    async connect() {
        await this.api.connect();
    }

    async disconnect() {
        await this.api.disconnect();
    }
}

const rippleConnection = new RippleConnection();

const generateNewWallet = async () => {
    try {
        await rippleConnection.connect(); // Connect to the Ripple WebSocket server
        console.log("New Wallet: ---------------------------------")

        // Generate a new Ripple wallet
        // const wallet = rippleConnection.api.generateXAddress("rDQp5Mipg21H5KNijt24DeAtRcmzUu93a7", "sEdTpQJZMHky8B58WdnLSDArQKUyAmv");

        const wallet = rippleConnection.api.generateAddress({
            algorithm: 'ecdsa-secp256k1',
            includeClassicAddress: true,
            test: true
        });

        console.log("New Ripple Wallet: ---------------------------------", wallet.address)
        const xrpWallet = {
            address: wallet.address,
            secret: wallet.secret
        };

        return xrpWallet;
    } catch (error) {
        console.error(`Error generating new wallet: ${error.message}`);
        throw error;
    } finally {
        await rippleConnection.disconnect(); // Disconnect from the Ripple WebSocket server
    }
};

const getAccountBalance = async (account) => {
    try {
        await rippleConnection.connect(); // Connect to the Ripple WebSocket server
        const accountInfo = await rippleConnection.api.getAccountInfo(account); // Use rippleConnection.api
        return accountInfo.xrpBalance;
    } catch (error) {
        console.error(`Error getting balance for ${account}: ${error.message}`);
        throw error;
    } finally {
        await rippleConnection.disconnect();
    }
};

const sendTransaction = async (fromAccount, toAccount, amount) => {
    try {
        await rippleConnection.connect(); // Connect to the Ripple WebSocket server
        // Please note, in a real-world scenario, you'd need more details such as secret key to sign the transaction.
        const preparedTx = await rippleConnection.api.prepareTransaction({ // Use rippleConnection.api
            "TransactionType": "Payment",
            "Account": fromAccount,
            "Amount": rippleConnection.api.xrpToDrops(amount), // Use rippleConnection.api
            "Destination": toAccount
        });

        // ... Further transaction signing and submission logic would go here ...

        return true;
    } catch (error) {
        console.error(`Error sending transaction: ${error.message}`);
        throw error;
    } finally {
        await rippleConnection.disconnect();
    }
};

module.exports = {
    rippleConnection,
    generateNewWallet,
    getAccountBalance,
    sendTransaction
    // ... other functions
};
