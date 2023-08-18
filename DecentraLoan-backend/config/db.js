module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/defaultDB',
    MONGO_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
};
