const RippleAPI = require('ripple-lib').RippleAPI;
const config = require('../config/ripple-config');

const api = new RippleAPI({
    server: config.server
});

const connect = async () => {
    await api.connect();
};

const disconnect = async () => {
    await api.disconnect();
};

const getAccountBalance = async (account) => {
    try {
        await connect();
        const accountInfo = await api.getAccountInfo(account);
        return accountInfo.xrpBalance;
    } catch (error) {
        console.error(`Error getting balance for ${account}: ${error.message}`);
        throw error;
    } finally {
        disconnect();
    }
};

const sendTransaction = async (fromAccount, toAccount, amount) => {
    try {
        await connect();
        // Please note, in a real-world scenario, you'd need more details such as secret key to sign the transaction.
        const preparedTx = await api.prepareTransaction({
            "TransactionType": "Payment",
            "Account": fromAccount,
            "Amount": api.xrpToDrops(amount),  // Convert the XRP amount to drops, which is the smallest unit
            "Destination": toAccount
        });

        // ... Further transaction signing and submission logic would go here ...

        return true;
    } catch (error) {
        console.error(`Error sending transaction: ${error.message}`);
        throw error;
    } finally {
        disconnect();
    }
};

module.exports = {
    connect,
    disconnect,
    getAccountBalance,
    sendTransaction
    // ... other functions
};
