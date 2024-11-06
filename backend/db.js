const mongoose = require('mongoose');
const MONGO_URI= process.env.MONGO_URI

const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB successfully`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
};

module.exports = connectToMongo;