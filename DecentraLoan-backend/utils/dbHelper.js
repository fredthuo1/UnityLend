// utils/dbHelper.js

const mongoose = require('mongoose');

exports.connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected.');
    } catch (error) {
        console.error('DB connection failed:', error);
    }
};

exports.closeDBConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    } catch (error) {
        console.error('Error closing the DB connection:', error);
    }
};
