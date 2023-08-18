// utils/dbHelper.js

const mongoose = require('mongoose');

exports.connectToDB = async () => {
    try {
        console.log('MongoDB Nottttttttttttttttt connected.');

        await mongoose.connect("mongodb+srv://thuofred1:AthiNai254$#@cluster0.hebapzo.mongodb.net/?retryWrites=true&w=majority", {
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
